import { Route, Routes } from "react-router-dom";
import "./App.css";
import Instructions from "./components/instructions";
import Login from "./components/login ";
import TestScreen from "./components/testScreen";
import Dashboard from "./components/Dashboard";
import LearnerReport from "./components/LearnerReport";
import FinalSubmit from "./components/FinalSubmit";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Routes>
        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <>
              <div className="container-fluid bg-blue-500">
                <div className="text-white text-center p-2 fw-bold">
                  <h2>Dashboard</h2>
                </div>
              </div>
              <Dashboard />
            </>
          }
        ></Route>

        <Route
          path="/report"
          element={
            <>
              <div className="container-fluid bg-blue-500">
                <div className="text-white text-center p-2 fw-bold">
                  <h2>Report</h2>
                </div>
              </div>
              <LearnerReport />
            </>
          }
        ></Route>


        {/* Instructions Route */}
        <Route
          path="/instructions"
          element={
            <>
              <div className="container-fluid bg-yellow-500">
                <div className="text-white text-center p-2 fw-bold">
                  <h2>Online Assessment Tool</h2>
                </div>
              </div>
              <Instructions />
            </>
          }
        ></Route>

        {/* Test Screen Route */}
        <Route
          path="/test"
          element={
            <>
              <div className="container-fluid bg-yellow-500">
                <div className="text-white text-center p-2 fw-bold">
                  <h2>Online Assessment Tool</h2>
                </div>
              </div>
              <TestScreen />
            </>
          }
        ></Route>

        {/* Final Submit Route */}
        <Route
          exact
          path="/finalsubmit"
          element={<FinalSubmit />}
        ></Route>

        {/* Default Login Route */}
        <Route path="*" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
