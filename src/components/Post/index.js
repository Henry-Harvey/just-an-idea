import React, { useState } from 'react';
import axios from 'axios';
import history from '../../utils/history'
import PostView from './view';

export default function Post({ currentUser }) {
  const [state, setState] = useState({
    idea: {
      id: -1,
      users_id: currentUser.user_id,
      topics_id: -1,
      title: '',
      description: '',
      timestamp: null
    },
    topic: {
      id: -1,
      title: '',
      timestamp: null
    },
    message: null
  });

  const handleChange = (object, prop) => (event) => {
    setState(state => ({
      ...state,
      [object]: {
        ...state?.[object],
        [prop]: event.target.value
      }
    }));
  };

  const handleKeyPress = () => (event) => {
    if (event?.charCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log('Post with Idea & Topic', state?.idea, state?.topic)
    axios.post(`http://localhost:8080/content/post`,
      {
        idea: { ...state?.idea },
        topic: { ...state?.topic }
      }
    ).then((ideaResponse) => {
      console.log('Post response', ideaResponse)
      history.push(`/profile`)
    }).catch(error => {
      console.log('Post error', error)
      setState(state => ({
        ...state,
        message: 'Post error'
      }));
    });
  };

  return (
    <React.Fragment>
      <PostView
        state={state}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  );
}