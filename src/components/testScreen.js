import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { questionSliceAction } from "../store/test";
import { MdTimer } from "react-icons/md";
import Timer from "./timer";
import { PiFastForwardCircleBold } from "react-icons/pi";
import { BsXCircleFill } from "react-icons/bs";
import { FaClipboardQuestion } from "react-icons/fa6";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import QuestionSelector from "./questionSelector";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const TestScreen = () => {
  const [nextVisible, setNextVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const questions = useSelector((state) => {
    return state.current;
  });
  const answerSheet = useSelector((state) => {
    return state.answerSheet;
  });
  const allQuestions = useSelector((state) => state.question);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const exist = answerSheet.find(
      (answer) => answer.queno === questions[0].no
    );
    if (exist) {
      setSelectedOption(exist.selectedOption);
    } else {
      setSelectedOption(null);
    }
  }, [answerSheet, questions]);

  const submitAnswerHandler = (queno) => {
    dispatch(
      questionSliceAction.submitAnswer({
        queno: queno,
        selectedOption: selectedOption,
      })
    );
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setNextVisible(true);
  };
  const questionHandler = (queNo) => {
    dispatch(questionSliceAction.jumpQuestion(queNo));
  };
  const skipQuestionHandler = () => {
    dispatch(questionSliceAction.skipQuestion(questions[0].no));
    setSelectedOption(null);
  };
  const submitQuestionHandler = () => {
    dispatch(questionSliceAction.submitQuestion(questions[0].no));
    dispatch(questionSliceAction.skipQuestion(questions[0].no));
    setSelectedOption(null);
    setNextVisible(false);
  };


  const onFinalSubmitHandler = async () => {
    let attempted = 0;
    let unattempted = 0;
    let correct = 0;

    console.log(allQuestions);

    allQuestions.forEach((q) => {
      const userAnswer = answerSheet.find((a) => a.queno === q.no);
      console.log(userAnswer);

      if (userAnswer) {
        attempted++;
        console.log(userAnswer.selectedOption, q.correctAnswer);

        // Compare the selected answer with the correct one
        if (userAnswer.selectedOption === q.correctAnswer) {
          correct++;
        }
      } else {
        unattempted++;
      }
    });
    // Send data to backend for assessment creation
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/assessments/create`, {
        userId: user.id,
        total_questions: allQuestions.length,
        attempted: attempted,
        unattempted: allQuestions.length - attempted,
        correct: correct,
        published: false,
      });

      console.log("Assessment saved:", response.data);
      // navigate to final submit page
      navigate("/finalsubmit");
    } catch (error) {
      console.error("Error saving assessment:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4 test_screen_main">
        <div className="col-8 mx-3 shadow animate__animated animate__fadeInLeft test_screen_left">
          <div className="row d-flex justify-content-center align-item-center pt-3 ">
            <div className="col d-flex justify-content-center align-item-center fw-bolder">
              <FaClipboardQuestion style={{ width: "40px", height: "40px" }} />
              <span style={{ marginTop: "10px" }}>
                Total Questions : {allQuestions.length}
              </span>
            </div>
            <div className="col d-flex justify-content-center align-item-center">
              <MdTimer style={{ width: "40px", height: "40px" }} />
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  marginTop: "5px",
                  fontWeight: "bolder",
                }}
              >
                <Timer></Timer>
              </div>
            </div>
            <button
              type="button"
              onClick={onFinalSubmitHandler}
              className="col-2 fs btn btn-outline-success d-flex justify-content-center align-items-center me-4 fw-bold"
            >
              Finish Test
              <IoCheckmarkDoneCircleSharp
                style={{ width: "20px", height: "20px", margin: "5px" }}
              ></IoCheckmarkDoneCircleSharp>
            </button>
          </div>
          <hr></hr>
          <div className="container">
            <div className="ms-5">
              <h4>
                <span className="mx-3" key={questions[0].subject}>
                  Que {questions[0].no + 1} :
                </span>
                {questions[0].subject}
              </h4>
              <div className="row p-2">
                <label className="col-6 m-2">
                  <input
                    type="checkbox"
                    checked={selectedOption === questions[0].A}
                    onChange={() => handleOptionChange(questions[0].A)}
                    className="m-2"
                  />
                  {questions[0].A}
                </label>
                <label className="col-6 m-2">
                  <input
                    type="checkbox"
                    checked={selectedOption === questions[0].B}
                    onChange={() => handleOptionChange(questions[0].B)}
                    className="m-2"
                  />
                  {questions[0].B}
                </label>
                <label className="col-6 m-2">
                  <input
                    type="checkbox"
                    checked={selectedOption === questions[0].C}
                    onChange={() => handleOptionChange(questions[0].C)}
                    className="m-2"
                  />
                  {questions[0].C}
                </label>{" "}
                <label className="col-6 m-2">
                  <input
                    type="checkbox"
                    checked={selectedOption === questions[0].D}
                    onChange={() => handleOptionChange(questions[0].D)}
                    className="m-2"
                  />
                  {questions[0].D}
                </label>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="d-flex justify-content-end my-4">
              <button
                type="button"
                className="btn  btn-outline-warning mx-2 text-warning skip_btn"
                onClick={skipQuestionHandler}
              >
                Skip
              </button>
              {!nextVisible && (
                <button
                  type="button"
                  className="btn  border-danger mx-2 fw-bold text-danger"
                >
                  next{" "}
                  <BsXCircleFill style={{ width: "15px", height: "15px" }} />
                </button>
              )}
              {nextVisible && (
                <button
                  type="button"
                  className="btn btn-warning mx-2 fw-bold "
                  onClick={() => {
                    submitQuestionHandler(questions[0]);
                    submitAnswerHandler(questions[0].no);
                  }}
                >
                  next{" "}
                  <PiFastForwardCircleBold
                    style={{ width: "30px", height: "30px", color: "white" }}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
        <QuestionSelector />
      </div>
    </div>
  );
};
export default TestScreen;
