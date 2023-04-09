import { ipcMain, shell } from 'electron'
import path from 'node:path'
import BaseApp from './BaseApp'
import { SerialCommunication } from './SerialCommunication'

process.env.DIST_ELECTRON = path.join(__dirname, '../')
process.env.DIST = path.join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? path.join(process.env.DIST_ELECTRON, '../public')
    : process.env.DIST

class App extends BaseApp {
    private serial: SerialCommunication

    protected async process() {
        this.serial = new SerialCommunication()

        ipcMain.on('monitor:connect', async (channel, data) => {
            if (this.serial.isOpen()) {
                this.serial.close(channel)
            }

            this.serial.open(
                {
                    port: data.port,
                    baudRate: data.baudRate,
                },
                channel
            )
        })

        ipcMain.on('monitor:disconnect', (channel) => this.serial.close(channel))

        ipcMain.on('monitor:refresh_ports', async (channel, data) => {
            if (!(await this.serial.freshPorts())) {
                channel.reply('monitor:ports', await this.serial.ports())
            }
        })

        ipcMain.on('monitor:refresh_baud_rates', async (channel, data) => {
            channel.reply('monitor:baud_rates', this.serial.baudRates())
        })
        ipcMain.on('app:minimize', (channel) => this.window.minimize())
        ipcMain.on('app:maximize', (channel) => {
            if (this.window.isMaximized()) {
                this.window.unmaximize()
            } else {
                this.window.maximize()
            }
        })
        ipcMain.on('app:close', (channel) => this.window.close())

        this.window.webContents.setWindowOpenHandler(({ url }) => {
            if (url.startsWith('https:')) shell.openExternal(url)
            return { action: 'deny' }
        })
        this.window.setBackgroundColor('rgba(0,0,0,0)')
    }
}

const application = new App(
    'Serial Monitor',
    path.join(process.env.PUBLIC, 'favicon.ico'),
    path.join(process.env.DIST, 'index.html'),
    path.join(__dirname, '../preload/index.js')
)

application.init()
