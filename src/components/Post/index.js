import React, { useState } from "react";
import { authAxios } from "../../utils";
import history from "../../utils/history";
import BadWordsFilter from "bad-words";
import PostView from "./view";

/**
 * Displays a form for creating a new idea
 * Allows a user to post the idea
 */
export default function Post({ currentUser }) {
  const [postState, setPostState] = useState({
    idea: {
      id: -1,
      title: "",
      description: "",
      user: {
        id: currentUser?.user_id,
      },
      topic: {
        title: "",
      },
    },
    message: "",
  });

  const handleChange = (object, prop) => (event) => {
    if (/[a-zA-Z]/.test(event.target.value)) {
      event.target.value = new BadWordsFilter().clean(event.target.value);
    }

    setPostState((state) => ({
      ...state,
      [object]: {
        ...state?.[object],
        [prop]: event.target.value,
      },
    }));
  };

  const handleChangeNested = (parent, child, prop) => (event) => {
    if (/[a-zA-Z]/.test(event.target.value)) {
      event.target.value = new BadWordsFilter().clean(event.target.value);
    }

    setPostState((state) => ({
      ...state,
      [parent]: {
        ...state?.[parent],
        [child]: {
          ...state?.[parent][child],
          [prop]: event.target.value,
        },
      },
    }));
  };

  const handleSubmit = () => {
    console.log("Post with Idea", postState.idea);
    authAxios
      .post(`/content/post`, postState.idea)
      .then((ideaResponse) => {
        console.log("Post response", ideaResponse);
        history.push(`/idea/${ideaResponse.data.id}`);
      })
      .catch((error) => {
        console.log("Post error", error);
        setPostState((state) => ({
          ...state,
          message: error.message,
        }));
      });
  };

  return (
    <React.Fragment>
      <PostView
        postState={postState}
        handleChange={handleChange}
        handleChangeNested={handleChangeNested}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  );
}
