import React, {useEffect, useState} from 'react'
import { ZoomMtg } from '@zoomus/websdk'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import './styles.css'

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.12.0/lib', '/av')

ZoomMtg.preLoadWasm()
ZoomMtg.prepareJssdk()

// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('es-ES')
ZoomMtg.i18n.reload('es-ES')

const Directo = () => {

  const [searchParams] = useSearchParams();
  const [userName, setUserName] = useState('-');
  var signatureEndpoint = 'https://neoestudio.net/api/JwtToken'
  var sdkKey = 'ejMUC7sZJxrReEZ4iLrllWD4iYqM9W6tOqpS'
  var meetingNumber = '4269760334'
  var role = 0
  var leaveUrl = window.location.origin
  var userEmail = ''
  var passWord = 'Ehkuc2'
  // pass in the registrant's token if meeting or webinar requires registration.
  var registrantToken = ''

  function HideJoinAudio () {

    let joinBtn=document.getElementsByClassName("join-audio-by-voip__join-btn")[0];

    if(joinBtn) {
      wait(JoinAudioAuto, 0.5);
    } else {
      wait(OpenJoinAudio, 0.5);
      wait(JoinAudioAuto, 0.5);
    }

    return;
  }

function OpenJoinAudio () {

  let btn=document.getElementsByClassName("join-audio-container__btn")[0];
  let joinDialog=document.getElementsByClassName("join-dialog")[0];

  if(btn && !joinDialog) {
      btn.click();
  }

  return;
}

function JoinAudioAuto () {
  let btn=document.getElementsByClassName("join-audio-by-voip__join-btn")[0];

  if(btn) {
      btn.click();
  }

  return;
}

const wait = ( callback, seconds) => {
  return window.setTimeout( callback, seconds * 1000 );
}

  function getSignature() {
    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.token)
    }).catch(error => {
      console.error(error)
    })
  };

  function startMeeting(signature) {
    //document.getElementsByTagName('header')[0].style.display='none';
    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {        
        var translations = ZoomMtg.i18n.getAll("es-ES");
        var overridenTranslations = Object.assign({}, translations, {
         "apac.wc_chat.type_msg": "Escribir mensaje aqu…",
        });
        ZoomMtg.i18n.load(overridenTranslations, 'es-ES');
        ZoomMtg.i18n.reload('es-ES');

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          sdkKey: sdkKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            HideJoinAudio();
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  const decryptUser = () => {
    const userId = searchParams.get('id'); // "testCode"
    
    fetch('https://neoestudio.net/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
        })
      }).then(res => res.json())
      .then(response => {
        if(response.status==='Successfull') {
            setUserName(response.data.userName);
        } else {
            window.location.replace(window.location.origin);
            alert('No se puede unir a la clase en vivo, el usuario no está registrado.');
        }
      }).catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    decryptUser();
    getSignature();
  },[])

  return (
    <div></div>
  )
}

export default Directo
