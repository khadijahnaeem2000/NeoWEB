import { SIGNUP_USER } from './type';
import { shopper, smallbusiness } from '../../../config/config';
import userServices from '../../../services/httpService/userAuth/userServices';
import history from '../../../history';
import { useMutation, useQuery } from 'react-query';
import {
  getLocalUserdata,
  localStorageData,
} from '../../../services/auth/localStorageData';
export const userSignup = (data) => async (dispatch) => {
  dispatch({
    type: 'User_Register_pending',
    payload: 'pending',
  });

  return userServices.signUp(data).then(
    (response) => {
      dispatch({
        type: 'User_Register_Success',
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: 'User_Error_Register',
        payload: message,
      });

      return Promise.reject();
    }
  );

  // try {
  //     const res = await userServices.signUp({ data })

  //     // dispatch({
  //     //     type: SIGNUP_USER,
  //     //     payload: res.data,
  //     // });

  //     return Promise.resolve(res.data);
  // } catch (err) {

  //     console.log(err)
  //     return Promise.resolve(err);
  // }
};

export const login = (data) => (dispatch) => {
  dispatch({
    type: 'User_login_pending',
    payload: 'pending',
  });

  return userServices.login(data).then(
    (response) => {
      console.log(response.data);
      if (response.data.token) {
        localStorage.setItem('localdealtoken', JSON.stringify(response.data));

        dispatch({
          type: 'User_login_Success',
          payload: 'done',
        });
      } else {
        dispatch({
          type: 'User_Error',
          payload: 'Token Not Valid',
        });

        throw 'Some problem ';
      }

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: 'User_Error',
        payload: message,
      });

      console.log(message);

      return Promise.reject();
    }
  );
};

export const applyForForgetPass = (data) => {
  userServices.applyForForgetPass(data).then(
    (response) => {
      //// alert(response.data);

      return response.data;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return message;
    }
  );
};

const switchRoles = (data) => (dispatch) => {
  let newrole;
  if (data == smallbusiness) {
    newrole = shopper;
  } else {
    newrole = smallbusiness;
  }

  dispatch({
    type: 'ChangeCurrentRole',
    payload: newrole,
  });

  history.push(`/${newrole}`);
};
export const ChangeUserRoles = (data) => (dispatch) => {
  if (data == shopper) {
    dispatch({
      type: 'ChangeCurrentRole',
      payload: data,
    });

    history.push(`/${data}`);
  } else {
    if (localStorageData('_id')) {
      userServices
        .commonGetService(`/isSellerExist/${localStorageData('_id')}`)
        .then(
          (response) => {
            if (response.data == 'sellerExist') {
              dispatch({
                type: 'ChangesmallbusinessPass',
                payload: true,
              });
            } else {
              /// alert('seller not  exist');

              history.push('businessdetail');
            }
          },
          (error) => {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
    } else {
      dispatch({
        type: 'ChangeCurrentRole',
        payload: data,
      });

      history.push(`/${data}`);
    }
  }
};
