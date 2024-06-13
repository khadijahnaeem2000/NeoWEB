import React, {useState} from 'react';
import AudioPlayer from './AudioPlayer/AudioPlayer.js';
import AudioFolder from './AudioFolder/AudioFolder.js';

const AudioLibro = () => {
  const [url,setUrl]=useState('');
  const [title,setTitle]=useState('');
  const [userId, setUserId] = useState('');
  const [folderId, setFolderId] = useState('');
  const [subId, setSubId] = useState('');

  const updateUrl = (val,title,id,folderId,subId) => {
    setUrl(val);
    setTitle(title);
    setUserId(id);
    setFolderId(folderId);
    setSubId(subId);
  }

  return (
    <div className='stackStyle'>
      <AudioFolder updateUrl={updateUrl}/>
      <AudioPlayer url={url} title={title} userId={userId} folderId={folderId} subId={subId}/>
    </div>
  )
}
export default AudioLibro
