import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import CadastroVideo from './pages/cadastro/Video'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CadastroCategoria from './pages/cadastro/Categoria';

const Pagina404 = () => (
  //<iframe title="404" src="https://editor.p5js.org/andersoninfonet/embed/K49gWqVc-" width="800" height="600"></iframe>
  <div>Pagina 404</div>
)

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact ></Route>
      <Route path="/cadastro/video" component={CadastroVideo}></Route>
      <Route path="/cadastro/categoria" component={CadastroCategoria} ></Route>
      <Route component={Pagina404}></Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);


