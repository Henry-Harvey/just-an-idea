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

export default function PinsView({ state, handleClick }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Link to='/pins' className={styles.link}>
        <Typography className={styles.title}>
          Pins
        </Typography>
      </Link>

      <List component="nav" className={styles.list}>
        {state.pinInfos?.length > 0 ?
          state.pinInfos?.map(pinInfo => (
            <Link to={'/topic/' + pinInfo.topics_id} className={styles.link}>
              <ListItem
                key={pinInfo.id}
                button
                selected={state.selectedIndex === pinInfo.id}
                onClick={(event) => handleClick(event, pinInfo.id)}
              >
                <ListItemText primary={pinInfo.topics_title} />
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