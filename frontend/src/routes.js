import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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

function Routes() {

    return (
        <ToastProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/achievements" component={Achievements} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/create" component={ModalCriacao} />
                    <Route exact path="/shop" component={Shop} />
                    <Route exact path="/catalog" component={EventCatalog} />
                    <Route exact path="/modal" component={ModalPublicacao} />
                    <Route exact path="/card" component={CardCatalogo} />
                    <Route exact path="/" component={Feed} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={CriarUsuarioStep1} />
                    <Route exact path="/register/step2" component={CriarUsuarioStep2} />
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route path="*" component={NotFound} />

                </Switch>
            </BrowserRouter>
        </ToastProvider>
    );

}


export default Routes;