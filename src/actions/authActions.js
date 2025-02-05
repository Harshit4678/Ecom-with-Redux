import axios from "axios";

const BASE_URL = "https://identitytoolkit.googleapis.com/v1/";
const API_KEY = "AIzaSyCiMrtylmUZVIDn12OkLJhNgd2haE0Ptzk";

export const signupWithEmailAndPassword = (details, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${BASE_URL}accounts:signUp?key=${API_KEY}`,
        {
          email: details.email,
          password: details.password,
          returnSecureToken: true,
        }
      );

      console.log(response);
      dispatch({
        type: "SIGNUP",
        payload: response.data,
      });
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("localId", response.data.localId); // Store localId
      return callback(response.data);
    } catch (error) {
      console.log(error.response);
      return callback({
        error: true,
        response: error.response,
      });
    }
  };
};

export const loginWithEmailAndPassword = (details, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${BASE_URL}accounts:signInWithPassword?key=${API_KEY}`,
        {
          email: details.email,
          password: details.password,
          returnSecureToken: true,
        }
      );
      console.log(response);
      dispatch({
        type: "LOGIN",
        payload: response.data,
      });
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("localId", response.data.localId); // Store localId
      return callback(response.data);
    } catch (error) {
      console.log(error.response);
      return callback({
        error: true,
        response: error.response,
      });
    }
  };
};

export const checkIsLoggedIn = (callback) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const localId = localStorage.getItem("localId"); // Retrieve localId
    // console.log("Token:", token); // Debugging step
    // console.log("LocalId:", localId); // Debugging step
    if (!token || !localId) {
      return callback({ error: true, response: "No token or localId found" });
    }
    try {
      const response = await axios.post(
        `${BASE_URL}accounts:lookup?key=${API_KEY}`,
        {
          idToken: token,
        }
      );
      // console.log("Response:", response); // Debugging step
      dispatch({
        type: "LOGIN",
        payload: {
          idToken: token,
          localId: response.data.users[0].localId,
          ...response.data,
        },
      });
      return callback(response.data);
    } catch (error) {
      console.log("Error Response:", error.response); // Debugging step
      return callback({
        error: true,
        response: error.response,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("localId"); // Remove localId
    dispatch({
      type: "LOGOUT",
    });
  };
};
