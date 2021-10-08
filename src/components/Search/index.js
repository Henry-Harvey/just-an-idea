import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SearchView from "./view";
import SearchSelectToolbar from "./SearchSelectToolbar";

/**
 * Displays a table containing all of the user's search results
 */
export default function Search() {
  let searchString = useParams().searchString;

  const [searchState, setSearchState] = useState({
    results: [],
    table: {
      options: {
        print: false,
        download: false,
        viewColumns: false,
        selectableRows: "single",
        selectableRowsOnClick: true,
        selectableRowsHideCheckboxes: true,
        rowsPerPageOptions: [8, 12, 16, 20],
        rowsPerPage: 8,
        customToolbarSelect: null,
      },
      columns: [
        {
          name: "id",
          label: "ID",
        },
        {
          name: "type",
          label: "Type",
        },
        {
          name: "name",
          label: "Name",
        },
      ],
    },
  });

  useEffect(() => {
    setSearchState((state) => ({
      ...state,
      results: [],
    }));
    if (typeof searchString !== "string") {
      return;
    }
    if (searchString === "") {
      return;
    }
    var resultsArray = [];
    console.log("Search Ideas with title:", searchString);
    axios
      .post(`http://localhost:8080/content/ideas/search`, {
        title: searchString,
      })
      .then((ideasResponse) => {
        console.log("Search Ideas response", ideasResponse);
        if (ideasResponse?.data === "") {
          console.log("Ideas not found");
          return;
        }
        ideasResponse.data.map((idea) =>
          resultsArray.push({
            type: "Idea",
            id: idea.id,
            name: idea.title,
          })
        );
      })
      .catch((error) => {
        console.log("Search Idea error", error);
      });

    console.log("Search Topics with title", searchString);
    axios
      .post(`http://localhost:8080/content/topics/search`, {
        title: searchString,
      })
      .then((topicsResponse) => {
        console.log("Search Topics response", topicsResponse);
        if (topicsResponse?.data === "") {
          console.log("Topics not found");
          return;
        }
        topicsResponse.data.map((topic) =>
          resultsArray.push({
            type: "Topic",
            id: topic.id,
            name: topic.title,
          })
        );
      })
      .catch((error) => {
        console.log("Search Topics error", error);
      });

    console.log("Search Users with display_name", searchString);
    axios
      .post(`http://localhost:8080/account/users/search`, {
        display_name: searchString,
      })
      .then((usersResponse) => {
        console.log("Search Users response", usersResponse);
        if (usersResponse?.data === "") {
          console.log("Users not found");
          return;
        }
        usersResponse.data.map((user) =>
          resultsArray.push({
            type: "User",
            id: user.id,
            name: user.display_name,
          })
        );
      })
      .catch((error) => {
        console.log("Search Credentials error", error);
      });

    setTimeout(() => {
      setSearchState((state) => ({
        ...state,
        results: resultsArray,
      }));

      setSearchState((state) => ({
        ...state,
        table: {
          ...state.table,
          options: {
            ...state.table.options,
            customToolbarSelect: (selectedRows) => {
              return (
                <SearchSelectToolbar
                  selectedResult={resultsArray[selectedRows.data[0].dataIndex]}
                />
              );
            },
          },
        },
      }));
    }, 200);
  }, [searchString]);

  return (
    <React.Fragment>
      <SearchView searchString={searchString} searchState={searchState} />
    </React.Fragment>
  );
}
