import {
  ACTION_SET_FILTER_STREET,
  ACTION_SET_FILTER_TOWN,
  ACTION_SET_FILTER_ICP,
  ACTION_SET_FILTER_SUBSTATION,
  ACTION_SET_SHOW_CONNECTED,
  ACTION_SET_SHOW_CONFIGURED,
  ACTION_SET_SHOW_FAILED,
  ACTION_SET_SHOW_PENDING,
  ACTION_SET_SHOW_TESTED,
  ACTION_SET_CONNECTIONS,
  ACTION_FILTER_CONNECTIONS,
  ACTION_SET_ZOOM,
  ACTION_SET_LAT,
  ACTION_SET_LNG,
  ACTION_SORT_FILTERED,
  ACTION_SET_HOME_TAB_INDEX,
  ACTION_SET_MAP_TYPE,
  ACTION_SET_OPALARMS,
  ACTION_SET_OPALARMS_SINCE,
  ACTION_SET_ALARMS,
  ACTION_SET_ALARMS_SINCE,
  ACTION_SET_ALARM_TYPE,
  ACTION_SET_CONNECTIONS_WITH_FIRMWARE,
  ACTION_SET_GATEWAYS
} from "../actions/filterActions";
import { Job, Connection } from "../../proto/connection-service_pb";
import { ALARM_TYPE_HIGH_VOLTAGE } from "../../components/AlarmsFilter";

const initialState = {
  filterStreet: "",
  filterTown: "",
  filterICP: "",
  filterSubstation: "",
  homeTabIndex: 0,
  showPending: true,
  showConfigured: true,
  showTested: true,
  showConnected: true,
  showFailed: true,
  zoom: 7,
  lat: -41.221580,//-42.448372,
  lng: 174.750872,//171.220509,
  connections: [],
  filtered: [],
  mapType: "1",
  opAlarms: [],
  opAlarmsSince: 86400, //1 day in seconds
  alarms: [],
  connectionsWithFirmware: [],
  gateways: []
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SET_FILTER_STREET: {
      return {
        ...state,
        filterStreet: action.payload
      }
    }

    case ACTION_SET_FILTER_TOWN: {
      return {
        ...state,
        filterTown: action.payload
      }
    }

    case ACTION_SET_FILTER_ICP: {
      return {
        ...state,
        filterICP: action.payload
      }
    }

    case ACTION_SET_FILTER_SUBSTATION: {
      return {
        ...state,
        filterSubstation: action.payload
      }
    }

    case ACTION_SET_SHOW_CONNECTED: {
      return {
        ...state,
        showConnected: action.payload
      }
    }

    case ACTION_SET_SHOW_FAILED: {
      return {
        ...state,
        showFailed: action.payload
      }
    }

    case ACTION_SET_SHOW_PENDING: {
      return {
        ...state,
        showPending: action.payload
      }
    }

    case ACTION_SET_SHOW_CONFIGURED: {
      return {
        ...state,
        showConfigured: action.payload
      }
    }

    case ACTION_SET_SHOW_TESTED: {
      return {
        ...state,
        showTested: action.payload
      }
    }

    case ACTION_SET_CONNECTIONS: {
      const newConnections = _mapConnections(action.payload);
      if (JSON.stringify(newConnections) !== JSON.stringify(state.connections)) {
        return {
          ...state,
          connections: newConnections
        }
      } else {
        return state;
      }
    }

    case ACTION_FILTER_CONNECTIONS: {
      const filteredConnections = _filterConnections(state);
      if (JSON.stringify(filteredConnections) !== JSON.stringify(state.filtered)) {
        return {
          ...state,
          filtered: filteredConnections
        }
      }

      return state;
    }

    case ACTION_SET_ZOOM: {
      return {
        ...state,
        zoom: action.payload
      }
    }

    case ACTION_SET_LAT: {
      return {
        ...state,
        lat: action.payload
      }
    }

    case ACTION_SET_LNG: {
      return {
        ...state,
        lng: action.payload
      }
    }

    case ACTION_SORT_FILTERED: {
      return {
        ...state,
        filtered: action.payload
      }
    }

    case ACTION_SET_HOME_TAB_INDEX: {
      return {
        ...state,
        homeTabIndex: action.payload
      }
    }

    case ACTION_SET_MAP_TYPE: {
      return {
        ...state,
        mapType: action.payload
      }
    }

    case ACTION_SET_OPALARMS: {
      return {
        ...state,
        opAlarms: action.payload
      }
    }

    case ACTION_SET_OPALARMS_SINCE: {
      return {
        ...state,
        opAlarmsSince: action.payload
      }
    }

    case ACTION_SET_ALARMS: {
      return {
        ...state,
        alarms: action.payload
      }
    }

    case ACTION_SET_ALARMS_SINCE: {
      return {
        ...state,
        alarmsSince: action.payload
      }
    }

    case ACTION_SET_ALARM_TYPE: {
      return {
        ...state,
        alarmType: action.payload
      }
    }

    case ACTION_SET_CONNECTIONS_WITH_FIRMWARE: {
      return {
        ...state,
        connectionsWithFirmware: action.payload
      }
    }

    case ACTION_SET_GATEWAYS: {
      return {
        ...state,
        gateways: action.payload
      }
    }
    
    // Default
    default: {
      return state;
    }
  }
};


