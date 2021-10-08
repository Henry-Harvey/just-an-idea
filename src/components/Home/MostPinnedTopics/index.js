import React, { useState, useEffect, useCallback } from "react";
import MostPinnedTopicsView from "./view";

/**
 * Displays cards containing the topics with the most pins
 */
export default function MostPinnedTopics({ homeState }) {
  const [mostPinnedTopicsState, setMostPinnedTopicsState] = useState({
    topics: [],
  });

  const gatherMostPinnedTopics = useCallback(async () => {
    console.log("Gather most pinned Topics");
    let t = homeState.topics;
    t = t.sort((a, b) => (a.pins.length > b.pins.length ? -1 : 1));
    t = t.slice(0, 12);
    setMostPinnedTopicsState((state) => ({
      ...state,
      topics: t,
    }));
  }, [homeState.topics]);

  useEffect(() => {
    gatherMostPinnedTopics();
  }, [gatherMostPinnedTopics]);

  return (
    <React.Fragment>
      <MostPinnedTopicsView mostPinnedTopicsState={mostPinnedTopicsState} />
    </React.Fragment>
  );
}
