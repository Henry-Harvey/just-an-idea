import React from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  table: {
    background: '#292929',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
    marginInline: '1.5%',
    width: '97%'
  }
}));

export default function MyPinsView({
  myPinsState
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <MUIDataTable
        title={'My Pinned Topics'}
        data={myPinsState.pins}
        columns={myPinsState.table.columns}
        options={myPinsState.table.options}
        className={styles.table}
      />
    </React.Fragment >
  );
}