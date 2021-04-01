import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import PagesHome from './home/Home';
import PagesCadastro from './cadastro/Cadastro';
import PagesLogin from './login/Login';
import PagesPerfil from './perfil/Perfil';

import PrivateRoute from '../components/PrivateRoute';

import './root.css';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PagesHome} />
        <Route path="/login" exact component={PagesLogin} />
        <Route path="/cadastro" exact component={PagesCadastro} />
        <Route path="/home" exact component={PagesHome} />
        <PrivateRoute path="/perfil" exact component={PagesPerfil} />
      </Switch>
    </Router>
  );
};

export default Root;