import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import routes from "../../routes";
import Header from "../../components/Header";
import PQData from "../../components/data/PQData";
import ProcessedData from "../../components/data/ProcessedData";
import EnergyData from "../../components/data/EnergyData";
import InstData from "../../components/data/InstData";
import AlarmsData from "../../components/data/AlarmsData";
import HarmonicsData from "../../components/data/HarmonicsData";
import MeterStatusData from "../../components/data/MeterStatusData";

const RealtimeDataScreen = ({ match, history }) => {
    const [tabValue, setTabValue] = useState(0);
    const { docid } = match.params;

    const onTabChange = (event, newValue) => {
        setTabValue(newValue);
    }

    const  a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const TabPanel = props => {
        const { children, value, index, ...other } = props;

        return (
            <Box
                role="tabpanel"
                style={{ margin: 30 }}
                hidden={value !== index}
                {...other}
            >
                {children}
            </Box>
        );
    }

    return (
        <>
            <Header
                title="Realtime Data"
                backVisible={true}
                history={history}
                onBack={() => history.replace(routes.HOME_SCREEN)}
            />
            <Tabs
                indicatorColor="secondary"
                textColor="secondary"
                value={tabValue}
                onChange={onTabChange}
                style={{ marginTop: 80 }}
            >
                <Tab label="pq" {...a11yProps(0)} />
                <Tab label="processed" {...a11yProps(1)} />
                <Tab label="energy" {...a11yProps(2)} />
                <Tab label="alarms" {...a11yProps(3)} />
                <Tab label="inst" {...a11yProps(4)} />
                <Tab label="harmonics" {...a11yProps(5)} />
                <Tab label="meter status" {...a11yProps(6)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <PQData docid={docid} visible={tabValue === 0} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <ProcessedData docid={docid} visible={tabValue === 1} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <EnergyData docid={docid} visible={tabValue === 2} />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
                <AlarmsData docid={docid} visible={tabValue === 3} />
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
                <InstData docid={docid} visible={tabValue === 4} />
            </TabPanel>
            <TabPanel value={tabValue} index={5}>
                <HarmonicsData docid={docid} visible={tabValue === 5} />
            </TabPanel>
            <TabPanel value={tabValue} index={6}>
                <MeterStatusData docid={docid} visible={tabValue === 6} />
            </TabPanel>
           
        </>
    )
}

export default RealtimeDataScreen;