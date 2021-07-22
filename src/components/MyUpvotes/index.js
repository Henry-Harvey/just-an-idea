import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyUpvotesView from './view';
import MyUpvotesSelectToolbar from './MyUpvotesSelectToolbar'

export default function MyUpvotes({ currentUser }) {
  const [state, setState] = useState({
    upvotesInfo: {
      upvotes: []
    },
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
        customToolbarSelect: null
      },
      columns:
        [
          {
            options: { sortDirection: 'desc' },
            name: 'timestamp',
            label: 'Upvoted on'
          },
          {
            name: 'upvotes',
            label: 'Upvotes'
          },
          {
            name: 'title',
            label: 'Title'
          },
          {
            name: 'topic',
            label: 'Topic'
          },
          {
            name: 'author',
            label: 'Author'
          }
        ]
    }
  });

  useEffect(() => {
    let upvotesArray = [];
    console.log('Retrieve Upvotes Info with users_id', currentUser.user_id);
    axios.post(`http://localhost:8080/content/upvotes/info`,
      {
        upvotes_id: {
          users_id: currentUser.user_id
        }
      }
    ).then((upvoteResponse) => {
      console.log('Retrieve Upvote Info response', upvoteResponse);
      if (upvoteResponse?.data === '') {
        console.log('Upvote Info not found');
        return;
      }
      for (let i = 0; i < upvoteResponse?.data.upvotes.length; i++) {
        upvotesArray.push(
          {
            id: upvoteResponse?.data.ideas[i].id,
            topics_id: upvoteResponse?.data.ideas[i].topics_id,
            users_id: upvoteResponse?.data.ideas[i].users_id,
            timestamp: upvoteResponse?.data.upvotes[i].timestamp,
            upvotes: upvoteResponse?.data.numUpvotes[i],
            title: upvoteResponse?.data.ideas[i].title,
            topic: upvoteResponse?.data.topics[i].title,
            author: upvoteResponse?.data.authors[i]
          }
        );
      }
      setState(state => ({
        ...state,
        upvotesInfo: {
          upvotes: upvotesArray
        }
      }));
    }).catch(error => {
      console.log('Retrieve Upvote Info error', error);
    });

    setTimeout(() => {
      setState(state => ({
        ...state,
        table: {
          ...state.table,
          options: {
            ...state.table.options,
            customToolbarSelect: (selectedRows) => {
              return (
                <MyUpvotesSelectToolbar
                  selectedIdea={state.upvotesInfo?.upvotes[selectedRows.data[0].dataIndex]}
                  currentUser={currentUser}
                />
              )
            }
          }
        }
      }));
    }, 200);
  }, [currentUser]);

  return (
    <React.Fragment>
      <MyUpvotesView
        state={state}
      />
    </React.Fragment>
  );
}