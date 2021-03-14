import React from "react";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";

import styles, { colors } from "../../styles/fields";

const FirmwareFilter = () => {

    return (
      <Grid container direction="column">
        <Typography style={styles.headerTypography}>
          Firmware version
        </Typography>
        <Grid container direction="row">
        <Grid container direction="row" alignItems="center" xs={2}>
            <Chip
              style={{
                backgroundColor: colors.green,
                marginRight: 8,
                marginBottom: 5
              }}
            />
            <Typography>1.1.4</Typography>
          </Grid>    
          <Grid container direction="row" alignItems="center" xs={2}>
            <Chip
              style={{
                backgroundColor: colors.blue,
                marginRight: 8,
                marginBottom: 5
              }}
            />
            <Typography>1.1.2</Typography>
          </Grid>                 
          <Grid container direction="row" alignItems="center" xs={2}>
            <Chip
              style={{
                backgroundColor: colors.markerViolet,
                marginRight: 8,
                marginBottom: 5
              }}
            />
            <Typography>1.0.12</Typography>
          </Grid>
          <Grid container direction="row" alignItems="center" xs={2}>
            <Chip
              style={{
                backgroundColor: colors.markerYellow,
                marginRight: 8,
                marginBottom: 5
              }}
            />
            <Typography>1.0.10</Typography>
          </Grid>
          <Grid container direction="row" alignItems="center" xs={2}>
            <Chip
              style={{ backgroundColor: colors.amber, marginRight: 8 }}
            />
            <Typography>1.0.8</Typography>
          </Grid>
          <Grid container direction="row" alignItems="center" xs={2}>
            <Chip
              style={{ backgroundColor: colors.markerOrange, marginRight: 8 }}
            />
            <Typography>1.0.4</Typography>
          </Grid>
          <Grid container direction="row" alignItems="center" xs={3}>
            <Chip
              style={{ backgroundColor: colors.markerRed, marginRight: 8 }}
            />
            <Typography>Other / Unknown</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
}

export default FirmwareFilter;