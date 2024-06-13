
import axios from 'axios';
import { getToken } from './actions/getToken'; // Adjust the path as necessary
import { signOut } from 'next-auth/react';

const axiosClient = axios.create({
    baseURL: `${process.env.EXTERNAL_API_URL}/api`, // Ensure you're using the correct environment variable
});

axiosClient.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;
            if (response.status === 401) {
                // Optionally handle token removal or redirect to login
                console.error('Unauthorized, logging out...');
                // signOut({ callbackUrl: '/login' });
            }
        } catch (e) {
            console.error(e);
        }

        throw error;
    }
);

export default axiosClient;
