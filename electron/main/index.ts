import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { SerialPort } from 'serialport'

process.env.DIST_ELECTRON = path.join(__dirname, '../')
process.env.DIST = path.join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? path.join(process.env.DIST_ELECTRON, '../public')
    : process.env.DIST

let prev_ports = []
let ports = []

class App {
    private window: BrowserWindow
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
            webPreferences: {
                preload: this.preload,
                nodeIntegration: true,
                contextIsolation: true,
            },
        })

        setInterval(async () => {
            ports = await SerialPort.list()

            if (prev_ports.length !== ports.length) {
                this.window.webContents.send('monitor:update_ports', ports)
            }

            prev_ports = ports
        }, 1000)

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
    }

    private onActive() {
        if (!this.window) this.createWindow()
    }

    private onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    }
}

const application = new App(
    'Serial Monitor',
    path.join(process.env.PUBLIC, 'favicon.ico'),
    path.join(process.env.DIST, 'index.html'),
    path.join(__dirname, '../preload/index.js')
)

application.init()
