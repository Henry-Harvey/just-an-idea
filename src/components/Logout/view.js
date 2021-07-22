import React from 'react';
import { makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip, IconButton } from '@material-ui/core';
import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    button: {
        color: 'white'
    },
    dialogTitle: {
        color: 'white'
    },
    dialogContent: {
        color: 'white'
    },
    paper: {
        backgroundColor: '#292929'
    },
    iconButton: {
        color: 'white'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    }
}));

export default function LogoutView({
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
                classes={{ paper: styles.paper }}
            >
                <DialogTitle className={styles.dialogTitle}>Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText className={styles.dialogContent}>
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={styles.buttons}>
                    <Tooltip title='No'>
                        <IconButton
                            className={styles.iconButton}
                            onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Yes'>
                        <IconButton
                            className={styles.iconButton}
                            onClick={handleSubmit}>
                            <CheckIcon />
                        </IconButton>
                    </Tooltip>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}