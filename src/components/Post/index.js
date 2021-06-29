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
      upvotes: 0,
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
    setState({
      ...state,
      [object]: {
        ...state?.[object],
        [prop]: event.target.value
      }
    });
  };

  const handleSubmit = () => {
    console.log('Post Idea + Topic', state?.idea, state?.topic)
    axios.post(`http://localhost:8080/content/post`,
      {
        idea: { ...state?.idea },
        topic: { ...state?.topic }
      }
    ).then((response) => {
      console.log('Post response', response)
      if (response?.status !== 200) {
        setState({ ...state, message: 'The post failed' });
      }
      else {
        history.push(`/profile`)
      }
    });
  }

  const handleNavigateToProfile = () => {
    history.push(`/profile`)
  }

  return (
    <React.Fragment>
      <PostView
        state={state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleNavigateToProfile={handleNavigateToProfile}
      />
    </React.Fragment>
  );
}