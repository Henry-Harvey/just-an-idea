import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import DeletePin from "./DeletePin";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    marginRight: 24,
  },
  dialogTitle: {
    color: "white",
  },
  dialogContent: {
    color: "white",
  },
  dialogPaper: {
    backgroundColor: "#292929",
  },
}));

export default function MyPinsSelectToolbarView({
  currentUser,
  reloadPinsRef,
  retreieveMyPins,
  selectedPin,
  toggleDeleteDialog,
  myPinsSelectToolbarState,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <div className={styles.toolbar}>
        <Link to={"/topic/" + selectedPin?.topic.id} className={styles.link}>
          <Tooltip title="View Topic">
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Tooltip title="Delete">
          <IconButton onClick={toggleDeleteDialog}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
      <DeletePin
        currentUser={currentUser}
        reloadPinsRef={reloadPinsRef}
        retreieveMyPins={retreieveMyPins}
        selectedPin={selectedPin}
        toggleDeleteDialog={toggleDeleteDialog}
        myPinsSelectToolbarState={myPinsSelectToolbarState}
      />
    </React.Fragment>
  );
}
