import path from 'node:path'
import BaseApp from './BaseApp'
import { SerialCommunication } from './SerialCommunication'
import { ipcMain } from 'electron'

class App extends BaseApp {
    private serial: SerialCommunication

    protected async process() {
        this.serial = new SerialCommunication()

        ipcMain.on('monitor:connect', async (channel, data) => {
            this.serial.open(
                {
                    port: data.port,
                    baudRate: parseInt(data.baudrate),
                },
                channel
            )
        })

        ipcMain.on('monitor:disconnect', async (channel, data) => {
            channel.reply('monitor:ports', await this.serial.ports())
        })

        ipcMain.on('monitor:refresh_ports', async (channel, data) => {
            channel.reply('monitor:ports', await this.serial.ports())
        })

        ipcMain.on('monitor:refresh_baud_rates', async (channel, data) => {
            channel.reply('monitor:baud_rates', this.serial.baudRates())
        })
    }
}

const application = new App(
    'Serial Monitor',
    path.join(process.env.PUBLIC, 'favicon.ico'),
    path.join(process.env.DIST, 'index.html'),
    path.join(__dirname, '../preload/index.js')
)

application.init()
