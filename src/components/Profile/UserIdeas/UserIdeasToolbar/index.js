import React, { useState } from 'react';
import axios from 'axios';
import UserIdeasToolbarView from './view';

export default function UserIdeasToolbar({ selectedIdea, isUsersProfile }) {

  const [state, setState] = useState({
    isDeleteDialogOpen: false
  });

  const handleToggleDeleteDialog = () => {
    setState(state => ({
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen
    }));
  };

  const handleSubmitDelete = () => {
    console.log('Delete Idea with id', selectedIdea.id)
    axios.delete(`http://localhost:8080/content/idea/${selectedIdea.id}`)
      .then((ideaResponse) => {
        console.log('Delete Idea response', ideaResponse)
        window.location.reload();
      }).catch(error => {
        console.log('Delete Idea error', error);
      });
  };

  return (
    <React.Fragment>
      < UserIdeasToolbarView
        isUsersProfile={isUsersProfile}
        selectedIdea={selectedIdea}
        state={state}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
        handleSubmitDelete={handleSubmitDelete}
      />
    </React.Fragment>
  );
}