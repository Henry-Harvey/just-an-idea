import React from 'react';
import axios from 'axios';
import DeleteIdeaView from './view';

export default function DeleteIdea({ selectedIdea, handleToggleDeleteDialog, state, currentUser }) {
  const handleSubmitDelete = () => {
    console.log('Delete Idea with id', selectedIdea.id)
    axios.delete(`http://localhost:8080/content/idea/${selectedIdea.id}`)
      .then((ideaResponse) => {
        console.log('Delete Idea response', ideaResponse)
        //handleToggleDeleteDialog();
        window.location.reload();
      }).catch(error => {
        console.log('Delete Idea error', error);
      });
  }

  return (
    <React.Fragment>
      <DeleteIdeaView
        selectedIdea={selectedIdea}
        state={state}
        handleToggleDeleteDialog={handleToggleDeleteDialog}
        handleSubmitDelete={handleSubmitDelete}
      />
    </React.Fragment>
  );
}