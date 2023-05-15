import React,{useState} from "react";
import './ScreenStyles.css';
import QuestionList from "./QuestionList";


export default function Login()
{
    const[userLogged, setUserLogged] = useState(false);
    
    return(
        <>

        {!userLogged &&
        <div className="login-form">
            <h2 className="form-title" >Expert Login</h2>
            <input type="text" className="expert-reg-form-input" placeholder="UserName"/><br/>
            <input type="password" className="expert-reg-form-input" placeholder="Password" /><br/>
            <button className="login-button" onClick={()=>{setUserLogged(true)}}>Login</button>
        </div>}

        {userLogged &&
        <div style={{marginLeft:'35%'}}>
           <QuestionList/>
        </div>}
        </>
    );
}