import React, { useState } from "react";
import './ScreenStyles.css';
import localserver from "../apis/server";
import QuestionConfirm from "./QuestionConfirm";


export default function AdminLogin()
{
    const [adminLogged , setAdminLogged] = useState(false)
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")

    function adminLogin(){
        localserver.post("/loginAdmin",
            {
              id:"645f0df8a1c4a81d992fa4a3",
              password:"12345678"
            })
      .then((res) => { 
          console.log("result : ", res.data)
          if(res.data.state){
            alert("Successfully Logged In")
            localStorage.setItem("admin" , res.data.token)
            localStorage.setItem("loged" , "true")
            window.location.reload()
            setAdminLogged(true);
          }
      })
    // Catch errors if any
    .catch((err) => { 
      alert(err)
    })
    }

    return(
        <>
 
            <div className="login-form">
                <h2 className="form-title" >Admin Login</h2>
                <input type="text" className="expert-reg-form-input" placeholder="UserName" value={username} onChange={e=>setUsername(e.target.value)}/><br/>
                <input type="password" className="expert-reg-form-input" placeholder="Password"  value={password} onChange={e=>setPassword(e.target.value)}/><br/>
                <button className="login-button" onClick={adminLogin}>Login</button>
            </div>

            {adminLogged &&
            <div style={{marginLeft:'35%'}}>
            <QuestionConfirm/>
            </div>}

        </>
    );
}