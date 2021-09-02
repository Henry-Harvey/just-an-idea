import React, { useState, useEffect } from "react";
import UserIdeasView from "./view";
import UserIdeasSelectToolbar from "./UserIdeasSelectToolbar";

export default function UserIdeas({ profileState, isUsersProfile }) {
  const [userIdeasState, setUserIdeasState] = useState({
    table: {
      options: {
        print: false,
        download: false,
        viewColumns: false,
        selectableRows: "single",
        selectableRowsOnClick: true,
        selectableRowsHideCheckboxes: true,
        rowsPerPageOptions: [6],
        rowsPerPage: 6,
        customToolbarSelect: null,
        enableNestedDataAccess: ".",
      },
      columns: [
        {
          name: "upvotes.length",
          label: "Upvotes",
        },
        {
          name: "title",
          label: "Title",
        },
        {
          name: "topic.title",
          label: "Topic",
        },
        {
          options: { sortDirection: "desc" },
          name: "timestamp",
          label: "Created on",
        },
      ],
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setUserIdeasState((state) => ({
        ...state,
        table: {
          ...state.table,
          options: {
            ...state.table.options,
            customToolbarSelect: (selectedRows) => {
              return (
                <UserIdeasSelectToolbar
                  selectedIdea={
                    profileState.user.ideas[selectedRows.data[0].dataIndex]
                  }
                  isUsersProfile={isUsersProfile}
                />
              );
            },
          },
        },
      }));
    }, 200);
  }, [isUsersProfile, profileState.user]);

  return (
    <React.Fragment>
      <UserIdeasView
        profileState={profileState}
        userIdeasState={userIdeasState}
        isUsersProfile={isUsersProfile}
      />
    </React.Fragment>
  );
}
