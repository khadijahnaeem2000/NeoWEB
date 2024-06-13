import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const history = useNavigate();

  const [slidersText] = useState([
    'Dummy Text 1',
    'Dummy Text 2',
    'Dummy Text 3',
    'Dummy Text 4',
    'Dummy Text 5',
    'Dummy Text 6',
    'Dummy Text 7',
  ]);

  return (
    <div className='bg-image12'>
      <div className='menuBackColor'></div>
      <div className='overflow-x-auto h-full w-full relative z-10'>
        <div className='flex'>
          <div className='text-white lg:ml-10 ml-4 my-10'>
            <p className='font-extrabold text-2xl ProximaNovaSoftW03'>
              000001@alumno.com
            </p>
            <p>
              <span className='font-black text-xl FontFreeNetProximaNovaSoftW03'>
                Usuario:
              </span>{' '}
              <span className='ProximaNovaSoftW03'>00001</span>
            </p>
            <p>
              <span className='font-black text-xl FontFreeNetProximaNovaSoftW03'>
                Baremo:
              </span>{' '}
              <span className='ProximaNovaSoftW03'>3</span>
            </p>
            <p>
              <span className='font-black text-xl FontFreeNetProximaNovaSoftW03'>
                N alumnos ranking:
              </span>{' '}
              <span className='ProximaNovaSoftW03'>315</span>
            </p>
          </div>
          <div className='flex ml-auto lg:mr-10 mr-5 mt-10'>
            <img
              alt='...'
              className='w-8 h-8 mr-3 cursor-pointer'
              src={require('assets/img/images/refresh.webp').default}
            />
            <img
              alt='...'
              className='w-10 h-10 cursor-pointer'
              src={require('assets/img/images/cross.webp').default}
              onClick={() => {
                history('/home');
              }}
            />
          </div>
        </div>
        {slidersText.map((x, i) => (
          <div key={i} className='flex'>
            <div className='w-3/4 lg:w-1/2 lg:ml-6 ml-2 relative mt-10'>
              <p className='absolute z-10 top-6 lg:top-9 md:top-10 left-10 text-white FontFreeNetProximaNovaSoftW03'>
                {x}
              </p>

              <Slider
                defaultValue={50}
                aria-label='Small'
                onChange={(e, val) => {
                  var span = document.getElementById('sliderId' + i);
                  span.children[3].textContent = val + '%';
                  if (val >= 80) {
                    span.classList.add('sliderMargin');
                  } else {
                    span.classList.remove('sliderMargin');
                  }
                }}
                id={'sliderId' + i}
              />
            </div>
            <div className='w-3/12 lg:w-1/2 flex content-center items-center justify-center mt-10 text-white FontFreeNetProximaNovaSoftW03'>
              0.44 pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
