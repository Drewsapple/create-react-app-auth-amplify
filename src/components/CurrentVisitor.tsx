import React from 'react'

interface CurrentVisitor {
    id: number;
    name: string;
    timeIn: string;
}

export default function CurrentVisitor({visitor}) {
    return (
        <div>
            {visitor.name} {visitor.signin}
        </div>
    )
}
