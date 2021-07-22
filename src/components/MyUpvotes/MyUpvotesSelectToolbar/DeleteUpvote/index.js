import React from 'react';
import axios from 'axios';
import DeleteUpvoteView from './view';

export default function DeleteUpvote({ selectedIdea, handleToggleDeleteDialog, state, currentUser }) {
  const handleSubmitDelete = () => {
    console.log('Delete Upvote with users_id & ideas_id', currentUser.user_id, selectedIdea.id);
    axios.delete(`http://localhost:8080/content/upvote/`,
      {
        data: {
          users_id: currentUser.user_id,
          ideas_id: selectedIdea.id
        }
      }
    ).then((upvoteResponse) => {
      console.log('Delete Upvote response', upvoteResponse);
      //handleToggleDeleteDialog();
      window.location.reload();
    }).catch(error => {
      console.log('Delete Upvote error', error);
    });
  }

  return (
    <React.Fragment>
      <DeleteUpvoteView
        selectedIdea={selectedIdea}
        state={state}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
        handleSubmitDelete={handleSubmitDelete}
      />
    </React.Fragment>
  );
}