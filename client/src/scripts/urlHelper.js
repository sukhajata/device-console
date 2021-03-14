import axios from "axios";


export function getMetadata(token) {
    var deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 5);
    var metadata = { 'authorization': token, 'deadline': deadline.getTime() };
    return metadata;
}

export function getErrorMessage(err) {
  if (err.response) {
    return (
      err.response.status +
      " " +
      err.response.statusText +
      ": " +
      err.response.data
    );
  } else if (err.message) {
    return err.message;
  } else {
    return JSON.stringify(err);
  }
}

export function getTenant() {
    const host = window.location.hostname;
    if (host === "localhost") {
      return "stagepower";
    }
    let tenant = window.location.host.split('.')[1];
    if (!isNaN(tenant)) { //may 168 if accessing local server from mobile
      return "devpower";
    }

    return tenant;
}

function getTableName(tenant, table) {
  return table;
  /*if (tenant === "westpower") {
    return table;
  }
  return tenant + "_" + table;*/
}

export function getConnectionServiceUrl() {
    const tenant = getTenant();
    return `https://connection.${tenant}.powerpilot.nz`;
}

export function getConfigServiceUrl() {
    const tenant = getTenant();
    return `https://config.${tenant}.powerpilot.nz`;
}

export function getFunctionServiceUrl() {
    const tenant = getTenant();
    return `https://function.${tenant}.powerpilot.nz`;
}

export function getSwitchingServiceURL() {
  const tenant = getTenant();
  return `https://switching.${tenant}.powerpilot.nz`;
}

export function getMqttHost() {
    const tenant = getTenant();
    return `mqtt.${tenant}.powerpilot.nz`;
}

export function getKeycloakRealm() {
  const tenant = getTenant();
  return tenant;
}

export async function getVersion() {
  const tenant = getTenant();
  const url = `https://admin.${tenant}.powerpilot.nz/version`;
  const response = await axios.get(url);
  return response.data;
}

export function getAuthServerUrl() {
  const tenant = getTenant();
  return `https://auth.${tenant}.powerpilot.nz/auth`;
}

export function getAuthServiceUrl() {
  const tenant = getTenant();
  return `https://auth.${tenant}.powerpilot.nz`;
}

export function getDataServiceUrl() {
  const tenant = getTenant();
  return `https://data.${tenant}.powerpilot.nz`;
}


export function getRealtimeGetUrl(topic, deviceeui, phase) {
  const tenant = getTenant();
  let url = `https://realtime.${tenant}.powerpilot.nz/api/table/${tenant}_${topic}/${deviceeui}`;

  if (phase) {
    url += `/${phase}`;
  }
  return url;
}

export function getRealtimeSocketIOUrl(topic, deviceeui, phase) {
  const tenant = getTenant();
  let url = `https://realtime.${tenant}.powerpilot.nz/api/${tenant}_${topic}/${deviceeui}`;
  
  if (phase) {
    url += `/${phase}`;
  }
  return url;
}
