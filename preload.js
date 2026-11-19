const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api', { call: (fn, ...args) => ipcRenderer.invoke('call', fn, args) });
