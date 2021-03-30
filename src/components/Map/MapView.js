import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { PetModal } from '../Modal/PetModal';

import './MapView.css';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  }

  return (
    <div className="div-home">
      <PetModal showModal={showModal} setShowModal={setShowModal} />
      <div className="div-btn-doar">
        <button className="btn-doar" onClick={openModal}>Doar um Pet</button>
      </div>
      <div className="box-adocao">
        <div className="form-titulo">
          <h2>Pets Disponíveis para Adoção</h2>
        </div>
        <MapContainer center={{ lat: '-8.0594845', lng: '-34.9527856' }} zoom={13}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
        </MapContainer >
      </div>
    </div>

  )
}

export default MapView;