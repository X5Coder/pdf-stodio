@echo off
REM PDF Studio tool wrapper: image-search -> imageSearch.py
setlocal
set SCRIPT_DIR=%~dp0
python "%SCRIPT_DIR%imageSearch.py" %*
