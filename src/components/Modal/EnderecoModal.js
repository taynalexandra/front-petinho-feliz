import React, { useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

import './Modal.css';

const initialValue = {
  token: '',
  idDoador: '',
  logradouro: '',
  numero: '',
  bairro: '',
  cep: '',
  referencia: '',
  cidade: '',
  estado: '',
  coordenadaLatitude: '',
  coordenadaLongitude: '',
  andar: ''
}

export const PetModal = ({ showModalEnd, setShowModalEnd }) => {
  const [values, setValues] = useState(initialValue);

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();

    const storage = JSON.parse(localStorage.getItem('app-token'));

    values.token = storage.resultado.token;
    values.idDoador = storage.resultado.dadosUsuario[0].id_doador;

    console.log(values);

    var json = JSON.stringify(values);

    var xhttp = new XMLHttpRequest();
    var url = 'https://api-petinho-feliz.000webhostapp.com/api-petinho-feliz/index.php/PetControl/cadastrarPet';
    xhttp.open('POST', url, true);

    //Send the proper header information along with the request
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function () {//Call a function when the state changes.
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        setShowModalEnd(false);
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
    opacity: showModalEnd ? 1 : 0,
    transform: showModalEnd ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModalEnd(false);
    }
  };

  return (
    <>
      {showModal ? (
        <div className="background-modal" ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <div className="wrapper-modal" showModalEnd={showModalEnd}>
              <div className="content-modal">
                <div className="form-titulo">
                  <h2>Cadastrar Endereço</h2>
                </div>
                <div>
                  <form className="cadastro-endereco-form" onSubmit={onSubmit}>
                    <div className="form__label">
                      <label htmlFor="logradouro">Logradouro</label>
                    </div>
                    <div className="form__group">
                      <input id="logradouro" name="logradouro" type="text" required onChange={onChange} />
                    </div>
                    <div className="form__label">
                      <label htmlFor="numero">Número</label>
                    </div>
                    <div className="form__group">
                      <input id="numero" name="numero" type="number" required onChange={onChange} />
                    </div>
                    <div className="form__label">
                      <label htmlFor="bairro">Bairro</label>
                    </div>
                    <div className="form__group">
                      <input id="bairro" name="bairro" type="text" required onChange={onChange} />
                    </div>

                    <div className="form__label">
                      <label htmlFor="cep">Cep</label>
                    </div>
                    <div className="form__group">
                      <input id="cep" name="cep" type="text" required onChange={onChange} />
                    </div>

                    <div className="form__label">
                      <label htmlFor="referencia">Ponto de Referência</label>
                    </div>
                    <div className="form__group">
                      <input id="referencia" name="referencia" type="text" required onChange={onChange} />
                    </div>
                    <div className="form__label">
                      <label htmlFor="cidade">Cidade</label>
                    </div>
                    <div className="form__group">
                      <input id="cidade" name="cidade" type="text" required onChange={onChange} />
                    </div>
                    <div className="form__label">
                      <label htmlFor="estado">Estado</label>
                    </div>
                    <div className="form__group">
                      <input id="estado" name="estado" type="text" required onChange={onChange} />
                    </div>
                    <div>
                      <button type="submit" className="form__btn-cadastrar-endereco">Cadastrar</button>
                    </div>
                  </form>
                </div>
              </div>
              <CloseModalButton className="btnClose-modal" aria-label='Close modal' onClick={() => setShowModal(prev => !prev)} />
            </div>
          </animated.div>
        </div>
      ) : null
      }
    </>
  )
};
