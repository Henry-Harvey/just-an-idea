import React from 'react';
import { useParams } from 'react-router-dom';
import SearchView from './view';

export default function Search() {
  let searchString = useParams().searchString;

  return (
    <React.Fragment>
      < SearchView
        searchString={searchString}
      />
    </React.Fragment>
  );
}