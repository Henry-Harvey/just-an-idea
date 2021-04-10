import React from 'react';
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 'calc(1.25rem + 1vmin)',
    marginBottom: '0.35em'
  },
}));

export default function HomeView() {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Typography className={styles.title}>
        Home
      </Typography>
    </React.Fragment>
  );
}