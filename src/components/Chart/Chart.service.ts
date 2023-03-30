export default class ChartService {
    private ctx: CanvasRenderingContext2D
    private readonly colors = ['#f44', '#0a0', '#48f', '#ee0', '#0bb', '#c0c']

    constructor(
        private canvas: HTMLCanvasElement,
        private head: string[],
        private data: number[][]
    ) {
        this.canvas = canvas
        this.canvas.width = this.canvas.parentElement?.clientWidth || window.innerWidth
        this.canvas.height = this.canvas.parentElement?.clientHeight || window.innerHeight
        this.ctx = this.canvas?.getContext('2d') as CanvasRenderingContext2D
    }

    public clear() {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    public render() {
        window.requestAnimationFrame(() => {
            this.clear()
            this.renderAxis()
            this.renderData()
        })
    }

    private renderAxis() {
        const padding = 26
        const top = padding + 5
        let left = padding + 5

        this.ctx.textAlign = 'left'
        this.ctx.textBaseline = 'middle'
        this.ctx.font = '16px Roboto'

        this.head.forEach((x, i) => {
            this.ctx.beginPath()
            this.ctx.fillStyle = this.colors[i - 1]
            this.ctx.arc(left, top, 5, 0, 2 * Math.PI)
            this.ctx.fill()

            this.ctx.fillStyle = '#000'
            const size = this.ctx.measureText(x)
            this.ctx.fillText(x, left + 10, top + 1)

            left += size.width + 26 + 5
        })

        this.ctx.lineWidth = 1.5
        this.ctx.strokeStyle = '#000'
        this.ctx.beginPath()
        this.ctx.moveTo(padding - 0.5, 2 * padding - 0.5)
        this.ctx.lineTo(padding - 0.5, this.canvas.height - padding + 0.5)
        this.ctx.lineTo(this.canvas.width - padding + 0.5, this.canvas.height - padding + 0.5)
        this.ctx.stroke()
    }

    private renderData() {
        const padding = 26
        const step = this.getStepValue()
        const max = this.getMaxValue()
        const min = this.getMinValue()
        const range = max - min
        const height = this.canvas.height - 3 * padding

        this.ctx.lineWidth = 2
        this.ctx.lineCap = 'round'

        let previous: number[] = []

        for (let i = 0; i < this.data.length; i++) {
            const values = this.data[i]

            if (i > 0) {
                values.forEach((v, j) => {
                    const h1 = (height / range) * (previous[j] - min)
                    const x1 = padding + (i - 1) * step
                    const y1 = this.canvas.height - padding - h1

                    const h2 = (height / range) * (v - min)
                    const x2 = padding + i * step
                    const y2 = this.canvas.height - padding - h2

                    this.ctx.strokeStyle = this.colors[j - 1]
                    this.ctx.beginPath()
                    this.ctx.moveTo(x1, y1)
                    this.ctx.lineTo(x2, y2)
                    this.ctx.stroke()
                })
            }

            previous = values
        }
    }

    private getStepValue() {
        return Math.min(20, (this.canvas.width - 2 * 26) / this.data.length)
    }

    private getFlattenData(): number[] {
        let data: number[] = []

        this.data.forEach((value) => data.push(...value))

        return data
    }

    private getMaxValue() {
        return Math.max(...this.getFlattenData())
    }

    private getMinValue() {
        return Math.min(...this.getFlattenData())
    }
}
