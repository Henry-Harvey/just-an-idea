import React from 'react';
import { makeStyles, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        color: 'white'
    },
    txt: {
        color: 'white'
    },
    paper:{
        backgroundColor: '#292929'
    }
}));

export default function LogoutView({
    handleOpen,
    handleClose,
    handleSubmit,
    dialog
}) {
    const styles = useStyles();

    return (
        <React.Fragment>
            <Dialog
                open={dialog}
                keepMounted
                onClose={handleClose}
                classes={{paper: styles.paper}}
            >
                <DialogTitle className={styles.txt}>Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText className={styles.txt}>
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSubmit}
                        className={styles.button}
                    >
                        Yes
              </Button>
                    <Button
                        onClick={handleClose}
                        className={styles.button}
                    >
                        No
              </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}