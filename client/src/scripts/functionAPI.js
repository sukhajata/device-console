import axios from 'axios';
import { getFunctionServiceUrl } from './urlHelper';

const api = getFunctionServiceUrl();

const getOptions = (token) => {
  return {
      headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
      }
  };
};

export default {
  callDeviceFunction: async (data, token) => {
    const url = `${api}/function`;
    const response = await axios.post(url, data, getOptions(token));
    return response.data;
  },
  getDeviceFunctions: async(token) => {
    const url = `${api}/function`;
    const response = await axios.get(url, getOptions(token));
    return response.data;
  }
};