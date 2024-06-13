import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Modal from 'react-modal';
import CancelIcon from '@mui/icons-material/Cancel';
import { getLocalUserdata } from "../../../../../services/auth/localStorageData";
import userServices from 'services/httpService/userAuth/userServices';
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon, 
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ShareButton = (props) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [shareCount, setShareCount] = useState(props.shareCount);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#003466';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleClick = () => {
    const data=getLocalUserdata();
    userServices.commonPostService('/videoSharing',{"studentId":data.id,'videoId':props.videoId})
    .then(response=>{
      if(response.status===200) {
        setShareCount((shareCount) => Number(shareCount) + 1); 
      }
      else{
        console.log("Error increasing share count");
      }
    })
    .catch((error)=> {
      console.log("Error increasing share count");
    });
  }

  return (
    <>
      <IconButton onClick={openModal} className='flex flex-col' aria-label="share">
          <ShareIcon fontSize="medium"/>
          <span style={{fontSize:'70%'}}>{shareCount}</span>
      </IconButton>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='flex justify-between' style={{marginBottom:'5%'}}>
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}><strong>Compartir enlace</strong></h2>
          <button onClick={closeModal}><CancelIcon sx={{color:'red'}}/></button>
        </div>
        <div>
          <FacebookShareButton beforeOnClick={handleClick} style={{marginRight:'10px'}} url={props.url} quote={props.title}><FacebookIcon size={32} round /></FacebookShareButton>
          <FacebookMessengerShareButton beforeOnClick={handleClick} style={{marginRight:'10px'}} url={props.url} quote={props.title}><FacebookMessengerIcon size={32} round/></FacebookMessengerShareButton>
          <EmailShareButton beforeOnClick={handleClick} style={{marginRight:'10px'}} url={props.url} quote={props.title}><EmailIcon size={32} round /></EmailShareButton>
          <WhatsappShareButton beforeOnClick={handleClick} style={{marginRight:'10px'}} url={props.url} quote={props.title}><WhatsappIcon size={32} round /></WhatsappShareButton>
          <TwitterShareButton beforeOnClick={handleClick} style={{marginRight:'10px'}} url={props.url} quote={props.title}><TwitterIcon size={32} round /></TwitterShareButton>
          <PinterestShareButton beforeOnClick={handleClick} style={{marginRight:'10px'}} media={props.url} url={props.url} quote={props.title}><PinterestIcon size={32} round /></PinterestShareButton>
          <TumblrShareButton beforeOnClick={handleClick} style={{marginRight:'10px'}} url={props.url} quote={props.title}><TumblrIcon size={32} round /></TumblrShareButton>
          <RedditShareButton beforeOnClick={handleClick} style={{marginRight:'10px'}} url={props.url} quote={props.title}><RedditIcon size={32} round /></RedditShareButton>
          <LinkedinShareButton beforeOnClick={handleClick} style={{marginRight:'10px'}} url={props.url} quote={props.title}><LinkedinIcon size={32} round /></LinkedinShareButton>
          <TelegramShareButton beforeOnClick={handleClick} url={props.url} quote={props.title}><TelegramIcon size={32} round /></TelegramShareButton>
        </div>
      </Modal>
    </>
  )
}

export default ShareButton
