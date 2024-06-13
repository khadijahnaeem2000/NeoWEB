import { shopper } from '../../../config/config';

const initialState = {
  currentRole: shopper,
  smallbusinessPass: false,
};

function UpdateUserRoles(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'ChangeCurrentRole':
      return {
        ...state,

        currentRole: payload,
      };

    case 'ChangesmallbusinessPass':
      return {
        ...state,

        smallbusinessPass: payload,
      };
    default:
      return state;
  }
}

export default UpdateUserRoles;
