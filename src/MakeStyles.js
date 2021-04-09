import { makeStyles } from '@material-ui/core';

const MakeStyles = makeStyles({
    appBarButton: {
        backgroundColor: '#5E5EFF',
        color: '#fff',
        margin: 15,
        width: 150,
        float: 'right',
    },
    appBarTopGrid: {
        width: 'calc(100% - 240px)',
        backgroundColor: '#F6F6FF',
        height: 64
    },
    appBarContainer: {
        width: '98%',
        padding: 10
    }
});

export default { MakeStyles }