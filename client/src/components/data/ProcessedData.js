import React from "react";
import { useSelector } from "react-redux";

import { getProcessedMsgData } from "../../redux/slices/dataSlice";
import ThreePhaseData from "./ThreePhaseData";

const ProcessedData = ({ docid, visible }) => {
    const processedData = useSelector(state => state.data.processedData);
    const dataError = useSelector(state => state.data.error);
    
    return (
        <ThreePhaseData 
            docid={docid} 
            visible={visible} 
            data={processedData} 
            dataError={dataError} 
            sinceSeconds={2 * 60 * 60} 
            getMsg={getProcessedMsgData} 
        />
    )
}

export default ProcessedData;