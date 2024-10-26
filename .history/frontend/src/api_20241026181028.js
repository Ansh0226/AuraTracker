import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Adjust based on your backend URL

export const googleLogin = async (idToken) => {
  const response = await axios.post(`${API_URL}/google`, { idToken });
  return response.data;
};
