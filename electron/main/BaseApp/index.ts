import { app, BrowserWindow } from 'electron'

export default class BaseApp {
    protected window: BrowserWindow
    private title: string
    private icon: string
    private index: string
    private preload: string

    constructor(title: string, icon: string, index: string, preload: string) {
        this.title = title
        this.icon = icon
        this.index = index
        this.preload = preload
    }

    public init() {
        app.on('ready', () => this.createWindow())
        app.on('window-all-closed', () => this.onWindowAllClosed())
        app.on('activate', () => this.onActive())
    }

    private createWindow() {
        this.window = new BrowserWindow({
            title: this.title,
            icon: this.icon,
            width: 900,
            height: 600,
            minWidth: 700,
            minHeight: 400,
            titleBarStyle: 'hidden',
            webPreferences: {
                preload: this.preload,
                nodeIntegration: true,
                contextIsolation: true,
                devTools: process.env.VITE_DEV_SERVER_URL && true,
            },
        })

        if (process.env.VITE_DEV_SERVER_URL) {
            this.window.loadURL(process.env.VITE_DEV_SERVER_URL)
            this.window.webContents.openDevTools()
        } else {
            this.window.loadFile(this.index)
        }

        this.window.webContents.on('did-finish-load', () => {
            this.window?.webContents.send('main-process-message', new Date().toLocaleString())
        })

        this.window.setMenu(null)

        this.process()
    }

    protected process() {}

    private onActive() {
        if (!this.window) this.createWindow()
    }

    private onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    }
}
