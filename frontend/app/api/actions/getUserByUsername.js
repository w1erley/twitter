import axiosClient from "../axios-client";
import getCurrentUser from "./getCurrentUser";

const getUserByUsername = async ({username}) => {
  // const currentUser = await getCurrentUser();

  // if (!currentUser?.username) {
  //   throw new Error("Unauthenticated.");
  // }

  try {
    console.log("USERNAME", username);
    const response = await axiosClient.get(`/users/username/${username}`);

    // Respond with the newly created tweet
    return response.data;
  } catch (error) {
      console.error('Error getting user:', error.response?.data || error.message);
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
  }
};

export default getUserByUsername;
