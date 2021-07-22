import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopicView from './view';
import TopicSelectToolbar from './TopicSelectToolbar'
import TopicToolbar from './TopicToolbar'

export default function Topic({ currentUser }) {
  let topicId = useParams().topicId;

  const [state, setState] = useState({
    topicInfo: {
      topic: {
        id: -1,
        title: '',
        timestamp: '',
        ideas: []
      },
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
        sortOrder: {
          name: 'upvotes',
          direction: 'desc'
        },
        rowsPerPageOptions: [15],
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
            name: 'author',
            label: 'Author'
          },
          {
            name: 'timestamp',
            label: 'Created on'
          }
        ]
    },
    isPinned: false
  });

  useEffect(() => {
    let ideaArray = [];
    console.log('Retrieve Topic Info with id', topicId);
    axios.get(`http://localhost:8080/content/topic/${topicId}/info`
    ).then((topicResponse) => {
      console.log('Retrieve Topic Info response', topicResponse);
      if (topicResponse?.data === '') {
        console.log('Topic Info not found');
        return;
      }
      for (let i = 0; i < topicResponse?.data.ideas.length; i++) {
        ideaArray.push(
          {
            id: topicResponse?.data.ideas[i].id,
            users_id: topicResponse?.data.ideas[i].users_id,
            upvotes: topicResponse?.data.upvotes[i],
            title: topicResponse?.data.ideas[i].title,
            author: topicResponse?.data.authors[i],
            timestamp: topicResponse?.data.ideas[i].timestamp,
          }
        );
      }
      setState(state => ({
        ...state,
        topicInfo: {
          topic: topicResponse?.data.topic,
          ideas: ideaArray
        }
      }));
      console.log('Retrieve Pin with users_id & topics_id', currentUser.user_id, topicResponse?.data.topic.id);
        axios.post(`http://localhost:8080/content/pin/`,
          {
              users_id: currentUser.user_id,
              topics_id: topicResponse?.data.topic.id
          }
        ).then((pinResponse) => {
          console.log('Retrieve Pin response', pinResponse);
          if (pinResponse?.data === '') {
            console.log('Pin not found');
            return;
          }
          setState(state => ({
            ...state,
            isPinned: true
          }));
        }).catch(error => {
          console.log('Retrieve Pin error', error);
        });
    }).catch(error => {
      console.log('Retrieve Topic Info error', error);
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
                <TopicSelectToolbar
                  selectedIdea={state.topicInfo?.ideas[selectedRows.data[0].dataIndex]}
                />
              )
            },
            customToolbar: () => {
              return (
                <TopicToolbar
                  currentUser={currentUser}
                  state={state}
                  setState={setState}
                />
              )
            }
          }
        }
      }));
    }, 200);
  }, [currentUser, topicId]);

  return (
    <React.Fragment>
      <TopicView
        state={state}
      />
    </React.Fragment>
  );
}