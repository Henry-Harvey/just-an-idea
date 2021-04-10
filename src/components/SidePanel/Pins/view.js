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
  },
  list: {
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      // hidden
      width: '0px'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgb(49, 49, 49)',
      outline: '1px solid rgb(41, 41, 41)'
    }
  }
});

export default function PinsView({ selectedIndex, items, handleListItemClick }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Link to='/pins' className={styles.link}>
        <Typography className={styles.title}>
          Pins
          </Typography>
      </Link>

      <List component="nav" className={styles.list}>
        {items?.map((item) => (
          <ListItem
            key={item.id}
            button
            selected={selectedIndex === item.id}
            onClick={(event) => handleListItemClick(event, item.id)}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}