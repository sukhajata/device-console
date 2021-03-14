import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import * as Sentry from "@sentry/browser";

import ConnectionInfo from "../../components/ConnectionInfo";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/fields";
import routes from "../../routes";
import { Connection } from "../../proto/connection-service_pb.js";
import { getErrorMessage } from "../../scripts/urlHelper";
import {
  getConnectionById,
  getImage,
  updateConnectionState,
  deleteConnection
} from "../../redux/slices/connectionSlice";
import Config from "../../components/Config";
import Functions from "../../components/Functions";
import DeviceTest from "../../components/devicetest/DeviceTest";
import Switching from "../../components/Switching";
import authAPI from "../../scripts/authAPI";

const ConnectionSummaryScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const [connection, setConnection] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [currentTab, setCurrentTab] = useState(0);
  const [connectionImgs, setConnectionImgs] = useState([]);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const { docid } = match.params;
  const token = useSelector(state => state.auth.token);
  const username = useSelector(state => state.auth.username);

  useEffect(() => {
    if (docid) {
      getDoc();
    }
  }, [docid]);

  const getDoc = async () => {
    if (docid) {

        const roles = await authAPI.getRoles(token);
        if (roles) {
          const yes = roles.find(item => item === "powerpilot-superuser");
          if (yes) {
            setIsSuperUser(true);
          }
        }

        try {
          let result = await dispatch(
            getConnectionById({ id: docid, token: token })
          );
          if (result.payload) {
            let conn = result.payload;
            setConnection(conn);
            
            //images
            if (conn.images && conn.images.length > 0) {
              getImages(conn.images);
            } else {
              setConnectionImgs([]);
            }
            
          }
        } catch (error) {
          onError(error, true);
        }
    }
  };

  const getImages = async imgList => {
    let newImages = [];

    for (let i = 0; i < imgList.length; i++) {
      let request = {
        identifier: imgList[i],
        token: token
      };
      let result = await dispatch(getImage(request));
      if (result.payload) {
        newImages.push({
          ...result.payload,
          key: imgList[i]
        });
      }
    }

    setConnectionImgs(newImages);
  };

  const markAsComplete = async () => {
      try {
        const args = {
          id: connection.id,
          connectionState: Connection.ConnectionState.CONNECTED
        };
        let result = await dispatch(updateConnectionState(args));
        if (result.payload) {
          history.push(routes.HOME_SCREEN);
        }
      } catch (err) {
        onError(err, true);
      }
  };

  const onDelete = async () => {
    const confirm = window.confirm("Delete connection?");
    if (confirm) {
        try {
          let args = {
            id: connection.id,
            token: token
          };
          let result = await dispatch(deleteConnection(args));
          console.log(result);

          history.push(routes.HOME_SCREEN);
        } catch (err) {
          onError(err, true);
        }
    }
  };

  const onError = (err, show) => {
    console.log(err);
    const msg = getErrorMessage(err);
    if (show) {
      setErrorMessage(msg);
    }
    Sentry.captureException(
      `User: ${username}, ConnectionSummaryScreen: ${msg}`
    );
  };

  const edit = () => {
    history.push(routes.CONNECTION_DETAILS_SCREEN + "/" + docid);
  };

  const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        {...other}
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        {children}
      </Box>
    );
  };

  const a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  };

  const onSelectTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Header
        title="Connection Summary"
        backVisible={true}
        history={history}
        onBack={() => history.replace(routes.HOME_SCREEN)}
      />
      <div style={{ marginTop: 70 }}>
        {errorMessage && (
          <Typography style={styles.errorText}>{errorMessage}</Typography>
        )}
        {isSuperUser ? (
           <Tabs
            value={currentTab}
            onChange={onSelectTab}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <Tab label="Summary" {...a11yProps(0)} />
            <Tab label="Test" {...a11yProps(1)} />
            <Tab label="Config" {...a11yProps(2)} />
            <Tab label="Functions" {...a11yProps(3)} />
            <Tab label="Switching" {...a11yProps(4)} />
            {connection && connection.slots && (
              <Tab label="Slot 100" {...a11yProps(5)} />
            )}
          </Tabs>
        ) : (
          <Tabs
            value={currentTab}
            onChange={onSelectTab}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <Tab label="Summary" {...a11yProps(0)} />
            <Tab label="Test" {...a11yProps(1)} />
            {connection && connection.modelType == 3 && connection.device && (
              <Tab label="Switching" {...a11yProps(2)} />
            )}
          </Tabs>
        )}
        {connection && (
          <>
            {isSuperUser ? (
              <>
                <TabPanel value={currentTab} index={0}>
                  <ConnectionInfo
                    connection={connection}
                    markAsComplete={markAsComplete}
                    deleteConnection={onDelete}
                    edit={edit}
                    connectionImgs={connectionImgs}
                  />
                </TabPanel>
                <TabPanel value={currentTab} index={1}>
                  <DeviceTest connection={connection} visible={currentTab === 1} />
                </TabPanel>
                <TabPanel value={currentTab} index={2}>
                  <Config match={match} visible={currentTab === 2} slot={0} />
                </TabPanel>
                <TabPanel value={currentTab} index={3}>
                  <Functions match={match} visible={currentTab === 3} />
                </TabPanel>
                <TabPanel value={currentTab} index={4}>
                  <Switching connection={connection} visible={currentTab === 4} />
                </TabPanel>
                <TabPanel value={currentTab} index={5}>
                  <Config match={match} visible={currentTab === 5} slot={100} />
                </TabPanel>
              </>
            ) :(
              <>
                <TabPanel value={currentTab} index={0}>
                  <ConnectionInfo
                    connection={connection}
                    markAsComplete={markAsComplete}
                    deleteConnection={onDelete}
                    edit={edit}
                    connectionImgs={connectionImgs}
                  />
                </TabPanel>
                <TabPanel value={currentTab} index={1}>
                  <DeviceTest connection={connection} visible={currentTab === 1} />
                </TabPanel>
                <TabPanel value={currentTab} index={2}>
                  <Switching connection={connection} visible={currentTab === 2} />
                </TabPanel>
              </>
            )}
           
          </>
        )}
      </div>
    </>
  );
};

export default ConnectionSummaryScreen;
