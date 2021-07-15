import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserIdeasView from './view';
import UserIdeasToolbar from './UserIdeasToolbar'

export default function UserIdeas({ userId, isUsersProfile }) {

  const [state, setState] = useState({
    ideasInfo: {
      ideas: []
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
        rowsPerPageOptions: [10],
        customToolbarSelect: null
      },
      columns:
        [
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
            name: 'timestamp',
            label: 'Created on'
          }
        ]
    }
  }
  );

  useEffect(() => {
    let ideasArray = [];

    console.log('Retrieve Idea Infos with users_id', userId);
    axios.post(`http://localhost:8080/content/ideas/info`,
      {
        users_id: userId
      }
    ).then((ideaResponse) => {
      console.log('Retrieve Idea Infos response', ideaResponse);
      if (ideaResponse?.data === '') {
        console.log('Idea Infos not found');
        return;
      }
      for (let i = 0; i < ideaResponse?.data.ideas.length; i++) {
        ideasArray.push(
          {
            id: ideaResponse?.data.ideas[i].id,
            topics_id: ideaResponse?.data.topics[i].id,
            upvotes: ideaResponse?.data.upvotes[i],
            title: ideaResponse?.data.ideas[i].title,
            topic: ideaResponse?.data.topics[i].title,
            timestamp: ideaResponse?.data.ideas[i].timestamp
          }
        );
      }
      setState(state => ({
        ...state,
        ideasInfo: {
          ideas: ideasArray
        }
      }));
    }).catch(error => {
      console.log('Retrieve Idea Infos error', error);
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
                <UserIdeasToolbar
                  selectedIdea={state.ideasInfo.ideas[selectedRows.data[0].index]}
                  isUsersProfile={isUsersProfile}
                />
              )
            }
          }
        }
      }));
    }, 200);
  }, [userId, isUsersProfile]);

  return (
    <React.Fragment>
      <UserIdeasView
        isUsersProfile={isUsersProfile}
        state={state}
      />
    </React.Fragment>
  );
}