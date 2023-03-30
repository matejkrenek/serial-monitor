const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('monitor', {
    ports: () => ipcRenderer.invoke('monitor:get_ports'),
    onUpdatePorts: (callback) => ipcRenderer.on('monitor:update_ports', callback),
})
