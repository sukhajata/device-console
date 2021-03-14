import React from "react";
import { TileLayer } from "react-leaflet";

const MapTiles = () => (
  <TileLayer
    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //url="https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=69e1b09034504a6d8ebe91c902f833c0"
  />
);

export default MapTiles;
