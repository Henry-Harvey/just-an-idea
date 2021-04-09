import React, { useState } from 'react';
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

export default function Pins() {
  const styles = useStyles();
  const [selectedIndex, setSelectedIndex] = useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  var items = [];
  for (var i = 1; i <= 25; i++) {
    items[i] = {
      id: i,
      name: "Topic " + i
    };
  }

  return (
    <React.Fragment>
      <Link to='/pins' className={styles.link}>
        <Typography className={styles.title}>
          Pins
          </Typography>
      </Link>

      <List component="nav" className={styles.list}>
        {items?.map((item) => (
          <Link to={'/topic/' + item.id} className={styles.link}>
            <ListItem
              button
              selected={selectedIndex === item.id}
              onClick={(event) => handleListItemClick(event, item.id)}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>

    </React.Fragment>
  );
}