import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CriarUsuarioStep1 from './pages/CriarUsuario/CriarUsuarioStep1';
import CriarUsuarioStep2 from './pages/CriarUsuario/CriarUsuarioStep2';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Feed from './pages/Feed/Feed.js';
import ModalPublicacao from './components/ModalPublicacao.js';
import CardCatalogo from './components/CardCatalogo.js';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import EventCatalog from './pages/EventCatalog/EventCatalog';
import Shop from './pages/Shop/Shop';
import ModalCriacao from './components/ModalCriacao';
import Profile from './pages/Profile/Profile';
import Achievements from './pages/Achievements/Achievements';
import { useCookies } from 'react-cookie';
import RelatorioPage from './pages/RelatorioPage/RelatorioPage';
import CriarEventoPage from './pages/CriarEventoPage/CriarEventoPage';

function Routes() {
    const [cookies] = useCookies(['volunt3r', 'volunt3r_user']);
    const LoggedRoute = ({ component: Component, ...rest }) => (
        <Route
          {...rest}
          render={props =>
            cookies.volunt3r != null ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
          }
        />
      );

    const LoggedRouteDashboard = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          cookies.volunt3r_user.tipoUsuario === 'b3_social' ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    );
    return (
        <ToastProvider>
            <BrowserRouter>
                <Switch>
                    <LoggedRoute exact path="/achievements" component={Achievements} />
                    <LoggedRoute exact path="/profile" component={Profile} />
                    <LoggedRoute exact path="/create" component={ModalCriacao} />
                    <LoggedRoute exact path="/shop" component={Shop} />
                    <LoggedRoute exact path="/catalog" component={EventCatalog} />
                    <LoggedRoute exact path="/" component={Feed} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={CriarUsuarioStep1} />
                    <Route exact path="/register/step2" component={CriarUsuarioStep2} />
                    <LoggedRouteDashboard exact path="/dashboard" component={Dashboard}/>
                    <LoggedRouteDashboard exact path="/dashboard/relatorios" component={RelatorioPage}/>
                    <LoggedRouteDashboard exact path="/dashboard/criar-eventos" component={CriarEventoPage}/>
                    <Route path="*" component={NotFound} />

                </Switch>
            </BrowserRouter>
        </ToastProvider>
    );

}


export default Routes;