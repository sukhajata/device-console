import axios from 'axios';
import base64 from 'base-64';

import { getAuthServiceUrl } from './urlHelper';

const getOptions = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
        }
    };
};

const parseToken = token => {
    if (!token) {
        return null;
    }
    try {
        var base64Url = token.split('.')[1];
        var b64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var decoded = base64.decode(b64);
        var json = JSON.parse(decoded);
    
        return json;
    } catch(err) {
        console.log(err);
        return null;
    }
};

const authAPI = {};

authAPI.getToken = async(username, password) => {
    const api = `${getAuthServiceUrl()}/token`;
    let data = {
        username,
        password
    };
    const response = await axios.post(api, data);
    return response.data;
};

authAPI.getRoles = async(token) => {
    const json = parseToken(token);
    if (json && json.realm_access && json.realm_access.roles) {
        return json.realm_access.roles;
    }
    return null;
};

authAPI.checkTokenExpiry = (token) => {
    const json = parseToken(token);
    if (json && json.exp) {
        if (json.exp < Date.now() / 1000) {
            return false;
        }
        return true;
    }

    return false;
   
};

authAPI.refreshToken = async(token, username, password) => {
    const valid = authAPI.checkTokenExpiry(token);
    if (!valid) {
        const newToken = await authAPI.getToken(username, password);
        return newToken;
    }
    return token;
};

authAPI.getDataToken = async(keycloakToken, dataToken) => {
    if (!dataToken) {
        const api = `${getAuthServiceUrl()}/datatoken`;
        const response = await axios.get(api, getOptions(keycloakToken));
        return response.data;
    }
    return dataToken;
};

authAPI.refreshDataToken = async(datatoken, keycloaktoken) => {
    const valid = authAPI.checkTokenExpiry(datatoken);
    if (!valid) {
        const newToken = await authAPI.getTDataoken(keycloaktoken);
        return newToken;
    }
    return datatoken;
};


export default authAPI;