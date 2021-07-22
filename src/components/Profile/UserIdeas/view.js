import React from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles, Tooltip, IconButton } from '@material-ui/core'
import { AddBox as PostIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  table: {
    width: '75%',
    maxWidth: 600,
    minWidth: 100,
    marginBottom: '2%',
    overflow: 'hidden',
  }
}));

export default function UserIdeasView({
  state,
  isUsersProfile
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <MUIDataTable
        title={"Ideas"}
        data={state.ideasInfo.ideas}
        columns={state.table.columns}
        options={state.table.options}
        className={styles.table}
      />
      <div>
        {isUsersProfile ?
          <Link to='/post'>
            <Tooltip title='Post a New Idea'>
              <IconButton>
                <PostIcon />
              </IconButton>
            </Tooltip>
          </Link>
          :
          null
        }
      </div>
    </React.Fragment >
  );
}