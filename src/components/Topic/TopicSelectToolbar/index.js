import React from 'react';
import TopicSelectToolbarView from './view';

export default function TopicSelectToolbar({selectedIdea}) {

  return (
    <React.Fragment>
      < TopicSelectToolbarView
        selectedIdea={selectedIdea}
      />
    </React.Fragment>
  );
}