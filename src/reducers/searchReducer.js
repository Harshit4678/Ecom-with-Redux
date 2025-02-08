// filepath: /c:/Users/Harshit/OneDrive/Desktop/Web development/CODE WITH HARRY/React course/REACT Projects/ecom/src/reducers/searchReducer.js
const initialState = {
  query: "",
  results: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        query: action.payload,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        results: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
