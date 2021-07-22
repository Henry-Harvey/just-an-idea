import React from 'react';
import axios from 'axios';
import TopicToolbarView from './view';

export default function TopicToolbar({ currentUser, state, setState }) {

  const handleTogglePin = () => {
    if (state.isPinned) {
      console.log('Delete Pin with users_id & topics_id', currentUser.user_id, state.topicInfo.topic.id);
      axios.delete(`http://localhost:8080/content/pin/`,
        {
          data: {
            users_id: currentUser.user_id,
            topics_id: state.topicInfo.topic.id
          }
        }
      ).then((pinResponse) => {
        console.log('Delete Pin response', pinResponse);
        setState(state => ({
          ...state,
          isPinned: false
        }));
      }).catch(error => {
        console.log('Delete Pin error', error);
      }).then(
        window.location.reload()
      );
    }
    else {
      console.log('Create Pin with users_id & topics_id', currentUser.user_id, state.topicInfo.topic.id);
      axios.post(`http://localhost:8080/content/pin`,
        {
          pins_id: {
            users_id: currentUser.user_id,
            topics_id: state.topicInfo.topic.id
          }
        }
      ).then((pinResponse) => {
        console.log('Create Pin response', pinResponse);
        setState(state => ({
          ...state,
          isPinned: true
        }));
      }).catch(error => {
        console.log('Create Pin error', error);
      }).then(
        window.location.reload()
      );
    }
  };

  return (
    <React.Fragment>
      < TopicToolbarView
        handleTogglePin={handleTogglePin}
        state={state}
      />
    </React.Fragment>
  );
}