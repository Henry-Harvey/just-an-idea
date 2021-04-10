import React, { useState } from 'react';
import history from '../../../utils/history'
import PinsView from './view';

export default function Pins() {
  const [selectedIndex, setSelectedIndex] = useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    history.push(`/topic/${index}`)
  };

  var items = [];
  for (var i = 1; i <= 25; i++) {
    items[i] = {
      id: i,
      name: "Topic " + i
    };
  }

  return (
    <React.Fragment>
      <PinsView
        selectedIndex={selectedIndex}
        items={items}
        handleListItemClick={handleListItemClick}
      />
    </React.Fragment>
  );
}