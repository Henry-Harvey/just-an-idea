import React from 'react';
import { makeStyles, Typography } from '@material-ui/core'
import {useParams} from 'react-router-dom';

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

export default function Search() {
  const styles = useStyles();
  let searchString = useParams().searchString;

  return (
    <React.Fragment>
      <Typography variant='h5' className={styles.title}>
        Search Results for '{searchString}'
      </Typography>
    </React.Fragment>
  );
}