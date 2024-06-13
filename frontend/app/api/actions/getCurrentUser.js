import axiosClient from "../axios-client";

const getCurrentUser = async () => {
  try {
    const response = await axiosClient.get('/current-user'); //already has accessToken from getToken.js

    return response.data.user || null;
  }
  catch (error) {
    if (error.response && error.response.status === 401) {
        return null;
      }
    return error;
  }

};

export default getCurrentUser;
