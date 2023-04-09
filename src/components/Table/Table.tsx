import React from 'react'

interface TableProps {
    data: any
    className?: string
}

const Table: React.FC<TableProps> = ({ data, className }) => {
    const [heads, setHeads] = React.useState([])
    const [rows, setRows] = React.useState([])

    const processData = () => {
        let heads: any = []
        let seq: any = []

        data.forEach((chunk: any, index: number) => {
            if (index === 0) {
                heads = chunk.data.split(',')
            } else {
                seq.push(chunk.data.split(','))
            }
        })

        setHeads(heads)
        setRows(seq)
    }

    React.useEffect(() => {
        processData()
    }, [data])

    return (
        <div className={`${className}`}>
            <div className="text-base whitespace-nowrap h-full">
                <table className="w-full h-full">
                    <thead className="sticky top-0 text-teal-500 text-sm">
                        <tr>
                            {heads.map((record: string, index: number) => (
                                <th key={index}>
                                    <div className="text-start py-2 px-2 border-b-2 border-teal-500 bg-white">
                                        {record}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row: [], index: number) => (
                            <tr key={index} className="text-sm">
                                {row.map((record, index) => (
                                    <td key={index} className="py-2 px-2">
                                        {record}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
