const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  successMsg: '',
}

const users = (state=initialState, action) => {
  switch(action.type){
    case 'CREATE_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMsg: '',
        successMsg: ''
      }
    }
    case 'CREATE_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message
      }
    }
    case 'CREATE_USER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        successMsg: action.payload.data.message
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default users