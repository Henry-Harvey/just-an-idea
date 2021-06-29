import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SearchView from './view';
import ViewToolbarIcon from './ViewToolbarIcon'

export default function Search() {
  let searchString = useParams().searchString;

  const [state, setState] = useState({
    results: [
      /*
      {
        type: null,
        id: -1,
        name: null
      }
      */
      // {
      //   type: 'Judge',
      //   id: -1,
      //   name: 'Joe'
      // },
      // {
      //   type: 'Cop',
      //   id: -1,
      //   name: 'Chris'
      // },
      // {
      //   type: 'Shoe',
      //   id: -1,
      //   name: 'Dan'
      // }
    ],
    table: {
      options:
      {
        print: false,
        download: false,
        pagination: false,
        viewColumns: false,
        selectableRows: 'single',
        customToolbarSelect: null
      },
      columns:
        [
          {
            name: 'type',
            label: 'Type'
          },
          {
            name: 'name',
            label: 'Name'
          }
        ]
    }
  }
  );

  useEffect(() => {
    var resultsArray = [];
    console.log('Search Ideas for title:', searchString)
    axios.post(`http://localhost:8080/content/ideas`,
      {
        title: searchString
      }
    ).then((ideasResponse) => {
      console.log('Search Ideas response', ideasResponse)
      if (ideasResponse?.status !== 200) {
        alert('Search Ideas failed')
      }
      else {
        ideasResponse.data.map(idea => (
          resultsArray.push(
            {
              type: 'Idea',
              id: idea.id,
              name: idea.title
            }
          )
        ));
      }
    });
    console.log('Search Topics for title', searchString)
    axios.post(`http://localhost:8080/content/topics`,
      {
        title: searchString
      }
    ).then((topicsResponse) => {
      console.log('Search Topics response', topicsResponse)
      if (topicsResponse?.status !== 200) {
        alert('Search Topics failed')
      }
      else {
        topicsResponse.data.map(topic => (
          resultsArray.push(
            {
              type: 'Topic',
              id: topic.id,
              name: topic.title
            }
          )
        ));
      }
    });
    console.log('Search Credentials for username', searchString)
    axios.post(`http://localhost:8080/account/credentials`,
      {
        username: searchString
      }
    ).then((credentialsResponse) => {
      console.log('Search Credentials response', credentialsResponse)
      if (credentialsResponse?.status !== 200) {
        alert('Search Credentials failed')
      }
      else {
        console.log('Retrieve User', credentialsResponse)
        credentialsResponse.data.map(credentials => (
          axios.get(`http://localhost:8080/account/user/${credentials.users_id}`
          ).then((usersResponse) => {
            console.log('Retrieve User response', usersResponse)
            if (usersResponse?.status !== 200) {
              alert('Retrieve User failed')
            }
            else {
              resultsArray.push(
                {
                  type: 'User',
                  id: usersResponse.data.id,
                  name: usersResponse.data.firstName + ' ' + usersResponse.data.lastName
                }
              )
            }
          })
        ));
        setState(state => ({
          ...state,
          results: resultsArray
        }));
      }
    });
    setState(state => ({
      ...state,
      table: {
        ...state.table,
        options: {
          ...state.table.options,
          customToolbarSelect: (selectedRows) => {
            return (
              <ViewToolbarIcon
                selectedResult={resultsArray[selectedRows.data[0].index]}
              />
            )
          }
        }
      }
    }));
  }, [searchString]);

  return (
    <React.Fragment>
      < SearchView
        searchString={searchString}
        state={state}
      />
    </React.Fragment>
  );
}