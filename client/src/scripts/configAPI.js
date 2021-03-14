import axios from 'axios';
import { getConfigServiceUrl } from './urlHelper';

const api = getConfigServiceUrl();

const getOptions = (token) => {
  return {
      headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
      }
  };
};

const configAPI = {
    getAllConfig: async (identifier, slot, token) => {
        const url = `${api}/getall/${identifier}/${slot}`;
        const response = await axios.get(url, getOptions(token));
        return response.data;
    },
    getConfigField: async (deviceEUI, slot, fieldName, token) => {
        const url = `${api}/get/${deviceEUI}/${fieldName}/${slot}`;
        const response = await axios.get(url, getOptions(token));
        return response.data;
    },
    setConfigField: async (deviceEUI, slot, fieldName, value, token) => {
        const url = `${api}/set`;
        const data = {
            deviceEUI: deviceEUI,
            slot: slot,
            fieldName: fieldName,
            fieldValue: value,
        }
        const response = await axios.post(url, data, getOptions(token));
        return response.data;
    },
}

export default configAPI;