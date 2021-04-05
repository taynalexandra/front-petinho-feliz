import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { PetModal } from '../Modal/PetModal';
import { EnderecoModal } from '../Modal/EnderecoModal';
import { MapMarker } from './MapMarker';
import { PetsDisponiveis } from '../Pets/PetsDisponiveis';

import './MapView.css';
import 'leaflet/dist/leaflet.css';

var petList = "";

const MapView = () => {
  const [showModalPet, setShowModalPet] = useState(false);
  const [showModalEnd, setShowModalEnd] = useState(false);

  const [enderecos, setEnderecos] = useState([]);
  const [token, setToken] = useState("");
  useEffect(() => {
    getTokenAdmin();
  }, []);

  function getTokenAdmin() {
    var json = {
      "email": "adminpetinhofeliz@gmail.com",
      "senha": "Ad1m1nP3t1nh0tgm"
    };
    json = JSON.stringify(json);

    var xhttp = new XMLHttpRequest();
    var url = 'https://api-petinho-feliz.000webhostapp.com/api-petinho-feliz/index.php/UsuarioControl/autenticarUsuario';
    xhttp.open('POST', url, false);

    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function () {//Call a function when the state changes.
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        getEndereco(JSON.parse(this.responseText).resultado.token);
      }
    }
    xhttp.send(json);
  }

  function getEndereco(token) {
    var tokenUser = {
      token: token
    }
    tokenUser = JSON.stringify(tokenUser);

    var xhttp = new XMLHttpRequest();
    var url = 'https://api-petinho-feliz.000webhostapp.com/api-petinho-feliz/index.php/EnderecoControl/listarEnderecos';
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function () {//Call a function when the state changes.
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        setToken(token);
        setEnderecos(JSON.parse(this.responseText).resultado);
      }
    }
    xhttp.send(tokenUser);
  }

  const openModal = () => {
    const storage = JSON.parse(localStorage.getItem('app-token'));

    var user = {
      token: storage.resultado.token,
      idDoador: storage.resultado.dadosUsuario[0].id_doador
    };

    user = JSON.stringify(user);

    var xhttp = new XMLHttpRequest();
    var url = 'https://api-petinho-feliz.000webhostapp.com/api-petinho-feliz/index.php/EnderecoControl/pegarEnderecoPeloIdDoador';
    xhttp.open('POST', url, false);

    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function () {//Call a function when the state changes.
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        if (JSON.parse(this.responseText).resultado.length > 0) {
          setShowModalPet(prev => !prev);
        } else {
          setShowModalEnd(prev => !prev);
        }
      }
    }
    xhttp.send(user);
  }

  return (
    <div className="div-home">
      <PetModal showModalPet={showModalPet} setShowModalPet={setShowModalPet} />
      <EnderecoModal showModalEnd={showModalEnd} setShowModalEnd={setShowModalEnd} />
      {localStorage.getItem('app-token') ?
        <div className="div-btn-doar">
          <button className="btn-doar" onClick={openModal}>Doar um Pet</button>
        </div>
        : <></>}
      <div className="box-adocao">
        <div className="form-titulo">
          <h2>Pets Disponíveis para Adoção</h2>
        </div>
        <MapContainer center={{ lat: '-8.0594845', lng: '-34.9527856' }} zoom={11}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
          {
            enderecos.map((endereco) => (
              <MapMarker key={endereco.id_endereco} endereco={endereco} />
            ))
          }
        </MapContainer >
        <div className="div-pets-cadastrados" id="div-pets-cadastrados">
          {
            enderecos.map((endereco) => (
              <PetsDisponiveis key={endereco.id_endereco} endereco={endereco} token={token} />
            ))
          }
        </div>
      </div>
    </div>

  )
}

export default MapView;