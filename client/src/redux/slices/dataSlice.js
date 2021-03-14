import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dataAPI from '../../scripts/dataAPI';
import authAPI from '../../scripts/authAPI';
import { setDataToken } from './authSlice';
import { msToDateString } from "../../scripts/dateHelper";

// helper for getting data token
const getToken = async (thunkAPI) => {
  let state = thunkAPI.getState();

  const keycloakToken = await authAPI.refreshToken(state.auth.token, state.auth.username, state.auth.password);
  const dataToken = await authAPI.getDataToken(keycloakToken, state.auth.dataToken);
  thunkAPI.dispatch(setDataToken(dataToken));

  return dataToken;
}

export const getPQMsgData = createAsyncThunk(
  'data/pq',
  async (args, thunkAPI) => {
      try {       
          const dataToken = await getToken(thunkAPI);
          const response = await dataAPI.getPQMsgData(args.deviceEUI, args.sinceSeconds, dataToken);
          return response;
      } catch (err) {
        console.log(err);
        throw Error(err.message);
      }
  }
);

export const getInstMsgData = createAsyncThunk(
  'data/inst',
  async (args, thunkAPI) => {
      try {
          const dataToken = await getToken(thunkAPI);
          const response = await dataAPI.getInstMsgData(args.deviceEUI, args.sinceSeconds, dataToken);
          return response;
      } catch (err) {
          throw Error(err.message);
      }
  }
);

export const getUplinkMsgData = createAsyncThunk(
  'data/uplink',
  async (args, thunkAPI) => {
    try {
        const dataToken = await getToken(thunkAPI);
        const response = await dataAPI.getUplinkMsgData(args.deviceEUI, args.sinceSeconds, dataToken);
        return response;
    } catch (err) {
        throw Error(err.message);
    }
  }
);

export const getEnergyMsgData = createAsyncThunk(
  'data/energy',
  async (args, thunkAPI) => {
    try {
        const dataToken = await getToken(thunkAPI);
        const response = await dataAPI.getEnergyMsgData(args.deviceEUI, args.sinceSeconds, dataToken, args.phase, args.limit);
        return response;
    } catch (err) {
        throw Error(err.message);
    }
  }
);

export const getHarmonicsLowerData = createAsyncThunk(
  'data/harmonicslower',
  async (args, thunkAPI) => {
    try {
        const dataToken = await getToken(thunkAPI);
        const response = await dataAPI.getHarmonicsLowerMsgData(args.deviceEUI, args.sinceSeconds, dataToken, args.limit);
        return response;
    } catch (err) {
        throw Error(err.message);
    }
  }
);

export const getHarmonicsUpperData = createAsyncThunk(
  'data/harmonicsupper',
  async (args, thunkAPI) => {
    try {
        const dataToken = await getToken(thunkAPI);
        const response = await dataAPI.getHarmonicsUpperMsgData(args.deviceEUI, args.sinceSeconds, dataToken, args.limit);
        return response;
    } catch (err) {
        throw Error(err.message);
    }
  }
);

export const getMeterStatusData = createAsyncThunk(
  'data/meterstatus',
  async (args, thunkAPI) => {
    try {
        const dataToken = await getToken(thunkAPI);
        const response = await dataAPI.getMeterStatus(args.deviceEUI, args.sinceSeconds, dataToken, args.limit);
        return response;
    } catch (err) {
        throw Error(err.message);
    }
  }
);

export const getProcessedMsgData = createAsyncThunk(
  'data/processed',
  async (args, thunkAPI) => {
    try {
        const dataToken = await getToken(thunkAPI);
        const response = await dataAPI.getProcessedMsgData(args.deviceEUI, args.sinceSeconds, dataToken, args.phase, args.limit);
        return response;
    } catch (err) {
        throw Error(err.message);
    }
  }
);

export const getOpAlarms = createAsyncThunk(
  'data/getOpAlarms',
  async (args, thunkAPI) => {
      try {
          const dataToken = await getToken(thunkAPI);
          let state = thunkAPI.getState();
          const response = await dataAPI.getOpAlarms(state.filter.opAlarmsSince, dataToken);
          return response;
      } catch (err) {
          throw new Error(err.response && err.response.data ? err.response.data : err.message);
      }
  }
);

export const getAlarms = createAsyncThunk(
  'data/getAlarms',
  async (args, thunkAPI) => {
      try {
          const dataToken = await getToken(thunkAPI);
          let state = thunkAPI.getState();
          const response = await dataAPI.getAlarms(state.filter.alarmsSince, dataToken);
          return response;
      } catch (err) {
          throw new Error(err.response && err.response.data ? err.response.data : err.message);
      }
  }
);

