import React from "react";
import { getLocalUserdata, updatelocalData } from '../../../services/auth/localStorageData';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import folder from "../../../assets/img/images/directory.webp";
import iosFolder from "../../../assets/img/images/directory.png";
import List from "@mui/material/List";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import '../styles.css';

const useStyles = makeStyles((theme) =>({
  root : {
    "&&": {
      [theme.breakpoints.down('580')]: {
      display: 'block',
    },
  }
  }
}));

const CustomizedListItem = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const openPdf = (fileName) => {
    let id = 0;
    props.parentFolder.files.forEach((file) => {
      if (file.name === fileName) {
        id = file.id;
      }
    });
    const info = {
      folderId: props.parentFolder.id,
      fileId: id,
    };

    props.setPdf(info);
  };

  const searchStorage = (title) => {
    const matchFound=getLocalUserdata().openedPdfs.filter((entry) => {return entry.title===title});
    if(matchFound.length===0){
      return false;
    }
    return true;
  }

  return (
    <div>
       <ListItemButton className={`listItem`} onClick={handleClick}>
            <ListItemAvatar>
                <Avatar className='avatarStyles' alt="folder" src={folder} srcSet={iosFolder}/>
            </ListItemAvatar>
            <ListItemText className='avatarText' disableTypography  primary={props.folder} />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {
                props.files.map((file)=>{
                return (
                  <>
                    <ListItemButton onClick={()=>{if(!props.isVideo){openPdf(file)}; updatelocalData('openedPdfs',{'title':file})}} sx={{ pl: 4, pt: 0, pb:0 }}>
                        <ListItemText className='avatarText' disableTypography primary={<Typography variant="text" style={{fontFamily:searchStorage(file)?'ProximaNovaSoft-bold':'ProximaNovaSoft-regular' }}>{file}</Typography>}/>
                    </ListItemButton>
                    <hr/>
                  </>
                )
            })
            }
            </List>
        </Collapse>
    </div>
  );
};
export default CustomizedListItem;
