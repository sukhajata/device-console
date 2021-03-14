import {  getDataServiceUrl, getAuthServiceUrl } from "./urlHelper";
import axios from "axios";

const INST_VIEW = "INST";
const UPLINK_VIEW = "UPLINK";
const OPALARMS_VIEW = "opalarms_latest_view";
const ALARMS_VIEW = "ALARM";
const ALARMS_VIEW_GROUPED = "alarms_view_grouped";
const CONNECTIONS_VIEW = "CONNECTIONS";
const GATEWAY_VIEW = "GATEWAYS";
const GATEWAY_PERFORMANCE_VIEW = "gateway_aggregate_24hours";
const PQ_VIEW = "PQ";
const ENERGY_VIEW = "ENERGY";
const PROCESSED_VIEW = "PROCESSED";
const HARMONICS_LOWER_VIEW = "HARMONICS_LOWER";
const HARMONICS_UPPER_VIEW = "HARMONICS_UPPER";

const getOptions = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
        }
    };
};

const getFormattedValue = part => {
    if (part < 10) {
        return `0${part}`;
    }
    return `${part}`
}

const getUTCString = subtractSeconds => {
    const dd = new Date(Date.now() - (subtractSeconds * 1000)); 
    const formatted = `${dd.getUTCFullYear()}-${getFormattedValue(dd.getUTCMonth() + 1)}-${getFormattedValue(dd.getUTCDate())} ${getFormattedValue(dd.getUTCHours())}:${getFormattedValue(dd.getUTCMinutes())}:${getFormattedValue(dd.getUTCSeconds())}Z`;
    return formatted;
}

const getDataToken = async(keycloakToken) => {
    const api = `${getAuthServiceUrl()}/datatoken`;
    const response = await axios.get(api, getOptions(keycloakToken));
    return response.data;
};

