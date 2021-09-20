import React from "react";
import MUIDataTable from "mui-datatables";
import { makeStyles, Tooltip, IconButton } from "@material-ui/core";
import { AddBox as PostIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "90%",
    maxWidth: 600,
    minWidth: 100,
    marginBottom: "2%",
    overflow: "hidden",
  },
}));

export default function UserIdeasView({
  profileState,
  isUsersProfile,
  userIdeasState,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <MUIDataTable
        title={"Ideas"}
        data={profileState.user.ideas}
        columns={userIdeasState.table.columns}
        options={userIdeasState.table.options}
        className={styles.table}
      />
      <div>
        {isUsersProfile ? (
          <Link to="/post">
            <Tooltip title="Post a New Idea">
              <IconButton>
                <PostIcon />
              </IconButton>
            </Tooltip>
          </Link>
        ) : null}
      </div>
    </React.Fragment>
  );
}
