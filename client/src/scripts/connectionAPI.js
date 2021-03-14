import axios from 'axios';
import { getConnectionServiceUrl } from './urlHelper';

const api = getConnectionServiceUrl();

const getOptions = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
        }
    };
};

export default{
    getLocationDetails: async (icp, token) => {
        const url = `${api}/location/${icp}`;
        const response = await axios.get(url, getOptions(token));
        return response.data;
    },
    getConnections: async token => {
        const url = `${api}/connections`;
        const response = await axios.get(url, getOptions(token));
        return response.data;
    },
    getConnectionById: async (id, token) => {
        const url = `${api}/connections/${id}`;
        const response = await axios.get(url, getOptions(token));
        return response.data;
    },
    getDeviceBySerialNumber: async (serialNumber, token) => {
        const url = `${api}/device/${serialNumber}`;
        const response = await axios.get(url, getOptions(token));
        return response.data;
    },
    createPendingConnection: async (connection, token) => {
        const url = `${api}/connectionspending`;
        const response = await axios.post(url, connection, getOptions(token));
        return response.data;
    },    
    createConnection: async (connection, oldIdentifier, token) => {
        const url = `${api}/connections`;
        const data = { connection, oldIdentifier };
        const response = await axios.post(url, data, getOptions(token));
        return response.data;
    },
    updateConnection: async (identifier, connection, token) => {
        const url = `${api}/connections`;
        const data = { 
            identifier,
            connection 
        };
        const response = await axios.put(url, data, getOptions(token));
        return response.data;
    },
    getImage: async (identifier, token) => {
        const url = `${api}/image/${identifier}`;
        const response = await axios.get(url, getOptions(token));
        return response.data;
    },
    createImage: async (image, token) => {
        const url = `${api}/image`;
        const response = await axios.post(url, image, getOptions(token));
        return response.data;
    },
    deleteImage: async (identifier, token) => {
        const url = `${api}/image/${identifier}`;
        const response = await axios.delete(url, getOptions(token));
        return response.data;
    },
    updateJob: async (identifier, job, token) => {
        const url = `${api}/job`;
        const data = { 
            identifier,
            job 
        };
        const response = await axios.put(url, data, getOptions(token));
        return response.data;
    },
    updateConnectionState: async (identifier, connectionState, token) => {
        const url = `${api}/state`;
        const data = { 
            identifier,
            connectionState 
        };
        const response = await axios.put(url, data, getOptions(token));
        return response.data;
    },
    deleteConnection: async (identifier, token) => {
        const url = `${api}/connections/${identifier}`;
        const response = await axios.delete(url, getOptions(token));
        return response.data;
    },
    addSlot: async (identifier, slot, token) => {
        const url = `${api}/slot`;
        const data = { 
            identifier, 
            slot,
        }
        const response = await axios.post(url, data, getOptions(token));
        return response.data;
    },
}