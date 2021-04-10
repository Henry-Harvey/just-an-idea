import React, { useState } from 'react';
import history from '../../utils/history'
import { useParams } from 'react-router-dom';
import TopicView from './view';

export default function Topic() {
  const [selectedIndex, setSelectedIndex] = useState();

  let topicId = useParams().topicId;

  var ideas = [];
  for (var i = 1; i <= 10; i++) {
    ideas[i] = {
      id: i,
      name: 'Idea ' + i,
      author: 'Henry',
      description: 'Idea description',
      number: Math.floor(Math.random() * 100)
    };
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    history.push(`/topic/${topicId}/idea/${index}`)
  };

  return (
    <React.Fragment>
      <TopicView
        selectedIndex={selectedIndex}
        topicId={topicId}
        ideas={ideas}
        handleListItemClick={handleListItemClick}
      />
    </React.Fragment>
  );
}