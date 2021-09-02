import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyPinsView from './view';
import MyPinsSelectToolbar from './MyPinsSelectToolbar'

export default function MyPins({
  currentUser
}) {
  const [myPinsState, setMyPinsState] = useState({
    pins: [],
    table: {
      options:
      {
        print: false,
        download: false,
        viewColumns: false,
        selectableRows: 'single',
        selectableRowsOnClick: true,
        selectableRowsHideCheckboxes: true,
        rowsPerPageOptions: [8],
        rowsPerPage: 8,
        customToolbarSelect: null,
        enableNestedDataAccess: '.'
      },
      columns:
        [
          {
            options: { sortDirection: 'desc' },
            name: 'timestamp',
            label: 'Pinned on'
          },
          {
            name: 'topic.title',
            label: 'Title',
          },
          {
            name: 'topic.ideas.length',
            label: 'No. of Ideas'
          }
        ]
    }
  });

  useEffect(() => {
    if (typeof currentUser?.user_id !== 'number') {
      return;
    }
    console.log('Retrieve Pins with user_id', currentUser.user_id);
    axios.post(`http://localhost:8080/content/pins`,
      {
        pin_id: {
          user_id: currentUser.user_id
        }
      }
    ).then((pinResponse) => {
      console.log('Retrieve Pin response', pinResponse);
      if (pinResponse?.data === '') {
        console.log('Pin not found');
        return;
      }
      setMyPinsState(state => ({
        ...state,
        pins: pinResponse.data
      }));
    }).catch(error => {
      console.log('Retrieve Pin Info error', error);
    });

    setTimeout(() => {
      setMyPinsState(state => ({
        ...state,
        table: {
          ...state.table,
          options: {
            ...state.table.options,
            customToolbarSelect: (selectedRows) => {
              return (
                <MyPinsSelectToolbar
                  selectedPin={state.pins[selectedRows.data[0].dataIndex]}
                  currentUser={currentUser}
                />
              )
            }
          }
        }
      }));
    }, 200);
  }, [currentUser]);

  return (
    <React.Fragment>
      <MyPinsView
        myPinsState={myPinsState}
      />
    </React.Fragment>
  );
}