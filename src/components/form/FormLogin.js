import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from "../Logo/Logo";
import './Form.css';

const initialValue = {
  email: '',
  senha: ''
}

const Login = () => {
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();

    var json = JSON.stringify(values);

    var xhttp = new XMLHttpRequest();
    var url = 'http://api-petinho-feliz.000webhostapp.com/api-petinho-feliz/index.php/UsuarioControl/autenticarUsuario';
    xhttp.open('POST', url, true);

    //Send the proper header information along with the request
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function () {//Call a function when the state changes.
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        if (JSON.parse(this.responseText).resultado === false) {
          alert("Usuário não cadastrado!");
        } else {
          localStorage.setItem('app-token', this.responseText);
          history.push('/home');
        }

      }
    }
    xhttp.send(json);
  }

  return (
    <div className="login__bloco">
      <Logo />
      <div className="form__bloco">
        <div className="form-titulo">
          <h2>Realizar Login</h2>
        </div>

        <form className="cadastro-login-form" onSubmit={onSubmit}>
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
          <div className="div_button_login">
            <a href="/cadastro" className="link_cadastro">Cadastre-se</a>
            <button type="submit" className="form__btn-login">Entrar</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Login;