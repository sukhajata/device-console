import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Map, Marker } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import * as Sentry from "@sentry/browser";

import routes from "../../routes";
import styles from "../../styles/fields";
import ValidatedTextInput from "../../components/ValidatedTextInput";
import {
  getIdentifierLabel,
  getInstallationTypes,
} from "../../scripts/deviceSummaryService";
import Header from "../../components/Header";
import NiceButton from "../../components/NiceButton";
import RadioGrouping from "../../components/RadioGrouping";
import Loading from "../../components/Loading";
import { yellowIcon } from "../../styles/markers";
import MapTiles from "../../components/map/MapTiles";

import { Connection } from '../../proto/connection-service_pb.js';
import { setZoom, setLat, setLng } from "../../redux/slices/mapSlice";
import { getConnection, getLocationDetails, updateConnection, addSlot, createPendingConnection } from "../../redux/slices/connectionSlice";
import { getErrorMessage } from "../../scripts/urlHelper";
import { geocode, getlocation } from "../../scripts/locationAPI";
import { BlankConnection } from "../../model/Connection";

const initialErrors = {
  connectionType: null,
  icp: null,
  assetNumber: null,
  model: null,
  mountType: null,
  mountNumber: null,
  phase: null,
  streetAddress1: null,
  town: null,
  latitude: null,
  longitude: null,
  transformer: null
};

const pageStyles = {
  input: { marginBottom: 20, width: '100%' },
  outerContainer: { marginBottom: 20, marginTop: 80 },
}

