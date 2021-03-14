import React from "react";
import { useSelector } from "react-redux";

import { getInstMsgData } from "../../redux/slices/dataSlice";
import ThreePhaseData from "./ThreePhaseData";

const InstData = ({ docid, visible }) => {
    const instData = useSelector(state => state.data.instData);
    const dataError = useSelector(state => state.data.error);
    
    return (
        <ThreePhaseData 
            docid={docid} 
            visible={visible} 
            data={instData} 
            dataError={dataError} 
            sinceSeconds={2 * 60 * 60} 
            getMsg={getInstMsgData} 
        />
    )
}

export default InstData;