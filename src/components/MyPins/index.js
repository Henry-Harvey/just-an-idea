import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import MyPinsView from "./view";
import MyPinsSelectToolbar from "./MyPinsSelectToolbar";

/**
 * Displays a table of the topics that have been pinned by the user
 */
export default function MyPins({ currentUser, reloadPinsRef }) {
  const [myPinsState, setMyPinsState] = useState({
    pins: [],
    table: {
      options: {
        print: false,
        download: false,
        viewColumns: false,
        selectableRows: "single",
        selectableRowsOnClick: true,
        selectableRowsHideCheckboxes: true,
        rowsPerPageOptions: [8, 12, 16, 20],
        rowsPerPage: 8,
        customToolbarSelect: null,
        enableNestedDataAccess: ".",
      },
      columns: [
        {
          name: "topic.title",
          label: "Title",
        },
        {
          name: "topic.ideas.length",
          label: "No. of Ideas",
        },
        {
          options: { sortDirection: "desc" },
          name: "timestamp",
          label: "Pinned on",
        },
      ],
    },
    isLoading: true,
  });

  const retreieveMyPins = useCallback(async () => {
    if (typeof currentUser?.user_id !== "number") {
      return;
    }
    console.log("Retrieve Pins with user_id", currentUser?.user_id);
    axios
      .post(`http://localhost:8080/content/pins`, {
        pin_id: {
          user_id: currentUser?.user_id,
        },
      })
      .then((pinResponse) => {
        console.log("Retrieve Pin response", pinResponse);
        if (pinResponse?.data === "") {
          console.log("Pin not found");
          return;
        }
        setMyPinsState((state) => ({
          ...state,
          pins: pinResponse.data,
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.log("Retrieve Pin error", error);
      });

    setTimeout(() => {
      setMyPinsState((state) => ({
        ...state,
        table: {
          ...state.table,
          options: {
            ...state.table.options,
            customToolbarSelect: (selectedRows) => {
              return (
                <MyPinsSelectToolbar
                  currentUser={currentUser}
                  reloadPinsRef={reloadPinsRef}
                  retreieveMyPins={retreieveMyPins}
                  selectedPin={state.pins[selectedRows.data[0].dataIndex]}
                />
              );
            },
          },
        },
      }));
    }, 200);
  }, [currentUser, reloadPinsRef]);

  useEffect(() => {
    retreieveMyPins();
  }, [retreieveMyPins]);

  return (
    <React.Fragment>
      <MyPinsView myPinsState={myPinsState} />
    </React.Fragment>
  );
}
