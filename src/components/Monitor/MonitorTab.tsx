import React from 'react'
import { SerialMonitorTab } from '@/types'
import Chart from '../Chart/Chart'
import Table from '../Table/Table'
import EmptyState from '../EmptyState/EmptyState'
import { FiMonitor, FiBarChart, FiList } from 'react-icons/fi'

interface MonitorTabProps {
    tab: SerialMonitorTab
}

const MonitorTab: React.FC<MonitorTabProps> = ({ tab }) => {
    switch (tab.type) {
        case 'chart':
            return (
                <>
                    {!tab.data.length && (
                        <EmptyState icon={FiBarChart} message="No data in chart" />
                    )}
                    {tab.data.length > 0 && <Chart data={tab.data} className="p-5" />}
                </>
            )
        case 'table':
            return (
                <>
                    {!tab.data.length && <EmptyState icon={FiList} message="No data in table" />}
                    {tab.data.length > 0 && <Table className="p-5" data={tab.data} />}
                </>
            )
        default:
            return (
                <div className={`p-5 ${!tab.data.length ? 'h-full' : ''}`}>
                    <div className="text-base whitespace-nowrap h-full">
                        {!tab.data.length && (
                            <EmptyState icon={FiMonitor} message="No data in monitor" />
                        )}
                        {tab.data.map(
                            (buffer: { timestamp: string; data: string }, index: number) => (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: buffer.data
                                            .replace('\n', '<br/>')
                                            .replace('\r', '<br/>')
                                            .replace('\t', '&nbsp;&nbsp;&nbsp;&nbsp;'),
                                    }}
                                    key={index}
                                ></span>
                            )
                        )}
                    </div>
                </div>
            )
    }
}

export default MonitorTab
