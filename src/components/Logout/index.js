import React, { useState } from 'react';
import history from '../../utils/history'
import { LogOut } from '../../utils'
import LogoutView from './view';

export default function Logout({ setCurrentUser }) {
    const [dialog, setDialog] = useState(true);

    const handleClose = () => {
        setDialog(false);
        history.goBack()
    };

    const handleSubmit = () => {
        LogOut();
        setCurrentUser(null);
        history.push(`/home`)
    };

    return (
        <LogoutView
            dialog={dialog}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
        />
    )
}