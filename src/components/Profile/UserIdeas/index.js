import React, { useState, useEffect } from 'react';
import history from '../../../utils/history'
import axios from 'axios';
import UserIdeasView from './view';

export default function UserIdeas({ currentUser, setCurrentUser }) {

  const [state, setState] = useState({
    ideas: [
      /*
      {
        id: -1,
        users_id: currentUser.user_id,
        topics_id: -1,
        title: '',
        description: '',
        upvotes: 0,
        timestamp: null
      }
      */
    ],
    table: {
      options:
      {
        print: false,
        download: false,
        rowsPerPage: 10,
        rowsPerPageOptions: [10],
        onRowsDelete: null
      },
      columns:
        [
          /*
          {
            name: 'topic title',
            label: 'Topic'
          },
          */
          {
            name: 'title',
            label: 'Title'
          },
          {
            name: 'description',
            label: 'Description'
          },
          {
            name: 'upvotes',
            label: 'Upvotes'
          },
          {
            name: 'timestamp',
            label: 'Created on'
          }
        ]
    }
  }
  );

  useEffect(() => {
    console.log('Retrieve Users Ideas', currentUser.user_id)
    axios.post(`http://localhost:8080/content/ideas`,
      {
        users_id: currentUser.user_id
      }
    ).then((response) => {
      console.log('Retrieve Users Ideas response', response)
      if (response?.status !== 200) {
        alert('Retrieve Users Ideas failed')
      }
      else {
        setState(state => ({
          ...state,
          ideas: response.data
        }));
        setState(state => ({
          ...state,
          table: {
            ...state.table,
            options: {
              ...state.table.options,
              onRowsDelete: (rowsDeleted) => {
                handleDelete(rowsDeleted.data.map(dataItem => state.ideas[dataItem.dataIndex]));
              }
            }
          }
        }));
      }
    });
  }, [currentUser]);

  const handleDelete = (ideasToDelete) => {
    console.log('Delete Idea', ideasToDelete)
    ideasToDelete.forEach(idea => {
      console.log('Delete Idea', idea.id)
      axios.delete(`http://localhost:8080/content/idea/${idea.id}`)
        .then((response) => {
          console.log('Delete response', response)
          if (response?.status !== 200) {
            alert('Delete Error')
          }
        });
    });
  }

  const handleNavigateToPost = () => {
    history.push(`/post`)
  }

  return (
    <React.Fragment>
      <UserIdeasView
        state={state}
        handleNavigateToPost={handleNavigateToPost}
      />
    </React.Fragment>
  );
}