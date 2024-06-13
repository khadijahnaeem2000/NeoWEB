import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useMutation } from 'react-query';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';

import ErrorService from 'services/formatError/ErrorService';
import { localStorageData } from 'services/auth/localStorageData';
function Course() {
  const [exam, setExam] = useState();
  const examListing = useMutation(
    (ExamApi) => userServices.commonPostService('/getAllExam', ExamApi),
    {
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (data) => {
        console.log('-------------------');
        console.log(data.data);
        setExam(data.data.data);
      },
    }
  );

  useEffect(() => {
    console.log(localStorageData('id'));
    examListing.mutate({
      studentId: localStorageData('id'),
      studentType: localStorageData('type'),
    });
  }, []);
  return (
    <div>
      <main>
        <section className='relative w-full py-24 h-full  min-h-screen '>
          <Container maxWidth='sm'>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <img src='https://i.ibb.co/cb9MQCd/audiolibro.png' alt='' />
                <div className='text-center text-gray-600'>Conocimientos</div>
              </Grid>
              <Grid item xs={3}>
                <img src='https://i.ibb.co/cb9MQCd/audiolibro.png' alt='' />
                <div className='text-center text-gray-600'>Ingles</div>
              </Grid>
              <Grid item xs={3}>
                <img src='https://i.ibb.co/cb9MQCd/audiolibro.png' alt='' />
                <div className='text-center text-gray-600'>Psicotecnicos</div>
              </Grid>
              <Grid item xs={3}>
                <img src='https://i.ibb.co/cb9MQCd/audiolibro.png' alt='' />
                <div className='text-center text-gray-600'>Ortografia</div>
              </Grid>
            </Grid>
            {exam === '' ? (
              <div>loading</div>
            ) : (
              <div className='text-center text-3xl text-black font-bold my-6'>
                {/* Tema 1 - Derecho penal */}

                {/* {exam.folderName} */}
              </div>
            )}

            <Grid container spacing={3}>
              <Grid item xs={3}>
                <div className='text-center text-gray-600'>Examen 1</div>
                <div className='text-center text-gray-600'>Examen 2</div>
                <div className='text-center text-gray-600'>Examen 3</div>
                <div className='text-center text-gray-600'>Examen 4</div>
              </Grid>
              <Grid item xs={3}>
                <div className='text-center text-gray-600'>Ingles 1</div>
                <div className='text-center text-gray-600'>Ingles 2</div>
              </Grid>
              <Grid item xs={3}>
                <div className='text-center text-gray-600'>Psico 1</div>
              </Grid>
              <Grid item xs={3}>
                <div className='text-center text-gray-600'>Orto 1</div>
                <div className='text-center text-gray-600'>Orto 2</div>
                <div className='text-center text-gray-600'>Orto 3</div>
                <div className='text-center text-gray-600'>Orto 4</div>
                <div className='text-center text-gray-600'>Gramatics</div>
              </Grid>
            </Grid>
          </Container>
        </section>
      </main>
    </div>
  );
}
export default Course;
