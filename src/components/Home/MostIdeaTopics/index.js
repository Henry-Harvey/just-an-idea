import React, { useState, useEffect, useCallback } from "react";
import MostIdeaTopicsView from "./view";

/**
 * Displays cards containing the topics with the most ideas
 */
export default function MostIdeaTopics({ homeState }) {
  const [mostIdeaTopicsState, setMostIdeaTopicsState] = useState({
    topics: [],
  });

  const gatherMostIdeaTopics = useCallback(async () => {
    console.log("Gather most idea Topics");
    let t = homeState.topics;
    t = t.sort((a, b) => (a.ideas.length > b.ideas.length ? -1 : 1));
    t = t.slice(0, 12);
    setMostIdeaTopicsState((state) => ({
      ...state,
      topics: t,
    }));
  }, [homeState.topics]);

  useEffect(() => {
    gatherMostIdeaTopics();
  }, [gatherMostIdeaTopics]);

  return (
    <React.Fragment>
      <MostIdeaTopicsView mostIdeaTopicsState={mostIdeaTopicsState} />
    </React.Fragment>
  );
}
