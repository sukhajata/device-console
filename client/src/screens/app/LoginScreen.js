import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from "react-redux";

import styles from '../../styles/fields';
import { login } from '../../redux/slices/authSlice';
import Logo from "../../assets/powerpilot-logo.png";

const LoginScreen = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [message, setMessage] = useState();
  
  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error);

  const onSubmit = async () => {
    if (name.length > 2 && password.length > 2) {
      setSubmitDisabled(true);
      try {
        dispatch(login({
          username: name, 
          password
        }));
      } catch (e) {
        console.log(e);
        setMessage('Authentication failed');
        setSubmitDisabled(false);
      }
    } else {
      setMessage('Please enter credentials');
    }
  }

  return (
    <Container  style={{ marginTop: 50 }}>
      <img src={Logo} style={{ width: 200, marginLeft: 'auto', marginRight: 'auto', display: 'block', marginBottom: 40   }} alt="Powerpilot logo" />
      <Typography style={styles.errorTypography}>{message}</Typography>
      <Typography style={styles.errorTypography}>{error}</Typography>
      <TextField
        variant="outlined"
        fullWidth
        label="username"
        value={name}
        required
        onChange={e => setName(e.target.value)}
        style={{
          marginTop: 10,
          marginBottom: 30,
        }}
      />
      <TextField
        variant="outlined"
        fullWidth
        label="password"
        value={password}
        type="password"
        required
        onChange={e => setPassword(e.target.value)}
        style={{
          marginBottom: 30,
        }}
      />
       <Button v
        variant="outlined" 
        color="primary" 
        style={{ textTransform: "none" }}
        onClick={onSubmit}
        disabled={submitDisabled}
      >Login</Button>
    </Container>
  );
};

export default LoginScreen;
