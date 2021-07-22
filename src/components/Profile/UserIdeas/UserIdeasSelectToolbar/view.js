import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Visibility as VisibilityIcon, Delete as DeleteIcon, ListAlt as TopicIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    marginRight: 24
  },
  dialogTitle: {
    color: 'white'
  },
  dialogContent: {
    color: 'white'
  },
  dialogPaper: {
    backgroundColor: '#292929'
  }
}));

export default function UserIdeasSelectToolbarView({
  isUsersProfile,
  selectedIdea,
  handleToggleDeleteDialog,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <div className={styles.toolbar}>
        <Link
          to={'/idea/' + selectedIdea.id}
          className={styles.link}
        >
          <Tooltip title="View Idea">
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Link
          to={'/topic/' + selectedIdea.topics_id}
          className={styles.link}
        >
          <Tooltip title="View Topic">
            <IconButton>
              <TopicIcon />
            </IconButton>
          </Tooltip>
        </Link>
        {isUsersProfile ?
          <Tooltip title="Delete">
            <IconButton
              onClick={handleToggleDeleteDialog}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          :
          null
        }
      </div>
    </React.Fragment>
  );
}