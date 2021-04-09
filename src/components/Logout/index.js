import React, { useState } from 'react';
import { LogOut } from '../../utils'
import { useHistory } from 'react-router'

import LogoutView from './view';

export default function Logout({ setCurrentUser }) {
    const history = useHistory();
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