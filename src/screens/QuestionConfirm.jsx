import React, { useEffect, useState } from "react";
import "./ScreenStyles.css";
import localserver from "../apis/server";

export default function QuestionConfirm(adminLoged) {
  console.log(adminLoged);
  const [questionConfirmModal, setQuestionConfirmModal] = useState(false);
  const [expertQuestionList, setExpertQuestionList] = useState([]);
  const [answer] = useState([]);

  function setAnswer(value, index) {
    answer[index] = value;
  }

  function getQuestions() {
    localserver
      .get("/getQuestions", {
        headers: { token: localStorage.getItem("admin") },
      })
      .then((res) => {
        console.log("result : ", res.data);
        if (res.data.state) {
          setExpertQuestionList(res.data.result);
          if (res.data.result.length == 0) {
            alert("There is no any new question");
          }
        }
      })
      // Catch errors if any
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    getQuestions();
  }, []);

  function addAnswer(qid, index) {
    localserver
      .post(
        "/addAnswer",
        {
          qid: qid,
          answer: answer[index],
        },
        {
          headers: { token: localStorage.getItem("admin") },
        }
      )
      .then((res) => {
        alert(res.data.message);
        console.log("result : ", res.data);
        window.location.reload();
      })
      // Catch errors if any
      .catch((err) => {
        alert(err);
      });
  }

  function rejectQuestion(qid) {
    localserver
      .delete("/rejectQuestion?qid=" + qid, {
        headers: { token: localStorage.getItem("admin") },
      })
      .then((res) => {
        alert(res.data.message);
        console.log("result : ", res.data);
        window.location.reload();
      })
      // Catch errors if any
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="expert-question-list-content">
      {adminLoged && (
        <div className="expert-confirm-content-question-list">
          {expertQuestionList.map((data, index) => (
            <div className="expert-confirm-card">
              <div
                className="expert-confirm-card-detail"
                style={{ textOverflow: "wrap" }}
              >
                <h5>{data.question}</h5>
                <input
                  placeholder="Add Answer"
                  value={answer[index]}
                  onChange={(e) => setAnswer(e.target.value)}
                ></input>
              </div>

              <div className="expert-confirm-card-confirm-btn">
                <button
                  className="expert-confirm-card-btn-confirm"
                  style={{ width: "4rem", height: "2rem" }}
                  onClick={() => addAnswer(data.id)}
                >
                  Add
                </button>
                <button
                  className="expert-confirm-card-btn-confirm"
                  style={{ width: "4rem", height: "2rem" }}
                  onClick={() => rejectQuestion(data.id)}
                >
                  Reject
                </button>
              </div>
              {questionConfirmModal && data.questionId === 1 && (
                <div className="question-confirm-modal">
                  <button
                    onClick={() => {
                      setQuestionConfirmModal(false);
                    }}
                    className="question-confirm-modal-close-btn"
                  >
                    Close
                  </button>
                  <div className="expert-confirm-question-card-content">
                    {data.question}
                  </div>
                  <input
                    type="text"
                    placeholder="Type Answer Here"
                    className="expert-confirm-answer-card-content"
                  />
                  <button
                    onClick={() => {
                      setQuestionConfirmModal(false);
                    }}
                    className="question-confirm-modal-answer-btn"
                  >
                    Submit Answer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
