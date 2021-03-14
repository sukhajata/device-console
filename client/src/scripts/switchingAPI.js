import axios from 'axios';
import { getSwitchingServiceURL } from "./urlHelper";

const api = getSwitchingServiceURL();

const getOptions = (token) => {
  return {
      headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
      }
  };
};

const switchingAPI = {
  sendRelayCommand: async (data, token) => {
    const url = `${api}/set`;
    const response = await axios.post(url, data, getOptions(token));
    return response.data;
  },
};

export default switchingAPI;