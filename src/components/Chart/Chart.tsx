import React from 'react'
import ChartService from './Chart.service'

interface ChartProps {
    head: string[]
    data: number[][]
}

const Chart: React.FC<ChartProps> = ({ head, data }) => {
    const canvas = React.createRef<HTMLCanvasElement>()

    React.useEffect(() => {
        const chart = new ChartService(canvas.current as HTMLCanvasElement, head, data)

        chart.render()
    }, [canvas])

    return <canvas ref={canvas}></canvas>
}

export default Chart
