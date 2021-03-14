export const ACTION_SET_FILTER_STREET = "SET_FILTER_STREET";
export const ACTION_SET_FILTER_TOWN = "SET_FILTER_TOWN";
export const ACTION_SET_FILTER_ICP = "SET_FILTER_ICP";
export const ACTION_SET_FILTER_SUBSTATION = "SET_FILTER_SUBSTATION";
export const ACTION_SET_SHOW_PENDING = "SET_SHOW_PENDING";
export const ACTION_SET_SHOW_TESTED = "SET_SHOW_TESTED";
export const ACTION_SET_SHOW_CONFIGURED = "SET_SHOW_CONFIGURED";
export const ACTION_SET_SHOW_CONNECTED = "SET_SHOW_CONNECTED";
export const ACTION_SET_SHOW_FAILED = "SET_SHOW_FAILED";
export const ACTION_SET_CONNECTIONS = "SET_CONNECTIONS";
export const ACTION_FILTER_CONNECTIONS = "FILTER_CONNECTIONS";
export const ACTION_SET_ZOOM = "SET_ZOOM";
export const ACTION_SET_LAT = "SET_LAT";
export const ACTION_SET_LNG = "SET_LNG";
export const ACTION_SORT_FILTERED = "SORT_FILTERED";
export const ACTION_SET_HOME_TAB_INDEX = "SET_HOME_TAB_INDEX";
export const ACTION_SET_MAP_TYPE = "SET_MAP_TYPE";
export const ACTION_SET_OPALARMS_SINCE = "SET_OPALARMS_SINCE";
export const ACTION_SET_OPALARMS = "SET_OPALARMS";
export const ACTION_SET_ALARMS_SINCE = "SET_ALARMS_SINCE";
export const ACTION_SET_ALARMS = "SET_ALARMS";
export const ACTION_SET_ALARM_TYPE = "SET_ALARM_TYPE";
export const ACTION_SET_CONNECTIONS_WITH_FIRMWARE = "SET_CONNECTIONS_WITH_FIRMWARE";
export const ACTION_SET_GATEWAYS = "SET_GATEWAYS";

export const setFilterStreet = street => ({
  type: ACTION_SET_FILTER_STREET,
  payload: street
});

export const setFilterTown = town => ({
  type: ACTION_SET_FILTER_TOWN,
  payload: town
});

export const setFilterICP = icp => ({
  type: ACTION_SET_FILTER_ICP,
  payload: icp
});

export const setFilterSubstation = substation => ({
  type: ACTION_SET_FILTER_SUBSTATION,
  payload: substation
});

export const setShowPending = showPending => ({
  type: ACTION_SET_SHOW_PENDING,
  payload: showPending
});

export const setShowConfigured = showConfigured => ({
  type: ACTION_SET_SHOW_CONFIGURED,
  payload: showConfigured
});

export const setShowTested = showTested => ({
  type: ACTION_SET_SHOW_TESTED,
  payload: showTested
});

export const setShowConnected = showConnected => ({
  type: ACTION_SET_SHOW_CONNECTED,
  payload: showConnected
});

export const setShowFailed = showFailed => ({
  type: ACTION_SET_SHOW_FAILED,
  payload: showFailed
});

export const setConnections = connections => ({
  type: ACTION_SET_CONNECTIONS,
  payload: connections
});

export const filterConnections = () => ({
  type: ACTION_FILTER_CONNECTIONS,
  payload: null
});

export const setZoom = zoom => ({
  type: ACTION_SET_ZOOM,
  payload: zoom
});

export const setLat = lat => ({
  type: ACTION_SET_LAT,
  payload: lat
});

export const setLng = lng => ({
  type: ACTION_SET_LNG,
  payload: lng
});

export const sortFiltered = filtered => ({
  type: ACTION_SORT_FILTERED,
  payload: filtered
});

export const setHomeTabIndex = index => ({
  type: ACTION_SET_HOME_TAB_INDEX,
  payload: index
});

export const setMapType = type => ({
  type: ACTION_SET_MAP_TYPE,
  payload: type
});

export const setOpAlarmsSince = since => ({
  type: ACTION_SET_OPALARMS_SINCE,
  payload: since
});

export const setOpAlarms = opAlarms => ({
  type: ACTION_SET_OPALARMS,
  payload: opAlarms
});

export const setAlarmsSince = since => ({
  type: ACTION_SET_ALARMS_SINCE,
  payload: since
});

export const setAlarms = alarms => ({
  type: ACTION_SET_ALARMS,
  payload: alarms
});

export const setAlarmType = alarmType => ({
  type: ACTION_SET_ALARM_TYPE,
  payload: alarmType
});

export const setConnectionsWithFirmware = connections => ({
  type: ACTION_SET_CONNECTIONS_WITH_FIRMWARE,
  payload: connections
});

export const setGateways = gateways => ({
  type: ACTION_SET_GATEWAYS,
  payload: gateways
})