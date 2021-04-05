import React, { useEffect, useState } from 'react';
import './PetsDisponiveis.css';

export const PetsDisponiveis = (props) => {
  const [pets, setPets] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getPets();
    getUser();
  }, []);

  function getPets() {
    setPets([]);

    var tokenUser = {
      token: props.token,
      idDoador: props.endereco.id_doador
    }

    tokenUser = JSON.stringify(tokenUser);

    var xhttp = new XMLHttpRequest();
    var url = 'https://api-petinho-feliz.000webhostapp.com/api-petinho-feliz/index.php/PetControl/listarPetsPorDoador';
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function () {//Call a function when the state changes.
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        setPets(JSON.parse(this.responseText).resultado);
      }
    }
    xhttp.send(tokenUser);
  }

  function getUser() {
    setUser([]);

    var tokenUser = {
      token: props.token,
      idDoador: props.endereco.id_doador
    }

    tokenUser = JSON.stringify(tokenUser);

    var xhttp = new XMLHttpRequest();
    var url = 'https://api-petinho-feliz.000webhostapp.com/api-petinho-feliz/index.php/UsuarioControl/listarUsuarios';
    xhttp.open('POST', url, false);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function () {//Call a function when the state changes.
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        JSON.parse(this.responseText).resultado.forEach(user => {
          if (user.id_doador === props.endereco.id_doador) {
            setUser(user);
          }
        });
      }
    }
    xhttp.send(tokenUser);
  }

  return (
    <div>
      {
        pets.map((pet) => (
          <div className="div-pet" key={pet.id_pet}>
            <div>
              <img src="pet.png" alt="foto do pet" />
            </div>
            <div className="dados-pet">
              <h3>{pet.nome}</h3>
              <p><b>Idade:</b> {pet.idade_meses} meses</p>
              <p><b>Raça:</b> {pet.raca} - <b>Gênero:</b> {pet.genero}</p>
              <p><b>Peso:</b> {pet.peso_kg}kg - <b>Altura:</b> {pet.altura_cm}cm</p>
              <br />
              <h4>Doador</h4>
              <p><b>Nome/Razão Social:</b> {user.nome}{user.empresa}</p>
              <p><b>Contato: </b>{user.contato} - {user.tipo_contato}</p>
              <p><b>Disponibilidade: </b>{user.disponibilidade_dia} ({user.disponibilidade_hora})</p>
              <br />
              <h4>Endereço</h4>
              <p><b>Logradouro:</b> {props.endereco.logradouro}, nº {props.endereco.numero}</p>
              <p><b>Referência:</b> {props.endereco.referencia}</p>
              <p><b>Bairro:</b> {props.endereco.bairro} - <b>Cidade:</b> {props.endereco.cidade}, {props.endereco.estado}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}
