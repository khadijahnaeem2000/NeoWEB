import { toast } from 'react-toastify';

export const DeleteProductCart =
  (shopNumber, ProductNumber) => async (dispatch) => {
    const localStorageCart =
      JSON.parse(localStorage.getItem('localDealsCart')) || [];
    localStorageCart[shopNumber].products.splice(ProductNumber, 1);

    if (localStorageCart[shopNumber].products.length === 0) {
      localStorageCart.splice(shopNumber, 1);
    }
    localStorage.setItem('localDealsCart', JSON.stringify(localStorageCart));
    dispatch({
      type: 'AddToCart',
      payload: JSON.parse(localStorage.getItem('localDealsCart')) || [],
    });

    //   localStorage.setItem('localDealsCart', JSON.stringify(newCart));
    //   console.log(newCart);
    //   dispatch({
    //     type: 'AddToCart',
    //     payload: newCart,
    //   });
  };

export const DeleteShop = (shopNumber) => async (dispatch) => {
  const localStorageCart =
    JSON.parse(localStorage.getItem('localDealsCart')) || [];

  localStorageCart.splice(shopNumber, 1);

  localStorage.setItem('localDealsCart', JSON.stringify(localStorageCart));
  dispatch({
    type: 'AddToCart',
    payload: JSON.parse(localStorage.getItem('localDealsCart')) || [],
  });
};

export const IncerementProductCart =
  (shopNumber, ProductNumber) => async (dispatch) => {
    let localStorageCart =
      JSON.parse(localStorage.getItem('localDealsCart')) || [];

    localStorageCart[shopNumber].products[ProductNumber].quantity =
      localStorageCart[shopNumber].products[ProductNumber].quantity + 1;

    // if (localStorageCart[shopNumber].products.length == 0) {
    //   localStorageCart.splice(shopNumber, 1);
    // }
    localStorage.setItem('localDealsCart', JSON.stringify(localStorageCart));
    dispatch({
      type: 'AddToCart',
      payload: JSON.parse(localStorage.getItem('localDealsCart')) || [],
    });
  };

export const DecerementProductCart =
  (shopNumber, ProductNumber) => async (dispatch) => {
    let localStorageCart =
      JSON.parse(localStorage.getItem('localDealsCart')) || [];

    if (
      localStorageCart[shopNumber].products[ProductNumber].quantity - 1 ===
      0
    ) {
      toast.error('You cannot set quantity to zero');
    } else {
      localStorageCart[shopNumber].products[ProductNumber].quantity =
        localStorageCart[shopNumber].products[ProductNumber].quantity - 1;

      // if (localStorageCart[shopNumber].products.length == 0) {
      //   localStorageCart.splice(shopNumber, 1);
      // }
      localStorage.setItem('localDealsCart', JSON.stringify(localStorageCart));
      dispatch({
        type: 'AddToCart',
        payload: JSON.parse(localStorage.getItem('localDealsCart')) || [],
      });
    }
  };

export const CartAction = (cartData) => async (dispatch) => {
  var localStorageCart =
    JSON.parse(localStorage.getItem('localDealsCart')) || [];

  if (localStorageCart === '') {
    let cartObj = makeNewCartObject(cartData);
    console.log(cartData);
    localStorage.setItem('localDealsCart', JSON.stringify([cartObj]));

    // dispatch({
    //   type: 'AddToCart',
    //   payload: [cartObj],
    // });
  } else {
    if (checkIfalreadyShopExist(localStorageCart, cartData) === true) {
      checkIfalreadyProductExist(localStorageCart, cartData);
      localStorage.setItem('localDealsCart', JSON.stringify(localStorageCart));
      //
      /// console.log(localStorageCart);
    } else {
      let cartObj = makeNewCartObject(cartData);
      localStorageCart.push(cartObj);
      localStorage.setItem('localDealsCart', JSON.stringify(localStorageCart));
      ////  console.log(localStorageCart);
    }

    console.log(localStorageCart);

    // dispatch({
    //   type: 'AddToCart',
    //   payload: localStorageCart,
    // });
    /////  CartAction('dsfs');
  }
  dispatch({
    type: 'AddToCart',
    payload: JSON.parse(localStorage.getItem('localDealsCart')) || [],
  });
};

function checkIfalreadyShopExist(localStorageCart, cartData) {
  for (var i = 0; i < localStorageCart.length; i++) {
    if (localStorageCart[i].shopId === cartData.shopId) {
      return true;
    }
  }
  return false;
}

function checkIfalreadyProductExist(localStorageCart, cartData) {
  for (var i = 0; i < localStorageCart.length; i++) {
    if (localStorageCart[i].shopId === cartData.shopId) {
      for (var j = 0; j < localStorageCart[i].products.length; j++) {
        if (localStorageCart[i].products[j].productId === cartData.productId) {
          if (
            localStorageCart[i].products[j].color === cartData.color &&
            localStorageCart[i].products[j].size === cartData.size
          ) {
            localStorageCart[i].products[j].quantity =
              localStorageCart[i].products[j].quantity + cartData.quantity;

            return true;
          }
        }
      }

      //// for loop end here

      let newProduct = makeNewProductObject(cartData);

      localStorageCart[i].products.push(newProduct);

      return true;
    }
  }

  return false;
}

function makeNewCartObject(cartData) {
  let productAray = {
    productId: cartData.productId,
    quantity: cartData.quantity,
    color: cartData.color,
    size: cartData.size,
    postageFee: cartData.postageFee,
    nowPrice: cartData.nowPrice,

    data: cartData.data,
  };

  let cartObj = {
    shopId: cartData.shopId,
    shopName: cartData.shopName,
    shopImg: cartData.shopImg,
    products: [productAray],
  };
  ///let cartObjectArray = [cartObj];
  return cartObj;
}

function makeNewProductObject(cartData) {
  let productAray = {
    productId: cartData.productId,
    quantity: cartData.quantity,
    color: cartData.color,
    size: cartData.size,
    postageFee: cartData.postageFee,
    nowPrice: cartData.nowPrice,

    data: cartData.data,
  };

  return productAray;
}
