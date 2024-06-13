import React, {useEffect, useState} from 'react';
import { getLocalUserdata } from '../../../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import directory from '../../../../assets/img/images/directory.webp';
import iosDirectory from '../../../../assets/img/images/directory.png';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import useStyles from '../../../MUIScrollbar/MUIScrollbar';
import '../styles.css';

const Folders = (props) => {
    const classes = useStyles();
    const [folders, setFolders] = useState([]);
    const [loading,setLoading]=useState(true);
    
    useEffect (() => {
      setFolders([]);
      const data=getLocalUserdata();
      userServices.commonPostService('/getTopics',{"studentType":data.type,"studentId":data.id,"type":"audio"})
      .then(response=>{  
        if(response.data.status==='Successfull') {  
          setFolders(response.data.data);
          setLoading(false);
        }
        else {
          toast.error("Error in response.");
        }
      })
      .catch((error)=> {
        toast.error("Error fetching folders.");
      });
    },[])
  
    const handleClick = (id) => {
      props.updateId(id);
      props.updateView('files');
    }
  
    return ( 
      folders.length>0 ? 
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow: 'auto', maxHeight: '80vh' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={`${classes.root} listStyles`}>
        {
          folders.map((item) => {
            return (
              <ListItemButton className={`listItem`} onClick={() => { handleClick(item.id); } }>
                <ListItemAvatar>
                  <Avatar className='avatarStyles' alt="folder" src={directory} srcSet={iosDirectory}/>
                </ListItemAvatar>
                <ListItemText disableTypography className='avatarText' primaryTypographyProps={{ fontFamily: 'RoundedElegance-regular' }} primary={item.name} />
              </ListItemButton>
            );
          }) }
      </List>
      : (!loading&&folders.length===0) ? <Typography variant="subtitle2">¡No se encontraron archivos!</Typography> : <div style={{ display:'flex', justifyContent:'center'}}><CircularProgress disableShrink /></div>   
    )
}

export default Folders
