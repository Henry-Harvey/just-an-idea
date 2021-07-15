import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Visibility as VisibilityIcon, Person as PersonIcon } from '@material-ui/icons';
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

export default function TopicToolbarView({
  selectedIdea,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <div className={styles.toolbar}>
        <Link
          to={'/idea/' + selectedIdea.selectedIdea.id}
          className={styles.link}
        >
          <Tooltip title="View">
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Link
          to={'/profile/' + selectedIdea.selectedIdea.users_id}
          className={styles.link}
        >
          <Tooltip title="View Author">
            <IconButton>
              <PersonIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </div>
    </React.Fragment>
  );
}