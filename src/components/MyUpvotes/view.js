import React from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  table: {
    margin: 10
  }
}));

export default function UpvotesView({
  state
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <MUIDataTable
        title={'My Upvotes'}
        data={state.upvotesInfo?.upvotes}
        columns={state.table.columns}
        options={state.table.options}
        className={styles.table}
      />
    </React.Fragment >
  );
}