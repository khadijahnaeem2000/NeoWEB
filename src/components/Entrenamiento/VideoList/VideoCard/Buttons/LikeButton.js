import React, {useState, useRef} from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getLocalUserdata } from "../../../../../services/auth/localStorageData";
import userServices from 'services/httpService/userAuth/userServices';

const LikeButton = (props) => {
  const like_ref=useRef();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likeCount);

  const handleClick = () => {
    const data=getLocalUserdata();
    if(liked) {
      like_ref.current.style.color='';
      userServices.commonPostService('/videoLike',{"studentId":data.id,'videoId':props.videoId,'like':0})
      .then(response=>{
        if(response.status===200) {
          setLikeCount((Count) => Number(Count) - 1); 
          setLiked(false);
          console.log('disliked successfully');
        }
        else{
          console.log("Error disliking.");
          like_ref.current.style.color='red';
        }
      })
      .catch((error)=> {
        console.log("Error disliking.");
        like_ref.current.style.color='red';
      });
    }
    else {
      like_ref.current.style.color='red';
      userServices.commonPostService('/videoLike',{"studentId":data.id,'videoId':props.videoId,'like':1})
      .then(response=>{
        console.log(response)
        if(response.status===200||response.status===201) {
          setLikeCount((Count) => Number(Count) + 1); 
          setLiked(true);
        }
        else{

          console.log("Error liking.");
          like_ref.current.style.color='';
        }
      })
      .catch((error)=> {
        console.log("Error liking.");
        like_ref.current.style.color='';
      });
    }
  }

  return (
    <IconButton onClick={handleClick} className='flex flex-col' aria-label="add to favorites">
        <FavoriteIcon ref={like_ref} fontSize="medium"/>
        <span style={{fontSize:'70%'}}>{likeCount}</span>
    </IconButton>
  )
}

export default LikeButton
