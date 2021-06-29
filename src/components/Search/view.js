import React from 'react';
import MUIDataTable from 'mui-datatables';

export default function SearchView({ searchString, state }) {

  return (
    <React.Fragment>
      <MUIDataTable
        title={`Search Results for '${searchString}'`}
        data={state.results}
        columns={state.table.columns}
        options={state.table.options}
      />
    </React.Fragment>
  );
}