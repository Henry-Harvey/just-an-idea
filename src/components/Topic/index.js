import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TopicView from "./view";
import TopicSelectToolbar from "./TopicSelectToolbar";
import TopicToolbar from "./TopicToolbar";

export default function Topic({ currentUser }) {
  let topicId = useParams().topicId;

  const [topicState, setTopicState] = useState({
    topic: {
      id: topicId,
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
  });

  useEffect(() => {
    if (typeof parseInt(topicId) !== "number") {
      return;
    }
    console.log("Retrieve Topic with id", topicId);
    axios
      .get(`http://localhost:8080/content/topic/${topicId}`)
      .then((topicResponse) => {
        console.log("Retrieve Topic response", topicResponse);
        if (topicResponse?.data === "") {
          console.log("Topic not found");
          return;
        }
        setTopicState((state) => ({
          ...state,
          topic: topicResponse.data,
        }));
      })
      .catch((error) => {
        console.log("Retrieve Topic Info error", error);
      });

    if (typeof currentUser?.user_id !== "number") {
      return;
    }
    console.log(
      "Retrieve Pin with user_id & topic_id",
      currentUser.user_id,
      topicId
    );
    axios
      .get(
        `http://localhost:8080/content/pin/${currentUser.user_id}/${topicId}`
      )
      .then((pinResponse) => {
        console.log("Retrieve Pin response", pinResponse);
        if (pinResponse?.data === "") {
          console.log("Pin not found");
          setTopicState((state) => ({
            ...state,
            isPinned: false,
          }));
          return;
        }
        setTopicState((state) => ({
          ...state,
          isPinned: true,
        }));
      })
      .catch((error) => {
        console.log("Retrieve Pin error", error);
      });

    setTimeout(() => {
      setTopicState((state) => ({
        ...state,
        table: {
          ...state.table,
          options: {
            ...state.table.options,
            customToolbarSelect: (selectedRows) => {
              return (
                <TopicSelectToolbar
                  selectedIdea={
                    state.topic.ideas[selectedRows.data[0].dataIndex]
                  }
                />
              );
            },
            customToolbar: () => {
              return (
                <TopicToolbar currentUser={currentUser} topicState={state} />
              );
            },
          },
        },
      }));
    }, 200);
  }, [currentUser, topicId]);

  return (
    <React.Fragment>
      <TopicView topicState={topicState} />
    </React.Fragment>
  );
}
