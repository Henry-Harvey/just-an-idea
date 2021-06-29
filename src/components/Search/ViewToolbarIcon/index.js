import React from 'react';
import ViewToolbarIconView from './view';
import history from '../../../utils/history'

export default function ViewToolbarIcon(selectedResult) {

  const handleNavigateToItem = () => {
    if (selectedResult.selectedResult.type === 'Idea') {
      history.push(`/content/idea/${selectedResult.selectedResult.id}`)
    }
    else if (selectedResult.selectedResult.type === 'Topic') {
      history.push(`/content/topic/${selectedResult.selectedResult.id}`)
    }
    else if (selectedResult.selectedResult.type === 'User') {
      history.push(`/account/user/${selectedResult.selectedResult.id}`)
    }
  };

  return (
    <React.Fragment>
      < ViewToolbarIconView
        handleNavigateToItem={handleNavigateToItem}
      />
    </React.Fragment>
  );
}