import React from 'react'

interface TableProps {
    head: string[]
    rows: string[][]
    className?: string
}

const Table: React.FC<TableProps> = ({ head = [], rows = [], className }) => {
    return (
        <table className={`${className}`}>
            <thead className="border-b-2 border-teal-500 text-teal-500 text-sm">
                <tr>
                    {head.map((record, index) => (
                        <th className="text-start py-2 px-2">{record}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
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
    )
}

export default Table
