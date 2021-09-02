import React, { useEffect, useState } from "react";
import history from "../../utils/history";
import SeachBarView from "./view";

export default function SearchBar({ toggleSidePanel }) {
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    setUserInput("");
  }, []);

  const onChange = (event) => {
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
