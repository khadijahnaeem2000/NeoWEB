import { SIGNUP_USER } from '../../actions/userAction/type';

var userlogin = {
  isLoading: false,
  error: '',
};

var userRegister = {
  isLoading: false,
  error: '',
  success: '',
};

const initialState = {
  userlogin,
  userRegister,
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_USER:
      return [...state, payload];

    case 'User_Error_Register':
      return {
        ...state,
        userRegister: {
          ...userRegister,
          error: payload,
        },
      };

    case 'User_Register_pending':
      return {
        ...state,
        userRegister: {
          ...userRegister,
          isLoading: true,
        },
      };

    case 'User_Register_Success':
      return {
        ...state,
        userRegister: {
          ...userRegister,
          isLoading: false,
          success: payload,
        },
      };

    case 'User_Error':
      return {
        ...state,
        userlogin: {
          ...userlogin,
          error: payload,
        },
      };

    case 'User_login_pending':
      return {
        ...state,
        userlogin: {
          ...userlogin,
          isLoading: true,
        },
      };

    case 'User_login_Success':
      return {
        ...state,
        userlogin: {
          ...userlogin,
          isLoading: false,
        },
      };

    default:
      return state;
  }
}

export default userReducer;
