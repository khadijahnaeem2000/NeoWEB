import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import Carousel from 'react-material-ui-carousel';
import CircularProgress from '@mui/material/CircularProgress';
import { getLocalUserdata } from '../../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import useStyles from '../../MUIScrollbar/MUIScrollbar.js';
import './styles.css'

const Programs = (props) => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState([]);
    const [buttonFlag, setButtonFlag] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        setActivities([]);
        const data=getLocalUserdata();
        userServices.commonPostService('/getAllPrograms',{"studentType":data.type})
        .then(response => {
            if(response.data.status==='Successfull') {
                response.data.data.forEach((item)=>{
                    setActivities(oldArray => [...oldArray, {
                      id:item.id,
                      image_url:`https://neoestudio.net/${item.image}`,
                    }]);
                })
                setLoading(false);
                if(activities.length>0){
                    setButtonFlag(true);
                }
            }
            else {
                toast.error("Error fetching programs.");
            }
        })
        .catch((error)=> {
            toast.error('Error fetching programs');
        });
    },[])

    const handleClick = (id) => {
        props.updateId(id);
        props.updateView('ProgramActivities');
      }

  return (
    <div className='flex justify-center'>
        <div style={{height:'100vh', width:'100%'}} className={`${classes.root} flex justify-center`}>
        {activities.length>0? 
                <Carousel
                    fullHeightHover={false}     // We want the nav buttons wrapper to only be as big as the button element is
                    //navButtonsWrapperProps={{
                    //    className:'carousel_navigation'
                    //}} 
                    className={`${classes.root} activities_carousel`}
                    autoPlay={false}
                    indicators={false}
                    animation={"fade"}
                    navButtonsAlwaysVisible={true}>
                        {activities.map((activity, id) => (    
                            <div className='flex flex-col items-center'>
                                <img
                                    src={activity.image_url}
                                    alt="Activity"
                                    className='activity_image'
                                /> 
                                <button
                                    className="actividadesButton"
                                    type="button"
                                    disabled={buttonFlag}>
                                    <img src={require(`assets/img/images/siguiente.webp`).default} srcSet={require(`assets/img/images/siguiente.png`).default} alt="atras" onClick={() => {handleClick(activity.id)}}/>
                                </button>  
                            </div>          
                        ))}
                </Carousel>
            : (!loading&&activities.length===0) ? <p variant="subtitle2">¡No activites found!</p> : <div style={{ display:'flex', justifyContent:'center'}}><CircularProgress disableShrink /></div>
            }
        </div>
    </div>
  )
}

export default Programs
