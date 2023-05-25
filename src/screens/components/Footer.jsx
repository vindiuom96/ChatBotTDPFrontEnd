import React from "react";
import './ComponentStyles.css';
import { AiOutlineLogout } from "react-icons/ai";

export default function Footer()
{
    return(
        <>
        <div  className="footer-content">
            <div style={{width:'20%'}}></div>
            <p className="footer-text">
                Footer - Description
            </p>
            <span style={{width:'15%'}}><AiOutlineLogout className="footer-logout-icon" size={30}/></span>
        </div>
        </>
    );
}