import React, { useState, useEffect } from "react";
import axios from "axios";
import PinsView from "./view";

export default function Pins({ currentUser }) {
  const [pinsState, setPinsState] = useState({
    pins: [],
    selectedIndex: -1,
  });

  useEffect(() => {
    if (typeof currentUser?.user_id !== "number") {
      setPinsState((state) => ({
        ...state,
        pins: [],
      }));
      return;
    }
    console.log("Retrieve All Pins with user_id", currentUser?.user_id);
    axios
      .post(`http://localhost:8080/content/pins`, {
        pin_id: {
          user_id: currentUser?.user_id,
        },
      })
      .then((pinResponse) => {
        console.log("Retrieve All Pins response", pinResponse);
        if (pinResponse?.data === "") {
          console.log("Pins not found");
          return;
        }
        setPinsState((state) => ({
          ...state,
          pins: pinResponse?.data,
        }));
      })
      .catch((error) => {
        console.log("Retrieve All Pins error", error);
      });
  }, [currentUser?.user_id]);

  const handleClick = (event, index) => {
    setPinsState((state) => ({
      ...state,
      selectedIndex: index,
    }));
  };

  return (
    <React.Fragment>
      <PinsView pinsState={pinsState} handleClick={handleClick} />
    </React.Fragment>
  );
}
