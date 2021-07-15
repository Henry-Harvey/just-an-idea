import React from 'react';
import SearchToolbarView from './view';
import history from '../../../utils/history'

export default function SearchToolbar(selectedResult) {

  const handleNavigateToItem = () => {
    if (selectedResult.selectedResult.type === 'Idea') {
      history.push(`/idea/${selectedResult.selectedResult.id}`)
    }
    else if (selectedResult.selectedResult.type === 'Topic') {
      history.push(`/topic/${selectedResult.selectedResult.id}`)
    }
    else if (selectedResult.selectedResult.type === 'User') {
      history.push(`/profile/${selectedResult.selectedResult.id}`)
    }
  };

  return (
    <React.Fragment>
      < SearchToolbarView
        handleNavigateToItem={handleNavigateToItem}
      />
    </React.Fragment>
  );
}