const getPhase = (line1, line2, line3) => {
  if (!line1) {
    return "";
  }

  let phase = "";
  if (line1 == 1) {
    phase = "Red";
  }
  if (line1 == 2) {
    phase = "White";
  }
  if (line1 == 3) {
    phase = "Blue";
  }

  if (!line2) {
    return phase;
  }

  if (line2 == 1) {
    phase += "/Red";
  }
  if (line2 == 2) {
    phase += "/White";
  }
  if (line2 == 3) {
    phase += "/Blue";
  }

  if (!line3) {
    return phase;
  }

  if (line3 == 1) {
    phase += "/Red";
  }
  if (line3 == 2) {
    phase += "/White";
  }
  if (line3 == 3) {
    phase += "/Blue";
  }

  return phase;

}

const _mapConnections = (connections) => {
  const newConnections = connections.map(connection => {
    return {
      idNumber: connection.getIdnumber(),
      serialNumber: connection.hasDevice() ? connection.getDevice().getSerialnumber() : "",
      streetAddress: connection.getLocation().getStreetaddress1(),
      town: connection.getLocation().getTown(),
      id: connection.getId(),
      dateCreated: connection.getDatecreated(),
      connectionState: connection.getConnectionstate(),
      lat: connection.getLocation().getLat(),
      lng: connection.getLocation().getLng(),
      jobState: connection.getJob().getJobstate(),
      type: connection.getConnectiontype(),
      transformer: connection.getTransformer(),
      mountNumber: connection.getMount().getMountnumber(),
      phase: getPhase(connection.getLine1(), connection.getLine2(), connection.getLine3())
    }
  });
  
  return newConnections;
}

const _filterConnections = (state) => {
  const newFiltered = state.connections.filter(item => {
    if (state.filterStreet) {
      if (!item.streetAddress ||
        !item.streetAddress
          .toLowerCase()
          .includes(state.filterStreet.toLowerCase())
      ) {
        return false;
      }
    }

    if (state.filterTown) {
      if (
        !item.town
          .toLowerCase()
          .startsWith(state.filterTown.toLowerCase())
      ) {
        return false;
      }
    }

    if (state.filterICP) {
      if (
        !item.idNumber
          .toString()
          .startsWith(state.filterICP)
      ) {
        return false;
      }
    }

    if (state.filterSubstation) {
      if (!item.transformer || !item.transformer.includes(state.filterSubstation)) {
        return false;
      }
    }

    const jobState = item.jobState;
    if (
      item.connectionState === Connection.ConnectionState.CONNECTED &&
      !state.showConnected
    ) {
      return false;
    }

    if (item.connectionState !== Connection.ConnectionState.CONNECTED && jobState === Job.JobState.TESTED && !state.showTested) {
      return false;
    }

    if (jobState === Job.JobState.FAILED && !state.showFailed) {
      return false;
    }

    if (jobState === Job.JobState.PENDING && !state.showPending) {
      return false;
    }

    if ((jobState === Job.JobState.CONFIGURED || jobState === Job.JobState.INSTALLED) && !state.showConfigured) {
      return false;
    }

    return true;
  });

  newFiltered.sort((a, b) => {
    if (a.dateCreated > b.dateCreated) {
      return -1;
    }
    return 1;
  });

  return newFiltered;

};

export default filterReducer;
