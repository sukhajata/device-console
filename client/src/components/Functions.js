import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import LoadingOverlay from 'react-loading-overlay';
import * as Sentry from "@sentry/browser";

import styles from "../styles/fields";
import { getErrorMessage } from "../scripts/urlHelper";
import { getDeviceFunctions, callDeviceFunction } from "../redux/slices/functionSlice";
import { PQ, INST, PROCESSED } from "../scripts/realtimeClient";
import PQData from "./data/PQData";
import InstData from "./data/InstData";
import ProcessedData from "./data/ProcessedData";
import { removeInvisibleChars } from "../scripts/helpers";


const Functions = ({ match, visible }) => {
    const dispatch = useDispatch();
    const functions = useSelector(state => state.function.functions);
    const username = useSelector(state => state.auth.username);
    const error = useSelector(state => state.function.error);
    const token = useSelector(state => state.auth.token);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState();
    const [output, setOutput] = useState();
    const [type, setType] = useState();

    const { docid } = match.params;

    useEffect(() => {
        if (visible) {
            loadData();
        }
    }, [visible])

    const showMessage = message => {
        alert(message);
    }

    const loadData = async () => {
        try {
            setLoading(true);
           
            let result = await dispatch(getDeviceFunctions({ token: token }));
            if (result.payload && result.payload.functions) {
                let pp = {};
                result.payload.functions.forEach(field => {
                    pp[field.functionName] = ["", "", "", ""];
                });
                setParams(pp);
            }
            setLoading(false);

        } catch (err) {
            onError(err, true);
        }
    }

    const onError = (err, show) => {
        console.log(err);
        const msg = getErrorMessage(err)
        if (show) {
            showMessage(msg);
        }
        setLoading(false);
        Sentry.captureException(`User: ${username}, FunctionScreen: ${msg}`);
    }

    const onChange = (name, index, value) => {
        const newParams = JSON.parse(JSON.stringify(params));
        newParams[name][index] = value;
        setParams(newParams);
    }

    const onSend = async (name) => {
        try {
            setLoading(true);

            const pp = params[name];
            let data = {
                deviceEUI: docid,
                functionName: name,
                param1: removeInvisibleChars(pp[0]),
                param2: removeInvisibleChars(pp[1]),
                param3: removeInvisibleChars(pp[2]),
                param4: removeInvisibleChars(pp[3]),
            };
            let result = await dispatch(callDeviceFunction({ data: data, token: token }));
            showMessage(result.payload);
            if (name === 'instmsg') {
                setOutput("Requested inst msg");
                setType(INST);
            } else if (name === 'procmsg') {
                setOutput("Requested processed msg");
                setType(PROCESSED);
            } else if (name === 'geoscan') {
                setOutput("Requested geoscan msg");
                setType("GEOSCAN");
            } else if (name === 'pqimsg') {
                setOutput("Requested pq msg");
                setType(PQ);
            }
            setLoading(false);

        } catch (err) {
            onError(err, true);
        }
    }

    return (
            <LoadingOverlay
                active={loading}
                spinner
                text='Waiting for reponse...'
            >
                <Box>
                    {error && <Typography style={styles.errorText}>{error.toString()}</Typography>}
                    {functions && params &&
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={styles.tableHeader}>Function</TableCell>
                                    <TableCell style={styles.tableHeader}>Description</TableCell>
                                    <TableCell style={styles.tableHeader}>Index</TableCell>
                                    <TableCell style={styles.tableHeader}>Param1Description</TableCell>
                                    <TableCell style={styles.tableHeader}>Param1</TableCell>
                                    <TableCell style={styles.tableHeader}>Type</TableCell>
                                    <TableCell style={styles.tableHeader}>Param2Description</TableCell>
                                    <TableCell style={styles.tableHeader}>Param2</TableCell>
                                    <TableCell style={styles.tableHeader}>Type</TableCell>
                                    <TableCell style={styles.tableHeader}>Param3Description</TableCell>
                                    <TableCell style={styles.tableHeader}>Param3</TableCell>
                                    <TableCell style={styles.tableHeader}>Type</TableCell>
                                    <TableCell style={styles.tableHeader}>Param4Description</TableCell>
                                    <TableCell style={styles.tableHeader}>Param4</TableCell>
                                    <TableCell style={styles.tableHeader}>Type</TableCell>
                                    <TableCell style={styles.tableHeader}>&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {functions.map(field => (
                                    <TableRow key={field.functionName}>
                                        <TableCell>{field.functionName}</TableCell>
                                        <TableCell>{field.description}</TableCell>
                                        <TableCell>{field.index}</TableCell>
                                        <TableCell>{field.param1description}</TableCell>
                                        <TableCell>
                                            {field.param1type != 0 &&
                                                <TextField
                                                    variant="outlined"
                                                    value={params[field.functionName][0]}
                                                    style={{ width: 100 }}
                                                    onChange={e => onChange(field.functionName, 0, e.target.value)}
                                                />
                                            }
                                        </TableCell>
                                        <TableCell>{field.param1type}</TableCell>
                                        <TableCell>{field.param2description}</TableCell>
                                        <TableCell>
                                            {field.param2type != 0 &&
                                                <TextField
                                                    variant="outlined"
                                                    value={params[field.functionName][1]}
                                                    style={{ width: 100 }}
                                                    onChange={e => onChange(field.functionName, 1, e.target.value)}
                                                />
                                            }
                                        </TableCell>
                                        <TableCell>{field.param2type}</TableCell>
                                        <TableCell>{field.param3description}</TableCell>
                                        <TableCell>
                                            {field.param3type != 0 &&
                                                <TextField
                                                    variant="outlined"
                                                    value={params[field.functionName][2]}
                                                    style={{ width: 100 }}
                                                    onChange={e => onChange(field.functionName, 2, e.target.value)}
                                                />
                                            }
                                        </TableCell>
                                        <TableCell>{field.param3type}</TableCell>
                                        <TableCell>{field.param4description}</TableCell>
                                        <TableCell>
                                            {field.param4type != 0 &&
                                                <TextField
                                                    variant="outlined"
                                                    value={params[field.functionName][3]}
                                                    style={{ width: 100 }}
                                                    onChange={e => onChange(field.functionName, 3, e.target.value)}
                                                />
                                            }
                                        </TableCell>
                                        <TableCell>{field.param4type}</TableCell>

                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={e => onSend(field.functionName)}
                                            >Send</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
                    {output &&
                        <Paper style={{ marginTop: 20, padding: 20, backgroundColor: 'black', color: 'white' }}>{output}</Paper>
                    }
                    {type === PQ &&
                        <PQData docid={docid} visible={true} />
                    }
                    {type === INST &&
                        <InstData docid={docid} visible={true} />
                    }
                    {type === PROCESSED &&
                        <ProcessedData docid={docid} visible={true} />
                    }
                </Box>
            </LoadingOverlay>
        
    )
}

export default Functions;
