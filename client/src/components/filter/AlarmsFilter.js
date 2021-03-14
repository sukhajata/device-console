import React from "react";
import Chip from '@material-ui/core/Chip';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { colors } from "../../styles/fields";

export const ALARM_TYPE_VERY_HIGH_VOLTAGE = "veryhighvoltagealarm";
export const ALARM_TYPE_HIGH_VOLTAGE = "highvoltagealarm";
export const ALARM_TYPE_LOW_VOLTAGE = "lowvoltagealarm";
export const ALARM_TYPE_VERY_LOW_VOLTAGE = "verylowvoltagealarm";

const Item = ({color, label}) => (
    <>
        <Chip
            style={{
                backgroundColor: color,
                marginRight: 8,
                marginBottom: 5
            }}
        />
        <Typography style={{ marginRight: 15 }}>{label}</Typography>
    </>
);

const AlarmsFilter = () => (
    <Grid container direction="row" alignItems="center">
        <Item color={colors.red} label="Very high voltage"/>
        <Item color={colors.markerOrange} label="High voltage"/>
        <Item color={colors.markerYellow} label="Low voltage"/>
        <Item color={colors.markerViolet} label="Very low voltage"/>
        <Item color={colors.markerBlue} label="Power fail"/>
    </Grid>
)

export default AlarmsFilter;
/*<Grid container direction="row" alignItems="center" >
        <Chip
            style={{
                backgroundColor: color,
                marginRight: 8,
                marginBottom: 5
            }}
        />
        <Typography>{label}</Typography>
    </Grid>
/*
 <Grid item>
                <Typography style={styles.headerTypography}>Time alarm received</Typography>
                <FormControlLabel
                    checked={alarmsSince === ONE_HOUR_SECONDS}
                    onChange={() => changeFilter(ONE_HOUR_SECONDS)}
                    control={<Radio />}
                    label="Last 1 hour"
                />
                <FormControlLabel
                    checked={alarmsSince === (6 * ONE_HOUR_SECONDS)}
                    onChange={() => changeFilter(6 * ONE_HOUR_SECONDS)}
                    control={<Radio />}
                    label="Last 6 hours"
                />
                <FormControlLabel
                    checked={alarmsSince === ONE_DAY_SECONDS}
                    onChange={() => changeFilter(ONE_DAY_SECONDS)}
                    control={<Radio />}
                    label="Last 24 hours"
                />
                <FormControlLabel
                    checked={alarmsSince === (7 * ONE_DAY_SECONDS)}
                    onChange={() => changeFilter(7 * ONE_DAY_SECONDS)}
                    control={<Radio />}
                    label="Last 1 week"
                />
            </Grid>
            <Typography style={styles.headerTypography}>Alarm type</Typography>
            <Grid container direction="row">
                <FormControlLabel
                    checked={alarmType === ALARM_TYPE_VERY_HIGH_VOLTAGE}
                    onChange={() => changeAlarmType(ALARM_TYPE_VERY_HIGH_VOLTAGE)}
                    control={<Radio style={{ color: colors.markerRed}} />}
                    label="Very high voltage"
                />
                <FormControlLabel
                    checked={alarmType === ALARM_TYPE_HIGH_VOLTAGE}
                    onChange={() => changeAlarmType(ALARM_TYPE_HIGH_VOLTAGE)}
                    control={<Radio style={{ color: colors.markerOrange }} />}
                    label="High voltage"
                />
                <FormControlLabel
                    checked={alarmType === ALARM_TYPE_LOW_VOLTAGE}
                    onChange={() => changeAlarmType(ALARM_TYPE_LOW_VOLTAGE)}
                    control={<Radio style={{ color: colors.green }} />}
                    label="Low voltage"
                />
                <FormControlLabel
                    checked={alarmType === ALARM_TYPE_VERY_LOW_VOLTAGE}
                    onChange={() => changeAlarmType(ALARM_TYPE_VERY_LOW_VOLTAGE)}
                    control={<Radio style={{ color: colors.markerBlue }} />}
                    label="Very low voltage"
                />
            </Grid>
            */