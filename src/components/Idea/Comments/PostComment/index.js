import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCommentView from "./view";

export default function PostComment({
  retreieveIdea,
  user_id,
  idea_id,
  commentsState,
  togglePostComment,
}) {
  const [postCommentState, setPostCommentState] = useState({
    comment: {
      content: "",
      user: {
        id: user_id,
      },
      idea: {
        id: useParams().ideaId,
      },
    },
    message: "",
  });

  const handleChange = (object, prop) => (event) => {
    setPostCommentState((state) => ({
      ...state,
      [object]: {
        ...state?.[object],
        [prop]: event.target.value,
      },
    }));
  };

  const handleKeyPress = () => (event) => {
    if (event?.charCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log("Post Comment", postCommentState.comment);
    axios
      .post(
        `http://localhost:8080/content/postComment`,
        postCommentState.comment
      )
      .then((commentResponse) => {
        console.log("Post Comment response", commentResponse);
        retreieveIdea();
        setPostCommentState((state) => ({
          ...state,
          comment: {
            ...state?.comment,
            content: "",
          },
        }));
        togglePostComment();
      })
      .catch((error) => {
        console.log("Post Comment error", error);
        setPostCommentState((state) => ({
          ...state,
          message: "Post Comment error",
        }));
      });
  };

  return (
    <React.Fragment>
      <PostCommentView
        commentsState={commentsState}
        postCommentState={postCommentState}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  );
}
