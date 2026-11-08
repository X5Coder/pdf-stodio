# Backup

A one-click ZIP backup tool. Choose any folder, and the script compresses it into
`backup/` as a timestamped archive.

```
backup/
├── backup.bat    ← double-click to start (folder picker)
├── backup.ps1    ← the actual script
└── README.md     ← this file
```

---

## Usage

| How | Command |
|---|---|
| Folder picker dialog | double-click `backup.bat` |
| No dialog | `backup.bat -Path "C:\path\to\folder"` |
| Include everything | `backup.bat -Path "..." -All` |
| Open the archive location | `backup.bat -Path "..." -Open` |
| Custom output folder | `backup.bat -Path "..." -OutDir "D:\backups"` |

Example — back up every project:

```bat
backup.bat -Path "..\projects" -Open
```

---

## Behavior

- Archive name: `<folder-name>_YYYY-MM-DD_HH-mm-ss.zip`
  (a numeric suffix is added if the same second repeats).
- **Skipped by default:** `node_modules`, `.git`, `dist`, `out`, `.vite`, `.cache`.
  Use `-All` to include everything.
- If the chosen folder contains `backup/`, existing archives are excluded automatically —
  no self-inclusion and no runaway file size.
- Refuses to back up an entire drive, or the `backup/` folder itself.
- Files locked by another program are skipped and listed in the summary instead of
  failing the whole operation.
- Arabic and other non-ASCII file names are preserved correctly inside the ZIP (UTF-8 flag set).

---

## Output

The script prints a short summary. Fields:

| Field | Meaning |
|---|---|
| Source | folder being compressed |
| Target | full path of the new ZIP |
| Files | number of files included in the archive |
| File | archive file name |
| Content | file count and total uncompressed size |
| Size | archive size and saved percentage |
| Duration | elapsed time |
| Location | output folder |

Exit code `0` on success, `1` on any error (missing folder, refused target, write failure).

---

## Notes

- Uses Windows PowerShell 5.1 — nothing to install.
- ZIP archives are git-ignored (`backup/*.zip`).
- The script sets the console to UTF-8 (`chcp 65001`) so Arabic output renders correctly.
