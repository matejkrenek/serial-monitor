import { SerialPort } from 'serialport'
import { config } from './config'
import { SerialPortData } from './types/SerialPortData'
import { IpcMainEvent } from 'electron'

export class SerialCommunication {
    private port: SerialPort

    public async ports() {
        return await SerialPort.list()
    }

    public baudRates() {
        return config.baudRates
    }

    public open(data: SerialPortData, channel: IpcMainEvent) {
        this.port = new SerialPort({
            path: data.port,
            baudRate: data.baudRate,
        })

        // Open errors will be emitted as an error event
        this.port.on('error', function (err) {
            channel.reply('monitor:error', err)
        })
    }
}
