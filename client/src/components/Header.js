import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Logo from "../styles/powerpilot-logo.png";

import { getTenant } from "../scripts/urlHelper";
import { logout} from "../redux/slices/authSlice";
import routes from "../routes";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

const appVersion = process.env.REACT_APP_VERSION;

const Header = ({ title, backVisible, onBack, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onLogout = async () => {
    await dispatch(logout());
    //history.push(routes.LOGIN);
  }

  return (
    <AppBar
      position="fixed"
      color="inherit"
      style={{ marginBottom: 30 }} //marginLeft: 300, width: `calc(100% - 300px)` }}
    >
      <Toolbar>
        {backVisible && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Back"
            onClick={onBack}
          >
            <ArrowBack />
          </IconButton>
        )}
        <img src={Logo} style={{ width: 200 }} alt="Powerpilot logo" />
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" style={{ marginLeft: 20 }}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Typography style={{ marginLeft: 5, marginRight: 10 }}>
                {appVersion}
              </Typography>
              {getTenant() === "westpower" && (
                <Button
                  style={{ marginRight: 10 }}
                  variant="contained"
                  color="primary"
                  onClick={() => history.push(routes.MESSAGE_STATS_SCREEN)}
                >
                  Message Stats
                </Button>
              )}
              <Button
                variant="outlined"
                color="inherit"
                onClick={onLogout}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

/*
            <Button
              style={{ marginRight: 10 }}
              variant="contained"
              color="primary"
              onClick={() => history.push(routes.MESSAGE_STATS_SCREEN)}
            >
              Message Stats
            </Button>
            */
