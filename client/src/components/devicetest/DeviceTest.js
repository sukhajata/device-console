import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';

import useInterval from '../../scripts/useInterval';
import { clearData, getInstMsgData, getPQMsgData, getUplinkMsgData } from '../../redux/slices/dataSlice';
import { updateJob } from '../../redux/slices/connectionSlice';
import { callDeviceFunction } from '../../redux/slices/functionSlice';
import TestResults from './TestResults';
import { Job } from "../../proto/connection-service_pb.js";

const DeviceTest = ({ connection, visible }) => {
  const [deadlineExceeded, setDeadlineExceeded] = useState(false);
  const [passed, setPassed] = useState(false);

  const data = useSelector(state => state.data);
  const functionResponse = useSelector(state => state.function.response);
  const token = useSelector(state => state.auth.token);

  const dispatch = useDispatch();
  const { 
    phase1Voltage,
    phase2Voltage,
    phase3Voltage,
    phase1Current,
    phase2Current,
    phase3Current,
    rssi,
    snr,
  } = data;


  useEffect(() => {
    if (connection && visible) {
        dispatch(clearData());
        pollData(); 
    }
  }, [connection, visible])


  const pollData = () => {
    const args = { 
      deviceEUI: connection.id,
      sinceSeconds: 20 * 60,
    };
    dispatch(getPQMsgData(args));
    dispatch(getInstMsgData(args));
    dispatch(getUplinkMsgData(args));
  }

  //poll for data
  useInterval(() => {
    if (connection && visible) {
        pollData();
    }
  }, 10000);

  //keep requesting inst msg if nothing has come
  useInterval(() => {
    if (connection && visible && !passed) {
        let data = {
          deviceEUI: connection.id,
          functionName: 'instmsg',
          param1: '0'
        }

        dispatch(callDeviceFunction({ data: data, token: token }));
    }
  }, 10000);

  //check for acceptance
  useEffect(() => {
    if (connection) {
      if (snr && rssi && (phase1Voltage || phase2Voltage || phase3Voltage)) {
        setPassed(true);
      }
      /*if (connection.connectionType > 1) {
        if (snr && rssi && phase1Voltage && phase2Voltage && phase3Voltage) {
          setPassed(true);
        }
      } else {
        if (snr && rssi && (phase1Voltage || phase2Voltage || phase3Voltage)) {
          setPassed(true);
        }
      }*/
    }
  }, [phase1Voltage, phase2Voltage, phase3Voltage, snr, rssi]);

  const saveResults = async () => {
    try {
      //setSubmitDisabled(true);
      connection.job.jobState = Job.JobState.TESTED;

      let tr = {
        downlinkRssi: rssi,
        downlinkSnr: snr,
      }
      if (connection.modelType == 1) {
        //single phase
        if (phase1Voltage > 0) {
          tr.line1 = {
            voltage: phase1Voltage,
            current: phase1Current,
          }
        } else if (phase2Voltage > 0) {
          tr.line1 = {
            voltage: phase2Voltage,
            current: phase2Current,
          }
        } else if (phase3Voltage > 0) {
          tr.line1 = {
            voltage: phase3Voltage,
            current: phase3Current
          }
        }
      } else {
        //3 phase
        if (phase1Voltage > 0) {
          tr.line1 = {
            voltage: phase1Voltage,
            current: phase1Current,
          }
        }
        if (phase2Voltage > 0) {
          tr.line2 = {
            voltage: phase2Voltage,
            current: phase2Current,
          }
        }
        if (phase3Voltage > 0) {
          tr.line3 = {
            voltage: phase3Voltage,
            current: phase3Current
          }
        }
      }
      connection.job.testResult = tr;

      const request = {
        id: connection.id,
        job: connection.job,
        token: token,
      }
      await dispatch(updateJob(request));
     
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container style={{ marginTop: 20 }}>
    {connection && 
    <>
      {connection.device ? (
        <TestResults 
          deadlineExceeded={deadlineExceeded} 
          passed={passed}
          serialNumber={connection.device.serialNumber}
          saveResults={saveResults}
        />
      ) : (
        <Typography>No device connected</Typography>
      )}
    </>
    }
    </Container>
  );
};

export default DeviceTest;