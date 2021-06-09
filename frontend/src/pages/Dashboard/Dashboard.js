import React from 'react';


import './dashboard.css';
import SideBar from '../../components/SideBar/SideBar';
import HeaderWelcomePageDashboard from '../../components/HeaderWelcomePageDashboard/HeaderWelcomePageDashboard';
import { BiUserPlus, BiUserMinus, BiHeart } from 'react-icons/bi';


const Dashboard = () => {
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

        <div className="container-charts">
          <div className="leading-indicators">
            <div className="box-leading-indicator">
              <span className="title">Quantidade de voluntários <strong>N1</strong></span>
              <span className="indicator">50</span>
              <div className="icon-box heart">
                <BiHeart size={30} />
              </div>
            </div>
            <div className="box-leading-indicator">
              <span className="title">Total de voluntários ativos</span>
              <span className="indicator positive">1.125</span>
              <div className="icon-box">
                <BiUserPlus size={30} />
              </div>
            </div>
            <div className="box-leading-indicator">
              <span className="title">Total de voluntários inativos</span>
              <span className="indicator">5</span>
              <div className="icon-box inactive">
                <BiUserMinus size={30} />
              </div>
            </div>
          </div>
          <div className="content-charts">
            <div className="container-chart-left">
              <div className="box-chart-left">
                <span className="title">Turnover</span>
              </div>
              <div className="box-chart-left">
                <span className="title">Turnover</span>
              </div>
              <div className="box-chart-left">
                <span className="title">Turnover</span>
              </div>
              <div className="box-chart-left">
                <span className="title">Turnover</span>
              </div>
              
            </div>

            <div className="container-chart-right">
              <div className="box-chart-right">
                <span className="title">Categorias</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </main>

  );

}

export default Dashboard;