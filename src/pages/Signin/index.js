import React, { useState, useEffect} from 'react';
import { Navigate } from 'react-router';
import OtpInput from 'react18-input-otp';

import LoginTypeTrue from './Component/LoginTypeTrue';
import LoginTypeFalse from './Component/LoginTypeFalse';
import LoginNavbar from '../../components/Navbars/LoginNavbar';
import WebLoginVideo from '../../assets/img/images/Video Login Neoestudio 2023.mp4';
import iosMobileLoginVideo from '../../assets/img/images/Video Login 2022.mp4';
import androidMobileLoginVideo from '../../assets/img/images/Video Login 2022.webm';
import iosLogo from '../../assets/img/login_logo.png';
import iosEntrar from '../../assets/img/images/Botón probar gratis.png';
import { saveLocalData } from 'services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import './styles.css';

export default function Signin() {
  const [isToogleOn, setisToogleOn] = useState(false);
  const [verified, setVerified] = useState(true);
  const [otp, setOtp] = useState('');
  const [userData, setUserData] = useState({});
  const [toNext, setToNext] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const otpLength=6;
  const [pxRatio,setPxRatio] = useState(window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth);

  useEffect(() => {
    function checkIsMobile () {
      let newPx_ratio = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
      if(newPx_ratio !== pxRatio){
        setPxRatio(newPx_ratio);
        //console.log("zooming");
        setIsMobile(false);
      }else{
        //console.log("just resizing");
        const ismobile = window.innerWidth < 900;
        if (ismobile !== isMobile) {
          setIsMobile(ismobile);
        }      
      }
    }
    window.addEventListener("resize",checkIsMobile);
    return () => window.removeEventListener("resize",checkIsMobile);
  }, [isMobile]);

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };

  const handleSubmit = () => {
    if(otp.length===otpLength) {
      userServices.commonPostService('/verifyOTP',{"user_id":userData.id,"mobileotp":otp})
      .then ((response) => {
        if(response.data.status === 200) {
          saveLocalData(userData,userData.time);
          setToNext(true);
        }
        else {
          setOtp('');
          toast.error('Usuario no verificado, ingrese la OTP correcta.');
        }
      })
      .catch ((error) => {
        setOtp('');
        toast.error('Error al verificar ahora mismo.');
      })
    }
  };

  const updateVerified = (val) => {
    setVerified(val);
  }

  const updateData = (data) => {
    setUserData(data);
  }

  const sendOtp = (data) => {
    const {id, telephone} = userData;
    userServices.commonPostService('/MobileOTP',{"user_id":id,"mobile":telephone})
    .then(response => {
      toast.success('Código enviado a su teléfono.');
    })
    .catch(error => {
      toast.error('Error al enviar el código.');
    })

  }

  return (
    <>
      <div className={`flex justify-center ${isMobile?'relative w-full h-full min-h-screen':''}`}>
        <div
            className="absolute top-0 w-full h-full bg-white-800 bg-no-repeat bg-full bg-fixed"
            style={isMobile?{zIndex:-989898,visibility:'visible', backgroundImage:`url(${require("assets/img/bottom.webp").default}),url(${require("assets/img/bottom.png").default})`}:{visibility:'hidden'}}
        ></div>
        <video className={isMobile?'4xs:w-full 3xs:w-10/12':''} style={isMobile?{position:'absolute',height:'100vh', objectFit:'fill', zIndex:-1}:{position: 'fixed',right: 0,bottom: 0,minWidth: '100%',minHeight: '100%', objectFit:'fill', zIndex:-1}} alt="alt video" autoPlay loop muted controls='' playsInline>
          <source src={isMobile?'':WebLoginVideo} type="video/mp4"/>
          <source src={isMobile?androidMobileLoginVideo:''} type="video/webm"/>
          <source src={isMobile?iosMobileLoginVideo:''} type="video/mp4"/>
        </video>
        <div className='flex flex-col items-center justify-center'>
          <div className='sticky flex flex-col justify-center items-center' style={{maxWidth:'100%'}}>
            <span style={isMobile?{visibility:'hidden'}:{overflow:'auto',visibility:'visible',fontFamily: 'RoundedElegance-regular', marginTop:'1.5rem'}} className="text-white text-xs">La mejor academia online de ingreso a la Guardia Civil</span>
            <img style={isMobile?{visibility:'hidden'}:{visibility:'visible', maxWidth:'18%'}} className='7xl:w-15 sm:w-1/5' alt='logo' src={require('assets/img/login_logo.webp').default} srcSet={iosLogo}/>
          </div>
          {verified? 
          <div className={`flex flex-col items-center justify-center lg:px-10 pb-2 ${isMobile?"sm:w-2/5 xs:w-80 2xs:w-7/12 3xs:w-4/6 4xs:w-11/12":"7xl:w-1/12 6xl:w-15 5xl:w-2/12 4xl:w-1/5 3xl:w-28 desktop:w-2/6 laptop:w-2/5 xs:w-7/12"}`}>
            <div className="flex text-black mb-3 font-bold"style={{ justifyContent: "center" }}>
              <label className="switch">
                <input type="checkbox" id="togBtn" onChange={(e) => setisToogleOn(e.target.checked)}/>
                <div className="loginslider round">
                  <span className="on">Alumnos</span>
                  <span className="off">Prueba</span>
                </div>
              </label>
            </div>
            {isToogleOn === true ? (
              <LoginTypeTrue />
            ) : (
            
              <LoginTypeFalse updateData={updateData} updateVerified={updateVerified}/>
            )}
          </div> : 
          <div className={`flex flex-col items-center justify-center lg:px-10 pb-2 ${isMobile?"sm:w-2/5 xs:w-80 2xs:w-7/12 3xs:w-4/6 4xs:w-11/12":"7xl:w-1/12 6xl:w-15 5xl:w-2/12 4xl:w-1/5 3xl:w-28 desktop:w-2/6 laptop:w-2/5 xs:w-7/12"}`}>
            <div className="flex flex-col items-center mb-3 font-bold">
              <div className='font-styl '>Verificación de tu teléfono</div>
              <div style={{color:'#3ea9fb', marginTop:'1%'}}>Introduce el código del sms</div>
            </div>
            <div className='flex justify-center mt-8 mb-5'>
              <OtpInput onSubmit={handleSubmit} shouldAutoFocus={true} inputStyle='otpInputStyle' value={otp} onChange={handleChange} numInputs={otpLength} separator={<span>&nbsp;&nbsp;</span>} isInputNum={true}/>
            </div>
            <div className='text-center'>
              <button className='text-white text-sm font-bold uppercase px-6 py-1 outline-none focus:outline-none' type='button' onClick={handleSubmit} disabled={otp.length < otpLength}>
                <img alt='...' className='w-full h-full mr-1' src={require('assets/img/images/Botón-probar-gratis.webp').default} srcSet={iosEntrar}/>
              </button>
            </div>
            <div className='flex justify-center -mt-1'>
              <button onClick={sendOtp} className='text-white text-sm font-bold outline-none focus:outline-none'>
                ¿No recibiste el código?
              </button>
            </div>
            <div className='flex justify-center -mt-1'>
              <button onClick={sendOtp} className='text-white text-sm outline-none focus:outline-none'>
                Enviar de neuvo
              </button>
            </div>
          </div>
}
        </div>
      </div>
      {toNext ? <Navigate to="/" /> : null}
    </>
  );
}
