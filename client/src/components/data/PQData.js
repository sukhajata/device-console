import React from "react";
import { useSelector } from "react-redux";

import { getPQMsgData } from "../../redux/slices/dataSlice";
import ThreePhaseData from "./ThreePhaseData";

const PQData = ({ docid, visible }) => {
    const pqData = useSelector(state => state.data.pqData);
    const dataError = useSelector(state => state.data.error);
    
    return (
        <ThreePhaseData 
            docid={docid} 
            visible={visible} 
            data={pqData} 
            dataError={dataError} 
            sinceSeconds={2 * 60 * 60} 
            getMsg={getPQMsgData} 
        />
    )
}

export default PQData;