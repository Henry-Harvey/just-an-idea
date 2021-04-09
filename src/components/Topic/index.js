import React, { useState } from 'react';
import { List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 'calc(1.25rem + 1vmin)',
    marginBottom: '0.35em'
  },
  link: {
    textDecoration: 'none',
    color: 'white'
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
  },
  description: {
    color: 'white'
  }
}));

export default function Topic() {
  const styles = useStyles();
  const [selectedIndex, setSelectedIndex] = useState();

  let topicId = useParams().topicId;

  var ideas = [];
  for (var i = 1; i <= 10; i++) {
    ideas[i] = {
      id: i,
      name: 'Idea ' + i,
      author: 'Henry',
      description: 'Idea description',
      number: Math.floor(Math.random() * 100)
    };
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <React.Fragment>
      <Typography className={styles.title}>
        Topic with ID {topicId}
      </Typography>

      <List component="nav" className={styles.list}>
        {ideas?.map((idea) => (
          <Link to={`/topic/` + topicId + `/idea/` + idea.id} className={styles.link}>
            <ListItem
              button
              selected={selectedIndex === idea.id}
              onClick={(event) => handleListItemClick(event, idea.id)}
            >
              <ListItemText
                primary={idea.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={styles.description}
                    >
                      {idea.description}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </React.Fragment>
  );
}