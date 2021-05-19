import React from 'react';
import "../css/navBar-style.css";
import imgLike from "../assets/heart.png";
import img1 from "../assets/imagem1.jpg";

const NavBar = props => {
    return (
    <header className = "navbar">
        <nav className = "navbar-navigation">
          <div> <img className = "navbar-logo"src = {imgLike}></img></div>  
          <div className = "navbar-title"> Volunt3r</div>  
          <div className = "spacer" />
            <div className = "navbar-navigation-items">
                <ul>
                    <li><img className = "navbar-logo" src = {imgLike} href="/"></img></li>
                    <div className = "navbar-navigation">
                    <li><img className = "navbar-logo" src = {img1} href="/"></img></li>
                    <li><a href="/">Livia</a></li>
                    </div>       
                </ul>  
            </div>  
        </nav>
    </header>
);
}
    
export default NavBar;