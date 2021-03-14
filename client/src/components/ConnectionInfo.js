import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { Map, Marker } from "react-leaflet";

import styles, { colors } from "../styles/fields";
import { getInstallationTypeByValue } from "../scripts/deviceSummaryService";
import { Connection, Job } from "../proto/connection-service_pb";
import Lightbox from "./Lightbox";
import MapTiles from "./map/MapTiles";
import Loading from "./Loading";
import { yellowIcon } from "../styles/markers";

const pageStyles = {
  outerGrid: {
    //backgroundColor: colors.smoke,
    padding: 5,
    marginTop: 10,
    marginBottom: 10
  },
  buttonDelete: {
    backgroundColor: colors.red,
    color: colors.white,
    marginLeft: 10
  },
  paperStyle: { padding: 20 },
};

const ConnectionInfo = ({
  connection,
  markAsComplete,
  deleteConnection,
  edit,
  connectionImgs
}) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  //const [signOffDisabled, setSignOffDisabled] = useState(true);
  const [connectionState, setConnectionState] = useState("pending");
  const [jobState, setJobState] = useState();

  useEffect(() => {
    if (connection) {
      if (connection.location) {
        setLatitude(connection.location.lat);
        setLongitude(connection.location.lng);
      }

      if (connection.job) {
        switch (connection.job.jobState) {
          case Job.JobState.PENDING:
            setJobState("pending");
            break;
          case Job.JobState.CONFIGURED:
            setJobState("configured");
            break;
          case Job.JobState.INSTALLED:
            setJobState("installed");
            break;
          case Job.JobState.TESTED:
            setJobState("tested");
            break;
          case Job.JobState.FAILED:
            setJobState("failed");
            break;
          default:
            setJobState("unknown");
            break;
        }
      }

      if (connection.connectionState === Connection.ConnectionState.CONNECTED) {
        setConnectionState("connected");
      }
    }
  }, [connection]);

  //const signOffDisabled =
  // connection.connectionState === Connection.ConnectionState.CONNECTED ||
  // !connection.job.testResult

  const modelTypes = [
    { value: Connection.ModelType.M11, label: "M11" },
    { value: Connection.ModelType.M31, label: "M31" },
    { value: Connection.ModelType.M31S, label: "M31s" },
    { value: Connection.ModelType.M31X, label: "M31x" },
    { value: Connection.ModelType.C11_S11, label: "C11/S11" }
  ];

  const getModelTypeLabel = modelType => {
    const tt = modelTypes.find(item => item.value == modelType);
    if (tt) {
      return tt.label;
    }

    return "UNKNOWN";
  };

  const LineTestResult = ({label, line}) => (
    <TableRow key={label}>
      <TableCell style={{ fontWeight: 'bold' }}>{label}</TableCell>
      <TableCell>{line.voltage}</TableCell>
      <TableCell>{line.current}</TableCell>
    </TableRow>
  );

  const InfoRow = ({label, value}) => (
    <TableRow key={label}>
      <TableCell style={{ fontWeight: 'bold' }}>{label}</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );

  return (
    <Container maxWidth="lg">
    <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={4} style={pageStyles.outerGrid}>
      <Grid item xs={6} > {/* left panel */}
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Typography variant="h5">
              Connection Info
            </Typography>        
          </Grid>
          <Grid item style={{ marginBottom: 10 }}>
            <Button variant="contained" color="primary" onClick={edit}>
              Edit
            </Button>
            <Button style={pageStyles.buttonDelete} onClick={deleteConnection}>
              Delete
            </Button>
          </Grid>
        </Grid>
        <Paper style={pageStyles.paperStyle}>
          <Table>
            <TableBody>
              {Object.entries({
                'Install number': connection.IDNumber,
                'Address': connection.location.streetAddress1 + ', ' + connection.location.town,
                'State': jobState,
                'Transformer': connection.transformer,
                'Mount type': getInstallationTypeByValue(connection.mount.mountType),
                'Mount number': connection.mount.mountNumber,
                'Model': getModelTypeLabel(connection.modelType),
                'Serial Number': connection.device ? connection.device.serialNumber : '',
                'Device EUI': connection.device ? connection.device.deviceEUI : '', 
                'Date installed': connection.dateCreated,
                'Notes': connection.job.notes,
                'Comments': connection.job.comments,
              }).map(([key,value]) => 
                <InfoRow key={key} label={key} value={value} />
              )}
              {connection.job.reasonForFailure && 
                <InfoRow key="fail" label="Reason for failure" value={connection.job.reasonForFailure} />
              }
              {connection.rating && 
                <InfoRow key="rating" label="Rating" value={connection.rating} />
              }
            </TableBody>
          </Table>
        </Paper>
      </Grid> {/* end left panel */}

      <Grid item xs={6}> {/* right panel */}
        <Box style={{ width: '100%', height: 300 }}>
          {latitude && longitude ? (
            <Map center={[latitude, longitude]} zoom={15}>
              <MapTiles />
              <Marker position={[latitude, longitude]} icon={yellowIcon} />
            </Map>
          ) : (
            <Box style={styles.map}>
              <Loading />
            </Box>
          )}
        </Box>
        <Typography variant="h5" style={{ marginTop: 10, marginBottom: 10 }}>
          Test Results
        </Typography>
        <Paper style={pageStyles.paperStyle}>
        {!connection.job.testResult && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No test results yet.</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        )}
        {connection.job.testResult && (
          <Table style={{ marginBottom: 20 }}>
            <TableHead>
              <TableRow>
                <TableCell>&nbsp;</TableCell>
                <TableCell>Voltage</TableCell>
                <TableCell>Current</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {connection.job.testResult.line1 && (
              <LineTestResult line={connection.job.testResult.line1} label="Line 1" />
            )}
            {connection.job.testResult.line2 && (
              <LineTestResult line={connection.job.testResult.line2} label="Line 2" />
            )}
            {connection.job.testResult.line3 && (
              <LineTestResult line={connection.job.testResult.line3} label="Line 3" />
            )}
            {Object.entries({
              'Uplink SNR': connection.job.testResult.uplinkSNR,
              'Downlink SNR': connection.job.testResult.downlinkSNR,
              'Uplink RSSI': connection.job.testResult.uplinkRSSI,
              'Software version': connection.job.testResult.software,
            })
              .map(([key, value]) => 
              <InfoRow key={key} label={key} value={value} />
            )}
            </TableBody>
          </Table>
        )}
        </Paper>
      </Grid>
      
    </Grid>

    <Lightbox
      images={connectionImgs}
      open={true}
      handleModalClose={() => {}}
    />
  </Container>
  );
};

export default ConnectionInfo;
