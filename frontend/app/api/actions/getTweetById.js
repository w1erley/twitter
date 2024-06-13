import axiosClient from "../axios-client";
import getCurrentUser from "./getCurrentUser";

const getTweetById = async (tweetId) => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.username) {
    return [];
  }

  try {
    const response = await axiosClient.get(`/tweets/${tweetId}`);

    // Respond with the newly created tweet
    return response.data;
  } catch (error) {
      console.error('Error getting tweet:', error.response?.data || error.message);
      return error;
  }
};

export default getTweetById;
