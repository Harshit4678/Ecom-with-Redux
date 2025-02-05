import axios from "axios";

const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=
AIzaSyCiMrtylmUZVIDn12OkLJhNgd2haE0Ptzk`, // Replace YOUR_API_KEY with your actual API key
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error refreshing token:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Unable to refresh token");
  }
};

export const fetchUserProfile = (callback) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    if (!auth.idToken) {
      return callback({
        error: true,
        data: {
          error: "Please Login to view profile",
        },
      });
    }

    try {
      const response = await axios.get(
        `https://ecom-1ef8b-default-rtdb.firebaseio.com/users/${auth.localId}.json?auth=${auth.idToken}`
      );
      dispatch({
        type: "FETCH_USER_PROFILE",
        payload: response.data,
      });
      return callback({
        error: false,
        data: response.data,
      });
    } catch (error) {
      console.error(
        "Error fetching user profile:",
        error.response ? error.response.data : error.message
      );
      if (error.response && error.response.status === 401) {
        // Token might be expired, try to refresh it
        try {
          const tokenData = await refreshToken(auth.refreshToken);
          // Update the state with new tokens
          dispatch({
            type: "UPDATE_TOKENS",
            payload: {
              idToken: tokenData.id_token,
              refreshToken: tokenData.refresh_token,
            },
          });
          // Retry fetching the user profile with the new token
          const retryResponse = await axios.get(
            `https://ecom-1ef8b-default-rtdb.firebaseio.com/users/${auth.localId}.json?auth=${tokenData.id_token}`
          );
          dispatch({
            type: "FETCH_USER_PROFILE",
            payload: retryResponse.data,
          });
          return callback({
            error: false,
            data: retryResponse.data,
          });
        } catch (refreshError) {
          console.error(
            "Error refreshing token:",
            refreshError.response
              ? refreshError.response.data
              : refreshError.message
          );
          return callback({
            error: true,
            data: {
              error: "Unable to refresh token",
            },
          });
        }
      } else {
        return callback({
          error: true,
          ...error.response,
        });
      }
    }
  };
};

export const updateUserProfile = (userData, callback) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    if (!auth.idToken) {
      return callback({
        error: true,
        data: {
          error: "Please Login to update profile",
        },
      });
    }

    try {
      const response = await axios.put(
        `https://ecom-1ef8b-default-rtdb.firebaseio.com/users/${auth.localId}.json?auth=${auth.idToken}`,
        userData
      );
      dispatch({
        type: "UPDATE_USER_PROFILE",
        payload: response.data,
      });
      return callback({
        error: false,
        data: response.data,
      });
    } catch (error) {
      console.error(
        "Error updating user profile:",
        error.response ? error.response.data : error.message
      );
      return callback({
        error: true,
        ...error.response,
      });
    }
  };
};
