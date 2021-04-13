import React, { useState } from 'react';
import history from '../../../utils/history'
import PinsView from './view';

export default function Pins() {
  const [selectedIndex, setSelectedIndex] = useState();

  const handleClick = (event, index) => {
    setSelectedIndex(index);
    history.push(`/topic/${index}`)
  };

  var pins = [];
  for (var i = 1; i <= 25; i++) {
    pins[i] = {
      id: i,
      name: "Topic " + i
    };
  }

  return (
    <React.Fragment>
      <PinsView
        selectedIndex={selectedIndex}
        pins={pins}
        handleClick={handleClick}
      />
    </React.Fragment>
  );
}