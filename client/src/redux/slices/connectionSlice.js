import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connectionAPI from '../../scripts/connectionAPI';
//import dataAPI from '../../scripts/dataAPI';
import authAPI from '../../scripts/authAPI';
import { setToken } from './authSlice';

export const ConnectionState = {
    NO_CONNECTION_STATE: 0,
    PENDING: 1,
    CONNECTED: 2,
};

export const JobState = {
    NO_JOB_STATE: 0,
    PENDING: 1,
    CONFIGURED: 2,
    INSTALLED: 3,
    TESTED: 4,
    FAILED: 5
};

const getToken = async (thunkAPI) => {
    let state = thunkAPI.getState();
    const refreshToken = await authAPI.refreshToken(state.auth.token, state.auth.username, state.auth.password);
    thunkAPI.dispatch(setToken(refreshToken));

    return refreshToken;
}

export const getConnection = createAsyncThunk(
    'connection/getConnection',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.getConnectionById(args.docid, token);
            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);

export const getLocationDetails = createAsyncThunk(
    'connection/getLocationDetails',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.getLocationDetails(args.docid, token);
            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);

export const getConnections = createAsyncThunk(
    'connection/getConnections',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.getConnections(token);
            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);

export const getConnectionById = createAsyncThunk(
    'connection/getConnectionById',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.getConnectionById(args.id, token);
            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);

export const getDevice = createAsyncThunk(
    'connection/getDevice',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.getDeviceBySerialNumber(args.serialNumber, token);
            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);

export const createPendingConnection = createAsyncThunk(
    'connection/createPendingConnection',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.createPendingConnection(args.connection, token);
            thunkAPI.dispatch(getConnections({ token: token }));
            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);

export const createConnection = createAsyncThunk(
    'connection/createConnection',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.createConnection(args.connection, args.oldIdentifier, token);
            thunkAPI.dispatch(getConnections({ token: token }));
            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);

export const updateConnection = createAsyncThunk(
    'connection/updateConnection',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.updateConnection(args.identifier, args.connection, token);
            thunkAPI.dispatch(getConnections({ token: token }));

            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);

export const getImage = createAsyncThunk(
    'connection/getImage',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.getImage(args.identifier, token);
            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);

export const createImage = createAsyncThunk(
    'connection/createImage',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.createImage(args.image, token);
            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);

export const deleteImage = createAsyncThunk(
    'connection/deleteImage',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.deleteImage(args.identifier, token);
            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);

/*export const getConnectionsWithFirmware = createAsyncThunk(
    'connection/getConnectionsWithFirmware',
    async (args, thunkAPI) => {
        try {
            let state = thunkAPI.getState();
            const refreshToken = await authAPI.refreshToken(state.auth.token, state.auth.username, state.auth.password);
            thunkAPI.dispatch(setToken(refreshToken));

            const response = await dataAPI.getConnections(args.dataToken);
            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);*/

export const updateJob = createAsyncThunk(
    'connection/updateJob',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.updateJob(args.id, args.job, token);
            thunkAPI.dispatch(getConnections({ token: token }));

            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);

export const updateConnectionState = createAsyncThunk(
    'connection/updateConnectionState',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.updateConnectionState(args.id, args.connectionState, token);
            thunkAPI.dispatch(getConnections({ token: token }));

            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);

export const deleteConnection = createAsyncThunk(
    'connection/deleteConnection',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.deleteConnection(args.id, token);
            thunkAPI.dispatch(getConnections({ token: token }));

            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);


export const addSlot = createAsyncThunk(
    'connection/addSlot',
    async (args, thunkAPI) => {
        try {
            const token = await getToken(thunkAPI);
            const response = await connectionAPI.addSlot(args.identifier, args.slot, token);

            return response;
        } catch (err) {
            throw new Error(err.response && err.response.data ? err.response.data : err.message);
        }
    }
);

const initialState = {  
    connections: [],
    connection: null,
    filtered: [],
    loading: false,
    error: null,
    device: null,
    image: null,
    response: null,
    connectionsWithFirmware: [],
    gateways: [],
    locationDetails: null,
    slot: null,
};

