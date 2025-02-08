export const setSearchQuery = (query) => ({
  type: "SET_SEARCH_QUERY",
  payload: query,
});

export const setSearchResults = (results) => ({
  type: "SET_SEARCH_RESULTS",
  payload: results,
});
