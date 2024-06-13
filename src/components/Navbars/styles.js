import { makeStyles, alpha } from '@material-ui/core/styles';

const drawerWidth = 0;

export default makeStyles((theme) => ({

  appBar: {
    background: 'linear-gradient(to right, #003466 , #3ea9fb)',
    boxShadow: '10',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    display:'flex'
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    },
  },
  image: {
    marginRight: '10px',
    height:'25px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },

  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  logo: {
    margin: 'auto',
    textAlign: 'center',
    maxWidth: '50%',
    maxHeight: '70%',
    '@media (max-width: 775px)': {
      maxWidth: '60%',
    },
    '@media (min-width: 550px)': {
      maxWidth: '75%',
    },
    '@media (min-width: 1200px)': {
      maxWidth: '50%',
    },
    '@media (min-width: 1500px)': {
      maxWidth: '40%',
    },
    '@media (min-width: 2000px)': {
      maxWidth: '30%',
    },
    '@media (min-width: 3000px)': {
      maxWidth: '25%',
    }
  },
  logoHorizontallyCenter: {
    position: 'absolute', 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));