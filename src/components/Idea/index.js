import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import IdeaView from './view';

export default function Idea() {
  let ideaId = useParams().ideaId;

  const [state, setState] = useState({
    idea: {
      id: -1,
      users_id: -1,
      topics_id: -1,
      title: '',
      description: '',
      upvotes: -1,
      timestamp: null
    },
    topic: {
      id: -1,
      title: '',
      timestamp: null
    },
    user: {
      id: -1,
      firstName: '',
      lastName: '',
    }
  });

  useEffect(() => {
    console.log('Get Idea with ID', ideaId)
    axios.get(`http://localhost:8080/content/idea/${ideaId}`)
      .then((response) => {
        console.log('Get Idea response', response)
        if (response?.status !== 200) {
          console.log('Error Getting Idea');
        }
        if (response?.data === '') {
          console.log('No Idea Found');
        }
        else {
          setState(state => ({
            ...state,
            idea: {
              id: response?.data.id,
              users_id: response?.data.users_id,
              topics_id: response?.data.topics_id,
              title: response?.data.title,
              description: response?.data.description,
              upvotes: response?.data.upvotes,
              timestamp: response?.data.timestamp
            }
          }));
          axios.get(`http://localhost:8080/content/topic/${state.idea.topics_id}`)
            .then((response) => {
              console.log('Get Topic response', response)
              if (response?.status !== 200) {
                console.log('Error Getting Topic');
              }
              if (response?.data === '') {
                console.log('No Topic Found');
              }
              else {
                setState(state => ({
                  ...state,
                  topic: {
                    id: response?.data.id,
                    title: response?.data.title,
                    timestamp: response?.data.timestamp
                  }
                }));
              }
            });

          axios.get(`http://localhost:8080/account/user/${state.idea.users_id}`)
            .then((response) => {
              console.log('Get User response', response)
              if (response?.status !== 200) {
                console.log('Error Getting User');
              }
              if (response?.data === '') {
                console.log('No User Found');
              }
              else {
                setState(state => ({
                  ...state,
                  user: {
                    id: response?.data.id,
                    firstName: response?.data.firstName,
                    lastName: response?.data.lastName,
                  }
                }));
              }
            });
        }
      });
  }, [ideaId, state.idea.topics_id, state.idea.users_id]);

  return (
    <React.Fragment>
      < IdeaView
        state={state}
      />
    </React.Fragment>
  );
}