const connectionSlice = createSlice({
    name: 'connection',
    initialState: initialState,
    reducers: {
        /*setConnections(state, action) {
            state.connections = action.payload;
        },
        getConnection(state, action) {
            state.connection = state.connections.find(c => c.id === action.payload);
        },*/
        filterConnections(state, action) {
            state.filtered = runFilter(state, state.connections, action.payload);
        },
    },
    extraReducers: {
        [getConnection.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.connection = null;
        },
        [getConnection.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [getConnection.fulfilled]: (state, action) => {
            state.connection = action.payload;
            state.loading = false;
        },
        [getConnections.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [getConnections.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [getConnections.fulfilled]: (state, action) => {
            if (JSON.stringify(action.payload) !== JSON.stringify(state.connections)) {
                state.connections = action.payload;
                //state.filtered = runFilter(state, action.payload);
            }
            state.loading = false;
        },
        [getConnectionById.pending]: (state, action) => {
            state.loading = true;
            state.connection = null;
            state.error = null;
        },
        [getConnectionById.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [getConnectionById.fulfilled]: (state, action) => {
            state.connection = action.payload;
            state.loading = false;
        },
        [getDevice.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.device = null;
        },
        [getDevice.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [getDevice.fulfilled]: (state, action) => {
            state.device = action.payload;
            state.loading = false;
        },
        [createConnection.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.connection = null;
        },
        [createConnection.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [createConnection.fulfilled]: (state, action) => {
            state.connection = action.payload;
            state.loading = false;
        },
        [createPendingConnection.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.connection = null;
        },
        [createPendingConnection.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [createPendingConnection.fulfilled]: (state, action) => {
            state.connection = action.payload;
            state.loading = false;
        },
        [updateConnection.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.connection = null;
        },
        [updateConnection.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [updateConnection.fulfilled]: (state, action) => {
            state.connection = action.payload;
            state.loading = false;
        },
        [getImage.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.image = null;
        },
        [getImage.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [getImage.fulfilled]: (state, action) => {
            state.image = action.payload;
            state.loading = false;
        },
        [createImage.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.response = null;
        },
        [createImage.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [createImage.fulfilled]: (state, action) => {
            state.response = action.payload;
            state.loading = false;
        },
        [deleteImage.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.response = null;
        },
        [deleteImage.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [deleteImage.fulfilled]: (state, action) => {
            state.response = action.payload;
            state.loading = false;
        },  
        [updateJob.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [updateJob.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [updateJob.fulfilled]: (state, action) => {
            state.loading = false;
        },   
        [updateConnectionState.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [updateConnectionState.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [updateConnectionState.fulfilled]: (state, action) => {
            state.loading = false;
        },  
        [deleteConnection.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [deleteConnection.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [deleteConnection.fulfilled]: (state, action) => {
            state.loading = false;
        },  
        [getLocationDetails.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.locationDetails = null;
        },
        [getLocationDetails.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [getLocationDetails.fulfilled]: (state, action) => {
            state.loading = false;
            state.locationDetails = action.payload;
        },  
        [addSlot.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.slot = null;
        },
        [addSlot.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [addSlot.fulfilled]: (state, action) => {
            state.loading = false;
            state.slot = action.payload;
        },  
        /*[getConnectionsWithFirmware.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [getConnectionsWithFirmware.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [getConnectionsWithFirmware.fulfilled]: (state, action) => {
            state.loading = false;
            state.connectionsWithFirmware = filterConnectionsWithFirmware(state, action.payload);
        },  */
    }
});

/*const filterConnectionsWithFirmware = (state, data) => {
    const filteredResults = data.filter(item => {
        if (state.filtered.find(ff => ff.id === item.DEVICEEUI)) {
            return true;
        }

        return false;
    });

    return filteredResults;
}*/

const runFilter = (state, connections, filter) => {
    if (!connections || !Array.isArray(connections)) {
        return [];
    }
    
    const newFiltered = connections.filter(item => {
      if (filter.address) {
        if (!item.location.streetAddress1 ||
          !item.location.streetAddress1
            .toLowerCase()
            .includes(filter.address.toLowerCase())
        ) {
          return false;
        }
      }
  
      if (filter.town) {
        if (!item.location.town ||
          !item.location.town
            .toLowerCase()
            .startsWith(filter.town.toLowerCase())
        ) {
          return false;
        }
      }
  
      if (filter.installNumber) {
        if (
          !item.IDNumber
            .toString()
            .toLowerCase()
            .startsWith(filter.installNumber.toString().toLowerCase())
        ) {
          return false;
        }
      }
  
      if (filter.transformer) {
        if (!item.transformer || !item.transformer.includes(filter.transformer)) {
          return false;
        }
      }
  
      const jobState = item.job.jobState;
      if (
        item.connectionState === ConnectionState.CONNECTED &&
        !filter.showConnected
      ) {
        return false;
      }
  
      if (item.connectionState !== ConnectionState.CONNECTED && jobState === JobState.TESTED && !filter.showTested) {
        return false;
      }
  
      if (jobState === JobState.FAILED && !filter.showFailed) {
        return false;
      }
  
      if (jobState === JobState.PENDING && !filter.showPending) {
        return false;
      }
  
      if ((jobState === JobState.CONFIGURED || jobState === JobState.INSTALLED) && !filter.showConfigured) {
        return false;
      }
  
      return true;
    });
  
    newFiltered.sort((a, b) => {
      if (a.dateCreated > b.dateCreated) {
        return -1;
      }
      return 1;
    });
  
    return newFiltered;
};

export const { 
    //setConnections, 
    filterConnections, 
    //getConnection,
} = connectionSlice.actions;

export default connectionSlice.reducer;