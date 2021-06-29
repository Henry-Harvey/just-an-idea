import React from 'react';
import { makeStyles, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    muiListPaper: {
        '& .MuiList-padding': {
            paddingTop: 0,
            paddingBottom: 0
        },
        '&::-webkit-scrollbar': {
            width: '5px'
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#292929',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'white',
            borderRadius: 3
        },
        '& .MuiPaper-root': {
            backgroundColor: '#292929'
        },
        '& .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover': {
            backgroundColor: '#292929'
        },
        '& .MuiListItem-button:hover': {
            backgroundColor: '#313131'
        },
    },
    formControl: {
        width: '75%',
        maxWidth: 500,
        minWidth: 100,
        overflow: 'hidden',
        textAlign: 'left',
        // content
        '& .MuiInputBase-input': {
            color: 'white',
            fontSize: 'calc(.33rem + 2vmin)'
        },
        // label
        '& .MuiFormLabel-root': {
            color: 'white',
            fontSize: 'calc(.33rem + 2vmin)'
        },
        '& .MuiSelect-icon': {
            color: 'white',
            fontSize: 'calc(.33rem + 2vmin)'
        }

    },
    menuItem: {
        backgroundColor: '#292929',
        color: 'white',
    }
}));

export default function RegistrationView({
    other,
    stateList,
    handleClick
}) {
    const styles = useStyles();

    return (
        <React.Fragment>
            <FormControl className={styles.formControl}>
                <InputLabel htmlFor='state'>State</InputLabel>
                <Select
                    id='state'
                    MenuProps={{ classes: { paper: styles.muiListPaper } }}
                    className={styles.select}
                    //{...other}
                    defaultValue=''
                >
                    {stateList.map(state => (
                        <MenuItem
                            key={state.abbreviation}
                            value={state.abbreviation}
                            className={styles.menuItem}
                            onClick={handleClick}
                        >
                            {`${state.abbreviation} - ${state.name}`}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </React.Fragment>
    );
}