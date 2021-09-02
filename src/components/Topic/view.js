import React from "react";
import MUIDataTable from "mui-datatables";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    background: "#292929",
    display: "flex",
    flexDirection: "column",
    padding: 10,
    borderRadius: 10,
    marginInline: "1.5%",
    width: "97%",
  },
}));

export default function TopicView({ topicState }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <MUIDataTable
        title={topicState.topic.title}
        data={topicState.topic.ideas}
        columns={topicState.table.columns}
        options={topicState.table.options}
        className={styles.table}
      />
    </React.Fragment>
  );
}
