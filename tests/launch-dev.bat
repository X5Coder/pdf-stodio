@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"
start "PDF Studio Dev" cmd /k "npm run dev"
