import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

function Barra(props) {
    return (
        <>
            <ProgressBar completed={props.completo} bgColor="#FECE21" isLabelVisible={false} width="93%" height="13px" margin="3%"/>
        </>
    );
};

export default Barra;