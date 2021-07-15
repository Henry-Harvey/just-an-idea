import React from 'react';
import TopicView from './view';

export default function TopicToolbar(selectedIdea) {

  return (
    <React.Fragment>
      < TopicView
        selectedIdea={selectedIdea}
      />
    </React.Fragment>
  );
}