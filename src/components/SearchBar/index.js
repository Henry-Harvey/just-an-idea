import React, { useEffect, useState } from "react";
import history from "../../utils/history";
import SeachBarView from "./view";
import BadWordsFilter from "bad-words";

/**
 * Displays a search bar for the user to enter a search query into
 * Allows a user to execute a search
 */
export default function SearchBar({ toggleSidePanel }) {
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    setUserInput("");
  }, []);

  const onChange = (event) => {
    if (/[a-zA-Z]/.test(event.target.value)) {
      event.target.value = new BadWordsFilter().clean(event.target.value);
    }

    setUserInput(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    history.push(`/search/${userInput}`);
    setUserInput("");
  };

  return (
    <React.Fragment>
      <SeachBarView
        toggleSidePanel={toggleSidePanel}
        userInput={userInput}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </React.Fragment>
  );
}
