import React from "react";
import MUIDataTable from "mui-datatables";
import { makeStyles } from "@material-ui/core";
import BeatLoader from "react-spinners/BeatLoader";

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

export default function MyUpvotesView({ myUpvotesState }) {
  const styles = useStyles();

  return (
    <React.Fragment>
      {myUpvotesState?.isLoading ? (
        <BeatLoader
          color={"#fff"}
          css={
            "display: flex; justify-content: center; align-items: center; height: 80%"
          }
          size={20}
        />
      ) : (
        <MUIDataTable
          title={"My Upvoted Ideas"}
          data={myUpvotesState.upvotes}
          columns={myUpvotesState.table.columns}
          options={myUpvotesState.table.options}
          className={styles.table}
        />
      )}
    </React.Fragment>
  );
}
