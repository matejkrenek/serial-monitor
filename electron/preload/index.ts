const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('monitor', {
    connect: (data) => ipcRenderer.send('monitor:connect', data),
    disconnect: (data) => ipcRenderer.send('monitor:disconnect', data),
    refreshPorts: () => ipcRenderer.send('monitor:refresh_ports'),
    refreshBaudRates: () => ipcRenderer.send('monitor:refresh_baud_rates'),
    onPorts: (callback) => ipcRenderer.on('monitor:ports', callback),
    onBaudRates: (callback) => ipcRenderer.on('monitor:baud_rates', callback),
    onError: (callback) => ipcRenderer.on('monitor:error', callback),
    onOpen: (callback) => ipcRenderer.on('monitor:open', callback),
    onClose: (callback) => ipcRenderer.on('monitor:close', callback),
    onData: (callback) => ipcRenderer.on('monitor:data', callback),
})

contextBridge.exposeInMainWorld('app', {
    minimize: () => ipcRenderer.send('app:minimize'),
    maximize: () => ipcRenderer.send('app:maximize'),
    close: () => ipcRenderer.send('app:close'),
})
