import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
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

const FormCadastro = () => {
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function exibirCuidador(){
    $("#nome_label").show();
    $("#cpf_label").show();
    $("#genero_label").show();
    $("#nome").show();
    $("#cpf").show();
    $("#genero").show();

    $("#empresa_label").hide();
    $("#cnpj_label").hide();
    $("#empresa").hide();
    $("#cnpj").hide();
  }

  function exibirEstabelecimento(){
    $("#empresa_label").show();
    $("#cnpj_label").show();
    $("#empresa").show();
    $("#cnpj").show();

    $("#nome_label").hide();
    $("#cpf_label").hide();
    $("#genero_label").hide();
    $("#nome").hide();
    $("#cpf").hide();
    $("#genero").hide();
  }

  function onSubmit(ev) {
    ev.preventDefault();

    var json = JSON.stringify(values);
    console.log(values);
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


  $(window).on("load", function(){
    $("#empresa_label").hide();
    $("#cnpj_label").hide();
    $("#empresa").hide();
    $("#cnpj").hide();
  });

  return (

    <div className="cadastro__bloco">
      <div className="form__bloco">
        <div className="form-titulo">
          <h2>Realizar Cadastro</h2>
        </div>

        <form className="cadastro-login-form" onSubmit={onSubmit}>
          <div className="form__label">
            <label>Tipo de Usuário</label>
          </div>

          <div className="form__radio">
          
            <input type="radio" id="cuidador" name="tipoUsuario" value="cuidador" onClick={exibirCuidador} defaultChecked/>
            <label htmlFor="cuidador">Cuidador</label>
            <input type="radio" id="estabelecimento" name="tipoUsuario" value="estabelecimento" onClick={exibirEstabelecimento} />
            <label htmlFor="estabelecimento">Estabelecimento</label>
            
          </div>

          <div className="form__label">
            <label id="nome_label" htmlFor="nome">Nome</label>
          </div>

          <div className="form__group">
            <input id="nome" name="nome" type="text" required onChange={onChange} />
          </div>

          <div className="form__label">
            <label id="cpf_label" htmlFor="cpf">CPF</label>
          </div>

          <div className="form__group">
            <input id="cpf" name="cpf" type="text" onChange={onChange} />
          </div>

          <div className="form__label">
            <label id="empresa_label" htmlFor="empresa">Empresa</label>
          </div>

          <div className="form__group">
            <input id="empresa" name="empresa" type="text" onChange={onChange} />
          </div>

          <div className="form__label">
            <label id="cnpj_label" htmlFor="cnpj">CNPJ</label>
          </div>

          <div className="form__group">
            <input id="cnpj" name="cnpj" type="text" onChange={onChange} />
          </div>

          <div className="form__label">
            <label  id="genero_label">Gênero</label>
          </div>

          <div id="genero" className="form__radio">
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

          <div className="div_button_cadastro">
            <a href="/login" className="link_login">Realizar Login</a>
            <button type="submit" className="form__btn-cadastro">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  )
};


export default FormCadastro;