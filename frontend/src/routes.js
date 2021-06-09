import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CriarUsuarioStep1 from './pages/CriarUsuario/CriarUsuarioStep1';
import CriarUsuarioStep2 from './pages/CriarUsuario/CriarUsuarioStep2';
// import Dashboard from './pages/Dashboard/Dashboard';
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

function Routes() {
    const [cookies] = useCookies(['volunt3r']);
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
    return (
        <ToastProvider>
            <BrowserRouter>
                <Switch>
                    <LoggedRoute exact path="/achievements" component={Achievements} />
                    <LoggedRoute exact path="/profile" component={Profile} />
                    <LoggedRoute exact path="/create" component={ModalCriacao} />
                    <LoggedRoute exact path="/shop" component={Shop} />
                    <LoggedRoute exact path="/catalog" component={EventCatalog} />
                    <LoggedRoute exact path="/modal" component={ModalPublicacao} />
                    <LoggedRoute exact path="/card" component={CardCatalogo} />
                    <LoggedRoute exact path="/" component={Feed} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={CriarUsuarioStep1} />
                    <Route exact path="/register/step2" component={CriarUsuarioStep2} />
                    {/* <Route exact path="/dashboard" component={Dashboard}/> */}
                    <Route path="*" component={NotFound} />

                </Switch>
            </BrowserRouter>
        </ToastProvider>
    );

}


export default Routes;