import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useDispatch } from "react-redux";

import { sendRelayCommand } from "../redux/slices/switchingSlice";
import RadioGrouping from "./RadioGrouping";

const Switching = ({ connection }) => {
  const dispatch = useDispatch();
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const [relay, setRelay] = useState(1);
  const [command, setCommand] = useState(0);

  const onSend = async () => {
      const data = {
        index: parseInt(relay),
        deviceeui: connection.id,
        command: parseInt(command)
      };
      await dispatch(sendRelayCommand({ data: data }));
  };

  const relayOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" }
  ];
  const commandOptions = [
    { value: 0, label: "0" },
    { value: 1, label: "1" }
  ];

  return (
    <Box style={{ margin: 30 }}>
      <Typography>Relay index</Typography>
      <RadioGrouping
        options={relayOptions}
        direction="row"
        onValueChange={e => setRelay(e.target.value)}
        selected={relay.toString()}
      />
      <Typography style={{ marginTop: 20 }}>Relay state</Typography>
      <RadioGrouping
        options={commandOptions}
        direction="row"
        onValueChange={e => setCommand(e.target.value)}
        selected={command.toString()}
      />
      <Button
        style={{ marginTop: 20 }}
        variant="contained"
        color="primary"
        disabled={submitDisabled}
        onClick={onSend}
      >
        Send
      </Button>
    </Box>
  );
};

export default Switching;
