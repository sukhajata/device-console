import React from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Button from "@material-ui/core/Button";
import { toNZTime } from "../../scripts/dateHelper";
import { CSVLink, CSVDownload } from "react-csv";

import { useSelector } from "react-redux";
import { MAP_TYPE_INSTALLATION, MAP_TYPE_OPALARMS, MAP_TYPE_ALARMS, MAP_TYPE_FIRMWARE } from "../map/ConnectionMapContainer";
import { getNZTimeFromUTCString } from "../../scripts/dateHelper";
import { getTenant } from "../../scripts/urlHelper";

const ConnectionTable = ({ selectConnection, visible, showData }) => {
    const filtered = useSelector(state => state.connection.filtered);
    const opAlarms = useSelector(state => state.connection.opAlarms);
    const alarms = useSelector(state => state.connection.alarms);
    const connectionsWithFirmware = useSelector(state => state.connection.connectionsWithFirmware);
    const mapType = useSelector(state => state.map.mapType);    

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

    return (
        <>
        {mapType === MAP_TYPE_INSTALLATION && 
            <>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell>ICP</TableCell>
                        <TableCell>Serial No.</TableCell>
                        <TableCell>Dev EUI</TableCell>
                        <TableCell>Transformer</TableCell>
                        <TableCell>Pole Number</TableCell>
                        <TableCell>Phase</TableCell>
                        <TableCell>Date installed (NZT)</TableCell>
                        <TableCell>           
                            {filtered && <CSVLink data={filtered}>Download CSV</CSVLink> }
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filtered &&
                        filtered.map((conn, i) => (
                            <TableRow
                                key={i}
                                cursor="pointer"
                            >
                                <TableCell>
                                    {conn.location.streetAddress1 + ", " + conn.location.town}
                                </TableCell>
                                <TableCell>{conn.IDNumber}</TableCell>
                                <TableCell>{conn.device ? conn.device.serialNumber : ""}</TableCell>
                                <TableCell>{conn.id}</TableCell>
                                <TableCell>{conn.transformer}</TableCell>
                                <TableCell>{conn.mount.mountNumber}</TableCell>
                                <TableCell>{getPhase(conn.line1, conn.line2, conn.line3)}</TableCell>
                                <TableCell>{toNZTime(conn.dateCreated)}</TableCell>
                                <TableCell><Button  variant="outlined" onClick={() => selectConnection(conn.id)}>Details</Button></TableCell>
                                <TableCell><Button variant="outlined" onClick={() => showData(conn.id)}>Data</Button></TableCell>
                                <TableCell>
                                    {getTenant() == 'westpower' && conn.serialNumber &&
                                        <a target="blank" href={`https://dashboard.westpower.powerpilot.nz/d/Monitoring/monitoring?orgId=1&var-IDNUMBER=${conn.idNumber}`}>Grafana</a>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            </>
        }
        {mapType === MAP_TYPE_OPALARMS &&
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>TIME (NZ)</TableCell>
                        <TableCell>ICP</TableCell>
                        <TableCell>DEVICE EUI</TableCell>
                        <TableCell>SERIAL NO.</TableCell>
                        <TableCell>STREET ADDRESS</TableCell>
                        <TableCell>TOWN</TableCell>
                        <TableCell>MESSAGE</TableCell>
                        <TableCell>
                            {opAlarms && <CSVLink data={opAlarms}>Download CSV</CSVLink>}
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {opAlarms &&
                        opAlarms.map((item, i) => (
                            <TableRow
                                key={i}
                                cursor="pointer"
                            >
                                <TableCell>
                                    {getNZTimeFromUTCString(item.TIMESTAMP)}
                                </TableCell>
                                <TableCell>{item.IDNUMBER}</TableCell>
                                <TableCell>
                                    <Button onClick={() => selectConnection(item.DEVICEEUI)}>{item.DEVICEEUI}</Button>
                                </TableCell>
                                <TableCell>
                                    {item.SERIALNUMBER}
                                </TableCell>
                                <TableCell>
                                    {item.STREETADDRESS}
                                </TableCell>
                                <TableCell>
                                    {item.TOWN}
                                </TableCell>
                                <TableCell>{item.MESSAGE}</TableCell>
                                <TableCell><Button variant="outlined" onClick={() => selectConnection(item.DEVICEEUI)}>Details</Button></TableCell>
                                <TableCell><Button variant="outlined" onClick={() => showData(item.DEVICEEUI)}>Data</Button></TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        }
        {mapType === MAP_TYPE_ALARMS &&
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>ALARM</TableCell>
                        <TableCell>ICP</TableCell>
                        <TableCell>DEVICE EUI</TableCell>
                        <TableCell>SERIAL NO.</TableCell>
                        <TableCell>FIRMWARE</TableCell>
                        <TableCell>STREET ADDRESS</TableCell>
                        <TableCell>TOWN</TableCell>
                        <TableCell>TOTAL IN 7 DAYS</TableCell>
                        <TableCell>LATESTTIME (NZ)</TableCell>
                        <TableCell>LATESTVALUE</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {alarms &&
                        alarms.map((item, i) => (
                            <TableRow
                                key={i}
                                cursor="pointer"
                            >
                                <TableCell>{item.ALARMTYPE}</TableCell>
                                <TableCell>{item.IDNUMBER}</TableCell>
                                <TableCell>
                                    <Button onClick={() => selectConnection(item.DEVICEEUI)}>{item.DEVICEEUI}</Button>
                                </TableCell>
                                <TableCell>
                                    {item.SERIALNUMBER}
                                </TableCell>
                                <TableCell>{item.FIRMWARE}</TableCell>
                                <TableCell>
                                    {item.STREETADDRESS}
                                </TableCell>
                                <TableCell>
                                    {item.TOWN}
                                </TableCell>
                                <TableCell>{item.TOTAL}</TableCell>
                                <TableCell>
                                    {getNZTimeFromUTCString(item.LATESTTIME)}
                                </TableCell>
                                <TableCell>{item.LATESTVALUE}</TableCell>
                                <TableCell><Button variant="outlined" onClick={() => selectConnection(item.DEVICEEUI)}>Details</Button></TableCell>
                                <TableCell><Button variant="outlined" onClick={() => showData(item.DEVICEEUI)}>Data</Button></TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        }
        {mapType === MAP_TYPE_FIRMWARE && connectionsWithFirmware &&
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>ICP</TableCell>
                        <TableCell>DEVICE EUI</TableCell>
                        <TableCell>SERIAL NO.</TableCell>
                        <TableCell>STREET ADDRESS</TableCell>
                        <TableCell>TOWN</TableCell>
                        <TableCell>FIRMWARE</TableCell>
                        <TableCell>ROFFSET</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {connectionsWithFirmware &&
                        connectionsWithFirmware.map((item, i) => (
                            <TableRow
                                key={i}
                                cursor="pointer"
                            >
                                <TableCell>{item.IDNUMBER}</TableCell>
                                <TableCell>
                                    <Button onClick={() => selectConnection(item.DEVICEEUI)}>{item.DEVICEEUI}</Button>
                                </TableCell>
                                <TableCell>
                                    {item.SERIALNUMBER}
                                </TableCell>
                                <TableCell>
                                    {item.STREETADDRESS}
                                </TableCell>
                                <TableCell>
                                    {item.TOWN}
                                </TableCell>
                                <TableCell>{item.FIRMWARE}</TableCell>
                                <TableCell>{item.ROFFSET}</TableCell>
                                <TableCell><Button variant="outlined" onClick={() => selectConnection(item.DEVICEEUI)}>Details</Button></TableCell>
                                <TableCell><Button variant="outlined" onClick={() => showData(item.DEVICEEUI)}>Data</Button></TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

        }
        </>
    )
}

export default ConnectionTable;