const ConnectionDetailsScreen = ({ match, history }) => {
  const [loaded, setLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [connection, setConnection] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [errors, setErrors] = useState(initialErrors);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [mountLabel, setMountLabel] = useState("");
  const [s11Slot, setS11Slot] = useState();
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const dispatch = useDispatch();
  const connectionError = useSelector(state => state.connection.error);
  const { docid } = match.params;


  useEffect(() => {
    if (!loaded) {
      loadDetails();
    }
  });

  const loadDetails = async () => {
    if (docid) {
      setEditMode(true);
      try {
        let args = {
          docid,
        }
        const result = await dispatch(getConnection(args));
        console.log(result);
        if (result.payload) {
          setConnection(result.payload);
          setLatitude(result.payload.location.lat);
          setLongitude(result.payload.location.lng);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // new connection
      setEditMode(false);
      // make a copy of default connnection object
      let conn = JSON.parse(JSON.stringify(BlankConnection))
      setConnection(conn);
      getlocation(receivePosition, err => onError(err, false));
    }

    setLoaded(true);
  };

  const receivePosition = (coords) => {
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
  }

  const onChange = async (name, value) => {
    setErrors(initialErrors);
    setErrorMessage(null);
    let conn = JSON.parse(JSON.stringify(connection));

    switch (name) {
      case "connectionType":
        conn.connectionType = parseInt(value);
        if (conn.connectionType === Connection.ConnectionType.ASSET) {
          conn.numPhases = 3;
        }
        break;
      case "IDNumber":
        conn.IDNumber = value;
        if (value.length >= 6) {
          lookUpAddress(value);
        }
        break;
      case "streetAddress1":
        conn.location.streetAddress1 = value;
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        setTypingTimeout(setTimeout(() => getGeocode(value, conn.location.town), 800));
        break;
      case "town":
        conn.location.town = value;
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        setTypingTimeout(setTimeout(() => getGeocode(conn.location.streetAddress1, value), 800));
        break;
      case "latitude":
        conn.location.lat = parseFloat(value);
        setLatitude(conn.location.lat);
        break;
      case "longitude":
        conn.location.lng = parseFloat(value);
        setLongitude(conn.location.lng);
        break;
      case "modelType":
        const newModelType = parseInt(value);
        conn.modelType = newModelType;
        if (newModelType > 1) {
          //M31 has all phases by default
          conn.numPhases = 1;
          conn.line1 = 1;
          conn.line2 = 2;
          conn.line3 = 3;
        } else {
          conn.numPhases = 1;
          conn.line2 = 0;
          conn.line3 = 0;
        }
        break;
      case "mountType":
        const newMountType = parseInt(value);
        conn.mount.mountType = newMountType;
        setMountLabel(getIdentifierLabel(newMountType));
        break;
      case "mountNumber":
        conn.mount.mountNumber = value;
        break;
      case "notes":
        conn.job.notes = value;
        break;
      case "transformer":
        conn.transformer = value;
        break;
      case "rating":
        const rr = parseInt(value);
        if (isNaN(rr) || rr <= 0) {
          alert("Please enter a positive integer");
        } else {
          conn.rating = rr;
        }
        break;
      case "s11Slot":
        const ss = parseInt(value);
        if (isNaN(ss) || ss <= 0) {
          alert("Please enter a positive integer");
        } else {
          setS11Slot(ss);
        }
        break;
      default:
        break;
    }
    setConnection(conn);

  };

  const validateFields = () => {
    let connectionTypeValid = true;
    let icpValid = true;
    let assetNumberValid = true;
    let modelValid = true;
    let streetAddressValid = true;
    let townValid = true;
    let mountTypeValid = true;
    let mountNumberValid = true;
    let transformerValid = true;

    if (connection.connectionType == 0) {
      connectionTypeValid = false;
    } else if (connection.connectionType == 1 && connection.IDNumber == "") {
      icpValid = false;
    } else if (connection.connectionType > 1 && connection.IDNumber == "") {
      assetNumberValid = false;
    }

    if (connection.modelType == 0) {
      modelValid = false;
    }

    if (connection.location.streetAddress1.length < 3) {
      streetAddressValid = false;
    }

    if (connection.location.town.length < 3) {
      townValid = false;
    }

    if (connection.mount.mountType === 0) {
      mountTypeValid = false;
    }

    // mount number required for some mount types
    if (connection.mount.mountType == 1 || connection.mount.mountType >= 4) {
      if (!connection.mount.mountNumber || connection.mount.mountNumber.length < 3) {
        mountNumberValid = false;
      }
    }

    // transformer number required
    if (connection.connectionType < 2 && (!connection.transformer || connection.transformer.length < 1)) {
      transformerValid = false;
    }

    const newErrors = {
      connectionType: connectionTypeValid
        ? null
        : "Connection type not valid",
      icp: icpValid ? null : "Please enter Install Number",
      assetNumber: assetNumberValid ? null : "Please enter Asset/Site number",
      model: modelValid ? null : "Please select a model.",
      streetAddress1: streetAddressValid
        ? null
        : "Please enter a street address.",
      town: townValid ? null : "Please enter a town/region.",
      mountType: mountTypeValid ? null : "Please select a mount type.",
      mountNumber: mountNumberValid ? null : "Please enter a number.",
      transformer: transformerValid ? null : "Please enter sub number"
    };
    setErrors(newErrors);

    const valid =
      connectionTypeValid &&
      icpValid &&
      modelValid &&
      assetNumberValid &&
      streetAddressValid &&
      townValid &&
      mountTypeValid &&
      mountNumberValid &&
      transformerValid;

    return valid;
  };

  const lookUpAddress = async installNumber => {
    try {
        let args = {
          docid: installNumber,
        }
        let result = await dispatch(getLocationDetails(args));
        if (result.payload) {
          let conn = JSON.parse(JSON.stringify(connection));
          conn.location = result.payload;
          setConnection(conn);
          setLatitude(result.payload.lat);
          setLongitude(result.payload.lng);
        }
     
    } catch (err) {
      onError(err, true);
    }
  };

  const getGeocode = async (streetAddress, town) => {
    try {
      const response = await geocode(streetAddress, town);
      if (response) {
        setLatitude(response.lat);
        setLongitude(response.lon);
      }

    } catch (err) {
      onError(err, true);
    }
  }

  const onError = (err, show) => {
    console.log(err);
    const msg = getErrorMessage(err);
    if (show) {
      setErrorMessage(msg);
    }
    //Sentry.captureException(`User: ${username}, ConnectionDetailsScreen: ${msg}`);
  }

  const handleSubmit = async () => {
    if (validateFields()) {
      
      try {
        setSubmitDisabled(true);

        // update map position for home screen
        dispatch(setLat(connection.location.lat));
        dispatch(setLng(connection.location.lng));
        dispatch(setZoom(15));

        connection.location.country = 'New Zealand';

        if (editMode) {
          // existing connection
          let args = {
            identifier: docid,
            connection: connection,
          }

          let result = await dispatch(updateConnection(args));
          if (result.payload) { // no error
            if (s11Slot && s11Slot > 0) {
              args = {
                identifier: docid,
                slot: s11Slot,
              }
              await dispatch(addSlot(args));
            }
          }

          // go home
          history.replace(routes.HOME_SCREEN + "/" + docid);

        } else {
          // new connection
          let args = {
            connection
          }
          let response = await dispatch(createPendingConnection(args));
          if (response.payload) {
            const id = response.payload.identifer;
            history.replace(routes.HOME_SCREEN + "/" + id);
          }

        }

      } catch (error) {
       onError(error, true);
      }
    }
  }

  const connectionTypes = [
    { value: Connection.ConnectionType.ICP, label: "ICP" },
    { value: Connection.ConnectionType.ASSET, label: "Asset/Site" }
  ];
  const models = [
    { value: Connection.ModelType.M11, label: "M11" }, 
    { value: Connection.ModelType.M31, label: "M31" },
    { value: Connection.ModelType.M31S, label: "M31s" },
    { value: Connection.ModelType.M31X, label: "M31x" },
    { value: Connection.ModelType.C11_S11, label: "C11/S11" }
  ];

  return (
    <>
    <Header
      title="Connection Details"
      backVisible={true}
      onBack={() => history.goBack()}
      history={history}
    />
    {connection && (
      <Container maxWidth="md" style={{ marginBottom: 20, marginTop: 80 }}>
        {errorMessage && (
          <Typography style={styles.errorText}>{errorMessage}</Typography>
        )}
        {connectionError && (
          <Typography style={styles.errorText}>{connectionError.toString()}</Typography>
        )}
        <Grid container direction="row" spacing={4}>
          <Grid item xs={7}>
            {/* left panel */}
            <div style={{ marginTop: 10, marginBottom: 20 }}>
              <RadioGrouping
                options={connectionTypes}
                direction="row"
                onValueChange={event =>
                  onChange("connectionType", event.target.value)
                }
                selected={connection.connectionType.toString()}
                errorMessage={errors.connectionType}
              />
            </div>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={2}
              style={{ marginBottom: 10 }}
            >
              <Grid item xs={6}>
                <ValidatedTextInput
                  value={connection.IDNumber}
                  label={connection.connectionType == 1 ? "Install Number" : "Asset/Site Number"}
                  error={connection.connectionType == 1 ? errors.icp : errors.assetNumber}
                  onChangeText={e =>
                    onChange("IDNumber", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <ValidatedTextInput
                  value={connection.transformer}
                  style={{ width: 200 }}
                  error={errors.transformer}
                  label="Sub number"
                  onChangeText={e => onChange("transformer", e.target.value)}
                />
              </Grid>
            </Grid>
            <Box style={styles.pickerContainer}>
              <Typography>Device type</Typography>
              <RadioGrouping
                options={models}
                direction="row"
                selected={connection.modelType.toString()}
                errorMessage={errors.model}
                onValueChange={event =>
                  onChange("modelType", event.target.value)
                }
              />
            </Box>
            <Grid container direction="row" spacing={4}>
              <Grid item xs={6}>
                <ValidatedTextInput
                  value={connection.location.streetAddress1}
                  error={errors.streetAddress1}
                  style={pageStyles.input}
                  label="Street address"
                  onChangeText={e =>
                    onChange("streetAddress1", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <ValidatedTextInput
                  value={connection.location.town}
                  style={pageStyles.input}
                  error={errors.town}
                  label="Town/Region"
                  onChangeText={e => onChange("town", e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={4}>
              <Grid item xs={6}>
                <TextField
                  style={pageStyles.input}
                  value={latitude || 0}
                  type="number"
                  variant="outlined"
                  label="Latitude"
                  onChange={e =>
                    onChange("latitude", parseFloat(e.target.value))
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={longitude || 0}
                  style={pageStyles.input}
                  label="Longitude"
                  type="number"
                  variant="outlined"
                  onChange={e =>
                    onChange("longitude", parseFloat(e.target.value))
                  }
                />
              </Grid>
            </Grid>
              
            {/* end left panel*/}
          </Grid>

          <Grid item style={{ marginTop: 20, marginBottom: 10 }} xs={5}>
            {latitude && longitude ? (
              <Map center={[latitude, longitude]} zoom={15}>
                <MapTiles />
                <Marker
                  position={[latitude, longitude]}
                  icon={yellowIcon}
                />
              </Map>
            ) : (
              <Box style={styles.map}>
                <Loading />
              </Box>
            )}
          </Grid>
        </Grid>
        
        <Grid container direction="row" alignItems="center" spacing={4} style={{ margin: 0 }}> {/* margin 0  */}
          <Box style={styles.pickerContainer}>
            <Typography>Mount type</Typography>
            <RadioGrouping
              options={getInstallationTypes()}
              selected={connection.mount.mountType.toString()}
              direction="row"
              errorMessage={errors.mountType}
              onValueChange={e => onChange("mountType", e.target.value)}
            />
          </Box>
          {(connection.mount.mountType == 1 || connection.mount.mountType >= 4) && (
            <ValidatedTextInput
              value={connection.mount.mountNumber}
              style={{ width: 200, marginLeft: 20 }}
              error={errors.mountNumber}
              label={mountLabel}
              onChangeText={e => onChange("mountNumber", e.target.value)}
            />
          )}
        </Grid>

        <Grid container direction="row">
        {connection.modelType > 1 &&
          <TextField
            style={{ width: 150, marginRight: 10 }}
            value={connection.rating}
            variant="outlined"
            type="number"
            label="Rating kVA"
            onChange={e => onChange("rating", e.target.value)}
          />
        }
          <TextField
            style={{ width: 250, marginRight: 10 }}
            value={connection.job.notes}
            variant="outlined"
            label="Notes for installer"
            onChange={e => onChange("notes", e.target.value)}
          />
        {connection.modelType === Connection.ModelType.C11_S11 &&
          <TextField
            style={{ width: 100}}
            multiline
            value={s11Slot}
            variant="outlined"
            label="S11 slot"
            onChange={e => onChange("s11Slot", e.target.value)}
          />
        }          
        </Grid>
        

       

        <NiceButton
          disabled={submitDisabled}
          onClick={() => handleSubmit()}
          title="OK"
        />
      </Container>
    )}
  </>
  )
}

export default ConnectionDetailsScreen;