const dataAPI = {
    getPQMsgData: async (deviceEUI, sinceSeconds, dataToken, phase=undefined, limit=1) => {
        //const dataToken = await getDataToken(token);
        const starttime = getUTCString(sinceSeconds);
        let url = `${getDataServiceUrl()}/${PQ_VIEW}?DEVICEEUI=eq.${deviceEUI}&TIMESTAMP=gte.${encodeURIComponent(starttime)}&order=TIMESTAMP.desc&limit=${limit}`;
        if (phase) {
            url = url + `&PHASE=eq.${phase}`;
        }
        let options = getOptions(dataToken, limit);
        const response = await axios.get(url, options);
        return response.data;
    },
    getInstMsgData: async (deviceEUI, sinceSeconds, dataToken, phase=undefined, limit=1) => {
        //const dataToken = await getDataToken(token);
        const starttime = getUTCString(sinceSeconds);
        let url = `${getDataServiceUrl()}/${INST_VIEW}?DEVICEEUI=eq.${deviceEUI}&TIMESTAMP=gte.${encodeURIComponent(starttime)}&order=TIMESTAMP.desc&limit=${limit}`;
        if (phase) {
            url = url + `&PHASE=eq.${phase}`;
        }
        let options = getOptions(dataToken);
        const response = await axios.get(url, options);
        return response.data;
    },
    getUplinkMsgData: async (deviceEUI, sinceSeconds, dataToken, limit=1) => {
        //const dataToken = await getDataToken(token);
        const starttime = getUTCString(sinceSeconds);
        const url = `${getDataServiceUrl()}/${UPLINK_VIEW}?DEVICEEUI=eq.${deviceEUI}&TIMESTAMP=gte.${encodeURIComponent(starttime)}&order=TIMESTAMP.desc&limit=${limit}`;
        let options = getOptions(dataToken);
        const response = await axios.get(url, options);
        return response.data;
    },
    getEnergyMsgData: async (deviceEUI, sinceSeconds, dataToken, phase=undefined, limit=1) => {
        //const dataToken = await getDataToken(token);
        const starttime = getUTCString(sinceSeconds);
        let url = `${getDataServiceUrl()}/${ENERGY_VIEW}?DEVICEEUI=eq.${deviceEUI}&TIMESTAMP=gte.${encodeURIComponent(starttime)}&order=TIMESTAMP.desc&limit=${limit}`;
        if (phase) {
            url = url + `&PHASE=eq.${phase}`;
        }
        let options = getOptions(dataToken);
        const response = await axios.get(url, options);
        return response.data;
    },
    getProcessedMsgData: async (deviceEUI, sinceSeconds, dataToken, phase=undefined, limit=1) => {
        //const dataToken = await getDataToken(token);
        const starttime = getUTCString(sinceSeconds);
        let url = `${getDataServiceUrl()}/${PROCESSED_VIEW}?DEVICEEUI=eq.${deviceEUI}&TIMESTAMP=gte.${encodeURIComponent(starttime)}&order=TIMESTAMP.desc&limit=${limit}`;
        if (phase) {
            url = url + `&PHASE=eq.${phase}`;
        }
        let options = getOptions(dataToken);
        const response = await axios.get(url, options);
        return response.data;
    },
    getMeterStatus: async (deviceEUI, sinceSeconds, dataToken, limit=1) => {
        const starttime = getUTCString(sinceSeconds);
        const api = `${getDataServiceUrl()}/METER_STATUS?DEVICEEUI=eq.${deviceEUI}&TIMESTAMP=gte.${encodeURIComponent(starttime)}&order=TIMESTAMP.desc&limit=${limit}`;;
        let options = getOptions(dataToken);
        const response = await axios.get(api, options);
        return response.data;
    },
    getHarmonicsLowerMsgData: async (deviceEUI, sinceSeconds, dataToken, limit=1) => {
        //const dataToken = await getDataToken(token);
        const starttime = getUTCString(sinceSeconds);
        const url = `${getDataServiceUrl()}/${HARMONICS_LOWER_VIEW}?DEVICEEUI=eq.${deviceEUI}&TIMESTAMP=gte.${encodeURIComponent(starttime)}&order=TIMESTAMP.desc&limit=${limit}`;
        let options = getOptions(dataToken);
        const response = await axios.get(url, options);
        return response.data;
    },
    getHarmonicsUpperMsgData: async (deviceEUI, sinceSeconds, dataToken, limit=1 ) => {
        //const dataToken = await getDataToken(token);
        const starttime = getUTCString(sinceSeconds);
        const url = `${getDataServiceUrl()}/${HARMONICS_UPPER_VIEW}?DEVICEEUI=eq.${deviceEUI}&TIMESTAMP=gte.${encodeURIComponent(starttime)}&order=TIMESTAMP.desc&limit=${limit}`;
        let options = getOptions(dataToken);
        const response = await axios.get(url, options);
        return response.data;
    },
    getOpAlarms: async(sinceSeconds, dataToken) => {
        //const dataToken = await getDataToken(token);
        const starttime = getUTCString(sinceSeconds);
        const url = `${getDataServiceUrl()}/${OPALARMS_VIEW}?TIMESTAMP=gte.${encodeURIComponent(starttime)}&order=TIMESTAMP.desc`;
        let options = getOptions(dataToken);
        const response = await axios.get(url, options);
        return response.data;
    },
    getAlarms: async (sinceSeconds, dataToken) => {
        //const dataToken = await getDataToken(token);
        const starttime = getUTCString(sinceSeconds);
        const url = `${getDataServiceUrl()}/${ALARMS_VIEW_GROUPED}?LATESTTIME=gte.${encodeURIComponent(starttime)}&order=LATESTTIME.desc`;
        let options = getOptions(dataToken);
        const response = await axios.get(url, options);
        return response.data;
    },
    getAlarmsMsgData: async (deviceEUI, sinceSeconds, dataToken, phase=undefined, limit=1) => {
        //const dataToken = await getDataToken(token);
        const starttime = getUTCString(sinceSeconds);
        let url = `${getDataServiceUrl()}/${ALARMS_VIEW}?DEVICEEUI=eq.${deviceEUI}&TIMESTAMP=gte.${encodeURIComponent(starttime)}&order=TIMESTAMP.desc&limit=${limit}`;
        if (phase) {
            url = url + `&PHASE=eq.${phase}`;
        }
        let options = getOptions(dataToken);
        const response = await axios.get(url, options);
        return response.data;
    },
    getConnections: async (dataToken) => {
        //const dataToken = await getDataToken(token);
        const url = `${getDataServiceUrl()}/${CONNECTIONS_VIEW}?order=FIRMWARE.desc`;
        let options = getOptions(dataToken);
        const response = await axios.get(url, options);
        return response.data;
    },
    getGatewayPerformance: async dataToken => {
        //const dataToken = await getDataToken(token);
        const api = `${getDataServiceUrl()}/${GATEWAY_PERFORMANCE_VIEW}`;
        let options = getOptions(dataToken);
        const response = await axios.get(api, options);
        return response.data;
    },
    getGateways: async dataToken => {
        //const dataToken = await getDataToken(token);
        const api = `${getDataServiceUrl()}/${GATEWAY_VIEW}`;
        let options = getOptions(dataToken);
        const response = await axios.get(api, options);
        return response.data;
    },
};

export default dataAPI;