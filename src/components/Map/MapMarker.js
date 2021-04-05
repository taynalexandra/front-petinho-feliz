import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import './MapView.css';
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.icon({
  iconUrl: "patinha.png",
  iconSize: [25, 25],
  iconAnchor: [17, 30],
  popupAnchor: [3, -25]
})

export const MapMarker = ({ endereco }) => {
  return (
    <Marker position={[endereco.coordenada_latitude, endereco.coordenada_longitude]} icon={markerIcon} />
  )
}
