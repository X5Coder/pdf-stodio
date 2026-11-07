"""
Font Search Tool - Fetch fonts from the web for PDF Studio pages
Based on Fontsource and Google Fonts

Features:
- Search Fontsource and Google Fonts
- Download font files (WOFF2, TTF)
- Save to assets/fonts directory
- Generate CSS @font-face declarations
"""

import urllib.request
import urllib.parse
import json
import os
from typing import List, Dict, Optional

class FontSearch:
    def __init__(self, target_dir: str):
        """
        Initialize font search with target directory

        Args:
            target_dir: Path to save downloaded fonts (e.g., assets/fonts)
        """
        self.target_dir = target_dir
        os.makedirs(target_dir, exist_ok=True)

        self.user_agent = (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
        )

        # Popular Arabic fonts
        self.arabic_fonts = [
            "Cairo", "IBM Plex Sans Arabic", "Tajawal", "Almarai",
            "Noto Sans Arabic", "Amiri", "Harmattan"
        ]

        # Popular Latin fonts
        self.latin_fonts = [
            "Inter", "Roboto", "Open Sans", "Poppins", "Montserrat"
        ]

    def search(self, query: str, language: str = "ar") -> List[Dict]:
        """
        Search for fonts online

        Args:
            query: Font name or family (e.g., "Cairo", "Inter")
            language: "ar" for Arabic, "en" for English/Latin

        Returns:
            List of font metadata: [{name, variants, css, files}, ...]
        """
        # Auto-detect language from query
        if any(arabic in query.lower() for arabic in ["cairo", "arabic", "tajawal", "amiri"]):
            language = "ar"

        # Try Fontsource first (npm package metadata)
        fontsource_results = self._search_fontsource(query, language)

        # Fallback to Google Fonts API
        google_results = self._search_google_fonts(query, language)

        # Merge results, prioritize Fontsource
        all_results = fontsource_results + google_results

        # Download fonts
        for font in all_results:
            downloaded = self._download_font(font)
            if downloaded:
                font["downloaded"] = True
                font["files"] = downloaded
            else:
                font["downloaded"] = False

        return all_results

    def _search_fontsource(self, query: str, language: str) -> List[Dict]:
        """
        Search Fontsource package metadata
        Fontsource packages follow pattern: @fontsource/{font-name}
        """
        try:
            # Normalize font name
            font_name = query.lower().replace(" ", "-")

            # Check if it's a known font
            known_fonts = self.arabic_fonts if language == "ar" else self.latin_fonts

            if not any(font_name in f.lower() for f in known_fonts):
                # Suggest similar fonts
                suggestions = [f for f in known_fonts if font_name in f.lower()]
                if suggestions:
                    return [{"name": suggestions[0], "source": "Fontsource (suggested)"}]
                return []

            # Construct Fontsource URLs
            css_url = f"https://cdn.jsdelivr.net/npm/@fontsource/{font_name}/index.css"
            base_url = f"https://cdn.jsdelivr.net/npm/@fontsource/{font_name}/files"

            # Fetch CSS to get available variants
            req = urllib.request.Request(css_url, headers={"User-Agent": self.user_agent})
            with urllib.request.urlopen(req, timeout=10) as response:
                css_content = response.read().decode("utf-8")

            # Parse CSS to extract font files
            variants = self._parse_fontsource_css(css_content, base_url)

            return [{
                "name": query,
                "source": "Fontsource",
                "css": css_url,
                "variants": variants
            }]

        except Exception as e:
            print(f"Fontsource search error: {e}")
            return []

    def _search_google_fonts(self, query: str, language: str) -> List[Dict]:
        """Search Google Fonts API"""
        try:
            api_url = f"https://fonts.googleapis.com/css2?family={urllib.parse.quote(query)}:wght@400;600;700&display=swap"
            req = urllib.request.Request(api_url, headers={"User-Agent": self.user_agent})

            with urllib.request.urlopen(req, timeout=10) as response:
                css_content = response.read().decode("utf-8")

            # Parse Google Fonts CSS
            variants = self._parse_google_fonts_css(css_content)

            return [{
                "name": query,
                "source": "Google Fonts",
                "css": api_url,
                "variants": variants
            }]

        except Exception as e:
            print(f"Google Fonts search error: {e}")
            return []

    def _parse_fontsource_css(self, css: str, base_url: str) -> List[Dict]:
        """Parse Fontsource CSS to extract font file URLs"""
        variants = []
        import re

        # Match @font-face blocks
        pattern = r"@font-face\s*{([^}]+)}"
        matches = re.findall(pattern, css, re.DOTALL)

        for match in matches:
            # Extract weight and style
            weight_match = re.search(r"font-weight:\s*(\d+)", match)
            style_match = re.search(r"font-style:\s*(\w+)", match)
            url_match = re.search(r"url\(['\"]?([^'\"]+)['\"]?\)", match)

            if url_match:
                variants.append({
                    "weight": int(weight_match.group(1)) if weight_match else 400,
                    "style": style_match.group(1) if style_match else "normal",
                    "url": url_match.group(1)
                })

        return variants

    def _parse_google_fonts_css(self, css: str) -> List[Dict]:
        """Parse Google Fonts CSS to extract font file URLs"""
        variants = []
        import re

        # Google Fonts uses different format
        pattern = r"url\(['\"]?([^'\"]+)['\"]?\)"
        matches = re.findall(pattern, css)

        for url in matches:
            variants.append({
                "weight": 400,  # Simplified
                "style": "normal",
                "url": url
            })

        return variants

    def _download_font(self, font: Dict) -> Optional[List[str]]:
        """Download font files to target directory"""
        downloaded_files = []

        for variant in font.get("variants", []):
            try:
                url = variant["url"]
                # Convert relative URL to absolute if needed
                if url.startswith("//"):
                    url = "https:" + url
                elif url.startswith("/"):
                    url = "https://cdn.jsdelivr.net" + url

                req = urllib.request.Request(url, headers={"User-Agent": self.user_agent})
                with urllib.request.urlopen(req, timeout=15) as response:
                    data = response.read()

                # Generate filename
                ext = ".woff2" if url.endswith(".woff2") else ".ttf"
                weight = variant.get("weight", 400)
                style = variant.get("style", "normal")
                filename = f"{font['name'].replace(' ', '-').lower()}-{weight}-{style}{ext}"
                filepath = os.path.join(self.target_dir, filename)

                with open(filepath, "wb") as f:
                    f.write(data)

                downloaded_files.append(filepath)

            except Exception as e:
                print(f"Failed to download font variant: {e}")
                continue

        return downloaded_files if downloaded_files else None

    def generate_css(self, font_name: str) -> str:
        """Generate @font-face CSS for a downloaded font"""
        font_name_normalized = font_name.replace(" ", "-").lower()
        font_files = [f for f in os.listdir(self.target_dir) if f.startswith(font_name_normalized)]

        if not font_files:
            return ""

        css = []
        for font_file in font_files:
            # Extract weight and style from filename
            parts = font_file.replace(".woff2", "").replace(".ttf", "").split("-")
            weight = parts[-2] if len(parts) > 2 else "400"
            style = parts[-1] if len(parts) > 1 else "normal"

            css.append(f"""
@font-face {{
  font-family: '{font_name}';
  src: url('./assets/fonts/{font_file}') format('woff2');
  font-weight: {weight};
  font-style: {style};
  font-display: swap;
}}
""")

        return "\n".join(css)


# CLI usage example
if __name__ == "__main__":
    import sys

    if len(sys.argv) < 3:
        print("Usage: python fontSearch.py <font_name> <target_dir> [language]")
        sys.exit(1)

    font_name = sys.argv[1]
    target_dir = sys.argv[2]
    language = sys.argv[3] if len(sys.argv) > 3 else "ar"

    searcher = FontSearch(target_dir)
    results = searcher.search(font_name, language)

    print(f"Found {len(results)} fonts:")
    for font in results:
        print(f"  - {font['name']} (from {font['source']})")
        if font.get("downloaded"):
            print(f"    Downloaded: {font['files']}")
