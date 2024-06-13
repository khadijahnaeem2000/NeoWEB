import React, {useState, useEffect} from 'react';
import { getLocalUserdata, updatelocalData } from '../../../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import directory from '../../../../assets/img/images/directory.webp';
import downloadIcon from '../../../../assets/img/images/Flecha descarga azul.webp';
import iosDirectory from '../../../../assets/img/images/directory.png';
import iosDownloadIcon from '../../../../assets/img/images/Flechadescargaazul.png';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@mui/material/CircularProgress';
import { saveAs } from 'file-saver';


const useStyles = makeStyles((theme) => ({
    listItem : {
      "&&": {
        [theme.breakpoints.down('580')]: {
        display: 'block',
      },
    }
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

const DownloadFolders = (props) => {
    
    const classes = useStyles();
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
  
    useEffect (() => {
      setFolders([]);
      const data=getLocalUserdata();
      userServices.commonPostService('/getDownloadFolders',JSON.stringify({"studentType":data.type,"studentId":data.id}))
      .then(response=>{
        if(response.data.status==='Successfull') {
          response.data.folders.forEach((item)=>{
            setFolders(oldArray => [...oldArray, {
              id:item.id,
              name:item.name===null? '-': item.name,
            }]);
          })
          response.data.files.forEach((item)=>{
            setFiles(oldArray => [...oldArray, {
              title:item.title===null?item.name:item.title,
              url:item.file,
            }]);
          })
        }
        else{
          toast.error("Error fetching folders.");
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

    const downloadFile = ({url}) => {
        const fileName = url.split("/").pop(); 
        (async () => {
            let blob = await fetch(url).then((r) => r.blob());
            saveAs(blob, fileName);
         })();
    }

    const searchStorage = (title) => {
      const matchFound=getLocalUserdata().downloads.filter((entry) => {return entry.title===title});
      if(matchFound.length===0){
        return false;
      }
      return true;
    }
  
    return ( 
      folders.length>0 ? 
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow: 'auto', maxHeight: '75vh', alignSelf:'center' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}>
        {
            folders.map((item) => {
                return (
                    <ListItemButton className={classes.listItem} onClick={() => { handleClick(item.id); } }>
                        <ListItemAvatar>
                            <Avatar alt="folder" src={directory} srcSet={iosDirectory}/>
                        </ListItemAvatar>
                        <ListItemText primaryTypographyProps={{ fontFamily: 'RoundedElegance-regular' }} primary={item.name} />
                    </ListItemButton>
            )}) 
        }
        {
            files.map((item) => {
                return (
                <ListItemButton className={classes.listItem} onClick={()=>{downloadFile(item); updatelocalData('downloads',{'title':item.title})}}>
                    <ListItemAvatar>
                        <Avatar alt="videofile" src={downloadIcon} srcSet={iosDownloadIcon} variant="square"/>
                    </ListItemAvatar>
                    <ListItemText primaryTypographyProps={{fontFamily:searchStorage(item.title)?'ProximaNovaSoft-bold':'ProximaNovaSoft-regular'}}  primary={item.title}/>
                </ListItemButton>
            )}) 
        }
      </List>
      : <div style={{ display:'flex', justifyContent:'center'}}><CircularProgress disableShrink /></div>  
    )
}

export default DownloadFolders
