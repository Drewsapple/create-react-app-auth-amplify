import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { deleteSignedInUser } from '../graphql/mutations';
import { SignedInUser } from '../API';

export default function VisitorList(props){
    const [currentSignins, setCurrentSignins] = useState([]);
    
    useEffect( () => {
        async function getVisitors() {
            console.log(await props.visitors)
            setCurrentSignins(await props.visitors)
        }
        getVisitors()
    }, [props])

    async function signout(id: string) {
        await API.graphql(graphqlOperation(deleteSignedInUser, { input: { id: id}}))
        console.log("deleted user " + id)
    }

    return (
        <div>
            {
                (currentSignins as SignedInUser[]).map( ( signin ) => (
                    <div>
                        <span>{signin.name} {signin.signin}</span> <button onClick={() => {signout(signin.id as string) }} >Delet </button>
                    </div>
                ))
            }
        </div>
    )
}
