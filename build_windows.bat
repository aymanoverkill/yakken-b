@echo off
echo === Installing (needs internet, first time only) ===
call npm install
if errorlevel 1 goto fail
echo === Building Setup.exe ===
call npm run dist
if errorlevel 1 goto fail
echo.
echo DONE. Your installer is in the dist folder.
pause
exit /b
:fail
echo Build failed.
pause
