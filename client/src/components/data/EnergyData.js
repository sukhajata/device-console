import React from "react";
import { useSelector } from "react-redux";

import { getEnergyMsgData } from "../../redux/slices/dataSlice";
import SinglePhaseData from "./SinglePhaseData";

const EnergyData = ({ docid, visible }) => {
    const energyData = useSelector(state => state.data.energyData);
    const dataError = useSelector(state => state.data.error);
    
    return (
        <SinglePhaseData 
            docid={docid} 
            visible={visible} 
            data={energyData} 
            dataError={dataError} 
            sinceSeconds={2 * 60 * 60} 
            getMsg={getEnergyMsgData} 
        />
    )
}

export default EnergyData;