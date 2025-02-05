const initialState = {
  userProfile: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "UPDATE_USER_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    // other cases
    default:
      return state;
  }
};

export default userReducer;
