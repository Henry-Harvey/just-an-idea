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
    },
    isUpvoted: false
  });

  useEffect(() => {
    console.log('Retrieve Idea Info with id', ideaId);
    axios.get(`http://localhost:8080/content/idea/${ideaId}/info`)
      .then((ideaResponse) => {
        console.log('Retrieve Idea Info response', ideaResponse);
        if (ideaResponse?.data === '') {
          console.log('Idea not found');
          return;
        }
        setState(state => ({
          ...state,
          ideaInfo: ideaResponse?.data
        }));
        console.log('Retrieve Upvote with users_id & ideas_id', currentUser.user_id, ideaResponse?.data.idea.id);
        axios.post(`http://localhost:8080/content/upvote/`,
          {
              users_id: currentUser.user_id,
              ideas_id: ideaResponse?.data.idea.id
          }
        ).then((upvoteResponse) => {
          console.log('Retrieve Upvote response', upvoteResponse);
          if (upvoteResponse?.data === '') {
            console.log('Upvote not found');
            return;
          }
          setState(state => ({
            ...state,
            isUpvoted: true
          }));
        }).catch(error => {
          console.log('Retrieve Upvote error', error);
        });
      }).catch(error => {
        console.log('Retrieve Idea error', error);
      });
  }, [currentUser.user_id, ideaId]);

  return (
    <React.Fragment>
      < IdeaView
        currentUser={currentUser}
        state={state}
        setState={setState}
      />
    </React.Fragment>
  );
}