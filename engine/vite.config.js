import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

function pdfStudioStyleApi() {
  const readBody = (req) => new Promise((resolve) => { let b=''; req.on('data',c=>b+=c); req.on('end',()=>resolve(b)); });
  const json = (res, code, obj) => { res.statusCode=code; res.setHeader('Content-Type','application/json'); res.end(JSON.stringify(obj)); };
  const safeId = (id) => /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(id || '');
  const slugify = (s) => String(s||'').trim().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9_-]/g,'').replace(/-+/g,'-').replace(/^-|-$/g,'') || ('project-' + Date.now());
  const starterPage = () => `import { Page } from '@ds/index.js';\n\nexport default function Page01({ pageNo = 1, total = 1 }) {\n  return (\n    <Page pageNo={pageNo} total={total} footer={false}>\n      <div style={{ width: '100%', height: '100%' }} />\n    </Page>\n  );\n}\n`;
  return {
    name: 'pdfstudio-style-api',
    configureServer(server) {
      const projectsDir = fileURLToPath(new URL('../projects', import.meta.url));
      server.middlewares.use('/__pdfstudio/config', async (req, res) => {
        const url = new URL(req.url || '/', 'http://localhost');
        const projectId = url.searchParams.get('project') || '';
        if (!safeId(projectId)) return json(res,400,{ ok:false, error:'invalid project id' });
        const configPath = path.join(projectsDir, projectId, 'project.json');
        if (!configPath.startsWith(projectsDir)) return json(res,400,{ok:false,error:'bad path'});
        try {
          if (!fs.existsSync(configPath)) return json(res,404,{ ok:false, error:'not found' });
          const data = JSON.parse(fs.readFileSync(configPath,'utf-8'));
          return json(res,200,{ ok:true, config: data });
        } catch (e) { return json(res,500,{ok:false,error:String(e)}); }
      });
      server.middlewares.use('/__pdfstudio/style', async (req, res) => {
        const url = new URL(req.url || '/', 'http://localhost');
        const projectId = url.searchParams.get('project') || '';
        if (!safeId(projectId)) return json(res,400,{ ok:false, error:'invalid project id' });
        const projectRoot = path.join(projectsDir, projectId);
        const stylePath = path.join(projectsDir, projectId, 'style.md');
        if (!stylePath.startsWith(projectsDir)) return json(res,400,{ok:false,error:'bad path'});
        if (req.method === 'GET') {
          try {
            if (!fs.existsSync(stylePath)) return json(res,200,{ ok:true, exists:false, content:'' });
            return json(res,200,{ ok:true, exists:true, content: fs.readFileSync(stylePath,'utf-8') });
          } catch (e) { return json(res,500,{ok:false,error:String(e)}); }
        }
        if (req.method === 'POST') {
          try {
            if (!fs.existsSync(projectRoot)) return json(res,404,{ ok:false, error:'project folder not found' });
            const data = JSON.parse((await readBody(req)) || '{}');
            fs.writeFileSync(stylePath, typeof data.content === 'string' ? data.content : '', 'utf-8');
            return json(res,200,{ ok:true });
          } catch (e) { return json(res,500,{ok:false,error:String(e)}); }
        }
        res.statusCode = 405; res.end('Method Not Allowed');
      });
      server.middlewares.use('/__pdfstudio/ping', async (req, res) => {
        return json(res,200,{ ok:true });
      });
      server.middlewares.use('/__pdfstudio/projects', async (req, res) => {
        if (req.method !== 'GET') { res.statusCode=405; return res.end('Method Not Allowed'); }
        try {
          const entries = [];
          if (fs.existsSync(projectsDir)) {
            for (const name of fs.readdirSync(projectsDir)) {
              if (!safeId(name)) continue;
              const projectRoot = path.join(projectsDir, name);
              let st = null;
              try { st = fs.statSync(projectRoot); } catch { st = null; }
              if (!st || !st.isDirectory()) continue;
              let config = null;
              const configPath = path.join(projectRoot, 'project.json');
              if (fs.existsSync(configPath)) {
                try { config = JSON.parse(fs.readFileSync(configPath,'utf-8')); } catch { config = null; }
              }
              const hasStyle = fs.existsSync(path.join(projectRoot, 'style.md'));
              if (!config && !hasStyle) continue;
              entries.push({
                id: name,
                name: (config && typeof config.name === 'string' && config.name.trim()) ? config.name : name,
                description: (config && typeof config.description === 'string') ? config.description : '',
                hasStyle,
                config: config || {},
              });
            }
          }
          entries.sort((a,b) => a.id.localeCompare(b.id));
          return json(res,200,{ ok:true, projects: entries });
        } catch (e) { return json(res,500,{ok:false,error:String(e)}); }
      });
      server.middlewares.use('/__pdfstudio/pages', async (req, res) => {
        if (req.method !== 'GET') { res.statusCode=405; return res.end('Method Not Allowed'); }
        const url = new URL(req.url || '/', 'http://localhost');
        const projectId = url.searchParams.get('project') || '';
        if (!safeId(projectId)) return json(res,400,{ ok:false, error:'invalid project id' });
        const projectRoot = path.join(projectsDir, projectId);
        if (!projectRoot.startsWith(projectsDir)) return json(res,400,{ok:false,error:'bad path'});
        try {
          const pages = [];
          const urls = {};
          if (fs.existsSync(projectRoot)) {
            for (const name of fs.readdirSync(projectRoot)) {
              const m = /^page-(\d+)$/.exec(name);
              if (!m) continue;
              const dir = path.join(projectRoot, name);
              try { if (!fs.statSync(dir).isDirectory()) continue; } catch { continue; }
              for (const file of ['page.jsx', 'content.jsx']) {
                const fp = path.join(dir, file);
                if (fs.existsSync(fp)) {
                  const n = parseInt(m[1], 10);
                  if (!pages.includes(n)) {
                    pages.push(n);
                    const norm = fp.replace(/\\/g, '/');
                    urls[n] = norm.startsWith('/') ? '/@fs' + norm : '/@fs/' + norm;
                  }
                  break;
                }
              }
            }
          }
          pages.sort((a,b) => a - b);
          return json(res,200,{ ok:true, pages, urls });
        } catch (e) { return json(res,500,{ok:false,error:String(e)}); }
      });
      server.middlewares.use('/__pdfstudio/project', async (req, res) => {
        const url = new URL(req.url || '/', 'http://localhost');
        if (req.method === 'DELETE') {
          try {
            const projectId = url.searchParams.get('project') || '';
            if (!safeId(projectId)) return json(res,400,{ ok:false, error:'invalid project id' });
            const projectRoot = path.join(projectsDir, projectId);
            if (!projectRoot.startsWith(projectsDir) || projectRoot === projectsDir) return json(res,400,{ok:false,error:'bad path'});
            if (!fs.existsSync(projectRoot)) return json(res,404,{ ok:false, error:'project not found' });
            fs.rmSync(projectRoot, { recursive: true, force: true });
            json(res,200,{ ok:true, id: projectId, restarting:true });
            setTimeout(() => { server.restart().catch(() => {}); }, 150);
            return;
          } catch (e) { return json(res,500,{ok:false,error:String(e)}); }
        }
        if (req.method !== 'POST') { res.statusCode=405; return res.end('Method Not Allowed'); }
        try {
          const data = JSON.parse((await readBody(req)) || '{}');
          const rawName = String(data.name || '').trim();
          let id = String(data.id || '').trim() || slugify(rawName);
          if (!safeId(id)) id = slugify(id);
          if (!safeId(id)) return json(res,400,{ok:false,error:'invalid project id'});
          const projectRoot = path.join(projectsDir, id);
          if (!projectRoot.startsWith(projectsDir)) return json(res,400,{ok:false,error:'bad path'});
          if (fs.existsSync(projectRoot)) return json(res,409,{ok:false,error:'project already exists'});
          const name = rawName || id;
          const orientation = data.orientation === 'portrait' ? 'portrait' : 'landscape';
          const preset = typeof data.preset === 'string' && data.preset.trim()
            ? data.preset.trim()
            : (orientation === 'portrait' ? 'a4' : 'slide');
          const sizeLine = orientation === 'portrait'
            ? 'A4 طولي (portrait)'
            : 'Slide عرضي 1280×720 (landscape)';
          const style = typeof data.style === 'string' && data.style.trim() ? data.style : `# Style — ${name}\n\n> مصدر الستايل المعتمد. يُطبَّق على كل الصفحات. (إلزامي)\n\n## الهوية والإعدادات\n- **الاسم:** ${name}\n- **اللغة/الاتجاه:** العربية، RTL (dir="rtl", lang="ar")\n- **مقاس/اتجاه الصفحة:** ${sizeLine}\n- **الثيم/الألوان:** \n\n## الخطوط\n- عام: fonts/\n- خاص بالمشروع: font/\n\n## تخطيط ومكوّنات الصفحة\n- (التصميم يملأ الصفحة بالكامل)\n\n## قواعد التصدير\n- PDF صالح.\n`;
          const config = { name, description: String(data.description||'').trim(), preset, orientation, dir: data.dir||'rtl', lang: data.lang||'ar', theme: data.theme||'forest', totalPages: 1 };
          fs.mkdirSync(path.join(projectRoot, 'font'), { recursive:true });
          fs.mkdirSync(path.join(projectRoot, 'page-1', 'images'), { recursive:true });
          fs.writeFileSync(path.join(projectRoot, 'style.md'), style, 'utf-8');
          fs.writeFileSync(path.join(projectRoot, 'project.json'), JSON.stringify(config, null, 2), 'utf-8');
          fs.writeFileSync(path.join(projectRoot, 'page-1', 'page.jsx'), starterPage(), 'utf-8');
          json(res,200,{ ok:true, id, name, restarting:true });
          setTimeout(() => { server.restart().catch(() => {}); }, 150);
          return;
        } catch (e) { return json(res,500,{ok:false,error:String(e)}); }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), pdfStudioStyleApi()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@projects': fileURLToPath(new URL('../projects', import.meta.url)),
      '@ds': fileURLToPath(new URL('./src/ds', import.meta.url))
    }
  },
  server: {
    port: 5173,
    open: false,
    watch: { usePolling: true, interval: 300 },
    fs: {
      allow: ['..']
    }
  }
});
