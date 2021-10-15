import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import HomeView from "./view";

/**
 * Displays cards that feature ideas and topics for users to browse (Most Commented Ideas, Most Upvoted Ideas, Most Idea Topics, Most Pinned Topics)
 */
export default function Home() {
  const [homeState, setHomeState] = useState({
    isLoading: true,
    ideas: [],
    topics: [],
  });

  const retreieveIdeas = useCallback(async () => {
    console.log("Retrieve all Ideas");
    axios
      .post(`http://localhost:8080/content/ideas`, {})
      .then((ideaResponse) => {
        console.log("Retrieve all Ideas response", ideaResponse);
        if (ideaResponse?.data === "") {
          console.log("Ideas not found");
          return;
        }
        setHomeState((state) => ({
          ...state,
          ideas: ideaResponse.data,
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.log("Retrieve all Ideas error", error);
      });
  }, []);

  const retreieveTopics = useCallback(async () => {
    console.log("Retrieve all Topics");
    axios
      .post(`http://localhost:8080/content/topics`, {})
      .then((topicResponse) => {
        console.log("Retrieve all Topics response", topicResponse);
        if (topicResponse?.data === "") {
          console.log("Topics not found");
          return;
        }
        setHomeState((state) => ({
          ...state,
          topics: topicResponse.data,
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.log("Retrieve all Topics error", error);
      });
  }, []);

  useEffect(() => {
    retreieveIdeas();
    retreieveTopics();
  }, [retreieveIdeas, retreieveTopics]);

  return (
    <React.Fragment>
      <HomeView homeState={homeState} />
    </React.Fragment>
  );
}
