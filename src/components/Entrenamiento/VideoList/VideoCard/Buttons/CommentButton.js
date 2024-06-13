import React , {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Modal from 'react-modal';
import CommentCard from '../CommentCard/CommentCard';

const customStyles = {
  content: {
    width:'80%',
    maxHeight:'60%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflowY:'scroll',
    overflowX:'hidden',
  },
  overlay: {
    zIndex:1000
  },
};

const CommentButton = (props) => {

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(props.commentCount);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#003466';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const increaseCount = () => {
    setCommentCount((commentCount) => Number(commentCount) + 1); 
  }

  const decreaseCount = () => {
    setCommentCount((commentCount) => Number(commentCount) - 1); 
  }

  return (
    <>
      <IconButton onClick={openModal} className='flex flex-col' aria-label="add a comment">
          <CommentIcon fontSize="medium"/>
          <span style={{fontSize:'70%'}}>{commentCount}</span>
      </IconButton>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/*<div className='flex justify-between' style={{marginBottom:'2%'}}>
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}><strong>Comentarios</strong></h2>
            <button onClick={closeModal}><CancelIcon sx={{color:'red'}}/></button>
        </div>
  <hr/>*/}
        <CommentCard decrease={decreaseCount} increase={increaseCount} videoId={props.videoId}/>
      </Modal>
    </>
  )
}

export default CommentButton
