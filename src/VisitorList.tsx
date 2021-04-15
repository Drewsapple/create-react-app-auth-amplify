import React from 'react'
import CurrentVisitor from './CurrentVisitor'

export default function VisitorList({visitors}){
    return (
        <>
        {visitors.toString()}
        {/* {(visitors as object[]).map( (visitor: any) => {
            return <CurrentVisitor visitor={visitor} />
        } )} */}
        </>
    )
}
