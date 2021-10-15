import React from "react";
import MUIDataTable from "mui-datatables";
import { makeStyles, Typography } from "@material-ui/core";
import Idea from "../Idea";
import BeatLoader from "react-spinners/BeatLoader";

const useStyles = makeStyles((theme) => ({
  table: {
    background: "#292929",
    flexDirection: "column",
    padding: 10,
    borderRadius: 10,
    marginInline: "1.5%",
    width: "97%",
  },
  container: {
    display: "flex",
  },
  item: {
    borderRadius: 10,
    width: "50%",
    overflowY: "auto",
  },
  title: {
    fontSize: "calc(1.25rem + 1vmin)",
    marginBottom: "-1em",
  },
}));

export default function TopicView({ currentUser, topicState }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      {isNaN(topicState.topic.id) ? (
        <BeatLoader
          color={"#fff"}
          css={
            "display: flex; justify-content: center; align-items: center; height: 80%"
          }
          size={20}
        />
      ) : topicState.topic.id === -1 ? (
        <Typography className={styles.title}>
          Sorry, this topic does not exist
        </Typography>
      ) : (
        <div>
          <div className={topicState.isIdeaDisplayed ? styles.container : null}>
            <div className={topicState.isIdeaDisplayed ? styles.item : null}>
              <MUIDataTable
                title={topicState.topic.title}
                data={topicState.topic.ideas}
                columns={topicState.table.columns}
                options={topicState.table.options}
                className={styles.table}
              />
            </div>
            {topicState.isIdeaDisplayed ? (
              <div className={styles.item}>
                <Idea
                  currentUser={currentUser}
                  ideaId={topicState.selectedIdea.id}
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
