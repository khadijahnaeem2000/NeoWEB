import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        paddingTop: '4%',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '2%', // Adjust padding for small screens
        },
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'flex-start', // Align items to the lefty
        alignItems: 'center', // Center items vertically
        overflowX: 'auto', // Allow horizontal scrolling if necessary
        whiteSpace: 'nowrap', // Prevent wrapping
        padding: '10px 0', // Add some vertical padding
    },
    font: {
        fontWeight: "bold",
        [theme.breakpoints.down('md')]: {
            fontSize: '0.9rem', // Adjust font size for medium screens
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.5rem', // Adjust font size for small screens
        },
    },
    imgWidth: {
        width: '20%', // Set width for images (to fit 8 images in a row)
        flexShrink: 0, // Prevent shrinking of flex items
        margin: '0 5px', // Add horizontal spacing between images
        [theme.breakpoints.down('sm')]: {
            width: '12%', // Keep the same width for smaller screens
        },
    },
}));
