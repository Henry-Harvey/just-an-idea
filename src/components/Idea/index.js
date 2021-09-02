import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import IdeaView from './view';

export default function Idea({
  currentUser
}) {
  let ideaId = useParams().ideaId;

  const [ideaState, setIdeaState] = useState({
    idea: {
      title: '',
      description: '',
      timestamp: '',
      user: {
        id: -1,
        display_name: ''
      },
      topic: {
        id: -1,
        title: ''
      },
      upvotes: []
    },
    isUpvoted: false
  });

  useEffect(() => {
    console.log('Retrieve Idea with id', ideaId);
    axios.get(`http://localhost:8080/content/idea/${ideaId}`)
      .then((ideaResponse) => {
        console.log('Retrieve Idea response', ideaResponse);
        if (ideaResponse?.data === '') {
          console.log('Idea not found');
          return;
        }
        setIdeaState(state => ({
          ...state,
          idea: ideaResponse?.data
        }));
        if (currentUser === null) {
          return;
        }
        console.log('Retrieve Upvote with user_id & idea_id', currentUser.user_id, ideaResponse.data.id);
        axios.get(`http://localhost:8080/content/upvote/${currentUser.user_id}/${ideaResponse.data.id}`
        ).then((upvoteResponse) => {
          console.log('Retrieve Upvote response', upvoteResponse);
          if (upvoteResponse.data === '') {
            console.log('Upvote not found');
            setIdeaState(state => ({
              ...state,
              isUpvoted: false
            }));
            return;
          }
          setIdeaState(state => ({
            ...state,
            isUpvoted: true
          }));
        }).catch(error => {
          console.log('Retrieve Upvote error', error);
        });
      }).catch(error => {
        console.log('Retrieve Idea error', error);
      });
  }, [currentUser, currentUser.user_id, ideaId]);

  const updateUpvotes = () => {
    setIdeaState(state => ({
      ...state,
      isUpvoted: !state.isUpvoted
    }));
    console.log('Retrieve All Upvotes with idea_id', ideaId);
    axios.post(`http://localhost:8080/content/upvotes`,
      {
        upvote_id:{
          idea_id: ideaId
        }
      }
    ).then((upvoteResponse) => {
      console.log('Retrieve Upvote response', upvoteResponse);
      if (upvoteResponse.data === '') {
        console.log('Upvotes not found');
        return;
      }
      setIdeaState(state => ({
        ...state,
        idea: {
          ...state.idea,
          upvotes: upvoteResponse.data
        }
      }));
    }).catch(error => {
      console.log('Retrieve Upvote error', error);
    });
  };

  return (
    <React.Fragment>
      < IdeaView
        currentUser={currentUser}
        ideaState={ideaState}
        updateUpvotes={updateUpvotes}
      />
    </React.Fragment>
  );
}