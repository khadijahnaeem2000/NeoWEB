import { makeStyles } from "@material-ui/core/styles";
import background from "../../assets/img/banner.jpeg";

export default makeStyles((theme) => ({
  appBar: {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "10",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    display: "flex",
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    textDecoration: "none",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem", // Adjust font size for mobile
    },
  },
  image: {
    marginRight: "10px",
    height: "25px",
  },
  grow: {
    flexGrow: 1,
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column", // Stack avatar and text for mobile
    },
  },
  avatar: {
    cursor: "pointer",
    width: theme.spacing(7), // Default size for desktop (~56px)
    height: theme.spacing(7), // Keep circular shape for desktop
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(5), // Smaller size for mobile (~40px)
      height: theme.spacing(5), // Adjust height to match width
    },
  },
  userName: {
    marginLeft: theme.spacing(5), // Space between avatar and name on desktop
    color: "#FFFFFF", // Set the color to white
    fontWeight: "bold", // Set the text to bold
    [theme.breakpoints.down("xs")]: {
      display: "none", // Hide the username next to avatar on mobile
    },
  },
  userEmail: {
    marginLeft: theme.spacing(1), // Space between avatar and email on desktop
    color: "#FFFFFF", // Set the color to white
    fontWeight: "bold", // Set the text to bold
    [theme.breakpoints.down("xs")]: {
      display: "none", // Hide the email next to avatar on mobile
    },
  },
}));