export const getAlarmsData = createAsyncThunk(
  'data/getAlarmsData',
  async (args, thunkAPI) => {
      try {
          const dataToken = await getToken(thunkAPI);
          const response = await dataAPI.getAlarmsMsgData(args.deviceEUI, args.sinceSeconds, dataToken, undefined, args.limit);
          return response;
      } catch (err) {
          throw new Error(err.response && err.response.data ? err.response.data : err.message);
      }
  }
);


const initialState = {
  error: null,
  loading: null,
  phase1Voltage: null,
  phase1Current: null,
  phase1ActivePower: null,
  phase2Voltage: null,
  phase2Current: null,
  phase2ActivePower: null,
  phase3Voltage: null,
  phase3Current: null,
  phase3ActivePower: null,
  rssi: null,
  snr: null,
  instData: [{},{},{}],
  energyData: {},
  pqData: [{},{},{}],
  processedData: [{},{},{}],
  opAlarms: [],
  filteredOpAlarms: [],
  alarms: [],
  filteredAlarms: [],
  harmonicsLowerData: {},
  harmonicsUpperData: {},
  meterStatusData: {},
  alarmData: {},
  alarmType: "highvoltagealarm",
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    clearData(state, action) {
      state = initialState;
    },
    filterAlarms(state, action) {
      if (action.payload) {
        const filteredResults = state.alarms.filter(item => {
          if (action.payload.find(x => x.id === item.DEVICEEUI)) {
              return true;
          }
          return false;
        });
    
        state.filteredAlarms = filteredResults;
      }
    },
    filterOpAlarms(state, action) {
      if (action.payload) {
        const filteredResults = state.opAlarms.filter(item => {
          if (action.payload.find(x => x.id === item.DEVICEEUI)) {
              return true;
          }
          return false;
        });
    
        state.filteredOpAlarms = filteredResults;
      }
    },
  },
  extraReducers: {
    [getPQMsgData.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    [getPQMsgData.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [getPQMsgData.fulfilled]: (state, action) => {
      state.loading = false;
      mapPQData(action.payload, state);
    },
    [getInstMsgData.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    [getInstMsgData.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [getInstMsgData.fulfilled]: (state, action) => {
      state.loading = false;
      mapInstData(action.payload, state);
    },
    [getUplinkMsgData.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    [getUplinkMsgData.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [getUplinkMsgData.fulfilled]: (state, action) => {
      state.loading = false;
      mapUplinkData(action.payload, state);
    },
    [getOpAlarms.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.opAlarms = null;
    },
    [getOpAlarms.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
    },
    [getOpAlarms.fulfilled]: (state, action) => {
        state.opAlarms = action.payload;
        state.loading = false;
    },     
    [getAlarms.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
        state.alarms = null;
    },
    [getAlarms.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
    },
    [getAlarms.fulfilled]: (state, action) => {
        state.alarms = action.payload;
        state.loading = false;
    }, 
    [getAlarmsData.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getAlarmsData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
    },
    [getAlarmsData.fulfilled]: (state, action) => {
        extractAlarmData(state, action.payload);
        state.loading = false;
    },
    [getEnergyMsgData.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getEnergyMsgData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
    },
    [getEnergyMsgData.fulfilled]: (state, action) => {
        extractEnergyData(state, action.payload);
        state.loading = false;
    },
    [getHarmonicsLowerData.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getHarmonicsLowerData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
    },
    [getHarmonicsLowerData.fulfilled]: (state, action) => {
        extractHarmonicsData(state, action.payload, "lower");
        state.loading = false;
    },
    [getHarmonicsUpperData.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getHarmonicsUpperData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
    },
    [getHarmonicsUpperData.fulfilled]: (state, action) => {
        extractHarmonicsData(state, action.payload, "upper");
        state.loading = false;
    },      
    [getMeterStatusData.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getMeterStatusData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
    },
    [getMeterStatusData.fulfilled]: (state, action) => {
        extractMeterStatusData(state, action.payload);
        state.loading = false;
    },     
    [getProcessedMsgData.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getProcessedMsgData.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
    },
    [getProcessedMsgData.fulfilled]: (state, action) => {
        extractProcessedMsgData(state, action.payload);
        state.loading = false;
    },  
  }
});

const mapPQData = (data, state) => {
  if (!state.pqData) {
    state.pqData = [{},{},{}]
  }

  data.forEach(item => {
    if (item['TIMESTAMP']) {
      item['TIMESTAMP'] = msToDateString(item['TIMESTAMP']);
    }
    if (item.PHASE == 1) {
      state.pqData[0] = item;
      state.phase1Voltage = item.VOLTAGESMA;
      state.phase1Current = item.CURRENTSMA;
      state.phase1ActivePower = item.POWERACTIVESMA;
    } else if (item.PHASE == 2) {
      state.pqData[1] = item;
      state.phase2Current = item.CURRENTSMA;
      state.phase2Voltage = item.VOLTAGESMA;
      state.phase2ActivePower = item.POWERACTIVESMA;
    } else if (item.PHASE == 3) {
      state.pqData[2] = item;
      state.phase3Current = item.CURRENTSMA;
      state.phase3Voltage = item.VOLTAGESMA;
      state.phase3ActivePower = item.POWERACTIVESMA;
    }
  });
}

const mapInstData = (data, state) => {
  if (!state.instData) {
    state.instData = [{},{},{}];
  }
  data.forEach(item => {
    if (item['TIMESTAMP']) {
      item['TIMESTAMP'] = msToDateString(item['TIMESTAMP']);
    }

    if (item.PHASE == 1) {
      state.instData[0] = item;
      state.phase1Voltage = item.VOLTAGE;
      state.phase1Current = item.CURRENT;
      state.phase1ActivePower = item.ACTIVEPOWER;
    } else if (item.PHASE == 2) {
      state.instData[1] = item;
      state.phase2Current = item.CURRENT;
      state.phase2Voltage = item.VOLTAGE;
      state.phase2ActivePower = item.ACTIVEPOWER;
    } else if (item.PHASE == 3) {
      state.instData[2] = item;
      state.phase3Current = item.CURRENT;
      state.phase3Voltage = item.VOLTAGE;
      state.phase3ActivePower = item.ACTIVEPOWER;
    }
  });
}

const mapUplinkData = (data, state) => {
  if (data[0]) {
    state.snr = data[0].SNR;
    state.rssi = data[0].RSSI;
  }
}

/*
const filterOpAlarms = (state, data) => {
  // for each data item, check if the device eui is in the list of filtered connections
  const filteredResults = data.filter(item => {
      if (state.connection.filtered.find(x => x.id === item.DEVICEEUI)) {
          return true;
      }

      return false;
  });

  return filteredResults;
}

const filterAlarms = (state, data) => {
  // for each data item, check if the device eui is in the list of filtered connections
  const filteredResults = data.filter(item => {
      if (item.ALARMTYPE === state.alarmType && state.connection.filtered.find(x => x.id === item.DEVICEEUI)) {
          return true;
      }

      return false;
  });

  return filteredResults;
}
*/

const extractAlarmData = (state, data) => {
  if (data.length === 0) {
    return;
  }
  
  let result = data[0];
  if (result['TIMESTAMP']) {
    result['TIMESTAMP'] = msToDateString(result['TIMESTAMP']);
  }
  state.alarmData = result;

}

const extractEnergyData = (state, data) => {
  if (data.length === 0) {
    return;
  }
  let result = data[0];
  result['TIMESTAMP'] = msToDateString(result['TIMESTAMP']);
  state.energyData = result;
}

const extractProcessedMsgData = (state, data) => {
  if (data.length === 0) {
    return;
  }

  if (!state.processedData) {
    state.processedData = [{},{},{}];
  }

  let item = data[0];
  if (item['TIMESTAMP']) {
    item['TIMESTAMP'] = msToDateString(item['TIMESTAMP']);
  }
  if (item.PHASE == 1) {
    state.processedData[0] = item;
  } else if (item.PHASE == 2) {
    state.processedData[1] = item;
  } else if (item.PHASE == 3) {
    state.processedData[2] = item;
  }

}

const extractHarmonicsData = (state, data, type) => {
  if (data.length === 0) {
    return;
  }

  let result = data[0];
  if (result['TIMESTAMP']) {
    result['TIMESTAMP'] =  msToDateString(result['TIMESTAMP']);
  }

  if (type === "lower" && JSON.stringify(result) !== JSON.stringify(state.harmonicsLowerData)) {
      state.harmonicsLowerData = result;
  } else if (type === "upper" && JSON.stringify(result) !== JSON.stringify(state.harmonicsUpperData)) {
      state.harmonicsUpperData = result;
  } 

}

const extractMeterStatusData = (state, data) => {
  if (data.length === 0) {
    return;
  }

  let result = data[0];
  if (result['TIMESTAMP']) {
    result['TIMESTAMP'] =  msToDateString(result['TIMESTAMP']);
  }

  state.meterStatusData = result;

}

export const { clearData, filterAlarms, filterOpAlarms } = dataSlice.actions;
export default dataSlice.reducer;