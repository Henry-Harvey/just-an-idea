import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PinsView from './view';

export default function Pins({ currentUser }) {
  const [state, setState] = useState({
    pinInfos: [],
    selectedIndex: -1
  });

  useEffect(() => {
    setState(state => ({
      ...state,
      pinInfos: []
    }));
    if (currentUser === null) {
      console.log('No pins to find');
      return;
    }
    let pinInfosArray = [];
    console.log('Retrieve Pin Info with users_id', currentUser?.user_id);
    axios.post(`http://localhost:8080/content/pins/info`,
      {
        pins_id: {
          users_id: currentUser.user_id
        }
      }
    ).then((pinResponse) => {
      console.log('Retrieve Pin Info response', pinResponse);
      if (pinResponse?.data === '') {
        console.log('Pin Info not found');
        return;
      }
      for (let i = 0; i < pinResponse?.data.pins.length; i++) {
        pinInfosArray.push(
          {
            id: i,
            topics_id: pinResponse?.data.pins[i].pins_id.topics_id,
            topics_title: pinResponse?.data.topics_titles[i],
            pins_timestamp: pinResponse?.data.pins[i].timestamp
          }
        );
      }
      setState(state => ({
        ...state,
        pinInfos: pinInfosArray
      }));
    }).catch(error => {
      console.log('Retrieve Pin Info error', error);
    });
  }, [currentUser]);

  const handleClick = (event, index) => {
    setState(state => ({
      ...state,
      selectedIndex: index
    }));
  };

  return (
    <React.Fragment>
      <PinsView
        state={state}
        handleClick={handleClick}
      />
    </React.Fragment>
  );
}