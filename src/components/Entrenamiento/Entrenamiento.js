import React, {useState} from "react";
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import VideoList from "./VideoList/VideoList";
import useStyles from './styles.js';
import './styles.css';

const Entrenamiento = () => {
  const classes = useStyles();
  const [currentID, setCurrentID] = useState(0);
  const [total, setTotal] = useState(0);

  const updateID = (id) => {
    setCurrentID(id);
  }

  const updateTotal = (num) => {
    setTotal(num);
  }

  const handleDownClick = () => {
    if(!(Number(currentID)===(total-1))){
      const temp=Number(currentID)+1;
      document.getElementById(temp).scrollIntoView({behavior: 'smooth'});
      setCurrentID(temp);
    }
  }
  
  const handleUpClick = () => {
    if(!(Number(currentID)===0)){
      const temp=Number(currentID)-1;
      document.getElementById(temp).scrollIntoView({behavior: 'smooth'});
      setCurrentID(temp);
    }
  }

  return (
    <div className='flex flex-col' style={{position:'relative'}}>
      <IconButton onClick={handleUpClick} className={classes.upButton} sx={{position:'absolute', zIndex:100, top:'40%', left:'3%', cursor:'pointer', borderRadius:'50%'}}>
        <ArrowUpwardIcon fontSize="large" sx={{ color: 'black'}}/>
      </IconButton>
      <IconButton onClick={handleDownClick} className={classes.downButton} sx={{position:'absolute', zIndex:100, top:'50%', left:'3%', cursor:'pointer', borderRadius:'50%'}}>
        <ArrowDownwardIcon fontSize="large" sx={{ color: 'black'}}/>
      </IconButton>
      <VideoList updateTotal={updateTotal} updateID={updateID}/>
    </div>
  )
}

export default Entrenamiento
