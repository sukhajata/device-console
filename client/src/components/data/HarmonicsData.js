import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

import { clearData, getHarmonicsLowerData, getHarmonicsUpperData } from "../../redux/slices/dataSlice";
import useInterval from "../../scripts/useInterval";
import styles from "../../styles/fields";
import Loading from "../Loading";

const HarmonicsData = ({ docid, visible }) => {
    const [loading, setLoading] = useState(true);
    const harmonicsLower = useSelector(state => state.data.harmonicsLowerData);
    const harmonicsUpper = useSelector(state => state.data.harmonicsUpperData);
    const dataError = useSelector(state => state.data.error);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (visible) {
            getData();
        }
    }, [visible]);

    // poll for data
    useInterval(async() => {
        if (visible && docid) {
           getData();
        }
    }, 5000);

    const getData = async () => {
        try {
            dispatch(clearData());
            let args = {
                deviceEUI: docid, 
                sinceSeconds: 24 * 60 * 60,
                limit: 1
            }
            await dispatch(getHarmonicsLowerData(args));
            await dispatch(getHarmonicsUpperData(args));

            setLoading(false);
            
        } catch (err) {
            setError(err.toString());
            console.log(err);
        }
    }

    return (
        <>
        {loading ? (
            <Loading />
        ) : (
            <Grid container direction="row">
            {dataError && <Typography style={styles.errorText}>{dataError}</Typography>}
            {error && <Typography style={styles.errorText}>{error}</Typography>}
            {harmonicsLower && 
                <Grid item xs={6}>
                    <Table style={{ width: 600 }}>
                        <TableBody>
                            {Object.entries(harmonicsLower).map(([key, value]) => 
                                <TableRow key={key}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{value}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Grid>
            }
            {harmonicsUpper &&
                <Grid item xs={6}>
                    <Table style={{ width: 600 }}>
                        <TableBody>
                            {Object.entries(harmonicsUpper).map(([key, value]) => 
                                <TableRow key={key}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{value}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Grid>
            }
            {harmonicsLower && !harmonicsLower['TIMESTAMP'] && harmonicsUpper && !harmonicsUpper['TIMESTAMP'] && 
                <Typography>No recent data</Typography>
            }
            </Grid>
        )}
        </>
    )
}

export default HarmonicsData;