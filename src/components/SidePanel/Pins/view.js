import React from 'react';
import { List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'white'
  },
  title: {
    fontSize: 'calc(1rem + .5vmin)',
    overflow: 'hidden',
    margin: 10
  },
  list: {
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '0px'
    }
  }
});

export default function PinsView({ selectedIndex, pins, handleClick }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Link to='/pins' className={styles.link}>
        <Typography className={styles.title}>
          Pins
          </Typography>
      </Link>

      <List component="nav" className={styles.list}>
        {pins?.map(pin => (
          <ListItem
            key={pin.id}
            button
            selected={selectedIndex === pin.id}
            onClick={(event) => handleClick(event, pin.id)}
          >
            <ListItemText primary={pin.name} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}