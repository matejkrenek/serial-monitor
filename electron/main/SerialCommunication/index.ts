import { SerialPort } from 'serialport'
import { config } from './config'
import { SerialPortData } from './types/SerialPortData'
import { IpcMainEvent } from 'electron'

export class SerialCommunication {
    private port: SerialPort
    private prevPorts: any[] = []

    public async ports() {
        this.prevPorts = await SerialPort.list()

        return this.prevPorts
    }

    public baudRates() {
        return config.baudRates
    }

    public async freshPorts() {
        return (await SerialPort.list()).length === this.prevPorts.length
    }

    public open(data: SerialPortData, channel: IpcMainEvent) {
        this.port = new SerialPort({
            path: data.port,
            baudRate: data.baudRate,
        })

        this.port.on('open', function (err) {
            if (err) channel.reply('monitor:error', err.message)

            channel.reply('monitor:open', true)
        })

        this.port.on('close', function (err) {
            if (err) channel.reply('monitor:error', err.message)

            channel.reply('monitor:close', true)
        })

        this.port.on('data', function (chunk) {
            const outpuData = {
                timestamp: new Date().toISOString(),
                data: chunk.toString('utf8'),
            }

            try {
                channel.reply('monitor:data', outpuData)
            } catch (err) {
                channel.reply('monitor:error', err.message)
            }
        })

        this.port.on('error', function (err) {
            channel.reply('monitor:error', err.message)
        })
    }

    public async close(channel: IpcMainEvent) {
        if (this.port && this.port.isOpen) {
            this.port.close((err) => {
                if (err) channel.reply('monitor:error', err.message)
            })
        }
    }

    public isOpen(): boolean {
        return this.port && this.port.isOpen
    }
}
