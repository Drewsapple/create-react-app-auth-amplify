import React, { useEffect, useState } from 'react'
import CurrentVisitor from './CurrentVisitor'

export default function VisitorList(props){
    const [currentSignins, setCurrentSignins] = useState([]);
    
    useEffect( () => {
        async function getVisitors() {
            console.log(await props.visitors)
            setCurrentSignins(await props.visitors)
        }
        getVisitors()
    }, [props])

    return (
        <div>
            {
                currentSignins?.map( (signin) => <CurrentVisitor visitor={signin} />)
            }
        </div>
    )
}
