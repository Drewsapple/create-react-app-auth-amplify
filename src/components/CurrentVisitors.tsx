import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api'
import React, { useEffect, useState } from 'react'
import { createLoggedVisit, createSignedInUser, deleteSignedInUser } from '../graphql/mutations';
import { ListSignedInUsersQuery, SignedInUser } from '../API';
import { listSignedInUsers } from '../graphql/queries';
import moment from 'moment';

import { Button} from '@material-ui/core'
import ContactList from './ContactList';

export default function CurrentVisitors(props){
    const [currentSignins, setCurrentSignins] = useState<SignedInUser[]>([]);

    var tempContacts: string[] = []

    async function updateSignedInUsers() {
        let query = (await API.graphql(graphqlOperation(listSignedInUsers)) as GraphQLResult<ListSignedInUsersQuery>)
        setCurrentSignins(query.data?.listSignedInUsers?.items?.sort((a, b) => (Date.parse(b?.signin as string) - Date.parse(a?.signin as string)) ) as SignedInUser[])
    }

    useEffect(function(){updateSignedInUsers()}, [])

    async function signout(signin: SignedInUser) {
        await API.graphql(graphqlOperation(createLoggedVisit, {input: 
            { 
                user: signin.user, 
                signin: signin.signin, 
                signout: moment().format(), 
                location: signin.location, 
                contacts: tempContacts
            }
        }))
        await API.graphql(graphqlOperation(deleteSignedInUser, { input: { id: signin.id}}))
        updateSignedInUsers();
        if(props.onSignout) props.onSignout();
    }

    function getSelected(values) {
        tempContacts = values
    }

    return (
        <div style={{ textAlign: 'center', display: 'grid', justifyContent: 'center'}} >
            <h2>{currentSignins.length === 1 ? currentSignins.length + " guest" : currentSignins.length + " guests"} at the house</h2>
            {currentSignins.length > 9 ? 
            <h3>At capacity, please find someone to swap with</h3>
            :
            <div>
                <Button variant="contained" onClick={async () => 
                {
                    console.log(props.user)
                    await API.graphql(graphqlOperation(createSignedInUser, {input: 
                        { 
                            user: props.user.attributes.name, 
                            location: "8", 
                            signin: moment().format(), 
                            contacts: []
                        }
                    }))
                    updateSignedInUsers()
                }
                } > Check in </Button>
            </div>
            }
            <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Signed In</td>
                    <td>Contacts</td>
                    <td>Sign Out</td>
                </tr>
            </thead>
            <tbody>
            {
                (currentSignins as SignedInUser[]).map( ( signin ) => (
                    <tr key={signin.id}>
                        <td>{signin.user}</td> 
                        <td>{ moment(Date.parse(signin.signin as string)).fromNow()}</td>
                        <td><ContactList id={signin.id} onSelectedChange={getSelected} selected={signin.contacts} names={currentSignins.map((user) => user.user || "")}/></td>
                        <td><Button onClick={() => 
                            {
                                signout(signin)
                            }
                        }>Leave now</Button></td>
                    </tr>
                ))
            }
            </tbody>
            </table>
        </div>
    )
}
