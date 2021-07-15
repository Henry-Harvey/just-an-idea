import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopicView from './view';
import TopicToolbar from './TopicToolbar'

export default function Topic() {
  let topicId = useParams().topicId;

  const [state, setState] = useState({
    topicinfo: {
      topic: {
        id: -1,
        title: '',
        timestamp: '',
        ideas: []
      },
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
    }
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
            upvotes: topicResponse?.data.upvotes[i],
            title: topicResponse?.data.ideas[i].title,
            author: topicResponse?.data.authors[i],
            timestamp: topicResponse?.data.ideas[i].timestamp
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
                <TopicToolbar
                  selectedIdea={state.topicInfo?.ideas[selectedRows.data[0].index]}
                />
              )
            }
          }
        }
      }));
    }, 200);
  }, [topicId]);

  return (
    <React.Fragment>
      <TopicView
        state={state}
      />
    </React.Fragment>
  );
}