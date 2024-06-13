var localStorageCart = JSON.parse(localStorage.getItem('localDealsCart')) || [];

const initialState = {
  userCart: localStorageCart,
  userCartLength: localStorageCart.length,
};

function CartManagement(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'AddToCart':
      return {
        ...state,

        userCart: payload,

        userCartLength: payload.length,
      };

    default:
      return state;
  }
}

export default CartManagement;
