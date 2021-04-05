import React, { Component } from 'react';
import './NavBar.css';

class NavbarLogged extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  singOut() {
    var xhttp = new XMLHttpRequest();
    var url = 'https://api-petinho-feliz.000webhostapp.com/api-petinho-feliz/index.php/UsuarioControl/logout';

    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        localStorage.removeItem('app-token');
        window.location.reload();
      }
    }
    xhttp.open('GET', url, true);
    xhttp.send();
  }

  render() {
    return (
      <nav className="navbar-items">
        <img src="logo9.png" alt="Logo" className="navbar-logo" />
        <div className="menu-icon" onClick={this.handleClick}>
          <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={this.state.clicked ? 'nav-menu-logged active' : 'nav-menu-logged'}>
          {localStorage.getItem('app-token') ?
            <>
              <li className="nav-links-geral">
                <a href="/home">
                  Home
        </a>
              </li>
              <li className="nav-links-geral">
                <a href="/denuncie">
                  Denuncie
        </a>
              </li>
              <li className="nav-links-geral">
                <a href="/perfil">
                  Perfil
        </a>
              </li>
              <li className="nav-links-sair">
                <button id="nav-links-sair" onClick={this.singOut}>
                  Sair
             <i className="fas fa-sign-out-alt"> </i>
                </button>
              </li>
            </>
            :
            <>
              <li className="nav-links-geral">
                <a href="/home">
                  Home
              </a>
              </li>
              <li className="nav-links-geral">
                <a href="/denuncie">
                  Denuncie
              </a>
              </li>
              <li className="nav-links-geral">
                <a href="/login">
                  Login
              </a>
              </li>
              <li className="nav-links-geral">
                <a href="/cadastro">
                  Cadastro
              </a>
              </li>
            </>
          }
        </ul>
      </nav>
    )
  }
}

export default NavbarLogged;