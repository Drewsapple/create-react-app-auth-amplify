import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api'
import React, { useEffect, useState } from 'react'
import { ListLoggedVisitsQuery } from '../API';
import { listLoggedVisits } from '../graphql/queries';
import moment from 'moment';

import ContactList from './ContactList';
import { LoggedVisit } from '../models';

export default function CurrentVisitors(props){
    const [currentSignins, setCurrentSignins] = useState<LoggedVisit[]>([]);

    async function updateLoggedUsers() {
        let query = (await API.graphql(graphqlOperation(listLoggedVisits)) as GraphQLResult<ListLoggedVisitsQuery>)
        setCurrentSignins(query.data?.listLoggedVisits?.items?.sort((a, b) => (Date.parse(b?.signout as string) - Date.parse(a?.signout as string)) ) as LoggedVisit[])
    }

    useEffect(function(){updateLoggedUsers()}, [])

    return (
    <div style={{ textAlign: 'center', display: 'grid', justifyContent: 'center'}}>
        <h2>History of Visitors</h2>
    <table>
        <thead>
            <tr>
                <td>Name</td>
                <td>Signed In</td>
                <td>Signed Out</td>
            </tr>
        </thead>
        <tbody>
        {
            (currentSignins as LoggedVisit[]).map( ( signin ) => (
                <tr key={signin.id}>
                    <td>{signin.user}</td> 
                    <td>{ moment(Date.parse(signin.signin as string)).fromNow()}</td>
                    <td>{ moment(Date.parse(signin.signout as string)).fromNow()}</td>
                    <td><ContactList 
                    onSelectedChange={function(){}} 
                    selected={signin.contacts} 
                    names={signin.contacts}/></td>
                </tr>
            ))
        }
        </tbody>
        </table>
    </div>
    )
}
