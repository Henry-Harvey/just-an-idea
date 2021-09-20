import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PinsView from "./view";

export default function Pins({ currentUser, reloadPinsRef }) {
  const [pinsState, setPinsState] = useState({
    pins: [],
    selectedIndex: -1,
  });

  //const retreievePins = useCallback(async () => {
  const retreievePins = useCallback(() => {
    if (typeof currentUser?.user_id !== "number") {
      setPinsState((state) => ({
        ...state,
        pins: [],
      }));
      return;
    }
    setPinsState((state) => ({
      ...state,
      selectedIndex: -1,
    }));
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
        let p = pinResponse.data.sort((a, b) =>
          a.timestamp > b.timestamp ? -1 : 1
        );
        setPinsState((state) => ({
          ...state,
          pins: p,
        }));
      })
      .catch((error) => {
        console.log("Retrieve All Pins error", error);
      });
  }, [currentUser?.user_id]);

  useEffect(() => {
    retreievePins();
    reloadPinsRef.current = retreievePins;
  }, [retreievePins, reloadPinsRef]);

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
