import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "white",
  },
  title: {
    fontSize: "calc(1rem + .5vmin)",
    overflow: "hidden",
    margin: 10,
  },
  list: {
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0px",
    },
  },
});

export default function PinsView({ pinsState }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Link to="/pins" className={styles.link}>
        <Typography className={styles.title}>Pins</Typography>
      </Link>

      {pinsState?.isLoading ? (
        <BeatLoader
          color={"#fff"}
          css={
            "display: flex; justify-content: center; align-items: center; height: 60%"
          }
          size={20}
        />
      ) : (
        <List component="nav" className={styles.list}>
          {pinsState.pins?.length > 0 ? (
            pinsState.pins?.map((pin, index) => (
              <Link
                to={"/topic/" + pin.topic.id}
                className={styles.link}
                key={pin.pin_id.topic_id}
              >
                <ListItem button>
                  <ListItemText primary={pin.topic.title} />
                </ListItem>
              </Link>
            ))
          ) : (
            <ListItem>
              <ListItemText primary={<i>Pin a topic to save it here!</i>} />
            </ListItem>
          )}
        </List>
      )}
    </React.Fragment>
  );
}
