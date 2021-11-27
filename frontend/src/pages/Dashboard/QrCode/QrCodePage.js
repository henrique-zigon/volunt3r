import React from 'react';
import QRCode from 'qrcode.react';
import { useParams, useHistory } from "react-router";
import { getURLFrontend } from '../../../configs/getUrlApi';
import { BiArrowBack, BiDownload } from 'react-icons/bi';

import '../styles/qrcode.css';
import { Link } from 'react-router-dom';

const QrCodePage = (props) => {

    let { idEvento } = useParams();
    
    let nomeEvento = props.location.state;

    function downloadQrCode() {
        var link = document.createElement('a');
        link.download = `qr_code_${nomeEvento}.png`;
        link.href = document.getElementById('canvas').toDataURL()
        link.click();
    }

    return (
        <div className="container-qrcode">
            <span>Olá, Geramos o QR Code do evento: <b>{nomeEvento}</b></span>


            <QRCode id="canvas" value={`${getURLFrontend()}/confirmar/${idEvento}`} renderAs="canvas" />


            <button type="button" className="download-qrcode" onClick={downloadQrCode}>
                <BiDownload size={16}/>
                <span>Baixar</span>
            </button>

            <Link
                to="/dashboard/eventos"
                className="back-button"
            >
                <BiArrowBack size={20} />
                <span>Voltar aos eventos</span>
            </Link>
        </div>
    );
}

export default QrCodePage;
