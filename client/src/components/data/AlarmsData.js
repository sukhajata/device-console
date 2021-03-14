import React from "react";
import { useSelector } from "react-redux";

import { getAlarmsData } from "../../redux/slices/dataSlice";
import SinglePhaseData from "./SinglePhaseData";

const AlarmsData = ({ docid, visible }) => {
    const alarmData = useSelector(state => state.data.alarmData);
    const dataError = useSelector(state => state.data.error);
    
    return (
        <SinglePhaseData 
            docid={docid} 
            visible={visible} 
            data={alarmData} 
            dataError={dataError} 
            sinceSeconds={2 * 60 * 60} 
            getMsg={getAlarmsData} 
        />
    )
}

export default AlarmsData;