import React, {useState, useEffect} from 'react';
import { getLocalUserdata, updateLocalstoragepic } from "../../../../services/auth/localStorageData";
import userServices from 'services/httpService/userAuth/userServices';
import Modal from 'react-modal';
import CancelIcon from '@mui/icons-material/Cancel';
import { Gallery } from "react-grid-gallery";
import { toast } from 'react-toastify';

const customStyles = {
    content: {
        width:'40%',
        maxHeight:'60%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        overflowY:'scroll',
        overflowX:'hidden'
    },
    overlay: {
        zIndex:1000
    },
};

const AvatarCard = (props) => {
    let subtitle;
    const [avatars, setAvatars] = useState([]);

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#003466';
    }

    function closeModal() {
        props.closeModal();
    }

    const changePicture = (index,pic) => {
        let data=getLocalUserdata();
        userServices.commonPostService('/avatar/store',{"user_id":data.id,'image':pic.src})
        .then ((response) => {
            if(response.status===200) {
                userServices.commonPostService('/user',{"id":data.id})
                .then((response) => {
                    if(response.status===200) {
                        updateLocalstoragepic(response.data.data.photo);
                        document.getElementById('profile_pic').src=`https://neoestudio.net/userImage/${response.data.data.photo}`;
                    }
                    else {
                        toast.error('Please try again!');
                    }
                })
                .catch((error) => {
                    toast.error("Please try again.")
                })
            }
            else {
                console.log("Error updating picture");
            }
        })
        .catch ((error) => {
            console.log(error);
        })
        props.closeModal();
    }

    useEffect (() => {
        userServices.commonGetService('/getRankAvatar',{})
        .then((response) => {
            if(response.status===200){
                response.data.avatar.forEach ((item) => {
                    setAvatars(oldArray => [...oldArray, {
                        material:item.material,
                        src:`https://neoestudio.net/${item.material}`,
                        width:150,
                        height:150
                    }]);
                })
            }
            else {
                console.log('Cannot get avatars!')
            }
        })
        .catch((error) => {
            console.log(error);
        })
    },[])

  return (
    <>
        <Modal
            ariaHideApp={false}
            isOpen={props.openModal}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <div className='flex justify-between' style={{marginBottom:'5%'}}>
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}><strong>Avatars</strong></h2>
                <button onClick={props.closeModal}><CancelIcon sx={{color:'red'}}/></button>
            </div>
            {avatars.length>0
            ?<Gallery images={avatars} margin={4} onClick={(i,p) => {changePicture(i,p)}} onSelect={(i,p) => {changePicture(i,p)}}/>
            :<></>}
        </Modal>  
    </>
  )
}

export default AvatarCard
