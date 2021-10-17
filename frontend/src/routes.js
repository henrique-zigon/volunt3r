import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { useCookies } from 'react-cookie';

import CriarUsuarioStep1 from './pages/CriarUsuario/CriarUsuarioStep1';
import CriarUsuarioStep2 from './pages/CriarUsuario/CriarUsuarioStep2';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha1';
import RecuperarSenha1Email from './pages/RecuperarSenha/RecuperarSenha1Email';
import RecuperarSenha2 from './pages/RecuperarSenha/RecuperarSenha2';
import RecuperarSenhaSucesso from './pages/RecuperarSenha/RecuperarSenhaSucesso';
import NotFound from './pages/NotFound/NotFound';
import Perfil from './pages/Perfil/Perfil';
import Feed from './pages/Feed/Feed.js';
import EventCatalog from './pages/EventCatalog/EventCatalog';
import Shop from './pages/Shop/Shop';
import RelatorioPage from './pages/Dashboard/RelatorioPage';
import RecuperarSenhaInvalido from './pages/RecuperarSenha/RecuperarSenhaTokenInvalido';

function Routes() {
    const [cookies] = useCookies(['volunt3r', 'volunt3r_user']);

    const LoggedRoute = ({ component: Component, ...rest }) => (
        <Route
          {...rest}
          render={props =>
            cookies.volunt3r !== null && cookies.volunt3r !== undefined ? (
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
                    <LoggedRoute exact path="/shop" component={Shop} />
                    <LoggedRoute exact path="/catalog" component={EventCatalog} />
                    <LoggedRoute exact path="/" component={Feed} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/recuperar-senha" component={RecuperarSenha} />
                    <Route exact path="/recuperar-senha/email" component={RecuperarSenha1Email} />
                    <Route exact path="/recuperar-senha/sucesso" component={RecuperarSenhaSucesso} />
                    <Route exact path="/recuperar-senha-redefinir/*" component={RecuperarSenha2} />
                    <Route exact path="/recuperar-senha/token-invalido" component={RecuperarSenhaInvalido} />
                    <Route exact path="/register" component={CriarUsuarioStep1} />
                    <LoggedRoute exact path="/perfil" component={Perfil} />
                    <LoggedRoute exact path="/perfil-conquistas" component={Perfil} />
                    <Route exact path="/register/step2" component={CriarUsuarioStep2} />
                    <LoggedRoute exact path="/dashboard" component={Dashboard}/>
                    <LoggedRoute exact path="/dashboard/relatorios" component={RelatorioPage}/>
                    <Route path="*" component={NotFound} />

                </Switch>
            </BrowserRouter>
        </ToastProvider>
    );

}


export default Routes;