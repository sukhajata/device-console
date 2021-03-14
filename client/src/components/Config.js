import React, { useState, useEffect } from "react"
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import TableHead from "@material-ui/core/TableHead";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import LoadingOverlay from 'react-loading-overlay';
import { useSelector, useDispatch } from 'react-redux';
import * as Sentry from "@sentry/browser";

import styles, { colors } from "../styles/fields";
import Loading from "./Loading";
import { getErrorMessage } from "../scripts/urlHelper";
import { getAllConfig, getConfigField, setConfigField } from "../redux/slices/configSlice";
import { removeInvisibleChars } from "../scripts/helpers";


const Config = ({ match, visible, slot }) => {
    const [configFields, setConfigFields] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const configError = useSelector(state => state.config.error);
    const username = useSelector(state => state.auth.username);
    const { docid } = match.params;

    let poller = null;

    useEffect(() => {
        if (visible && !configFields) {
            loadData();
        }
    }, [visible])

    const showMessage = message => {
        alert(message);
    }

    const loadData = async () => {
        setLoading(true);
        try {
            let args = {
                identifier: docid,
                slot: slot,
            }
            let result = await dispatch(getAllConfig(args));
            if (result.payload) {
                let data = JSON.parse(JSON.stringify(result.payload));
                data.sort((a, b) => {
                    if (a.index < b.index) {
                        return -1;
                    }
                    return 1;
                });
                
                setConfigFields(data);
            }

        } catch(err) {
            onError(err);
        }
        setLoading(false);
    }

    const onChange = (name, type, value) => {
        let valid = true;
        if (value && (type === 't' || type === 'i')) {//short
            try {
                const parsed = parseInt(value);
                if (isNaN(parsed)) {
                    valid = false;
                    throw new Error();
                }

                if (type === 't') {
                    if (parsed < -32768 || parsed > 32767) {
                        valid = false;
                        throw new Error();
                    }
                }
            } catch(error){
                alert("Invalid value.")
            }
        } else if (!isNaN(type)) {
            // type string
            if (value.length > type) {
                alert("Too long!");
                valid = false;
            }
        }

        if (valid) {
            const newFields = configFields.map(field => {
                if (field.name === name) {
                    field.desired = value;
                }
                return field;
            });
            setConfigFields(newFields);
        }
    }

    const sortByField = () => {
        let fields = [...configFields]
        fields.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            return 1;
        });
        setConfigFields(fields);
    }

    const sortByIndex = () => {
        let fields = [...configFields]
        fields.sort((a, b) => {
            if (a.index < b.index) {
                return -1;
            }
            return 1;
        });
        setConfigFields(fields);
    }

    const getFieldUpdate = async (name) => {
        try {
            let args = {
                deviceEUI: docid,
                fieldName: name,
                slot: slot,
            }
            const result = await dispatch(getConfigField(args));
            if (result.payload) {
                // update fields
                const newFields = configFields.map(field => {
                    if (field.name === name) {
                        if (field.desired === result.payload.reported) {
                            //stop polling
                            clearInterval(poller);
                        }
                        field.reported = result.payload.reported;
                    }
    
                    return field;
                });
                
                setConfigFields(newFields);
            }

        } catch (err) {
            onError(err);
        }
    }

    const onError = err => {
        console.log(err);
        //showMessage(getErrorMessage(err));
        const msg = getErrorMessage(err);
        setError(msg);
        setLoading(false);
        Sentry.captureException(`User: ${username}, ConfigScreen: ${msg}`);
    }

    const onSave = async (name) => {
        try {
            setLoading(true);
            const item = configFields.find(item => item.name === name);
            const val = removeInvisibleChars(item.desired);

            let args = {
                deviceEUI: docid, 
                fieldName: name,
                value: val,
                slot: slot
            }

            let result = await dispatch(setConfigField(args));
            if (result.payload) {
                showMessage(result.payload);
                // start polling for config update
                poller = setInterval(() => getFieldUpdate(name), 3000);
            }
            
        } catch(err) {
            onError(err);
        }
    }

    return (
        <>
            <LoadingOverlay
                active={loading}
                spinner
                //text='Waiting for reponse...'
            >
            <Box>
                {error && <Typography>{error}</Typography>}
                {configError && <Typography>{configError.toString()}</Typography>}
                {!configFields && <Loading />}
                {configFields &&
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell style={styles.tableHeader}>Field <Button onClick={sortByField}><ArrowUpward/></Button></TableCell>
                            <TableCell style={styles.tableHeader}>Index <Button onClick={sortByIndex}><ArrowUpward/></Button></TableCell>
                            <TableCell style={styles.tableHeader}>Type</TableCell>
                            <TableCell style={styles.tableHeader}>Description</TableCell>
                            <TableCell style={styles.tableHeader}>Default</TableCell>
                            <TableCell style={styles.tableHeader}>Desired</TableCell>
                            <TableCell style={styles.tableHeader}>Reported</TableCell>
                            <TableCell style={styles.tableHeader}>&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {configFields.map(field => (
                        <TableRow key={field.name}>
                            <TableCell>{field.name}</TableCell>
                            <TableCell>{field.index}</TableCell>
                            <TableCell>{field.fieldType}</TableCell>
                            <TableCell>{field.description}</TableCell>
                            <TableCell>{field.default}</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    value={field.desired}
                                    style={{ width: 300 }}
                                    onChange={e => onChange(field.name, field.fieldType, e.target.value)}
                                />
                            </TableCell>
                            <TableCell style={{ 
                                backgroundColor: field.desired !== field.reported ? colors.paleYellow : colors.white}}
                            >{field.reported}</TableCell>
                            <TableCell>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={e => onSave(field.name)}
                                >Save</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                }
            </Box>
            </LoadingOverlay>
        </>
    )
}

export default Config;
