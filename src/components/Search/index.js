import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SearchView from './view';
import SearchToolbar from './SearchToolbar'

export default function Search() {
  let searchString = useParams().searchString;

  const [state, setState] = useState({
    results: [],
    table: {
      options:
      {
        print: false,
        download: false,
        viewColumns: false,
        selectableRows: 'single',
        selectableRowsOnClick: true,
        selectableRowsHideCheckboxes: true,
        rowsPerPageOptions: [15],
        customToolbarSelect: null,
        pagination: false
      },
      columns:
        [
          {
            name: 'id',
            label: 'ID'
          },
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
    setState(state => ({
      ...state,
      results: []
    }));
    var resultsArray = [];
    console.log('Search Ideas with title:', searchString);
    axios.post(`http://localhost:8080/content/search/ideas`,
      {
        title: searchString
      }
    ).then((ideasResponse) => {
      console.log('Search Ideas response', ideasResponse);
      if (ideasResponse?.data === '') {
        console.log('Ideas not found');
        return;
      }
      ideasResponse.data.map(idea => (
        resultsArray.push(
          {
            type: 'Idea',
            id: idea.id,
            name: idea.title
          }
        )
      ));
    }).catch(error => {
      console.log('Search Idea error', error);
    });

    console.log('Search Topics with title', searchString);
    axios.post(`http://localhost:8080/content/search/topics`,
      {
        title: searchString
      }
    ).then((topicsResponse) => {
      console.log('Search Topics response', topicsResponse);
      if (topicsResponse?.data === '') {
        console.log('Topics not found');
        return;
      }
      topicsResponse.data.map(topic => (
        resultsArray.push(
          {
            type: 'Topic',
            id: topic.id,
            name: topic.title
          }
        )
      ));
    }).catch(error => {
      console.log('Search Topics error', error);
    });

    console.log('Search Credentials with username', searchString);
    axios.post(`http://localhost:8080/account/search/credentials`,
      {
        username: searchString
      }
    ).then((credentialsResponse) => {
      console.log('Search Credentials response', credentialsResponse);
      if (credentialsResponse?.data === '') {
        console.log('Credentials not found');
        return;
      }
      else {
        credentialsResponse.data.map(credentials => (
          resultsArray.push(
            {
              type: 'User',
              id: credentials.users_id,
              name: credentials.username
            }
          )
        ));
      }
    }).catch(error => {
      console.log('Search Credentials error', error);
    });

    setTimeout(() => {
      setState(state => ({
        ...state,
        results: resultsArray
      }));

      setState(state => ({
        ...state,
        table: {
          ...state.table,
          options: {
            ...state.table.options,
            customToolbarSelect: (selectedRows) => {
              return (
                <SearchToolbar
                  selectedResult={resultsArray[selectedRows.data[0].index]}
                />
              )
            }
          }
        }
      }));
    }, 50);
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