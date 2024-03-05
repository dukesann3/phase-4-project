import React from "react";
import { useEffect } from "react";

function ErrorPage(){

    useEffect(()=>{
        setTimeout(()=>{
            window.history.back();
        }, 3000);
    },[]);

    return(
        <>
            <h1 style={{textAlign: "center"}}>ERROR 404</h1>
        </>
    )
}

export default ErrorPage