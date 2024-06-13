import React, { useState, useEffect, useRef} from 'react';
import { getLocalUserdata } from "../../../../../services/auth/localStorageData";
import userServices from 'services/httpService/userAuth/userServices';
import Axios from "axios";
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { makeStyles } from '@material-ui/core/styles';

import './styles.css'

const useStyles = makeStyles(theme => ({
  commentPrimary: {
    fontWeight: "bold !important",
    "@media (max-width: 850px)": {
      fontSize:'14px !important',
    }
  },
  commentSecondary: {
    "@media (max-width: 850px)": {
      fontSize:'12px !important',
    }
  }
}));

const CommentCard = (props) => {
    const classes = useStyles();
    const user_data=getLocalUserdata();
    const inputRef = useRef();
    const [showEmojis, setShowEmojis] = useState(false);
    const [comments,setComments] = useState([]);
    const [value, setValue] = React.useState('');
    const [editing, setEditing] = useState(false);
    const [commentId,setCommentId] = useState(0);

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const [currentUser, setCurrentUser] = useState({
        'currentUserId': user_data.id,
        'currentUserImg': `https://neoestudio.net/userImage/${user_data.photo}`,
        'currentUserFullName': user_data.name
    });

    useEffect (() => {
      Axios.get(`https://neoestudio.net/api/GetVideoComments?videoId=${props.videoId}`)
      .then(response=>{
        if(response.status===200) {
          response.data.forEach((comment) => {
              setComments(oldArray => [...oldArray, {
                  userId: comment.studentId,
                  comId: comment.id,
                  fullName: comment.studentName,
                  avatarUrl: comment.ImgPath,
                  text: comment.comments,
              }]);       
          })
        }
        else{
          toast.error("Error fetching comments.");
        }
      })
      .catch((error)=> {
        toast.error("Error fetching comments.");
      });
  },[])

    const editComment = () => {
      userServices.commonPostService('/editComments',{"comments":value,'videoId':props.videoId,'id':commentId})
      .then(response=>{
        if(response.status===200){
          setEditing(false);
          const tempComment = {
            userId: currentUser.currentUserId,
            comId: commentId,
            fullName: currentUser.currentUserFullName,
            avatarUrl: currentUser.currentUserImg,
            text: value,
          }
          let tempArray = comments.filter(comment => Number(comment.comId) !== Number(commentId));
          tempArray.unshift(tempComment);
          setComments(tempArray);
          setValue('');
        }
        else {
          toast.error(response);
        }
      })
      .catch(err => {
        toast.error('Cannot edit comment');
      })
    }

    const handleSubmit = () => {
      if(editing) {
        editComment();
      }
      else {
        const value=inputRef?.current?.value;
        if (inputRef.current) {
          setValue('')
        }
        if(value!=='')
        {
          userServices.commonPostService('/videoComment',{"studentId":currentUser.currentUserId,'videoId':props.videoId,'comment':value,'ImgPath':currentUser.currentUserImg})
          .then(response=>{
              if(response.status===201) {
                Axios.get(`https://neoestudio.net/api/GetVideoComments?videoId=${props.videoId}`)
                .then(response=>{
                  if(response.status===200) {
                    const filtered = response.data.filter((comment) => Number(comment.studentId)===Number(currentUser.currentUserId) );
                    let append=[];
                    filtered.forEach((entry) => {
                      append=comments.filter((comment) => Number(comment.comId) === Number(entry.id));
                      if(append.length===0) {
                        setComments(oldArray => [ {
                          userId: entry.studentId,
                          comId: entry.id,
                          fullName: entry.studentName,
                          avatarUrl: entry.ImgPath,
                          text: entry.comments,
                        },...oldArray]);    
                        props.increase();
                      }
                    })
                  }
                  else{
                    console.log(response);
                  }
                })
                .catch((error)=> {
                  console.log(error);
                });
              }
              else{
                toast.error('Error adding comment.');
              }
            })
          .catch((error)=> {
            toast.error('Error adding comment.');
          });
        }
      }
    }

    const handleDelete = (commentId) => {
      const delete_info ={
        "id":commentId,
        "videoId":props.videoId
      }
      Axios.delete('https://neoestudio.net/api/deleteComments', { data: delete_info })
        .then(response=>{
        if(response.status===200) {
          const newComments=comments.filter((comment) => Number(comment.comId) !== Number(commentId))
          setComments(newComments);
          props.decrease();
        }
        else{
          console.log(response);
        }
      })
      .catch((error)=> {
        console.log(error);
      });
    }

    const addEmoji = (e) => {
      setValue((val) => (val += e.native));
    };

    const handleEdit = (comment) => {
      setEditing(true);
      setValue(comment.text);
      setCommentId(comment.comId);
    }

  return (
    <>
      {comments.length>0
      ?<>
        {comments.map((comment) => {
          return (
            <List>
              <ListItem
                secondaryAction={  
                  Number(comment.userId)===currentUser.currentUserId 
                  ?<>
                    <IconButton onClick={() => handleDelete(comment.comId)} edge="end" aria-label="Borrar">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="Editar">
                      <EditIcon onClick={() => handleEdit(comment)}/>
                    </IconButton>
                  </>
                  :<></>
                }
              >
                <ListItemAvatar>
                  <Avatar alt="Avatar" src={comment.avatarUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.fullName}
                  secondary={comment.text}
                  classes={{ primary: classes.commentPrimary, secondary: classes.commentSecondary }}
                />
              </ListItem>
            </List>
          )
        })
      }
      </>
    :<div className='flex justify-center' style={{margin:5, marginTop:20}}>No hay comentarios para mostrar.</div>}  
    <div className={'comment-field'}>
        <div className='flex justify-between' style={{marginBottom:'2%'}}>
          <h2><strong>Comentarios</strong></h2>
        </div>
        <hr/>
        <div style={{position:'relative', marginRight:5, marginLeft:5}} className='flex'>
          <TextField
            inputRef={inputRef}
            id="standard-multiline-flexible"
            label="Agregar comentario"
            multiline
            maxRows={2}
            value={value}
            onChange={handleChange}
            variant="standard"
            fullWidth
          />
          <IconButton sx={{marginRight:'1%', zIndex:2000}} onClick={() => setShowEmojis(!showEmojis)}edge="end" aria-label="emoticonos">
            <EmojiEmotionsIcon sx={{color:'RGB(255,222,52)'}}/>
          </IconButton>
          {showEmojis && (
            <div style={{position:'absolute',zIndex:1000,top: '-30vh',right: '-10%',left:0,bottom: 0}}>
              <Picker searchPosition={'none'} navPosition={'none'} perLine={6} maxFrequentRows={0} previewPosition={'none'} data={data} onEmojiSelect={addEmoji}/>
            </div>
          )}
          <Button onClick={handleSubmit} sx={{marginTop:'2%', marginBottom:'2%'}} variant="contained" endIcon={<SendIcon/>}>
            {editing?'Actualizar':'Enviar'}
          </Button>
        </div>
      </div>
    </>
  )
}

export default CommentCard
