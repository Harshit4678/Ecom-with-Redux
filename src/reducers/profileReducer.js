const initialState = {
  userProfile: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_PROFILE":
      return {
        ...state,
        userProfile: action.payload,
      };
    case "UPDATE_USER_PROFILE":
      return {
        ...state,
        userProfile: action.payload,
      };
    // other cases
    default:
      return state;
  }
};

export default profileReducer;
