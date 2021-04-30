import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api'
import React, { useState } from 'react'
import { deleteSignedInUser } from '../graphql/mutations';
import { ListSignedInUsersQuery, ModelSortDirection, SignedInUser } from '../API';
import { signedInUserByArrival } from '../graphql/queries';
import moment from 'moment';

import { Button } from '@material-ui/core'

export default function VisitorList(props){
    const [currentSignins, setCurrentSignins] = useState<SignedInUser[]>([]);

    async function updateSignedInUsers() {
        let query = (await API.graphql(graphqlOperation(signedInUserByArrival, {sortDirection: ModelSortDirection.DESC})) as GraphQLResult<ListSignedInUsersQuery>)
        setCurrentSignins(query.data?.listSignedInUsers?.items as SignedInUser[])
    }
    updateSignedInUsers()

    async function signout(id: string) {
        await API.graphql(graphqlOperation(deleteSignedInUser, { input: { id: id}}))
        console.log("deleted user " + id)
        updateSignedInUsers();
    }

    return (
        <div>
            <table>
            <tbody>
            {
                (currentSignins as SignedInUser[]).map( ( signin ) => (
                    <tr key={signin.id}>
                        <td>{signin.name}</td> 
                        <td>{ moment(Date.parse(signin.signin as string)).fromNow()}</td> 
                        <td><Button onClick={() => {signout(signin.id as string)}} >Delet </Button> </td>
                    </tr>
                ))
            }
            </tbody>
            </table>
        </div>
    )
}
