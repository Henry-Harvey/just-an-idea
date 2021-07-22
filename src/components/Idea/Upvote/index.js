import React from 'react';
import axios from 'axios';
import UpvoteView from './view';

export default function Upvote({ currentUser, state, setState }) {

  const handleToggleUpvote = () => {
    if (state.isUpvoted) {
      console.log('Delete Upvote with users_id & ideas_id', currentUser.user_id, state.ideaInfo.idea.id);
      axios.delete(`http://localhost:8080/content/upvote/`,
        {
          data: {
            users_id: currentUser.user_id,
            ideas_id: state.ideaInfo.idea.id
          }
        }
      ).then((upvoteResponse) => {
        console.log('Delete Upvote response', upvoteResponse);
        setState(state => ({
          ...state,
          isUpvoted: false
        }));
      }).catch(error => {
        console.log('Delete Upvote error', error);
      }).then(() => {
        handleUpdateUpvotes();
      });
    }
    else {
      console.log('Create Upvote with users_id & ideas_id', currentUser.user_id, state.ideaInfo.idea.id);
      axios.post(`http://localhost:8080/content/upvote`,
        {
          upvotes_id: {
            users_id: currentUser.user_id,
            ideas_id: state.ideaInfo.idea.id
          }
        }
      ).then((upvoteResponse) => {
        console.log('Create Upvote response', upvoteResponse);
        setState(state => ({
          ...state,
          isUpvoted: true
        }));
      }).catch(error => {
        console.log('Create Upvote error', error);
      }).then(() => {
        handleUpdateUpvotes();
      });
    }
  };

  const handleUpdateUpvotes = () => {
    console.log('Retrieve Upvotes with ideas_id', state.ideaInfo.idea.id);
    axios.post(`http://localhost:8080/content/upvotes`,
      {
        upvotes_id: {
          ideas_id: state.ideaInfo.idea.id
        }
      }
    ).then((upvoteResponse) => {
      console.log('Retrieve Upvotes response', upvoteResponse);
      setState(state => ({
        ...state,
        ideaInfo: {
          ...state.ideaInfo,
          upvotes: upvoteResponse?.data.length
        }
      }));
    }).catch(error => {
      console.log('Retrieve Upvotes error', error);
    });
  };

  return (
    <React.Fragment>
      < UpvoteView
        state={state}
        handleToggleUpvote={handleToggleUpvote}
      />
    </React.Fragment>
  );
}