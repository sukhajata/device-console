import React from "react";
import { useSelector } from "react-redux";

import { getMeterStatusData } from "../../redux/slices/dataSlice";
import SinglePhaseData from "./SinglePhaseData";

const MeterStatusData = ({ docid, visible }) => {
    const meterStatusData = useSelector(state => state.data.meterStatusData);
    const dataError = useSelector(state => state.data.error);
    
    return (
        <SinglePhaseData 
            docid={docid} 
            visible={visible} 
            data={meterStatusData} 
            dataError={dataError} 
            sinceSeconds={24 * 60 * 60} 
            getMsg={getMeterStatusData} 
        />
    )
}

export default MeterStatusData;