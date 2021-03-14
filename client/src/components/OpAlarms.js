import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

import { Map, Marker, Popup } from "react-leaflet";

import { redIcon, orangeIcon } from "../styles/markers";
import Loading from "./Loading";
import MapTiles from "./MapTiles";
import { getOpAlarms } from "../scripts/dataAPI";
import { getNZTimeFromUTCString } from "../scripts/dateHelper";


const OpAlarms = ({ selectConnection, showData }) => {
    const [alarms, setAlarms] = useState();
    const filtered = useSelector(state => state.connection.filtered);
    const lat = useSelector(state => state.map.lat);
    const lng = useSelector(state => state.map.lng);
    const zoom = useSelector(state => state.map.zoom);
    const position = [lat, lng];
    const height = window.innerHeight - 400 > 600 ? window.innerHeight - 400 : 600;

    useEffect(() => {
        loadData();
    }, [filtered]);

    const loadData = async () => {
        try {
            const results = await getOpAlarms(172800); //48 hours
            filterResults(results);
        } catch(err) {
            console.log(err);
        }
    }

    const filterResults = results => {
        //console.log(filtered);
        //console.log(results);
        const filteredResults = results.filter(item => {
            if (filtered.find(ff => ff.id == item.DEVICEEUI)) {
                return true;
            }

            return false;
        })
        //console.log(filteredResults);
        setAlarms(filteredResults);

    }

    const PopUpCard = ({ docid, connection }) => {
        return (
            <div>
                <Typography>{connection.IDNUMBER}</Typography>
                <Typography>{connection.STREETADDRESS}</Typography>
                <Typography>{connection.TIMESTAMP}</Typography>
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

    const getIcon = (message) => {
        if (message.includes("-1")) {
            return redIcon;
        } 
        try {
            let vals = message.match(/\S+/g);
            const time = parseInt(vals[0]);
            if (time > 120) {
                return redIcon;
            }
        } catch (err) {
            console.log(err);
        }

        return orangeIcon
    };

    return (
        <Grid container justify="flex-start">
            <Grid item xs={6} style={{ height: height, marginTop: 20, marginBottom: 20 }}>
                {lat && lng ? (
                    <Map
                        center={position}
                        zoom={zoom}
                        //onmoveend={mapMove}
                        //ref={mapRef}
                    >
                        <MapTiles />
                        {alarms &&
                            alarms.map((item, i) => (
                                <Marker
                                    key={i}
                                    position={[
                                        item.LATITUDE,item.LONGITUDE
                                    ]}
                                    icon={getIcon(item.MESSAGE) }
                                >
                                    <Popup style={{ width: 200 }}>
                                        <PopUpCard
                                            key={i}
                                            docid={item.DEVICEEUI}
                                            connection={item}
                                        />
                                    </Popup>
                                </Marker>
                            ))}
                    </Map>
                ) : (
                        <Loading />
                    )}
            </Grid>
            <Grid item xs={6}>
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {alarms &&
                        alarms.map((item, i) => (
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
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            </Grid>
        </Grid>
       
    )
}

export default OpAlarms;