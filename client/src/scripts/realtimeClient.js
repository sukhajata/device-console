import axios from "axios";
import { getRealtimeGetUrl, getRealtimeSocketIOUrl } from "./urlHelper";
import socketIOClient from "socket.io-client";

const getOptions = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
        }
    };
};

const getSocketIOOptions = token => (
    {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization: `Bearer ${token}`
                }
            }
        }
    }
);

export const INST = "stream_compacted_instmsg";
export const PQ = "stream_compacted_pqmsg";
export const ALARM = "stream_compacted_alarmmsg";
export const OPALARM = "stream_compacted_opalarms";
export const ENERGY = "stream_compacted_energymsg";
export const VOLTAGESTATS = "stream_compacted_voltagestats";
export const PROCESSED = "stream_compacted_processedmsg";
export const UPLINK = "stream_compacted_uplinkmsg";
export const HARMONICS_LOWER = "stream_compacted_harmonics_lower";
export const HARMONICS_UPPER = "stream_compacted_harmonics_upper";

export const getRealtimeLastMessage = async (stream, deviceeui, token) => {
    const url = getRealtimeGetUrl(stream, deviceeui);
    const response = await axios.get(url, getOptions(token));
    return response.data;
}

export const socketIORealtime = async (stream, deviceeui, token, onMessage) => {
    const url = getRealtimeSocketIOUrl(stream, deviceeui);
    const socket = socketIOClient(url, getSocketIOOptions(token));
    socket.on('row', row => onMessage(row));
}
/*
export const getRealtimeInst = async (deviceeui, token, phase = 0) => {
    const url = getRealtimeGetUrl(INST, deviceeui, phase);
    const response = await axios.get(url, getOptions(token));
    return response.data;
}

export const getRealtimeProcessed = async (deviceeui, token, phase = 0) => {
  const url = getRealtimeGetUrl(PROCESSED, deviceeui, phase);
  const response = await axios.get(url, getOptions(token));
  return response.data;
}

export const getRealtimeAlarm = async (deviceeui, token) => {
  const url = getRealtimeGetUrl(ALARM, deviceeui);
  const response = await axios.get(url, getOptions(token));
  return response.data;
}

export const getRealtimeOpAlarm = async (deviceeui, token) => {
  const url = getRealtimeGetUrl(OPALARM, deviceeui);
  const response = await axios.get(url, getOptions(token));
  return response.data;
}

export const getRealtimePQ = async (deviceeui, token, phase = 0) => {
  const url = getRealtimeGetUrl(PQ, deviceeui, phase);
  const response = await axios.get(url, getOptions(token));
  return response.data;
}

export const getRealtimeVoltageStats = async (deviceeui, token, phase = 0) => {
  const url = getRealtimeGetUrl(VOLTAGESTATS, deviceeui, phase);
  const response = await axios.get(url, getOptions(token));
  return response.data;
}

export const getRealtimeEnergy = async (deviceeui, token) => {
  const url = getRealtimeGetUrl(ENERGY, deviceeui);
  const response = await axios.get(url, getOptions(token));
  return response.data;
}

export const getRealtimeUplink = async (deviceeui, token) => {
    const url = getRealtimeGetUrl(UPLINK, deviceeui);
    const response = await axios.get(url, getOptions(token));
    return response.data;
}

export const getRealtimeHarmonicsUpper = async (deviceeui, token) => {
    const url = getRealtimeGetUrl(HARMONICS_UPPER, deviceeui);
    const response = await axios.get(url, getOptions(token));
    return response.data;
}

export const getRealtimeHarmonicsLower = async (deviceeui, token) => {
    const url = getRealtimeGetUrl(HARMONICS_LOWER, deviceeui);
    const response = await axios.get(url, getOptions(token));
    return response.data;
}

export const socketIOInst = async (deviceeui, token, onMessage, phase = 0) => {
    const url = getRealtimeSocketIOUrl(INST, deviceeui, phase);
    const socket = socketIOClient(url, getSocketIOOptions(token));
    socket.on('row', row => onMessage(row));
}


export const socketIOProcessed = async (deviceeui, token, onMessage, phase = 0) => {
    const url = getRealtimeSocketIOUrl(PROCESSED, deviceeui, phase);
    const socket = socketIOClient(url, getSocketIOOptions(token));
    socket.on('row', row => onMessage(row));
}


export const socketIOPQ = async (deviceeui, token, onMessage, phase = 0) => {
    const url = getRealtimeSocketIOUrl(PQ, deviceeui, phase);
    const socket = socketIOClient(url, getSocketIOOptions(token));
    socket.on('row', row => onMessage(row));
}


export const socketIOVoltageStats = async (deviceeui, token, onMessage, phase = 0) => {
    const url = getRealtimeSocketIOUrl(VOLTAGESTATS, deviceeui, phase);
    const socket = socketIOClient(url, getSocketIOOptions(token));
    socket.on('row', row => onMessage(row));
}


export const socketIOAlarm = async (deviceeui, token, onMessage) => {
    const url = getRealtimeSocketIOUrl(ALARM, deviceeui);
    const socket = socketIOClient(url, getSocketIOOptions(token));
    socket.on('row', row => onMessage(row));
}


export const socketIOOpAlarm = async (deviceeui, token, onMessage) => {
    const url = getRealtimeSocketIOUrl(OPALARM, deviceeui);
    const socket = socketIOClient(url, getSocketIOOptions(token));
    socket.on('row', row => onMessage(row));
}

export const socketIOEnergy = async (deviceeui, token, onMessage) => {
    const url = getRealtimeSocketIOUrl(ENERGY, deviceeui);
    const socket = socketIOClient(url, getSocketIOOptions(token));
    socket.on('row', row => onMessage(row));
} 

export const socketIOUplink = async (deviceeui, token, onMessage) => {
    const url = getRealtimeSocketIOUrl(UPLINK, deviceeui);
    const socket = socketIOClient(url, getSocketIOOptions(token));
    socket.on('row', row => onMessage(row));
}
*/