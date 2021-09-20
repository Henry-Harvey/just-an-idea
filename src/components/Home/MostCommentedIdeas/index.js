import React, { useState, useEffect, useCallback } from "react";
import MostCommentedIdeasView from "./view";

export default function MostCommentedIdeas({ homeState }) {
  const [mostCommentedIdeasState, setMostCommentedIdeasState] = useState({
    ideas: [],
  });

  const gatherMostCommentedIdeas = useCallback(async () => {
    console.log("Gather most commented Ideas");
    let i = homeState.ideas;
    i = i.sort((a, b) => (a.comments.length > b.comments.length ? -1 : 1));
    i = i.slice(0, 12);
    setMostCommentedIdeasState((state) => ({
      ...state,
      ideas: i,
    }));
  }, [homeState.ideas]);

  useEffect(() => {
    gatherMostCommentedIdeas();
  }, [gatherMostCommentedIdeas]);

  return (
    <React.Fragment>
      <MostCommentedIdeasView
        mostCommentedIdeasState={mostCommentedIdeasState}
      />
    </React.Fragment>
  );
}
