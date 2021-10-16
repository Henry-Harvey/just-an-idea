import React, { useState } from "react";
import { authAxios } from "../../../../utils";
import BadWordsFilter from "bad-words";
import PostCommentView from "./view";

/**
 * Form for posting a new comment to an idea
 */
export default function PostComment({
  currentUser,
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
        id: idea_id,
      },
    },
    message: "",
  });

  const handleChange = (object, prop) => (event) => {
    if (/[a-zA-Z]/.test(event.target.value)) {
      event.target.value = new BadWordsFilter().clean(event.target.value);
    }

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
    authAxios
      .post(`/content/postComment`, postCommentState.comment)
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
          message: error.message,
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
