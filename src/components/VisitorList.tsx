import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api'
import React, { useEffect, useState } from 'react'
import { createLoggedVisit, deleteSignedInUser } from '../graphql/mutations';
import { ListSignedInUsersQuery, SignedInUser } from '../API';
import { listSignedInUsers } from '../graphql/queries';
import moment from 'moment';

import { Button } from '@material-ui/core'

export default function VisitorList(props){
    const [currentSignins, setCurrentSignins] = useState<SignedInUser[]>([]);

    async function updateSignedInUsers() {
        let query = (await API.graphql(graphqlOperation(listSignedInUsers)) as GraphQLResult<ListSignedInUsersQuery>)
        //console.log(query)
        setCurrentSignins(query.data?.listSignedInUsers?.items?.sort((a, b) => (Date.parse(b?.signin as string) - Date.parse(a?.signin as string)) ) as SignedInUser[])
    }

    useEffect(function(){updateSignedInUsers()}, [])

    async function signout(signin: SignedInUser) {
        //await API.graphql(graphqlOperation(createLoggedVisit, {input: { user: signin.user, signin: signin.signin, signout: moment().format(), location: signin.location, contacts: ["test"]}}))
        await API.graphql(graphqlOperation(deleteSignedInUser, { input: { id: signin.id}}))
        updateSignedInUsers();
    }

    return (
        <div>
            <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Signed In</td>
                    <td>Sign Out</td>
                </tr>
            </thead>
            <tbody>
            {
                (currentSignins as SignedInUser[]).map( ( signin ) => (
                    <tr key={signin.id}>
                        <td>{signin.user}</td> 
                        <td>{ moment(Date.parse(signin.signin as string)).fromNow()}</td> 
                        <td><Button onClick={() => {signout(signin)}} >Leave now</Button> </td>
                    </tr>
                ))
            }
            </tbody>
            </table>
        </div>
    )
}
