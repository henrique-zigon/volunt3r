import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CriarUsuarioStep1 from './pages/CriarUsuario/CriarUsuarioStep1';
import CriarUsuarioStep2 from './pages/CriarUsuario/CriarUsuarioStep2';
import Login from './pages/Login/Login';


function Routes() {

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/register" component={CriarUsuarioStep1} />
                <Route exact path="/register/step2" component={CriarUsuarioStep2} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );

}


export default Routes;