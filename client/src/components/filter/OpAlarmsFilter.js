import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";

import { useSelector, useDispatch } from "react-redux";

import { setOpAlarmsSince } from "../../redux/slices/filterSlice";
import styles, { colors } from "../../styles/fields";

const OpAlarmsFilter = () => {
    const dispatch = useDispatch();
    const opAlarmsSince = useSelector(state => state.filter.opAlarmsSince);
    const ONE_HOUR_SECONDS = 3600;
    const ONE_DAY_SECONDS = 86400;

    const changeFilter = (value) => {
        dispatch(setOpAlarmsSince(value));
    };

    const KeyItem = ({color, label}) => (
        <>
            <Chip style={{ backgroundColor: color, marginRight: 8, marginBottom: 5 }} />
            <Typography style={{ marginRight: 15 }}>{label}</Typography>
        </>
    );

    return (
        <Grid container direction="column">
            <Grid item>
                <Typography style={styles.headerTypography}>Time alarm received</Typography>
                <FormControlLabel
                    checked={opAlarmsSince === ONE_HOUR_SECONDS}
                    onChange={() => changeFilter(ONE_HOUR_SECONDS)}
                    control={<Radio />}
                    label="Last 1 hour"
                />
                <FormControlLabel
                    checked={opAlarmsSince === (6 * ONE_HOUR_SECONDS)}
                    onChange={() => changeFilter(6 * ONE_HOUR_SECONDS)}
                    control={<Radio  />}
                    label="Last 6 hours"
                />
                <FormControlLabel
                    checked={opAlarmsSince === ONE_DAY_SECONDS}
                    onChange={() => changeFilter(ONE_DAY_SECONDS)}
                    control={<Radio  />}
                    label="Last 24 hours"
                />
                <FormControlLabel
                    checked={opAlarmsSince === (7 * ONE_DAY_SECONDS)}
                    onChange={() => changeFilter(7 * ONE_DAY_SECONDS)}
                    control={<Radio  />}
                    label="Last 1 week"
                />
            </Grid>
            <Typography style={styles.headerTypography}>Time without messages from device</Typography>
            <Grid container direction="row" justify="flex-start" alignItems="center">
                <KeyItem color={colors.markerYellow} label="&gt; 30 mins"/>
                <KeyItem color={colors.markerOrange} label="&gt; 2 hours"/>
                <KeyItem color={colors.markerRed} label="&gt; 24 hours"/>
            </Grid>
        </Grid>
    )
}

export default OpAlarmsFilter;