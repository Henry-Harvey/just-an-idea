import React, { useState } from "react";
import axios from "axios";
import history from "../../utils/history";
import PostView from "./view";
import BadWordsFilter from "bad-words";

/**
 * Displays a form for creating a new idea
 * Allows a user to post the idea
 */
export default function Post({ currentUser }) {
  const [postState, setPostState] = useState({
    idea: {
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

  const handleKeyPress = () => (event) => {
    if (event?.charCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log("Post with Idea", postState.idea);
    axios
      .post(`http://localhost:8080/content/post`, postState.idea, {
        auth: currentUser?.auth,
      })
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
        handleKeyPress={handleKeyPress}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  );
}
