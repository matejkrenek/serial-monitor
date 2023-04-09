import React from 'react'
import ChartService from './Chart.service'

interface ChartProps {
    data: any
    className?: string
}

const Chart: React.FC<ChartProps> = ({ data, className }) => {
    const canvas = React.createRef<HTMLCanvasElement>()

    const processData = () => {
        let heads: any = []
        let seq: any = []

        data.forEach((chunk: any) => {
            let parsed = chunk.data.split(',')
            const head = parsed[0]
            parsed.shift()

            if (!heads.find((_head: any) => _head === head)) {
                heads.push(head)
                seq[heads.length - 1] = parsed.map((elm: string) => parseInt(elm))
            } else {
                seq[heads.indexOf(head)] = [
                    ...seq[heads.indexOf(head)],
                    ...parsed.map((elm: string) => parseInt(elm)),
                ]
            }
        })

        return [heads, seq]
    }

    React.useEffect(() => {
        const [heads, seq] = processData()

        const chart = new ChartService(canvas.current as HTMLCanvasElement, heads, seq)

        chart.render()
    }, [canvas])

    return <canvas ref={canvas} className="mx-auto"></canvas>
}

export default React.memo(Chart)
