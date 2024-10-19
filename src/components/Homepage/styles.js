import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        paddingTop: '4%',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    desktopItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    imgWidth: {
        width: '4%', /* Desktop image width */
    },
    mobileRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mobileItem: {
        flex: '1 1 45%',
        margin: '5px',
        textAlign: 'center',
    },
}));
