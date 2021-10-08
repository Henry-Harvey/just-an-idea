import React, { useState, useCallback, useEffect } from "react";
import UserIdeasView from "./view";
import UserIdeasSelectToolbar from "./UserIdeasSelectToolbar";

/**
 * Displays a table containing all of the user's ideas
 */
export default function UserIdeas({
  currentUser,
  profileState,
  isUsersProfile,
  retreieveProfile,
}) {
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

  const setUserIdeasSelectToolbar = useCallback(async () => {
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
                  currentUser={currentUser}
                  isUsersProfile={isUsersProfile}
                  retreieveProfile={retreieveProfile}
                  setUserIdeasSelectToolbar={setUserIdeasSelectToolbar}
                  selectedIdea={
                    profileState.user.ideas[selectedRows.data[0].dataIndex]
                  }
                />
              );
            },
          },
        },
      }));
    }, 200);
  }, [currentUser, isUsersProfile, profileState.user.ideas, retreieveProfile]);

  useEffect(() => {
    setUserIdeasSelectToolbar();
  }, [setUserIdeasSelectToolbar]);

  return (
    <React.Fragment>
      <UserIdeasView
        profileState={profileState}
        isUsersProfile={isUsersProfile}
        userIdeasState={userIdeasState}
      />
    </React.Fragment>
  );
}
