import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";

import { filterConnections } from "../../redux/slices/connectionSlice";
import { clear, setAddress, setInstallNumber, setTransformer, setTown  } from "../../redux/slices/filterSlice";
import {  getAlarms, getOpAlarms, filterAlarms, filterOpAlarms } from "../../redux/slices/dataSlice";

import InstallationFilter from "./InstallationFilter";
import OpAlarmsFilter from "./OpAlarmsFilter";
import AlarmsFilter from "./AlarmsFilter";
import FirmwareFilter from "./FirmwareFilter";
import { MAP_TYPE_INSTALLATION, MAP_TYPE_OPALARMS, MAP_TYPE_ALARMS, MAP_TYPE_FIRMWARE } from "../map/ConnectionMapContainer";

const pageStyles = {
    input: { 
        width: 250, 
        margin: 10,
    },
    gridItem: { 
        marginBottom: 10,
    }
}

const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);
    const filtered = useSelector(state => state.connection.filtered);
    const mapType = useSelector(state => state.map.mapType);

    useEffect(() => {
        if (mapType && filtered) {
            loadData();
        }
    }, [mapType, filtered]);

    const loadData = async () => {
        if (mapType === MAP_TYPE_INSTALLATION) {
            return;
        }

        try {
            switch (mapType) {
                case MAP_TYPE_ALARMS:
                    await dispatch(getAlarms());
                    dispatch(filterAlarms());
                    break;
                case MAP_TYPE_OPALARMS:
                    await dispatch(getOpAlarms());
                    dispatch(filterOpAlarms);
                    break;
                /*case MAP_TYPE_FIRMWARE:
                    dispatch(getConnectionsWithFirmware({ dataToken: result.payload }));
                    break;*/
                default:
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    }

    const runFilter = async () => {
        await dispatch(filterConnections(filter));
        loadData();
    }

    const clearFilter = () => {
        dispatch(clear());
    }

    return (
        <>
            <Grid container direction="column">
                <Grid container direction="row" spacing={2} style={pageStyles.gridItem}>  
                    <TextField
                        label="Street"
                        variant="outlined"
                        style={pageStyles.input}
                        autoCapitalize={"none"}
                        value={filter.address}
                        onChange={e => dispatch(setAddress(e.target.value))}
                    />
                    <TextField
                        label="Town/region"
                        variant="outlined"
                        style={pageStyles.input}
                        autoCapitalize={"none"}
                        value={filter.town}
                        onChange={e => dispatch(setTown(e.target.value))}
                    />
                    <TextField
                        label="Install/Asset number"
                        variant="outlined"
                        style={pageStyles.input}
                        autoCapitalize={"none"}
                        value={filter.installNumber}
                        onChange={e => dispatch(setInstallNumber(e.target.value))}
                    />
                    <TextField
                        label="Sub"
                        variant="outlined"
                        style={pageStyles.input}
                        autoCapitalize={"none"}
                        value={filter.transformer}
                        onChange={e => dispatch(setTransformer(e.target.value))}
                    />
                </Grid>

                <Grid container direction="row" style={pageStyles.gridItem}>
                    <Button
                        onClick={runFilter}
                        style={{ height: 40, marginRight: 10 }}
                        variant="contained"
                        color="primary"
                    >
                        FILTER
                    </Button>
                    <Button
                        onClick={clearFilter}
                        style={{ height: 40 }}
                        variant="contained"
                        color="primary"
                    >
                        CLEAR
                    </Button>
                </Grid>

            {mapType === MAP_TYPE_INSTALLATION &&
                <InstallationFilter />
            }
            {mapType === MAP_TYPE_OPALARMS &&
                <OpAlarmsFilter />
            }
            {mapType === MAP_TYPE_ALARMS &&
                <AlarmsFilter />
            }
            {mapType === MAP_TYPE_FIRMWARE &&
                <FirmwareFilter />
            }
            </Grid>
        </>
    )
}

export default Filter;
