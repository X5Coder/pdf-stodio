@echo off
chcp 65001 >nul
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0backup.ps1" %*
set "EXITCODE=%ERRORLEVEL%"
if "%~1"=="" pause
exit /b %EXITCODE%
