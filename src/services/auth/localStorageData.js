import { token } from 'config/config';

export function localStorageData(value) {
  let fialValue = null;
  let localData = JSON.parse(localStorage.getItem(token));

  if (localData && localData.hasOwnProperty('id')) {
    Object.keys(localData).forEach(function (key) {
      if (key === value) {
        fialValue = localData[key];
      }
    });
  }

  return fialValue;
}

export function getLocalUserdata(value) {
  // let fialValue = null;
  let localData = JSON.parse(localStorage.getItem(token));

  // if (localData && localData.hasOwnProperty('token')) {
  //   Object.keys(localData).forEach(function (key) {
  //     if (key == value) {
  //       fialValue = localData[key];
  //     }
  //   });
  // }
  return localData;
}

export function saveLocalData(value,time) {
  const temp=JSON.parse(localStorage.getItem(token));
  value.openedClasses=[];
  value.openedVideos=[];
  value.openedPdfs=[];
  value.openedAudios=[];
  value.downloads=[];
  value.time=time;
  if(temp===null){
    localStorage.setItem('neoestudio', JSON.stringify(value));
  }
  else if(!(value.id===temp.id)){
    localStorage.setItem('neoestudio', JSON.stringify(value));
  }
}

export function updatelocalData(arr,value) {
  // let fialValue = null;

  let localData = JSON.parse(localStorage.getItem(token));
  const matchFound=localData[arr].filter((entry) => {
    return entry.title===value.title;
  });

  if(matchFound.length===0)
  {
    localData[arr].push(value);
  }

  localStorage.setItem(token, JSON.stringify(localData));

  // if (localData && localData.hasOwnProperty('token')) {
  //   Object.keys(localData).forEach(function (key) {
  //     if (key == value) {
  //       fialValue = localData[key];
  //     }
  //   });
  // }

  return localData;
}

export function updateLocalStorageTimeStamp(arr,value,time) {
  let localData = JSON.parse(localStorage.getItem(token));

  localData[arr].filter((entry) => {
    if(entry.title===value){
      entry.timeStamp=time;
    }
  });

  localStorage.setItem(token, JSON.stringify(localData));
  return localData;
}

export function getTimeStamp(arr, value) {
  let localData = JSON.parse(localStorage.getItem(token));

  const temp=localData[arr].filter((entry) => {
    return entry.title===value
  });
  if(temp.length===0){
    return 0;
  }
  return temp[0].timeStamp;
}

export function updateLocalstoragepic(value) {
  let localData = JSON.parse(localStorage.getItem(token));

  localData.photo = value;

  localStorage.setItem(token, JSON.stringify(localData));
}

export function updateLocalstoragetime(value) {
  let localData = JSON.parse(localStorage.getItem(token));

  localData.time = value;

  localStorage.setItem(token, JSON.stringify(localData));
}

export function updateLocalstorageToken(value) {
  let localData = JSON.parse(localStorage.getItem(token));

  localData.token = value;

  console.log(localData);

  localStorage.setItem(token, JSON.stringify(localData));
}

export function Logout(value) {
  localStorage.removeItem(token);
  // history.push(value);
  return true;
}
