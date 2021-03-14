import React from 'react';
import { useSelector } from 'react-redux';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Cancel from "@material-ui/icons/Cancel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

import styles, { colors } from '../../styles/fields';
import Loading from '../Loading';
import NiceButton from '../NiceButton';

const Row = ({ title, value, color = colors.black }) => (
  <TableRow>
    <TableCell style={{ color: color }}>{title}</TableCell>
    <TableCell style={{ color: color }}>{value}</TableCell>
  </TableRow>
);

const TestResults = ({ deadlineExceeded, serialNumber, passed, saveResults }) => {
  const error = useSelector(state => state.data.error);
  const data = useSelector(state => state.data);
  const { 
    phase1Voltage,
    phase1Current,
    phase1ActivePower,
    phase2Voltage,
    phase2Current,
    phase2ActivePower,
    phase3Voltage,
    phase3Current,
    phase3ActivePower,
    rssi,
    snr,
  } = data;

  return (
    <Container>
      {error && (
        <Typography style={styles.errorText}>{error}</Typography>
      )}
      <Card
        style={{
          backgroundColor: colors.paleYellow,
          padding: 10,
          marginBottom: 10
        }}
      >
        <CardContent>
          <Grid
            container
            direction="row"
            spacing={8}
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              <Table>
                <TableBody>
                  <Row
                    title="Serial Number"
                    value={serialNumber}
                  />
                  {phase1Voltage > 0 &&
                  <Row
                    title="Phase 1 Voltage"
                    value={Math.round(phase1Voltage * 100) / 100}
                  />
                  }
                  {phase1Current > 0 &&
                    <Row
                      title="Phase 1 Current"
                      value={Math.round(phase1Current * 100) / 100}
                    />
                  }
                  {phase1ActivePower != 0 && !isNaN(phase1ActivePower) && 
                    <Row
                      title="Phase 1 Active Power"
                      value={Math.round(phase1ActivePower * 100) / 100}
                      color={phase1ActivePower > 0 ? colors.black : colors.red}
                    />
                  }
                    {phase2Voltage != 0 &&
                    <Row
                      title="Phase 2 Voltage"
                      value={Math.round(phase2Voltage * 100) / 100}
                    />
                  }
                  {phase2Current > 0 &&
                    <Row
                      title="Phase 2 Current"
                      value={Math.round(phase2Current * 100) / 100}
                    />
                  }
                  {phase2ActivePower != 0 && !isNaN(phase2ActivePower) &&
                    <Row
                      title="Phase 2 Active Power"
                      value={Math.round(phase2ActivePower * 100) / 100}
                      color={phase2ActivePower > 0 ? colors.black : colors.red}
                    />
                  }                        
                  {phase3Voltage > 0 &&
                    <Row
                      title="Phase 3 Voltage"
                      value={Math.round(phase3Voltage * 100) / 100}
                    />
                  }
                  {phase3Current > 0 &&
                    <Row
                      title="Phase 3 Current"
                      value={Math.round(phase3Current * 100) / 100}
                    />
                  }
                  {phase3ActivePower != 0  && !isNaN(phase3ActivePower) && 
                    <Row
                      title="Phase 3 Active Power"
                      value={Math.round(phase3ActivePower * 100) / 100}
                      color={phase3ActivePower > 0 ? colors.black : colors.red}
                    />
                  }       
                  {rssi != 0 &&
                    <Row
                      title="rssi"
                      value={rssi}
                    />
                  }
                  {snr != 0 &&
                    <Row
                      title="snr"
                      value={snr}
                    />
                  }
                </TableBody>
              </Table>
            </Grid>
            <Grid
              container
              direction="column"
              alignItems="center"
            >
            {passed ? (
              <CheckCircle
                style={{
                  fontSize: 64,
                  color: passed ? "green" : "lightgrey"
                }}
              />
            ) : (
              <>
                {deadlineExceeded ? (
                  <Grid container direction="column" justify="center" alignItems="center">
                    <Cancel style={{ fontSize: 64, color: colors.red }} />
                    <Typography>Comms failed. Please remove fuse for one minute and try again.</Typography>
                    <Button 
                      variant="contained" 
                      style={{ backgroundColor: colors.green, color: colors.white, marginTop: 10, marginBottom: 10 }}
                      onClick={() => window.location.reload()}
                    >Retry</Button>
                  </Grid>
                ) : (
                  <Loading />
                )}
              </>
            )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <NiceButton
        title="Save"
        onClick={saveResults}
        disabled={!passed}
      />
    </Container>
  )
};

export default TestResults;