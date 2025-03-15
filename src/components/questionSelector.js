import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { questionSliceAction } from "../store/test";

const QuestionSelector = () => {
  const dispatch = useDispatch();
  const allQuestions = useSelector((state) => state.question);
  const questionHandler = (queNo) => {
    dispatch(questionSliceAction.jumpQuestion(queNo));
  };

  return (
    <div className="col animate__animated animate__fadeInDown test_screen_right">
      <div className="text-center">
        <div className="badge text-white bg-info p-2 fw-bolder my-2">
          Question selector
        </div>
      </div>
      <div
        className="d-flex flex-wrap overflow-y-scroll mb-5"
        style={{ maxHeight: "350px" }}
      >
        {allQuestions.map((current, index) => {
          let currentClassName = "";
          currentClassName =
            current.attempted && current.submit
              ? "card m-1 text-center bg-success text-white fw-bold"
              : !current.attempted && !current.submit
              ? "card m-1 text-center bg-danger text-white fw-bold"
              : current.attempted && !current.submit
              ? "card m-1 text-center bg-warning text-white fw-bold"
              : "";

          return (
            <div
              key={index}
              className={currentClassName}
              style={{
                display: "flex",
                justifyContent: "center",
                width: "30px",
                height: "30px",
              }}
              onClick={() => questionHandler(index)}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
      <div className="fixed-bottom p-2 bg-white">
        <div className="row">
          <div className="col">
            <MdOutlineRadioButtonChecked className="text-success" /> solved{" "}
          </div>
          <div className="col">
            <MdOutlineRadioButtonChecked className="text-warning" /> skipped{" "}
          </div>
          <div className="col">
            <MdOutlineRadioButtonChecked className="text-danger" /> not visited{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuestionSelector;
