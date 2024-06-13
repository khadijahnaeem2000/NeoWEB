import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    sidebaritems : { 
        zIndex: '1',
        left: '0',
        marginLeft:'5px',
        backgroundColor:'#c2c7cd', 
        overflowX: 'hidden',
        paddingTop:'5px',
        fontFamily:'Montserrat-regular',
        '&:hover' : {
            fontFamily: 'Montserrat-bold',
        } 
    },
    container : {
        transition: '.3s ease',
        backgroundColor:'silver', 
        float:'left',
    },
    root: {
        "&::-webkit-scrollbar": {
          width: 7,
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "darkgrey",
          outline: `1px solid slategrey`,
        },
    },
}));