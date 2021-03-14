import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Counter from "./Counter";
import SignalMeter from "./SignalMeter";
import { READING_TAGS } from "../../model/DeviceTestResults";
import { colors } from "../../styles/fields";
import DeviceTestResults from "../../model/DeviceTestResults";

export const TESTING_STATES = {
  PENDING: "Test pending",
  SENDING: "Sending request",
  WAITING: "Waiting for results",
  RECEIVED: "Results received"
};

const DeviceTestItem = ({
  icp,
  phases,
  premise,
  serialNumber,
  testingState,
  results
}) => {
  const PhaseReport = ({ phase }) => (
    <>
      <Box style={styles.reading}>
        <Typography
          style={styles.heading}
        >{`Phase ${phase.toString()} voltage`}</Typography>
        <Counter
          value={DeviceTestResults.getValue(
            results,
            READING_TAGS.VOLTAGE,
            phase
          )}
          expectedValue={230}
        />
      </Box>
      <Box style={styles.reading}>
        <Typography
          style={styles.heading}
        >{`Phase ${phase.toString()} current`}</Typography>
        <Counter
          value={DeviceTestResults.getValue(
            results,
            READING_TAGS.CURRENT,
            phase
          )}
          expectedValue={0}
        />
      </Box>
    </>
  );

  return (
    <Card
      style={{
        backgroundColor: colors.paleYellow,
        padding: 10,
        marginBottom: 10
      }}
    >
      <CardContent>
        <Box>
          <Typography>{`ICP: ${icp}`}</Typography>
          <Typography>{`Phase: ${phases}`}</Typography>
          {premise && <Typography>{`Premise: ${premise}`}</Typography>}
          {serialNumber && (
            <>
              <Typography>{`Serial number: ${serialNumber}`}</Typography>
            </>
          )}
        </Box>
        <Box>
          {results.Received ? (
            <>
              <Box style={styles.reading}>
                <Typography style={styles.heading}>Signal Strength</Typography>
                <SignalMeter
                  strength={DeviceTestResults.signalBars(results, 100)}
                />
                <Typography>
                  {DeviceTestResults.signalBars(results, 100)}
                </Typography>
              </Box>
              {DeviceTestResults.getValue(results, READING_TAGS.VOLTAGE, 1) && (
                <PhaseReport key={1} phase={1} />
              )}
              {DeviceTestResults.getValue(results, READING_TAGS.VOLTAGE, 2) && (
                <PhaseReport key={2} phase={2} />
              )}
              {DeviceTestResults.getValue(results, READING_TAGS.VOLTAGE, 3) && (
                <PhaseReport key={3} phase={3} />
              )}
            </>
          ) : (
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: 16,
                paddingTop: 50,
                paddingBottom: 50
              }}
            >
              {testingState}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const styles = {
  reading: { marginTop: 10 },
  heading: { fontWeight: "bold", fontSize: 16 }
};

DeviceTestItem.propTypes = {
  phase: PropTypes.string,
  premise: PropTypes.string,
  serialNumber: PropTypes.number,
  testingState: PropTypes.string.isRequired,
  results: PropTypes.object
};

export default DeviceTestItem;
