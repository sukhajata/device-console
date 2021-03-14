import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  poleNumber: '',
  address: '',
  town: '',
  installNumber: '',
  transformer: '',
  showPending: true,
  showConfigured: true,
  showTested: true,
  showConnected: true,
  showFailed: true,
  opAlarmsSince: 86400, //1 day in seconds
  alarmsSince: 86400,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
      clear(state, action) {
          state.poleNumber = initialState.poleNumber;
          state.address  = initialState.address;
          state.installNumber = initialState.installNumber;
          state.transformer = initialState.transformer;
          state.town = initialState.town;
      },
      setAddress(state, action) {
        state.address = action.payload;
      },
      setTown(state, action) {
          state.town = action.payload;
      },
      setPoleNumber(state, action) {
          state.poleNumber = action.payload;
      },
      setInstallNumber(state, action) {
          state.installNumber = action.payload;
      },
      setTransformer(state, action) {
          state.transformer = action.payload;
      },
      setShowPending(state, action) {
        state.showPending = action.payload;
      },
      setShowConfigured(state, action) {
          state.showConfigured = action.payload;
      },
      setShowConnected(state, action) {
          state.showConnected = action.payload;
      },
      setShowTested(state, action) {
          state.showTested = action.payload;
      },
      setShowFailed(state, action) {
          state.showFailed = action.payload;
      },
      setOpAlarmsSince(state, action) {
          state.opAlarmsSince = action.payload;
      },
      setAlarmsSince(state, action) {
          state.alarmsSince = action.payload;
      },
  },
});

export const { 
  clear,
  setAddress, 
  setTown,
  setPoleNumber, 
  setInstallNumber, 
  setTransformer,
  setShowPending,
  setShowConfigured,
  setShowConnected,
  setShowFailed,
  setShowTested,
  setOpAlarmsSince,
} = filterSlice.actions;

export default filterSlice.reducer;