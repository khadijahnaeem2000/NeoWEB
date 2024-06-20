import React, {useEffect, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';

import { getLocalUserdata } from '../../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import useStyles from '../../MUIScrollbar/MUIScrollbar.js';
import video_icon from '../../../assets/img/images/video_icon.webp';
import pdf_icon from '../../../assets/img/images/4-Icono-archivos-PDF.webp';
import english_icon from '../../../assets/img/images/ingles.webp';
import repaso_icon from '../../../assets/img/images/Icono-repaso.webp';
import orto_icon from '../../../assets/img/images/ortografia.webp';
import psico_icon from '../../../assets/img/images/psicotecnicos.webp';
import coco_icon from '../../../assets/img/images/conocimientos.webp';
import audio_icon from '../../../assets/img/images/90100015.webp';
import ios_video_icon from '../../../assets/img/images/video_icon.png';
import ios_pdf_icon from '../../../assets/img/images/4-Icono-archivos-PDF.png';
import ios_english_icon from '../../../assets/img/images/ingles.png';
import ios_repaso_icon from '../../../assets/img/images/Icono-repaso.png';
import ios_orto_icon from '../../../assets/img/images/ortografia.png';
import ios_psico_icon from '../../../assets/img/images/psicotecnicos.png';
import ios_coco_icon from '../../../assets/img/images/conocimientos.png';
import ios_audio_icon from '../../../assets/img/images/90100015.png';

const ProgramActivities = (props) => {
    const classes = useStyles();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page,setPage] = useState(1);

    useEffect (() => {
        return () => {
            setList([]);
            setLoading(true);
            setPage(1);        
            // Anything in here is fired on component unmount.
        }
    },[])

    useEffect (() => {
        let temp=0;
        const data=getLocalUserdata();
        userServices.commonPostService(`/getProgramActivities?page=${page}`,{"programId":props.programId,'studentId':data.id})
        .then(response => {
            if(response.data.status==='Successfull') {
                response.data.data.forEach((item)=>{
                    if(item.type==='exam') {
                        setList(oldArray => [...oldArray, {
                            type:item.activityName.toLowerCase().includes('inglés')?'english':item.activityName.toLowerCase().includes('psicotécnicos')?'psico':item.activityName.toLowerCase().includes('ortografía')?'orto':item.activityName.toLowerCase().includes('conocimientos')?'conocimiento':item.activityName.toLowerCase().includes('gramática')?'gramatica':'',
                            id:item.activityId,
                            activityName: item.activityName,
                            isCompleted: item.isCompleted,
                            examId:item.id,
                            timeFrom:item.timeFrom,
                            examDuration:item.examDuration,
                            examRecordId:item.studentExamRecordId,
                            examStatus:item.studentExamStatus
                        }]);
                    }
                    else if(item.type==='pdf'){
                        setList(oldArray => [...oldArray, {
                            type:item.type,
                            id:item.activityId,
                            activityName: item.activityName,
                            isCompleted: item.isCompleted,
                            fileName:item.file
                        }]);
                    }
                    else if(item.type==='video'){
                        setList(oldArray => [...oldArray, {
                            type:item.type,
                            id:item.activityId,
                            activityName: item.activityName,
                            isCompleted: item.isCompleted,
                            video_url:item.material,
                            vimeolink : item.vimeolink
                        }]);
                    }
                    else if(item.type==='audio'){
                        setList(oldArray => [...oldArray, {
                            type:item.type,
                            id:item.activityId,
                            activityName: item.activityName,
                            isCompleted: item.isCompleted,
                            audio_url:item.material
                        }]);
                    }
                    else if(item.type==='review') {
                        setList(oldArray => [...oldArray, {
                            type:'repaso',
                            id:item.activityId,
                            activityName: item.activityName,
                            isCompleted: item.isCompleted,
                            examId:item.id,
                            timeFrom:item.timeFrom,
                            examDuration:item.examDuration,
                            examRecordId:item.studentExamRecordId,
                            examStatus:item.studentExamStatus
                        }]);
                    }
                    temp++;
                })

                if(temp===0){
                    setLoading(false);
                }
                else {
                    setPage(page+1);
                }
            }
            else {
                console.log("Error fetching programs.");
                setLoading(false);
            }
        })
        .catch((error)=> {
            console.log('Error fetching programs');
            setLoading(false);
        });
    },[page])

    const deleteActivity = (activityId) => {
        const data=getLocalUserdata();
        userServices.commonPostService(`/removeActivity`,JSON.stringify({'activityId':activityId,'studentId':data.id,"actionType": "delete"}))
        .then(response => {
            if(response.data.status==='Success') {
            }
            else {
                toast.error('Error deleting right now!');
            }
        })
        .catch((error)=> {
            toast.error('Error deleting right now!');
        });
        const newList = list.filter((item) => item.id !== activityId);
        setList(newList);
    }

    const showActivity = (item) => {
        props.updateActivity(item);
        props.updateView('Activity');
    }

    const decideFont = (item) => {
        if(item.type==='english'||item.type==='orto'||item.type==='psico'||item.type==='conocimiento'||item.type==='gramatica'||item.type==='repaso')
        {
            if (item.examStatus==='end') {
                return 'ProximaNovaSoft-bold'
            }
            else {
                return 'ProximaNovaSoft-regular'
            }
        }
        else if(item.type==='audio') {
            const matchFound=getLocalUserdata().openedAudios.filter((entry) => {return entry.title===item.activityName});
            if(matchFound.length===0){
                  return 'ProximaNovaSoft-regular';
            }
            return 'ProximaNovaSoft-bold';
        }
        else if(item.type==='video') {
            const matchFound=getLocalUserdata()?.openedVideos.filter((entry) => {return entry.title===item.activityName});
            if(matchFound.length===0){
                  return 'ProximaNovaSoft-regular';
            }
            return 'ProximaNovaSoft-bold';
        }
        else if(item.type==='pdf') {
            const matchFound=getLocalUserdata().openedPdfs.filter((entry) => {return entry.title===item.activityName});
            if(matchFound.length===0){
                  return 'ProximaNovaSoft-regular';
            }
            return 'ProximaNovaSoft-bold';
        }
    }

  return (
    <div className='flex justify-center'>
        <div className='flex flex-col'>
            <IconButton style={{marginTop:'5%', justifyContent:'start', display: props.folderToggle==='0%'?'none':'flex'}}onClick={()=>{props.updateView('Programs')}}>
                <ArrowBackIcon/>
                <Typography variant="subtitle2">Volver a actividades</Typography>
            </IconButton>
            <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', overflow:'auto', maxHeight:'90vh'}}
            className={classes.root}
            id='list'>
            {
                list.length>0 ? 
                list.map((item , index) => {
                    return (
                        <ListItem
                        key={index}
                        id={item.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon onClick={(e) => {deleteActivity(item.id);}}/>
                            </IconButton>
                        }
                        >
                            <ListItemButton className={classes.listItem} onClick={()=>{showActivity(item)}}>
                                <ListItemAvatar>
                                    <img alt="icon" src={item.type==='video'?video_icon:item.type==='pdf'?pdf_icon:item.type==='repaso'?repaso_icon:item.type==='orto'?orto_icon:item.type==='english'?english_icon:item.type==='psico'?psico_icon:item.type==='audio'?audio_icon:item.type==='conocimiento'?coco_icon:item.type==='gramatica'?orto_icon:''} 
                                        srcSet={item.type==='video'?ios_video_icon:item.type==='pdf'?ios_pdf_icon:item.type==='repaso'?ios_repaso_icon:item.type==='orto'?ios_orto_icon:item.type==='english'?ios_english_icon:item.type==='psico'?ios_psico_icon:item.type==='audio'?ios_audio_icon:item.type==='conocimiento'?ios_coco_icon:item.type==='gramatica'?ios_orto_icon:''}
                                        style={{width:'40px'}}
                                    />
                                </ListItemAvatar>
                                <ListItemText primaryTypographyProps={{fontFamily:decideFont(item)}}  primary={item.activityName} />
                            </ListItemButton>
                        </ListItem>
                    )
                }) : <div style={{ display:'flex', justifyContent:'center'}}>  </div>
            }
        </List>
        {!loading ?  null : <div style={{ display:'flex', justifyContent:'center'}}> <CircularProgress disableShrink/></div>}
        </div>
    </div>
  )
}

export default ProgramActivities
