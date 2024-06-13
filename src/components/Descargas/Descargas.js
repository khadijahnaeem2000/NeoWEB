import React from 'react';

import './styles.css';
import DownloadMaterial from './DownloadMaterial/DownloadMaterial';

const Descargas = () => {

  function handleClick (e) {
   /* if(e.target.name==='download') {
      uploadref.current.style.opacity=0.5;
      downloadref.current.style.opacity=1;
      setView('download');
    }
    else if(e.target.name==='upload') {
      uploadref.current.style.opacity=1;
      downloadref.current.style.opacity=0.5;
      setView('upload');
    }*/
  }

  return (
    <div className="flex flex-col">
    { 
      /*<div style={{marginTop:'1%', marginLeft:'2%'}}>   
        <img name="download" ref={downloadref} src={download} alt="download icon" className='buttonStyle' onClick={handleClick}/>
      </div>*/
    }
      <div style={{marginTop:'3%', marginLeft:'2%'}}>
        <DownloadMaterial /> 
      </div>
    </div>
  )
}

export default Descargas
