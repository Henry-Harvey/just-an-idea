import React from 'react';
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center'
  },
  textBody: {
    margin: 50,
    letterSpacing: .5,
    textAlign: 'center'
  }
}));

export default function SearchView({ searchString }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography variant='h5' className={styles.title}>
        Search Results for '{searchString}'
      </Typography>
    </React.Fragment>
  );
}