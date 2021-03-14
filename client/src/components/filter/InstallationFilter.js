import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from "react-redux";

import { setShowConfigured, setShowConnected, setShowFailed, setShowPending, setShowTested } from "../../redux/slices/filterSlice";
import { colors } from "../../styles/fields";

const InstallationFilter = () => {
    const dispatch = useDispatch();
    const showPending = useSelector(state => state.connection.showPending);
    const showFailed = useSelector(state => state.connection.showFailed);
    const showConnected = useSelector(state => state.connection.showConnected);
    const showTested = useSelector(state => state.connection.showTested);
    const showConfigured = useSelector(state => state.connection.showConfigured);

    const changeFilter = (name, value) => {
        let action;
        switch (name) {
            case "showPending":
                action = setShowPending(value);
                break;
            case "showTested":
                action = setShowTested(value);
                break;
            case "showConnected":
                action = setShowConnected(value);
                break;
            case "showFailed":
                action = setShowFailed(value);
                break;
            case "showConfigured":
                action = setShowConfigured(value);
                break;
            default:
                break;
        }
        if (action) {
            dispatch(action);
        }
    };

    return (
        <Box>
            <FormControlLabel
                checked={showPending}
                onChange={() => changeFilter("showPending", !showPending)}
                control={<Checkbox style={{ color: colors.markerYellow }} />}
                label="Install pending"
            />
            <FormControlLabel
                checked={showConfigured}
                onChange={() => changeFilter("showConfigured", !showConfigured)}
                control={<Checkbox style={{ color: colors.markerOrange }} />}
                label="Configured"
            />
            <FormControlLabel
                checked={showTested}
                onChange={() => changeFilter("showTested", !showTested)}
                control={<Checkbox style={{ color: colors.markerBlue }} />}
                label="Tested, awaiting sign off"
            />
            <FormControlLabel
                checked={showConnected}
                onChange={() => changeFilter("showConnected", !showConnected)}
                control={<Checkbox style={{ color: colors.green }} />}
                label="Connected"
            />
            <FormControlLabel
                checked={showConnected}
                onChange={() => changeFilter("showFailed", !showFailed)}
                control={<Checkbox style={{ color: colors.markerRed }} />}
                label="Install failed"
            />
        </Box>
    )
}

export default InstallationFilter;