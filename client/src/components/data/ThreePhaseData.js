import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { clearData } from "../../redux/slices/dataSlice";
import useInterval from "../../scripts/useInterval";
import styles from "../../styles/fields";
import Loading from "../Loading";

const ThreePhaseData = ({ docid, visible, data, dataError, sinceSeconds, getMsg }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    // initial data load
    useEffect(() => {
        if (visible) {
            loadData();
        }
    }, [visible]);

    // poll for data
    useInterval(async() => {
        if (visible && docid) {
           loadData();
        }
    }, 5000);

    const loadData = async () => {
        try {
            await dispatch(clearData());
            
            let args = {
                deviceEUI: docid,
                sinceSeconds: sinceSeconds,
                phase: 1,
                limit: 1
            }
            await dispatch(getMsg(args));
            
            args.phase = 2;
            await dispatch(getMsg(args));

            args.phase = 3;
            await dispatch(getMsg(args));

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
            {data && data.map(item => 
                <Grid item xs={4}>
                    <Table>
                        <TableBody>
                        {Object.entries(item).map(([key,value]) => 
                            <TableRow key={key}>
                                <TableCell>{key}</TableCell>
                                <TableCell>{value}</TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </Grid>
            )}
            {data[0] && !data[0]['TIMESTAMP'] && data[1] && !data[1]['TIMESTAMP'] && data[2] && !data[2]['TIMESTAMP'] &&
              <Typography>No recent data</Typography>
            }
            </Grid>
        )}
        </>
    )
}

export default ThreePhaseData;