import React, {useEffect, useState} from 'react';
import { getLocalUserdata, updatelocalData } from '../../../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import icon from '../../../../assets/img/images/video_icon.webp';
import ios_icon from '../../../../assets/img/images/video_icon.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import useStyles from '../../../MUIScrollbar/MUIScrollbar';
import '../styles.css';

const Files = (props) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [loading,setLoading]=useState(true);
  const data=getLocalUserdata();

  useEffect (() => {
    userServices.commonPostService('/getClassTopicsMaterial',{"type":"video","topicId":props.folderId})
    .then(response=>{
      if(response.status===200) {
        setFiles(response.data);
        setLoading(false);
      }
      else{
        toast.error("Error fetching files.");
      }
    })
    .catch((error)=> {
      toast.error("Error fetching files");
    });

  },[])

  const searchStorage = (title) => {
    const matchFound=getLocalUserdata().openedClasses.filter((entry) => {return entry.title===title});
    if(matchFound.length===0){
      return false;
    }
    return true;
  }

  return (
    <>
      <IconButton className='backButton' style={{display: props.folderToggle==='0%'?'none':'flex'}} onClick={()=>{props.updateView('folders')}}>
        <ArrowBackIcon/>
        <p className="goBackButton">Volver a las carpetas</p>
      </IconButton>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow:'auto', maxHeight:'85vh'}}
        className={`${classes.root} listStyles`}>
      {
        files.length>0 ? 
        files.map((item) => {
          console.log('item:222', item);
          return (
            <ListItemButton className='listItem' onClick={()=>{props.updateUrl(item.vimeolink,item.name,data.id,props.folderId,item.id); updatelocalData('openedClasses',{'title':item.name, 'timeStamp':0})}}>
              <ListItemAvatar>
                <Avatar className='avatarStyles' alt="videofile" src={icon} srcSet={ios_icon} variant="square"/>
              </ListItemAvatar>
              <ListItemText disableTypography primary={<Typography className="fileText" variant="text" style={{fontFamily:searchStorage(item.name)?'ProximaNovaSoft-bold':'ProximaNovaSoft-regular' }}>{item.name}</Typography>}/>
            </ListItemButton>
          )
        }) : loading ? <div style={{ display:'flex', justifyContent:'center'}}> <CircularProgress disableShrink/> </div> : <p className='goBackButton'>¡No se encontraron archivos!</p>
      }
      </List>
    </>    
  )
}

export default Files
