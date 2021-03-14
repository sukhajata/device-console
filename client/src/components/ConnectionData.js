import React from "react";

const ConnectionData = () => (
  <iframe
  title="Message data"
    style={{ width: "100%", height: window.innerHeight - 300, margin: 20 }}
    src="https://app.powerbi.com/view?r=eyJrIjoiOTU1MzhiNjktMTJiMS00NjRjLWJlYjYtNmJlNTc3NjRjYjRkIiwidCI6IjUxNTM1MjY0LTRkZjQtNDQ4MC04NzFjLWMxMDc1ZDA2ZDU3YyJ9"
    frameBorder="0"
    allowFullScreen={true}
  ></iframe>
);

export default ConnectionData;

/*import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Button from "@material-ui/core/Button";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { useSelector } from "react-redux";

import { ConnectionServiceClient } from "../proto/connection-service_grpc_web_pb.js";
import { DataQueryRequest } from "../proto/connection-service_pb.js";
import { getMetadata } from "../scripts/urlHelper";

/*
const connectionServiceClient = new ConnectionServiceClient(
    getConnectionServiceUrl(),
    null,
    null
);

const ConnectionData = ({ selectConnection }) => {
    const filtered = useSelector(state => state.filtered);
    const [data, setData] = useState();

    useEffect(() => {
        sortBy("DAY", false);
    }, []);

    const sortBy = async (field, desc) => {
        let request = new DataQueryRequest();

        let where = `"IDNUMBER" IN(`;
        filtered.forEach(item => {
            where += `'${item.idNumber}',`
        });
        where = where.substring(0, where.length - 1); // remove last comma
        where += ")";
        request.setWhere(where);
        request.setOrderby(`"${field}"`);
        if (desc) {
            request.setDesc(true);
        }
        request.setLimit(100);

        
            connectionServiceClient.getUplinkDayData(request, getMetadata(token), (err, response) => {
                if (err) {
                    console.log(err);
                }
                if (response) {
                    setData(response.getRowsList())
                }
            })
        
    }

    return (
        <Table size="medium">
            <TableHead>
                <TableRow>
                    <TableCell><Button onClick={() => sortBy("IDNUMBER", true)}><ArrowUpward /></Button>ICP<Button onClick={() => sortBy("IDNUMBER", false)}><ArrowDownward /></Button></TableCell>
                    <TableCell>DeviceEUI</TableCell>
                    <TableCell>Serial No.</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell><Button onClick={() => sortBy("DAY", true)}><ArrowUpward/></Button>UTC DAY<Button onClick={() => sortBy("DAY", false)}><ArrowDownward/></Button></TableCell>
                    <TableCell><Button onClick={() => sortBy("TOTALMESSAGES", true)}><ArrowUpward /></Button>TOTAL_MESSAGES<Button onClick={() => sortBy("TOTALMESSAGES", false)}><ArrowDownward /></Button></TableCell>
                    <TableCell><Button onClick={() => sortBy("AVGRSSI", true)}><ArrowUpward /></Button>AVG RSSI<Button onClick={() => sortBy("AVGRSSI", false)}><ArrowDownward /></Button></TableCell>
                    <TableCell><Button onClick={() => sortBy("AVGSNR", true)}><ArrowUpward /></Button>AVG SNR<Button onClick={() => sortBy("AVGSNR", false)}><ArrowDownward /></Button></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data &&
                    data.map((item, i) => (
                        <TableRow
                            key={i}
                            cursor="pointer"
                        >
                            <TableCell>
                                {item.getIdnumber()}
                            </TableCell>
                            <TableCell><Button onClick={() => selectConnection(item.getDeviceeui())}>{item.getDeviceeui()}</Button></TableCell>
                            <TableCell>
                                {item.getSerialnumber()}
                            </TableCell>
                            <TableCell>{item.getStreetaddress() + ", " + item.getTown()}</TableCell>
                            <TableCell>
                                {item.getDay()}
                            </TableCell>
                            <TableCell>
                                {item.getTotalmessages()}
                            </TableCell>
                            <TableCell>
                                {Math.round(item.getAvgrssi() * 100) / 100}
                            </TableCell>
                            <TableCell>
                                {Math.round(item.getAvgsnr() * 100) / 100}
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
       
    )
}

export default ConnectionData;


        
        
        */