import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";

import { clearData } from "../../redux/slices/dataSlice";
import Loading from "../Loading";
import styles from "../../styles/fields";
import useInterval from "../../scripts/useInterval";
import { Typography } from "@material-ui/core";

const SinglePhaseData = ({ docid, visible, data, dataError, sinceSeconds, getMsg }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const dispatch = useDispatch();

     // load data when visible
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
        dispatch(clearData());
        try {
            let args = {
                deviceEUI: docid, 
                sinceSeconds: sinceSeconds,
                phase: null, 
                limit: 1
            }
            await dispatch(getMsg(args));

            setLoading(false); 
        } catch (err) {
            console.log(err);
            if (err.Message) {
                setError(err.Message);
            } else {
                setError(err.toString());
            }
        }
    }

    return (
        <>
        {loading ? (
            <Loading />
        ) : (
            <Grid container direction="row">
            {dataError && <Typography style={styles.errorText}>{dataError.Message}</Typography>}
            {error && <Typography style={styles.errorText}>{error}</Typography>}
            {data && data['TIMESTAMP'] ? (
                <Grid item xs={4}>
                    <Table style={{ width: 600 }}>
                        <TableBody>
                            {Object.entries(data).map(([key,value]) => (
                                <TableRow key={key}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{value}</TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </Grid>
            ) : (
                <Typography>No recent data</Typography>
            )}
            </Grid>
        )}
        </>
    )
}

export default SinglePhaseData;