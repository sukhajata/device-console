import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Map, Marker, Popup, CircleMarker } from "react-leaflet";

import { MAP_TYPE_INSTALLATION, MAP_TYPE_OPALARMS, MAP_TYPE_ALARMS, MAP_TYPE_FIRMWARE } from "./ConnectionMapContainer";
import ConnectionCard from "../ConnectionCard";
import Loading from "../Loading";
import MapTiles from "./MapTiles";
import { getNZTimeFromUTCString } from "../../scripts/dateHelper";

const PopUpCard = ({ docid, connection, selectConnection, showData }) => {
    return (
      <div>
        <Typography>{connection.IDNUMBER}</Typography>
        <Typography>{connection.STREETADDRESS}</Typography>
        <Typography>{getNZTimeFromUTCString(connection.TIMESTAMP)}</Typography>
        <Typography>{connection.MESSAGE}</Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => selectConnection(docid)}
        >
          Details
        </Button>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginLeft: 10 }}
          onClick={() => showData(docid)}
        >
          Data
        </Button>
      </div>
    );
  };


const PopUpCardAlarm = ({ docid, item, selectConnection, showData }) => {
  return (
    <div>
      <Table style={{ marginBottom: 10 }}>
        {Object.entries({
          'ICP': item.IDNUMBER,
          'Address': item.STREETADDRESS,
          'Num alarms 7 days': item.TOTAL,
          'Last alarm': getNZTimeFromUTCString(item.LATESTTIME),
          'Last value': item.LATESTVALUE
        }).map(item => 
          <TableRow>
            <TableCell>{item.key}</TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        )}
      </Table>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => selectConnection(docid)}
      >
        Details
      </Button>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginLeft: 10 }}
        onClick={() => showData(docid)}
      >
        Data
      </Button>
    </div>
  );
};

const PopUpCardFirmware = ({ docid, item, selectConnection, showData }) => {
  return (
    <div>
      <Typography>{item.IDNUMBER}</Typography>
      <Typography>{item.STREETADDRESS}</Typography>
      <Typography>{item.FIRMWARE}</Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => selectConnection(docid)}
      >
        Details
      </Button>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginLeft: 10 }}
        onClick={() => showData(docid)}
      >
        Data
      </Button>
    </div>
  );
};

const ConnectionMap = ({ mapRef, height, selectConnection, showData, getInstallationIcon, getOpAlarmsIcon, getGatewayColor, getAlarmsIcon, getFirmwareIcon }) => {
  const lat = useSelector(state => state.map.lat);
  const lng = useSelector(state => state.map.lng);
  const zoom = useSelector(state => state.map.zoom);
  const mapType = useSelector(state => state.map.mapType);
  const opAlarms = useSelector(state => state.data.filteredOpAlarms);
  const alarms = useSelector(state => state.data.filteredAlarms);
  const connectionsWithFirmware = useSelector(state => state.connection.connectionsWithFirmware);
  const gateways = useSelector(state => state.connection.gateways);
  const filtered = useSelector(state => state.connection.filtered);

  return (
    <Box style={{ height: height, marginTop: 20, marginBottom: 20 }}>
    {lat && lng ? (
      <Map
        center={[lat, lng]}
        zoom={zoom}
        ref={mapRef}
      >
        <MapTiles />
        {mapType === MAP_TYPE_INSTALLATION && filtered &&
          filtered.map((item, i) =>  (
              <Marker 
                key={i} 
                position={[item.location.lat, item.location.lng]} 
                icon={getInstallationIcon(item)}
              >
                <Popup>
                  <ConnectionCard
                    key={i}
                    docid={item.id}
                    connection={item}
                    onSelect={selectConnection}
                    showData={showData}
                  />
                </Popup>
              </Marker>
            )
          )}
          {mapType === MAP_TYPE_OPALARMS && opAlarms &&
            opAlarms.map((item, i) => (
              <Marker
                key={i}
                position={[item.LATITUDE, item.LONGITUDE]}
                icon={getOpAlarmsIcon(item.MESSAGE)}
              >
                <Popup style={{ width: 200 }}>
                  <PopUpCard
                    key={i}
                    docid={item.DEVICEEUI}
                    connection={item}
                    selectConnection={selectConnection}
                    showData={showData}
                  />
                </Popup>
              </Marker>
            ))
          }
          {mapType === MAP_TYPE_OPALARMS && gateways &&
            gateways.map((item) => (
              <CircleMarker key={item.GATEWAYID} center={[item.LATITUDE, item.LONGITUDE]} radius={15} color={getGatewayColor(item.SNR)} fillOpacity={1}>
                <Popup>
                  <Typography>GATEWAY: {item.GATEWAYID}</Typography>
                  <Typography>ALTITUDE: {item.ALTITUDE}</Typography>
                  <Typography>RSSI: {item.RSSI}</Typography>
                  <Typography>SNR: {item.SNR}</Typography>
                  <Typography>MESSAGE COUNT: {item.MESSAGES}</Typography>
                </Popup>
              </CircleMarker>
            ))
          }
          {mapType === MAP_TYPE_ALARMS && alarms &&
            alarms.map((item, i) => (
            <Marker
              key={i}
              position={[item.LATITUDE, item.LONGITUDE]}
              icon={getAlarmsIcon(item.ALARMTYPE)}
            >
              <Popup style={{ width: 200 }}>
                <PopUpCardAlarm
                  key={i}
                  docid={item.DEVICEEUI}
                  item={item}
                  selectConnection={selectConnection}
                  showData={showData}
                />
              </Popup>
            </Marker>
            ))
          }
          {mapType === MAP_TYPE_FIRMWARE && connectionsWithFirmware &&
            connectionsWithFirmware.map((item, i) => (
              <Marker
                key={i}
                position={[item.LATITUDE, item.LONGITUDE]}
                icon={getFirmwareIcon(item.FIRMWARE)}
              >
                <Popup style={{ width: 200 }}>
                  <PopUpCardFirmware
                    key={i}
                    docid={item.DEVICEEUI}
                    item={item}
                    selectConnection={selectConnection}
                    showData={showData}
                  />
                </Popup>
              </Marker>
            ))
          }
      </Map>
    ) : (
        <Loading />
      )}
  </Box>
)};

export default ConnectionMap;