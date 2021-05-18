import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CriarUsuarioStep1 from './pages/CriarUsuario/CriarUsuarioStep1';
import CriarUsuarioStep2 from './pages/CriarUsuario/CriarUsuarioStep2';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';


function Routes() {

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={CriarUsuarioStep1} />
                <Route exact path="/register/step2" component={CriarUsuarioStep2} />
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route path="*" component={NotFound} />

            </Switch>
        </BrowserRouter>
    );

}


export default Routes;