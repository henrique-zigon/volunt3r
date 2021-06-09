import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import HeaderWelcomePageDashboard from '../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import './relatorioPage.css';

const RelatorioPage = () => {

  function getArquivoDados () {
    // CÒDIGO PARA PEGAR O ARQUIVO
  }

  return(
    <main className="container">
      <SideBar
        userpic="https://media-exp3.licdn.com/dms/image/C4E03AQGgjLP5EZeVdg/profile-displayphoto-shrink_200_200/0/1612388968568?e=1628726400&v=beta&t=qYA1qATjkPSe6rNwIXoewoEMT6q8FvtaMkfQvcP06E8"
        username="Gabriel Ronny"
        useremail="gabriel.pereira@b3.com.br"
      />
      <div className="content">
        <HeaderWelcomePageDashboard
          username="Gabriel Ronny"
          subtitle="Seus dados estão por aqui!"
        />
        <button className="button">
          Exportar Dados
        </button>
        {/* <button className="button">
          Importar Dados
        </button> */}
      </div>
    </main>
    
  );
}


export default RelatorioPage;