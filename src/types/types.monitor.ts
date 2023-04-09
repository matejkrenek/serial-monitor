export type SerialMonitorTabType = 'monitor' | 'chart' | 'table'

export interface SerialMonitorTab {
    id: number
    name: string
    type: SerialMonitorTabType
    canBeDeleted: boolean
    data: any
}
