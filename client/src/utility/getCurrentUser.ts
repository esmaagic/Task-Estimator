import axios from 'axios';
axios.defaults.withCredentials = true;

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
