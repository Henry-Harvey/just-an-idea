import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import IdeaView from './view';

export default function Idea({ currentUser }) {
  let ideaId = useParams().ideaId;

  const [state, setState] = useState({
    ideaInfo: {
      idea: {
        id: -1,
        users_id: -1,
        topics_id: -1,
        title: '',
        description: '',
        timestamp: null
      },
      topic: {
        id: -1,
        title: ''
      },
      author: '',
      upvotes: -1
    }
  });

  useEffect(() => {
    console.log('Retrieve Idea Info with id', ideaId);
    axios.get(`http://localhost:8080/content/idea/${ideaId}/info`)
      .then((ideaResponse) => {
        console.log('Retrieve Idea response', ideaResponse)
        if (ideaResponse?.data === '') {
          console.log('Idea not found');
          return;
        }
        else {
          setState(state => ({
            ...state,
            ideaInfo: ideaResponse?.data
          }));
        }
      }).catch(error => {
        console.log('Retrieve Idea error', error)
      });
  }, [ideaId]);

  const handleUpvoteIdea = () => {

  };

  return (
    <React.Fragment>
      < IdeaView
        currentUser={currentUser}
        state={state}
        handleUpvoteIdea={handleUpvoteIdea}
      />
    </React.Fragment>
  );
}