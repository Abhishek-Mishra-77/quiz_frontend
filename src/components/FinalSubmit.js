import React from "react";
import { useSelector } from "react-redux";

const TestSubmitted = () => {
  const answerSheet = useSelector((state) => state.answerSheet);
  const allQuestions = useSelector((state) => state.question);

  let unAttempted = 0;
  let skipped = 0;
  for (let i = 0; i < allQuestions.length; i++) {
    if (allQuestions[i].attempted && !allQuestions[i].submit) {
      skipped++;
    }
    else if(!allQuestions[i].attempted && !allQuestions[i].submit) {
      unAttempted++;
    }
  }


  return (
    <div className="score-container">
      <div className="title">Submission Successful</div>
      <div className="message">Thank you for completing the quiz.</div>
      <div className="summary">
        <div className="summary-item submitted text-success">
          <span className="greenTick"></span>
          <i className="fas fa-check-circle"></i> {answerSheet.length} Questions
          Submitted
        </div>
        <div className="summary-item skipped text-warning">
          <span className="yellowTick"></span>
          <i className="fas fa-exclamation-circle"></i> {skipped} Questions
          Skipped
        </div>
        <div className="summary-item attempted text-danger">
          <span className="redTick"></span>{" "}
          <i className="fas fa-times-circle"></i> {unAttempted} Questions unattempted
        </div>
      </div>
      <button className="button">Finish</button>
    </div>
  );
};

export default TestSubmitted;
