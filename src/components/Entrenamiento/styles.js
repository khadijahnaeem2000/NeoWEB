import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    upButton : {
      [theme.breakpoints.down('750')]: {
        visibility: 'hidden',
      },
    },
    downButton : {
      [theme.breakpoints.down('750')]: {
        visibility: 'hidden',
      },
    },
}));