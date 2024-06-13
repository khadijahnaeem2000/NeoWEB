import React from 'react';
import { getLocalUserdata } from '../../services/auth/localStorageData';
import './styles.css'

const RankingGlobal = () => {
  const data=getLocalUserdata();
  
  return (
    <div className='flex justify-center items-center holder'>
      <iframe 
        src={`https://neoestudio.net/googleChartPoint?studentId=${data.id}`} 
        title="Ranking Global" 
        style={{height:'100vh', width:'100vw'}}
        loading='eager'/>
    </div>
  )
}

export default RankingGlobal
