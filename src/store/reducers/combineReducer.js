import { combineReducers } from 'redux';
import userReducer from './auth/userReducer';
import dealsReducer from './Deals/dealsReducer';
import CartManagement from './cartManegement/CartManagement';

import roles from './userLocalInfo/roles';
export const master = combineReducers({
  userInfo: userReducer,
  deals: dealsReducer,
  Cart: CartManagement,

  userRole: roles,
});
