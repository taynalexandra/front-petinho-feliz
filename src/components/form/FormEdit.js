import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Form.css';

const initialValue = {
  email: '',
  senha: '',
  tipoUsuario: '',
  contato: '',
  tipoContato: '',
  disponibilidadeDias: '',
  disponibilidadeHoras: '',
  empresa: '',
  cnpj: '',
  nome: '',
  cpf: '',
  genero: ''

}

const FormEdit = () => {
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  useEffect(() => {
    getTokenAdmin();
    //const storage = JSON.parse(localStorage.getItem('app-token'));


    //const storage = JSON.parse(localStorage.getItem('app-token'));
    //const token = storage.resultado.token;
    //const userId = storage.resultado.dadosUsuario[0].id_usuario;

  });


  function getTokenAdmin() {
    var json = {
      "email": "adminpetinhofeliz@gmail.com",
      "senha": "Ad1m1nP3t1nh0tgm"
    };
    json = JSON.stringify(json);

    var xhttp = new XMLHttpRequest();
    var url = 'https://api-petinho-feliz.000webhostapp.com/api-petinho-feliz/index.php/UsuarioControl/autenticarUsuario';
    xhttp.open('POST', url, true);

    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function () {//Call a function when the state changes.
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        console.log(JSON.parse(this.responseText).resultado.token)
        //var tokenAdmin = JSON.parse(this.responseText).resultado.token;
      }
    }
    xhttp.send(json);
  }

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();

    var json = JSON.stringify(values);

    var xhttp = new XMLHttpRequest();
    var url = 'https://api-petinho-feliz.000webhostapp.com/api-petinho-feliz/index.php/UsuarioControl/cadastrarUsuario';
    xhttp.open('POST', url, true);

    //Send the proper header information along with the request
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function () {//Call a function when the state changes.
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        history.push('/login');
      }
    }
    xhttp.send(json);
  }

  return (
    <div className="edit__bloco">
      <div className="form__bloco">
        <div className="form-titulo">
          <h2>Editar Perfil</h2>
        </div>

        <form className="edit-login-form" onSubmit={onSubmit}>
          <div className="form__label">
            <label htmlFor="nome">Nome</label>
          </div>
          <div className="form__group">
            <input id="nome" name="nome" type="text" required onChange={onChange} />
          </div>
          <div className="form__label">
            <label htmlFor="cpf">CPF</label>
          </div>
          <div className="form__group">
            <input id="cpf" name="cpf" type="text" onChange={onChange} />
          </div>
          <div className="form__label">
            <label>Gênero</label>
          </div>
          <div className="form__radio">
            <input type="radio" id="masculino" name="genero" value="masculino" onChange={onChange} />
            <label htmlFor="masculino">Masculino</label>
            <input type="radio" id="feminino" name="genero" value="feminino" onChange={onChange} />
            <label htmlFor="feminino">Feminino</label>
          </div>
          <div className="form__label">
            <label htmlFor="email">E-mail</label>
          </div>
          <div className="form__group">
            <input id="email" name="email" type="email" required onChange={onChange} />
          </div>
          <div className="form__label">
            <label htmlFor="senha">Senha</label>
          </div>
          <div className="form__group">
            <input id="senha" name="senha" type="password" required onChange={onChange} />
          </div>
          <div className="form__label">
            <label>Tipo de Usuário</label>
          </div>
          <div className="form__radio">
            <input type="radio" id="cuidador" name="tipoUsuario" value="cuidador" onChange={onChange} />
            <label htmlFor="cuidador">Cuidador</label>
            <input type="radio" id="estabelecimento" name="tipoUsuario" value="estabelecimento" onChange={onChange} />
            <label htmlFor="estabelecimento">Estabelecimento</label>
          </div>
          <div className="form__label">
            <label htmlFor="contato">Contato</label>
          </div>
          <div className="form__group">
            <input id="contato" name="contato" type="text" required onChange={onChange} />
          </div>
          <div className="form__label">
            <label htmlFor="tipoContato">Tipo de Contato</label>
          </div>
          <div className="form__group">
            <input id="tipoContato" name="tipoContato" type="text" required onChange={onChange} />
          </div>
          <div className="form__label">
            <label htmlFor="disponibilidadeDias">Disponibilidade(dias)</label>
          </div>
          <div className="form__group">
            <input id="disponibilidadeDias" name="disponibilidadeDias" type="text" required onChange={onChange} />
          </div>
          <div className="form__label">
            <label htmlFor="disponibilidadeHoras">Disponibilidade(horas)</label>
          </div>
          <div className="form__group">
            <input id="disponibilidadeHoras" name="disponibilidadeHoras" type="text" required onChange={onChange} />
          </div>
          <div className="form__label">
            <label htmlFor="empresa">Empresa</label>
          </div>
          <div className="form__group">
            <input id="empresa" name="empresa" type="text" onChange={onChange} />
          </div>
          <div className="form__label">
            <label htmlFor="cnpj">CNPJ</label>
          </div>
          <div className="form__group">
            <input id="cnpj" name="cnpj" type="text" onChange={onChange} />
          </div>
          <div className="div_button_edit">
            <button type="button" className="form__btn-delete">Excluir Conta</button>
            <button type="submit" className="form__btn-edit">Editar</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default FormEdit;