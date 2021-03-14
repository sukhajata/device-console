import React, { createRef, useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AddCircle from "@material-ui/icons/AddCircle";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useDispatch, useSelector } from "react-redux";
import * as Sentry from "@sentry/browser";

//custom components / scripts
import { setZoom, setLat, setLng, setMapType } from "../../redux/slices/mapSlice";
import { getConnections, filterConnections } from "../../redux/slices/connectionSlice";
import useInterval from "../../scripts/useInterval";
import routes from "../../routes";
import styles, { colors } from "../../styles/fields";
import Header from "../../components/Header";
import ConnectionTable from "../../components/datatable/ConnectionTable";
import ConnectionMapContainer from "../../components/map/ConnectionMapContainer";
import Filter from "../../components/filter/Filter";
import { usePageVisibility } from "react-page-visibility";
import { getErrorMessage } from "../../scripts/urlHelper";

const pageStyles = {
  outerBox: {
    backgroundColor: colors.white,
    marginTop: 90,
    marginBottom: 50,
    marginLeft: 30,
    marginRight: 30,
    height: "100%"
  }
}

const HomeScreen = ({ history }) => {
  const mapRef = createRef();
  const [errorMessage, setErrorMessage] = useState();
  const [mapTableIndex, setMapTableIndex] = useState(0);

  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const error = useSelector(state => state.connection.error);
  const mapType = useSelector(state => state.map.mapType);
  const username = useSelector(state => state.auth.username);
  const isVisible = usePageVisibility();

  useEffect(() => {
    if (isVisible) {
      loadData();
    }
  }, [isVisible]);

  const loadData = async() =>  {
    await dispatch(getConnections());
    await dispatch(filterConnections(filter))
}

  // start polling
  useInterval(() => {
   loadData();
  }, 10000);

  useEffect(() => {
    if (error) {
      console.log(error);
      const msg = getErrorMessage(error);
      setErrorMessage(msg);  
      Sentry.captureException(`User: ${username}, HomeScreen: ${msg}`);      
    }
  }, [error]);

  const onMapTabChange = (event, newValue) => {
    setMapTableIndex(newValue);
  }

  const addNewConnection = () => {
    history.push(routes.CONNECTION_DETAILS_SCREEN);
  };

  const selectConnection = docid => {
    saveMapState();
    history.push(routes.CONNECTION_SUMMARY_SCREEN + "/" + docid);
  };

  const showData = docid => {
    saveMapState();
    history.push(routes.REALTIME_SCREEN + "/" + docid);
  }

  const saveMapState = () => {
    const map = mapRef.current;
    if (map) {
      console.log("Saving map state");
      const newZoom = map.leafletElement.getZoom();
      dispatch(setZoom(newZoom));
      const newCenter = map.leafletElement.getCenter();
      dispatch(setLat(newCenter.lat));
      dispatch(setLng(newCenter.lng));
    } else {
      console.log("Cannot save map state");
    }
  }

  // intermittently save map position
  useInterval(saveMapState, 5000);

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
        hidden={value !== index}
        {...other}
      >
        {children}
      </Box>
    );
  }

  return (
    <div style={{ height: window.innerHeight }}>
      <Header title="Connections" history={history}/>
      <Box
        maxWidth="xl"
        style={pageStyles.outerBox}
      >
        {errorMessage && (
          <Typography style={styles.errorText}>{errorMessage}</Typography>
        )}
          <>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-between"
              spacing={2}
            >
              <Box>
                <Button 
                  variant="outlined" 
                  style={{ marginRight: 10, backgroundColor: mapType === "1" ? colors.lightLightGray : colors.white }} 
                  onClick={() => dispatch(setMapType("1"))}
                >
                  Installations
                </Button>
                <Button 
                  variant="outlined" 
                  style={{ marginRight: 10, backgroundColor: mapType === "2" ? colors.lightLightGray : colors.white }}
                  onClick={() => dispatch(setMapType("2"))}
                >
                  Comms
                </Button>
                <Button 
                  variant="outlined" 
                  style={{ marginRight: 10, backgroundColor: mapType === "3" ? colors.lightLightGray : colors.white }}
                  onClick={() => dispatch(setMapType("3"))}
                >
                  Alarms
                </Button>
                <Button variant="contained" color="primary" style={{ marginRight: 10 }} onClick={addNewConnection}>
                  <AddCircle style={{ marginRight: 8 }} />
                  New Connection
                </Button>
                <Accordion style={{ marginTop: 15 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Button>Filter</Button>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Filter />
                  </AccordionDetails>
                </Accordion>
              </Box>

            </Grid>
            
            <Tabs
              indicatorColor="secondary"
              textColor="secondary"
              value={mapTableIndex}
              onChange={onMapTabChange}
              style={{ marginTop: 10 }}
            >
              <Tab label="map" {...a11yProps(0)} />
              <Tab label="table" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={mapTableIndex} index={0} style={{ paddingRight: 50 }}>
              <ConnectionMapContainer
                mapRef={mapRef}
                visible={mapTableIndex === 0}
                selectConnection={selectConnection}
                showData={showData}
              />
            </TabPanel>
            <TabPanel value={mapTableIndex} index={1}>
              <ConnectionTable visible={mapTableIndex === 1} selectConnection={selectConnection} showData={showData} />
            </TabPanel>
          </>
      </Box>
    </div>
  );
};

export default HomeScreen;

/*
 <ConnectionMapContainer
                mapRef={mapRef}
                visible={mapTableIndex === 0}
                selectConnection={selectConnection}
                showData={showData}
              />
              */

/*

<>
                <Tabs
                  indicatorColor="secondary"
                  textColor="secondary"
                  value={mapTableIndex}
                  onChange={onMapTabChange}
                  style={{ marginTop: 10 }}
                >
                  <Tab label="map" {...a11yProps(0)} />
                  <Tab label="table" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={mapTableIndex} index={0} style={{ paddingRight: 50 }}>
                  <ConnectionMapContainer
                    mapMove={_mapMove}
                    mapRef={mapRef}
                    visible={mapTableIndex === 0}
                    selectConnection={selectConnection}
                    showData={showData}
                  />
                </TabPanel>
                <TabPanel value={mapTableIndex} index={1}>
                  <ConnectionTable visible={mapTableIndex === 1} selectConnection={selectConnection} showData={showData} />
                </TabPanel>
              </>
              */