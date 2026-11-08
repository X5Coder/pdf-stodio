@echo off
REM PDF Studio tool wrapper: font-search -> fontSearch.py
setlocal
set SCRIPT_DIR=%~dp0
python "%SCRIPT_DIR%fontSearch.py" %*
