const initialState = {
  isLoading: false,
  data: [],
  error: '',
};

function dealsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'fetch_pending':
      return {
        ...state,

        isLoading: true,
      };

    case 'fetch_Success':
      return {
        ...state,

        isLoading: false,
        data: payload,
      };

    case 'fetch_Error':
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
}

export default dealsReducer;
