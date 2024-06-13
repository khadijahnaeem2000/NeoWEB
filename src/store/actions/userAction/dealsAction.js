import userServices from '../../../services/httpService/userAuth/userServices';

export const fetchdeals = (data) => (dispatch) => {
  dispatch({
    type: 'fetch_pending',
    payload: 'pending',
  });

  return userServices.commonGetService('/fetchdeals', data).then(
    (response) => {
      dispatch({
        type: 'fetch_Success',
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
        type: 'fetch_Error',
        payload: message,
      });

      return Promise.reject();
    }
  );
};
