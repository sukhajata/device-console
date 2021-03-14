import { createSlice } from '@reduxjs/toolkit';


const mapSlice = createSlice({
    name: 'map',
    initialState: {
      zoom: 7,
      lat: -41.221580,//-42.448372,
      lng: 174.750872,//171.220509,
      mapType: "1",
    },
    reducers: {
      setZoom(state, action) {
          state.zoom = action.payload;
      },
      setLat(state, action) {
        state.lat = action.payload;
      },
      setLng(state, action) {
        state.lng = action.payload;
      },
      setMapType(state, action) {
        state.mapType = action.payload;
      },
    },
    extraReducers: {}
});

export const { setZoom, setLat, setLng, setMapType } = mapSlice.actions;
export default mapSlice.reducer;