const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        send: (channel, data) => {
            const validChannels = ['get-all-employees', 'add-employee', 'update-employee', 'delete-employee'];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        on: (channel, func) => {
            const validChannels = ['get-all-employees-response', 'add-employee-response', 'update-employee-response', 'delete-employee-response'];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
});
