import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Safely parse user data from local storage
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-blue-200 p-6">
      <h1 className="text-4xl font-bold mb-8 text-blue-800 drop-shadow-lg">
        Dashboard
      </h1>
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
        {/* See Report Section (Visible to both roles) */}
        <div className="p-8 bg-white shadow-xl rounded-2xl text-center transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl w-80">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            📊 See Report
          </h2>
          <p className="text-gray-600 mb-4">
            View your progress and performance reports.
          </p>
          <button 
           onClick={() => navigate("/report")}
          className="bg-blue-500 text-black py-2 px-6 rounded-full hover:bg-blue-600 transition-all">
            View Report
          </button>
        </div>

        {/* Attempt Assessment Section (Visible to Learner only) */}
        {user.role === "learner" && (
          <div className="p-8 bg-white shadow-xl rounded-2xl text-center transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl w-80">
            <h2 
             
             className="text-2xl font-semibold mb-4 text-green-700">
              📝 Attempt Assessment
            </h2>
            <p className="text-gray-600 mb-4">
              Take a new assessment to test your skills.
            </p>
            <button
              onClick={() => navigate("/instructions")}
              className="bg-green-500 text-black py-2 px-6 rounded-full hover:bg-green-600 transition-all"
            >
              Start Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
