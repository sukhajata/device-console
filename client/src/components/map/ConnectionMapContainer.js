import React from "react";

import { greenIcon, yellowIcon, redIcon, blueIcon, violetIcon, orangeIcon, goldIcon } from "../../styles/markers";
import {
  Connection,
  Job,
} from "../../proto/connection-service_pb.js";
import { colors } from "../../styles/fields";
import ConnectionMap from "./ConnectionMap";

//TODO: https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet

export const MAP_TYPE_INSTALLATION = "1";
export const MAP_TYPE_OPALARMS = "2";
export const MAP_TYPE_ALARMS = "3";
export const MAP_TYPE_FIRMWARE = "4";

const ConnectionMapContainer = ({ visible, selectConnection, showData, mapRef }) => {

  const height = window.innerHeight; //- 500 > 500 ? window.innerHeight - 500 : 500;

  const getOpAlarmsIcon = (message) => {
    if (message.includes("-1")) {
      return redIcon;
    }
    try {
      let vals = message.match(/\S+/g);
      const time = parseInt(vals[0]);
      if (time > 1440) {
        return redIcon;
      }
      if (time > 120) {
        return orangeIcon;
      }
      return yellowIcon;
    } catch (err) {
      console.log(err);
    }

    return orangeIcon
  };

  const getAlarmsIcon = alarmtype => {
    switch (alarmtype) {
      case "veryhighvoltagealarm":
        return redIcon;
      case "highvoltagealarm":
        return orangeIcon;
      case "lowvoltagealarm":
        return yellowIcon;
      case "verylowvoltagealarm":
        return orangeIcon;
      case "powerfailalarm":
        return blueIcon;
      default:
        return yellowIcon;
    }
  }

  const getInstallationIcon = item => {
    let icon;
    if (
      item.connectionState === Connection.ConnectionState.CONNECTED
    ) {
      icon = greenIcon;
    } else {
      switch (item.job.jobState) {
        case Job.JobState.FAILED:
          icon = redIcon;
          break;
        case Job.JobState.TESTED:
          icon = blueIcon;
          break;
        case Job.JobState.INSTALLED:
        case Job.JobState.CONFIGURED:
          icon = orangeIcon;
          break;
        default:
          icon = yellowIcon;
          break;
      }
    }
    return icon;
  }

  const getFirmwareIcon = firmware => {
    if (firmware.includes("1.0.12")) {
      return violetIcon;
    }

    switch(firmware) {
      case "1.1.4": 
        return greenIcon;
      case "1.1.2":
        return blueIcon;
      case "1.0.12":
        return violetIcon;
      case "1.0.10":
        return yellowIcon;
      case "1.0.8":
        return goldIcon;
      case "1.0.4":
        return orangeIcon;
      default:
        return redIcon;
      
    }
  }

  const getGatewayColor = snr => {
    if (snr < -10) {
      return colors.red;
    }
    if (snr < 0) {
      return colors.amber;
    }
    if (snr < 5) {
      return colors.indigo;
    }
    
    return colors.green;
  }

  return (
    <ConnectionMap
      selectConnection={selectConnection}
      showData={showData}
      getInstallationIcon={getInstallationIcon}
      getOpAlarmsIcon={getOpAlarmsIcon}
      getGatewayColor={getGatewayColor}
      getAlarmsIcon={getAlarmsIcon}
      getFirmwareIcon={getFirmwareIcon}
      height={height}
      mapRef={mapRef}
    />
  )
}

export default ConnectionMapContainer;
