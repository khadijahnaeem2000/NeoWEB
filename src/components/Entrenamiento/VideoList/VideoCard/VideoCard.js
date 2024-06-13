import React , {useState, useRef, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useInView } from 'react-intersection-observer';
import ShareButton from './Buttons/ShareButton';
import LikeButton from './Buttons/LikeButton';
import CommentButton from './Buttons/CommentButton';
import DownloadButton from './Buttons/DownloadButton';
import CommentCard from './CommentCard/CommentCard';
import useStyles from '../../../MUIScrollbar/MUIScrollbar';
import ReactPlayer from 'react-player/lazy';
import './styles.css';

const VideoCard = (props) => {
    const classes = useStyles();
    const [play, setPlay] = useState(true);
    const [mute, setMute] = useState(false);
    const [playing, setPlaying] = useState([]);
    const [start, setStart] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    const [ref, inView, entry] = useInView({
      threshold: 0.60,
    });  

    useEffect(() => {
      if(inView) {
        setStart(true);
        setPlay(true);
        setMute(false);
        if(entry?.target?.childNodes[0]?.childNodes[0]?.muted) {
          if(!isSafari) {
            entry.target.childNodes[0].childNodes[0].muted=false;
          }
          setPlaying(entry?.target?.childNodes[0]?.childNodes[0]);
        }
        if(!props.loading){
          props.updateID(entry?.target?.childNodes[0]?.id);
        }
      }
      else {
        setStart(false);
        entry?.target?.childNodes[0]?.childNodes[0]?.pause();
        if(entry?.target?.childNodes[0]?.childNodes[0]?.currentTime) {
          entry.target.childNodes[0].childNodes[0].currentTime=0;
        }
      }
    }, [inView]);
  

    const handlePlayPause = () => {
        if(play) {
          setPlay(false);
          playing.pause();
        }
        else {
          setPlay(true);
          playing.play();
        }
      }
      
      const handleMuteUnmute = () => {
        if(mute) {
          setMute(false);
          playing.muted=false;
        }
        else {
          setMute(true);
          playing.muted=true;
        }
      }

      useEffect(() => {
        if(initialLoad) {
          if(entry?.target?.childNodes[0]===document.getElementById('0')){
            setStart(true);
            if(entry?.target?.childNodes[0]?.childNodes[0]?.muted) {
              if(!isSafari) {
                entry.target.childNodes[0].childNodes[0].muted=false;
              }
              setPlaying(entry?.target?.childNodes[0]?.childNodes[0]);
              setInitialLoad(false);
            }
            if(!props.loading) {
              props.updateID(entry?.target?.childNodes[0]?.id);
            }
          }
        }
      })
      
  return (
    <Card className="entrenamientoChild flex justify-center changeLayout" style={{boxShadow:'none',paddingTop:'1%',paddingBottom:'1%', overflow:'unset', marginLeft:'5%'}}>
      <div ref={ref} style={{position:'relative', height:'80vh'}} className='flex justify-center'>            
        <ReactPlayer
          // Disable download button
          config={{ file: {
            attributes: { controlsList: 'nodownload', disablePictureInPicture: true},
            forceHLS: !isSafari,
          } }}
          // Disable right click
          onContextMenu={e => e.preventDefault()}
          style = {{ minHeight:'100%'}}
          url={`https://neoestudio.net/${props.item.hls}`}
          playsinline={true}
          className={'videodiv'}
          id={`${props.index}`}
          playing={start}
          muted={true}
          onLoadStart={() => {if(Number(props.index)===0){props.updateLoading()}}}
          alt={props.item.title}
          loop={true}
          autoPlay
        />
        <div className='buttondiv flex flex-col'>
          <IconButton sx={{ cursor:'pointer'}} onClick={handlePlayPause}>
              {play?<PauseIcon fontSize='small' sx={{ color: 'white'}}/>:<PlayArrowIcon fontSize='small' sx={{color: 'white'}}/>}                
          </IconButton> 
          <IconButton sx={{cursor:'pointer'}} onClick={handleMuteUnmute}>
              {mute?<VolumeOffIcon fontSize='small' sx={{color: 'white'}}/>:<VolumeUpIcon fontSize='small' sx={{color: 'white'}}/>}                
          </IconButton>  
        </div>  
      </div>   
      <CardActions className='actionLayout' sx={{display: 'flex', flexDirection: 'column', justifyContent:'end'}} disableSpacing>
        <LikeButton videoId={props.item.id} likeCount={props.item.likeCount}/>
        {props.item.IsDownloadable!=='False'?<DownloadButton item={props.item} downloadCount={props.item.downloadCount}/>:<></>}
        <span className="commentButton"><CommentButton videoId={props.item.id} commentCount={props.item.commentCount}/></span>
        {props.item.IsShareable!=='False'?<ShareButton videoId={props.item.id} title={props.item.title} url={`https://neoestudio.net/${props.item.file}`} shareCount={props.item.shareCount}/>:<></>}
      </CardActions>
      <div className={`flex flex-col justify-between ${classes.root} commentCard`}><CommentCard  videoId={props.item.id}/></div>
    </Card>  
            
  )
}

export default VideoCard
