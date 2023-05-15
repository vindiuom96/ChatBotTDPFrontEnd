import React, { useState } from "react";
import './ScreenStyles.css';


export default function ExpertConfirm()
{
    const[pendingExpertList, setPendingExpertList] = useState([
        {
            expertId: '001',
            expertName: 'ABC 001D'
        },
        {
            expertId: '002',
            expertName: 'XYZ 002A'
        },
        {
            expertId: '003',
            expertName: 'GHI 092L'
        },
        {
            expertId: '002',
            expertName: 'XYZ 002A'
        },
        {
            expertId: '003',
            expertName: 'GHI 092L'
        },
        
    ]);
    return(
        <>
        <h2 className="form-title" >Expert Confirmation</h2>
        <div className="expert-confirm-content">
            {pendingExpertList.map((data)=>(
            <div className="expert-confirm-card">
                <div className="expert-confirm-card-detail">
                    <h4>{data.expertId}</h4>
                    <h3>{data.expertName}</h3>
                </div>
                <div className="expert-confirm-card-confirm-btn">
                    <button className="expert-confirm-card-btn-confirm">Confirm</button>
                    <button className="expert-confirm-card-btn-decline">Decline</button>
                </div>
            </div>
            ))}
        </div>
        </>
    );
}