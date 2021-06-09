import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import HeaderWelcomePageDashboard from '../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import {useCookies} from 'react-cookie';

const CriarEventoPage = () => {

  const [cookies] = useCookies(['volunt3r', 'volunt3r_user']);
  return(
    <main className="container">
      <SideBar 
        userpic={cookies.volunt3r_user.imagemPerfil}
        username={cookies.volunt3r_user.nomeUsuario}
        useremail={cookies.volunt3r_user.email}
      />
      <div className="content">
        <HeaderWelcomePageDashboard
          username={cookies.volunt3r_user.nomeUsuario}
          subtitle="Vamos exportar ou importar dados?"
        />
        
      </div>
    </main>
  );
}

export default CriarEventoPage;