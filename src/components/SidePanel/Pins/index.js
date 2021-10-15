import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PinsView from "./view";

/**
 * Displays a list of the user's pinned topics
 * Allows a user to navigate to a pinned topic
 */
export default function Pins({ currentUser, reloadPinsRef }) {
  const [pinsState, setPinsState] = useState({
    pins: [],
    isLoading: true,
  });

  const retreievePins = useCallback(() => {
    if (typeof currentUser?.user_id !== "number") {
      setPinsState((state) => ({
        ...state,
        pins: [],
        isLoading: false,
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
          setPinsState((state) => ({
            ...state,
            isLoading: false,
          }));
          return;
        }
        let p = pinResponse.data.sort((a, b) =>
          a.timestamp > b.timestamp ? -1 : 1
        );
        setPinsState((state) => ({
          ...state,
          pins: p,
          isLoading: false,
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

  return (
    <React.Fragment>
      <PinsView pinsState={pinsState} />
    </React.Fragment>
  );
}
