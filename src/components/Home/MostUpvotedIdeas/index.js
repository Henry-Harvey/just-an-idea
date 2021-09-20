import React, { useState, useEffect, useCallback } from "react";
import MostUpvotedIdeasView from "./view";

export default function MostUpvotedIdeas({ homeState }) {
  const [mostUpvotedIdeasState, setMostUpvotedIdeasState] = useState({
    ideas: [],
  });

  const gatherMostUpvotedIdeas = useCallback(async () => {
    console.log("Gather most upvoted Ideas");
    let i = homeState.ideas;
    i = i.sort((a, b) => (a.upvotes.length > b.upvotes.length ? -1 : 1));
    i = i.slice(0, 12);
    setMostUpvotedIdeasState((state) => ({
      ...state,
      ideas: i,
    }));
  }, [homeState.ideas]);

  useEffect(() => {
    gatherMostUpvotedIdeas();
  }, [gatherMostUpvotedIdeas]);

  return (
    <React.Fragment>
      <MostUpvotedIdeasView mostUpvotedIdeasState={mostUpvotedIdeasState} />
    </React.Fragment>
  );
}
