import React from "react";
import MUIDataTable from "mui-datatables";
import { makeStyles } from "@material-ui/core";
import Idea from "../Idea";

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
  },
}));

export default function TopicView({ currentUser, topicState }) {
  const styles = useStyles();

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
