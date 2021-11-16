import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { publicAxios } from "../../utils";
import TopicView from "./view";
import TopicToolbar from "./TopicToolbar";

/**
 * Displays a table contatining all of the ideas that belong to the topic
 * Allows a user to select an idea for it to be shown on the right side of the topic
 */
export default function Topic({ currentUser, reloadPinsRef }) {
  let topicId = useParams().topicId;

  const [topicState, setTopicState] = useState({
    topic: {
      title: "",
      timestamp: "",
      ideas: [],
    },
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
          name: "upvotes.length",
          label: "Upvotes",
        },
        {
          name: "title",
          label: "Title",
        },
        {
          name: "user.display_name",
          label: "Author",
        },
        {
          name: "timestamp",
          label: "Created on",
        },
      ],
    },
    isPinned: false,
    isIdeaDisplayed: false,
    selectedIdea: null,
  });

  const retreieveTopic = useCallback(async () => {
    setTopicState((state) => ({
      ...state,
      table: {
        ...state.table,
        isIdeaDisplayed: false,
      },
    }));
    console.log("DONE!!!!!!!!!!!!!!!!!!!!!!", topicState.table.isIdeaDisplayed);

    if (typeof parseInt(topicId) !== "number") {
      setTopicState((state) => ({
        ...state,
        topic: {
          ...state.topic,
          id: -1,
        },
      }));
      return;
    }
    console.log("Retrieve Topic with id", topicId);
    publicAxios
      .get(`/content/topic/${topicId}`)
      .then((topicResponse) => {
        console.log("Retrieve Topic response", topicResponse);
        if (topicResponse?.data === "") {
          console.log("Topic not found");
          setTopicState((state) => ({
            ...state,
            topic: {
              ...state.topic,
              id: -1,
            },
          }));
          return;
        }
        setTopicState((state) => ({
          ...state,
          topic: topicResponse.data,
        }));
      })
      .catch((error) => {
        console.log("Retrieve Topic error", error);
      });

    if (!isNaN(currentUser?.user_id)) {
      console.log(
        "Retrieve Pin with user_id & topic_id",
        currentUser?.user_id,
        topicId
      );
      publicAxios
        .get(`/content/pin/${currentUser?.user_id}/${topicId}`)
        .then((pinResponse) => {
          console.log("Retrieve Pin response", pinResponse);
          if (pinResponse?.data === "") {
            console.log("Pin not found");
            setTopicState((state) => ({
              ...state,
              isPinned: false,
            }));
            return;
          } else {
            setTopicState((state) => ({
              ...state,
              isPinned: true,
            }));
          }
        })
        .catch((error) => {
          console.log("Retrieve Pin error", error);
        });
    }

    setTimeout(() => {
      setTopicState((state) => ({
        ...state,
        table: {
          ...state.table,
          options: {
            ...state.table.options,
            customToolbarSelect: (selectedRows) => {
              return (
                <TopicToolbar
                  currentUser={currentUser}
                  reloadPinsRef={reloadPinsRef}
                  topicState={state}
                  retreieveTopic={retreieveTopic}
                />
              );
            },
            customToolbar: () => {
              return (
                <TopicToolbar
                  currentUser={currentUser}
                  reloadPinsRef={reloadPinsRef}
                  topicState={state}
                  retreieveTopic={retreieveTopic}
                />
              );
            },
            onRowSelectionChange: (currentRowsSelected, allRowsSelected) => {
              allRowsSelected.length > 0
                ? setTopicState((state) => ({
                    ...state,
                    isIdeaDisplayed: true,
                    selectedIdea:
                      state.topic.ideas[allRowsSelected[0].dataIndex],
                  }))
                : setTopicState((state) => ({
                    ...state,
                    isIdeaDisplayed: false,
                  }));
            },
          },
        },
      }));
    }, 200);
  }, [currentUser, reloadPinsRef, topicId, topicState.table.isIdeaDisplayed]);

  useEffect(() => {
    retreieveTopic();
  }, [retreieveTopic]);

  return (
    <React.Fragment>
      <TopicView currentUser={currentUser} topicState={topicState} />
    </React.Fragment>
  );
}
