import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import IdeaView from "./view";

/**
 * Displays idea information, such as title, topic, description, author, and timestamp
 * Displays the number of upvotes that belong to an idea
 */
export default function Idea({ currentUser, ideaId }) {
  let paramsIdeaId = useParams().ideaId;
  if (!isNaN(paramsIdeaId)) {
    ideaId = paramsIdeaId;
  }

  const [ideaState, setIdeaState] = useState({
    idea: {
      title: "",
      description: "",
      timestamp: "",
      user: {
        id: -1,
        display_name: "",
      },
      topic: {
        id: -1,
        title: "",
      },
      upvotes: [],
      comments: [],
    },
    isUpvoted: false,
    isDeleteDialogOpen: false,
  });

  const toggleDeleteDialog = () => {
    setIdeaState((state) => ({
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen,
    }));
  };

  const retreieveIdea = useCallback(async () => {
    if (typeof parseInt(ideaId) !== "number") {
      setIdeaState((state) => ({
        ...state,
        idea: {
          ...state.idea,
          id: -1,
        },
      }));
      return;
    }
    console.log("Retrieve Idea with id", ideaId);
    axios
      .get(`http://localhost:8080/content/idea/${ideaId}`)
      .then((ideaResponse) => {
        console.log("Retrieve Idea response", ideaResponse);
        if (ideaResponse?.data === "") {
          console.log("Idea not found");
          setIdeaState((state) => ({
            ...state,
            idea: {
              ...state.idea,
              id: -1,
            },
          }));
          return;
        }
        let i = ideaResponse?.data;
        i.comments = i.comments.sort((a, b) =>
          a.timestamp > b.timestamp ? -1 : 1
        );
        setIdeaState((state) => ({
          ...state,
          idea: i,
        }));
        if (isNaN(currentUser.user_id)) {
          return;
        }
        console.log(
          "Retrieve Upvote with user_id & idea_id",
          currentUser?.user_id,
          ideaResponse.data.id
        );
        axios
          .get(
            `http://localhost:8080/content/upvote/${currentUser?.user_id}/${ideaResponse.data.id}`
          )
          .then((upvoteResponse) => {
            console.log("Retrieve Upvote response", upvoteResponse);
            if (upvoteResponse.data === "") {
              console.log("Upvote not found");
              setIdeaState((state) => ({
                ...state,
                isUpvoted: false,
              }));
              return;
            }
            setIdeaState((state) => ({
              ...state,
              isUpvoted: true,
            }));
          })
          .catch((error) => {
            console.log("Retrieve Upvote error", error);
          });
      })
      .catch((error) => {
        console.log("Retrieve Idea error", error);
      });
  }, [currentUser, ideaId]);

  useEffect(() => {
    retreieveIdea();
  }, [retreieveIdea]);

  return (
    <React.Fragment>
      <IdeaView
        currentUser={currentUser}
        ideaState={ideaState}
        retreieveIdea={retreieveIdea}
        toggleDeleteDialog={toggleDeleteDialog}
      />
    </React.Fragment>
  );
}
