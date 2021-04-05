import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

import './Modal.css';

const initialValue = {
  token: '',
  nome: '',
  idadeMeses: '',
  genero: '',
  raca: '',
  pesoKg: '',
  alturaCm: '',
  fkDoador: ''
}

export const PetModal = ({ showModalPet, setShowModalPet }) => {
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();

    const storage = JSON.parse(localStorage.getItem('app-token'));

    values.token = storage.resultado.token;
    values.fkDoador = storage.resultado.dadosUsuario[0].id_doador;

    console.log(values);

    var json = JSON.stringify(values);

    var xhttp = new XMLHttpRequest();
    var url = 'https://api-petinho-feliz.000webhostapp.com/api-petinho-feliz/index.php/PetControl/cadastrarPet';
    xhttp.open('POST', url, true);

    //Send the proper header information along with the request
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function () {//Call a function when the state changes.
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        window.location.reload();
        //history.push('/home');
        //setShowModalPet(false);
      }
    }
    xhttp.send(json);
  }

  const CloseModalButton = styled(MdClose)``;

  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModalPet ? 1 : 0,
    transform: showModalPet ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModalPet(false);
    }
  };

  return (
    <>
      {showModalPet ? (
        <div className="background-modal" ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <div className="wrapper-modal" showModal={showModalPet}>
              <div className="content-modal">
                <div className="form-titulo">
                  <h2>Cadastrar Pet</h2>
                </div>
                <div>
                  <form className="cadastro-pet-form" onSubmit={onSubmit}>
                    <div className="form__label">
                      <label htmlFor="nome">Nome do pet</label>
                    </div>
                    <div className="form__group">
                      <input id="nome" name="nome" type="text" required onChange={onChange} />
                    </div>
                    <div className="form__label">
                      <label htmlFor="idadeMeses">Idade (meses)</label>
                    </div>
                    <div className="form__group">
                      <input id="idadeMeses" name="idadeMeses" type="number" required onChange={onChange} />
                    </div>

                    <div className="form__label">
                      <label htmlFor="genero">Genero</label>
                    </div>
                    <div className="form__radio">
                      <input type="radio" id="macho" name="genero" value="macho" onChange={onChange} />
                      <label htmlFor="macho">Macho</label>
                      <input type="radio" id="femea" name="genero" value="femea" onChange={onChange} />
                      <label htmlFor="femea">Fêmea</label>
                    </div>

                    <div className="form__label">
                      <label htmlFor="raca">Raça</label>
                    </div>
                    <div className="form__group">
                      <input id="raca" name="raca" type="text" required onChange={onChange} />
                    </div>

                    <div className="form__label">
                      <label htmlFor="pesoKg">Peso (Kg)</label>
                    </div>
                    <div className="form__group">
                      <input id="pesoKg" name="pesoKg" type="number" required onChange={onChange} />
                    </div>

                    <div className="form__label">
                      <label htmlFor="alturaCm">Altura (Cm)</label>
                    </div>
                    <div className="form__group">
                      <input id="alturaCm" name="alturaCm" type="number" required onChange={onChange} />
                    </div>
                    <div>
                      <button type="submit" className="form__btn-cadastrar-pet">Cadastrar</button>
                    </div>
                  </form>
                </div>
              </div>
              <CloseModalButton className="btnClose-modal" aria-label='Close modal' onClick={() => setShowModalPet(prev => !prev)} />
            </div>
          </animated.div>
        </div>
      ) : null
      }
    </>
  )
};
