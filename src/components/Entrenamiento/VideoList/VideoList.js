import React, {useEffect, useState} from 'react';
import { getLocalUserdata } from "../../../services/auth/localStorageData";
import userServices from 'services/httpService/userAuth/userServices';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import VideoCard from './VideoCard/VideoCard';


const VideoList = (props) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const updateLoading =() => {
      setLoading(false);
    }

    useEffect(() => {
        const data=getLocalUserdata();
        userServices.commonPostService('/fetch-videos',{"type":data.type})
        .then(response=>{
          if(response.status===200) {
            props.updateTotal(response.data.length);
            setVideos(response.data);
          }
          else{
            toast.error("Error fetching videos.");
          }
        })
        .catch((error)=> {
          toast.error("Error fetching videos.");
        });
    },[])


  return (
    videos.length>0 ?
    <div className={'entramientoContainer flex flex-col'} style={{height:'96vh', overflow:'auto'}}>
        {
          videos.map((item, index) => {
              return <VideoCard loading={loading} updateLoading={updateLoading} index={index} item={item} updateID={props.updateID}/>
          })
        }
    </div>
    :<div style={{ display:'flex', justifyContent:'center', paddingTop:'2%'}}><CircularProgress disableShrink /></div>
  )
}

export default VideoList
