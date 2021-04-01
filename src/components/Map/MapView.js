import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { PetModal } from '../Modal/PetModal';

import './MapView.css';
import 'leaflet/dist/leaflet.css';

var user = {
  "token": "",
  "idDoador": ""
};

const MapView = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
    //getEndereco();
  }

  function getEndereco() {
    const storage = JSON.parse(localStorage.getItem('app-token'));

    user.token = storage.resultado.token;
    user.idDoador = storage.resultado.dadosUsuario[0].id_doador;

    user = JSON.stringify(user);
    console.log(user);

    var xhttp = new XMLHttpRequest();
    var url = 'https://api-petinho-feliz.000webhostapp.com/api-petinho-feliz/index.php/EnderecoControl/pegarEnderecoPeloIdDoador';
    xhttp.open('GET', url, true);

    //xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function () {//Call a function when the state changes.
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        console.log(this.responseText);
      }
    }
    xhttp.send(user);
  }

  return (
    <div className="div-home">
      <PetModal showModal={showModal} setShowModal={setShowModal} />
      {localStorage.getItem('app-token') ?
        <div className="div-btn-doar">
          <button className="btn-doar" onClick={openModal}>Doar um Pet</button>
        </div>
        : <></>}
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