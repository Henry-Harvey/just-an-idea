import React, { useState, useEffect } from "react";
import axios from "axios";
import MyUpvotesView from "./view";
import MyUpvotesSelectToolbar from "./MyUpvotesSelectToolbar";

export default function MyUpvotes({ currentUser }) {
  const [myUpvotesState, setMyUpvotesState] = useState({
    upvotes: [],
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
          options: { sortDirection: "desc" },
          name: "timestamp",
          label: "Upvoted on",
        },
        {
          name: "idea.title",
          label: "Title",
        },
        {
          name: "idea.topic.title",
          label: "Topic",
        },
        {
          name: "idea.user.display_name",
          label: "Author",
        },
      ],
    },
  });

  useEffect(() => {
    if (typeof currentUser?.user_id !== "number") {
      return;
    }
    console.log("Retrieve Upvotes with user_id", currentUser?.user_id);
    axios
      .post(`http://localhost:8080/content/upvotes`, {
        upvote_id: {
          user_id: currentUser?.user_id,
        },
      })
      .then((upvoteResponse) => {
        console.log("Retrieve Upvote response", upvoteResponse);
        if (upvoteResponse?.data === "") {
          console.log("Upvote not found");
          return;
        }
        setMyUpvotesState((state) => ({
          ...state,
          upvotes: upvoteResponse.data,
        }));
      })
      .catch((error) => {
        console.log("Retrieve Upvote Info error", error);
      });

    setTimeout(() => {
      setMyUpvotesState((state) => ({
        ...state,
        table: {
          ...state.table,
          options: {
            ...state.table.options,
            customToolbarSelect: (selectedRows) => {
              return (
                <MyUpvotesSelectToolbar
                  selectedUpvote={state.upvotes[selectedRows.data[0].dataIndex]}
                  currentUser={currentUser}
                />
              );
            },
          },
        },
      }));
    }, 200);
  }, [currentUser]);

  return (
    <React.Fragment>
      <MyUpvotesView myUpvotesState={myUpvotesState} />
    </React.Fragment>
  );
}
