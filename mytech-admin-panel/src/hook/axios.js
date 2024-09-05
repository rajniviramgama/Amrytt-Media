import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = async (endpoint, method = "GET", data = null) => {
  try {
    const config = {
      method,
      url: `${API_URL}${endpoint}`,
      data,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("API error:", error?.response?.data || error?.message);
    throw error;
  }
};

export default axiosInstance;
