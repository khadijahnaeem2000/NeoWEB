import React, {useState, useEffect} from 'react';
import * as Yup from 'yup';
import { saveLocalData } from 'services/auth/localStorageData';
import { useMutation } from 'react-query';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { isDesktop, isMobile, mobileModel, deviceDetect } from 'react-device-detect';
import ErrorService from 'services/formatError/ErrorService';
import { Navigate } from 'react-router';
import { Device } from '@capacitor/device';

import iosUser from '../../../assets/img/user.png'
import iosPassword from '../../../assets/img/password.png'
import iosBtn2 from '../../../assets/img/images/Boton-Iniciar-Sesion.png'
import buttonImage from '../../../assets/img/images/Boton-Iniciar-Sesion.png';

function LoginTypeTrue() {
  const [toNext, setToNext] = useState(false)

  const LoginApiTrue = useMutation(
    (LoginApi) => userServices.commonPostService('/loginStudent', LoginApi),
    {
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (data) => {
        if (data.data.status === 'Sucessfull') {
          if(data.data.data.IsBlocked==="True") {
            toast.error('¡Estás bloqueado, por favor contacta al administrador!');
          }
          else {
            saveLocalData(data.data.data,data.data.time);
            setToNext(true);
          }
        } else {
          toast.error(
            <div dangerouslySetInnerHTML={{ __html: data.data.message }} />
          );
        }
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      type: 'true',
      studentCode: '',
      password: '',
      smartphone:'',
    },
    validationSchema: Yup.object().shape({
      studentCode: Yup.string().required('necesario'),
      password: Yup.string().required('necesario'),
    }),
    onSubmit: async (values) => {
      LoginApiTrue.mutate(values);
    },
  });

  useEffect (() => {
    checkDevice();
  },[])

  const checkDevice = async () => {
    if(isDesktop) {
      const info = await Device.getInfo();
      formik.setFieldValue('smartphone', deviceDetect().browserName +" on "+ info.model);
    }
    else {
      formik.setFieldValue('smartphone', mobileModel)
    }
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='relative w-full mb-1'>
          <div className='relative flex w-full flex-wrap items-stretch'>
            <span className='z-10 h-full leading-snug font-normal absolute text-center text-black absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-5 ml-2'>
            <img alt='studentcode_icon' src={require('assets/img/user.webp').default} srcSet={iosUser} className='w-full h-full py-2'/>
            </span>
            <input
              type='text'
              placeholder='Nombre de usuario'
              className='px-3 py-7 placeholder-blueGray-800 text-blueGray-600 relative bg-input rounded outline-none focus:outline-none focus:shadow-outline w-full pl-10'
              name='studentCode'
              id='studentCode'
              style={{lineHeight:'10%'}}
              value={formik.values.studentCode}
              onChange={(e) =>
                formik.setFieldValue('studentCode', e.target.value)
              }
            />
            {formik.touched.studentCode && formik.errors.studentCode ? (
              <div className='text-red-600 text-xs'>
                {formik.errors.studentCode}
              </div>
            ) : null}
          </div>
        </div>

        {/* <div className='relative w-full mb-3'>
          <div class='relative flex w-full flex-wrap items-stretch mb-3'>
            <span class='z-10 h-full leading-snug font-normal absolute text-center text-black absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
              <i class='fas fa-user'></i>
            </span>
            <input
              type='text'
              placeholder='studentCode'
              class='px-3 py-3 placeholder-blueGray-800 text-blueGray-600 relative bg-input rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10'
              name='studentCode'
              id='studentCode'
              value={formik.values.studentCode}
              onChange={(e) =>
                formik.setFieldValue('studentCode', e.target.value)
              }
              placeholder='studentCode'
            />

          
          </div>
        </div> */}

        <div className='relative w-full mb-3'>
          {/* <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Password
                    </label> */}
          <div className='relative flex w-full flex-wrap items-stretch'>
            <span className='z-10 h-full leading-snug font-normal absolute text-center text-black absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-5 ml-2'>
            <img alt='password_icon' src={require('assets/img/password.webp').default} srcSet={iosPassword} className='w-full h-full py-1.5 px-0.5'/>
            </span>
            <input
              type='password'
              placeholder='Contraseña'
              className='px-3 py-7 placeholder-blueGray-800 text-blueGray-600 relative bg-input rounded text-sm outline-none focus:outline-none focus:shadow-outline w-full pl-10'
              name='password'
              id='password'
              style={{lineHeight:'10%'}}
              value={formik.values.password}
              onChange={(e) => formik.setFieldValue('password', e.target.value)}
            />

            {formik.touched.password && formik.errors.password ? (
              <div className='text-red-600 text-xs'>
                {formik.errors.password}
              </div>
            ) : null}
          </div>
        </div>

        <div className='text-center'>
          <button
            className='text-white text-sm font-bold uppercase py-1 outline-none focus:outline-none  '
            type='submit'
          >
            <img
              alt='...'
              className='w-full h-full mr-1'
              src={buttonImage}
              // srcSet={iosBtn2}
            />
            {toNext ? <Navigate to="/" /> : null}
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginTypeTrue;
