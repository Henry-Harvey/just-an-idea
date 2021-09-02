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

export default function PinsView({ 
  pinsState, 
  handleClick 
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Link to='/pins' className={styles.link}>
        <Typography className={styles.title}>
          Pins
        </Typography>
      </Link>

      <List component="nav" className={styles.list}>
        {pinsState.pins?.length > 0
          ?
          pinsState.pins?.map((pin, index) => (
            <Link to={'/topic/' + pin.topic.id} className={styles.link}>
              <ListItem
                key={pin.pin_id}
                button
                selected={pinsState.selectedIndex === index}
                onClick={(event) => handleClick(event, index)}
              >
                <ListItemText primary={pin.topic.title} />
              </ListItem>
            </Link>
          ))
          :
          <ListItem>
            <ListItemText primary={<i>Pin a topic to save it here!</i>} />
          </ListItem>
        }
      </List>
    </React.Fragment>
  );
}