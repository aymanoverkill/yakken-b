const { app, BrowserWindow, ipcMain, dialog, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const core = require('./src/core');

let win;
if (!app.requestSingleInstanceLock()) app.quit();

const native = {
  openWA: (phone, text) => shell.openExternal(core.waUrl(phone, text)),
  openDoc: (html) => {
    const f = path.join(os.tmpdir(), `bm_${Date.now()}.html`);
    fs.writeFileSync(f, html, 'utf8');
    const w = new BrowserWindow({ width: 920, height: 820, autoHideMenuBar: true, title: 'عرض / طباعة' });
    w.loadFile(f);
  },
  saveText: async (name, text) => {
    const r = await dialog.showSaveDialog(win, { defaultPath: name, filters: [{ name: 'CSV (Excel)', extensions: ['csv'] }] });
    if (r.canceled) return false;
    fs.writeFileSync(r.filePath, '\ufeff' + text, 'utf8');
    return true;
  },
  pickBackup: async () => {
    const r = await dialog.showOpenDialog(win, { defaultPath: path.join(app.getPath('userData'), 'backups'), filters: [{ name: 'Backup', extensions: ['bme', 'bmp'] }] });
    return r.canceled ? null : r.filePaths[0];
  },
  pickFolder: async () => {
    const r = await dialog.showOpenDialog(win, { properties: ['openDirectory'] });
    return r.canceled ? null : r.filePaths[0];
  },
  relaunch: () => { app.relaunch(); app.exit(0); },
};

ipcMain.handle('call', async (e, fn, args) => {
  if (native[fn]) return native[fn](...args);
  if (typeof core.api[fn] === 'function') return core.api[fn](...args);
  throw new Error('عملية غير معروفة: ' + fn);
});

function createWindow() {
  Menu.setApplicationMenu(null);
  win = new BrowserWindow({
    width: 1366, height: 820, minWidth: 1100, minHeight: 650, backgroundColor: '#F3F5F9', title: 'يقين', icon: path.join(__dirname, 'renderer', 'icon.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false },
  });
  win.maximize();
  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  core.init(app.getPath('userData'));
  createWindow();
  setInterval(() => { try { core.makeBackup(); } catch (e) {} }, 30 * 60 * 1000);
});
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.on('before-quit', () => { try { core.makeBackup(); } catch (e) {} });
app.on('window-all-closed', () => app.quit());
