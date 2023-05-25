import React, { useEffect, useState } from "react";
import "./ScreenStyles.css";
import logo from "../images/logo3.png";
import Footer from "../screens/components/Footer";
import Login from "./AdminLogin";
import { BsSend } from "react-icons/bs";
import QuestionConfirm from "./QuestionConfirm";
import localserver from "../apis/server";

export default function Home() {
  const [userLogged, setUserLogged] = useState(false);
  const [adminLoged, setAdminLogged] = useState(false);
  const [home, setHome] = useState(true);
  const [expertReg, setExpertReg] = useState(false);
  const [login, setLogin] = useState(false);
  const [questionList, setQuestionList] = useState(false);
  const [answer, setAnswer] = useState("Hello, How can I Help You?");
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);

  function getAnswer() {
    if (question === "") {
      alert("Please Enter The Question");
      return;
    }
    localserver
      .get("/getAnswer?question=" + question, {})
      .then((res) => {
        console.log("result : ", res.data);
        if (res.data.state) {
          setAnswer(res.data.answer);
        } else {
          setAnswer(
            "I apologize, but I'm unable to provide an answer to that question as it falls outside of my scope. Is there anything else I can assist you with or any other topic you'd like to discuss?"
          );
        }
      })
      // Catch errors if any
      .catch((err) => {
        alert(err);
      });
  }

  function NavItemHandle(value) {
    switch (value) {
      case 0: {
        setQuestionList(false);
        setLogin(false);
        setHome(true);
        break;
      }
      case 1: {
        if (localStorage.getItem("loged") === "true") {
          setAdminLogged(true);
          setHome(false);
          setLogin(false);
          setQuestionList(true);
        } else {
          setAdminLogged(false);
          alert("Please Log In First");
        }
        break;
      }
      case 2: {
        setHome(false);
        setQuestionList(false);
        setLogin(true);
        break;
      }
    }
  }

  function logout() {
    localStorage.removeItem("loged");
    alert("Log out successfully");
    setUserLogged(false);
    setQuestionList(false);
    setLogin(false);
    setHome(true);
  }

  useEffect(() => {
    if (localStorage.getItem("loged") === "true") {
      setUserLogged(true);
    }
  }, []);

  return (
    <>
      <div className="full-screen">
        {/* Navigation Bar */}
        <div className="home-nav-content">
          <div className="home-nav-logo-content">
            <img src={logo} alt="" className="home-nav-logo-img" />
          </div>
          <div className="home-nav-btn-content">
            <button className="home-nav-btn" onClick={(e) => NavItemHandle(0)}>
              Home
            </button>
            {userLogged && (
              <>
                <button
                  className="home-nav-btn"
                  onClick={(e) => NavItemHandle(1)}
                >
                  Question List
                </button>
                <button className="home-nav-btn" onClick={logout}>
                  Log out
                </button>
              </>
            )}
            {!userLogged && (
              <dev>
                <button
                  className="home-nav-btn"
                  onClick={(e) => NavItemHandle(2)}
                >
                  Login
                </button>
                {/* <BiUserCircle className="home-nav-btn" onClick={(e)=>NavItemHandle(0)}/> */}
              </dev>
            )}
          </div>
        </div>

        {home && (
          <div className="home-body-content">
            <button
              className="home-chat-new-chat-btn"
              onClick={() => {
                window.location.reload();
              }}
            >
              New Chat
            </button>
            <div
              className="home-body-chat-content"
              style={{ display: "block" }}
            >
              <div className="home-body-chat-card-question">
                <p className="chat-card-text" style={{ color: "#d81313" }}>
                  {question}
                </p>
              </div>
              <br />

              <div className="home-body-chat-card-answer">
                <p className="chat-card-text" style={{ textAlign: "center" }}>
                  {answer}
                </p>
              </div>
              <br />
            </div>
            <div className="home-chat-content">
              <input
                type="text"
                className="chat-input"
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <BsSend size={30} className="chat-icon" onClick={getAnswer} />
            </div>

            <Footer />
          </div>
        )}

        {questionList && (
          <div className="home-body-content">
            <QuestionConfirm adminLoged={adminLoged} />
          </div>
        )}

        {login && (
          <div className="home-body-content">
            <Login />
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}
