import React, { useEffect } from 'react';
import './conquista-style.css';
import avatarPadrao from '../../images/avatar_padrao.png';

const URL = "http://voluntier.eastus.cloudapp.azure.com:81";


const Conquista = (props) => {
return(
    <div className="medal-info-container">
        <div className="medal-icon">
            <img src={avatarPadrao}></img>
        </div>
        {/* {renderProgress(props.show)} */
        (()=>{
            if(props.show!="icone"){				
                return (
                        <div className="medal-progress">
                            <div className="progress-statistics">
                                <span className="current-progress">19</span>
                                <span>/</span>
                                <span className="total-progress">20</span>
                            </div>
                            <div className="progress-bar">
                                <div className="total-progress-bar">
                                    <div className="current-progress-bar"></div>
                                </div>
                            </div>
                        </div>
                        );}
                    })()}
						
    </div>
);
}


const renderProgress = (props) =>{
    if(props.show!="icone"){				
    return (
            <div className="medal-progress">
                <div className="progress-statistics">
                    <span className="current-progress">19</span>
                    <span>/</span>
                    <span className="total-progress">20</span>
                </div>
                <div className="progress-bar">
                    <div className="total-progress-bar">
                        <div className="current-progress-bar"></div>
                    </div>
                </div>
            </div>
            );}

}


export default Conquista;