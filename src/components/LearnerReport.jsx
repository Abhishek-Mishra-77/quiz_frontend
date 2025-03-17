import React, { useState } from "react";

const LearnerReport = () => {
  const userRole = JSON.parse(localStorage.getItem("user"));

  const [report, setReport] = useState({
    name: "Abhishek Mishra",
    email: "abhishek@gmail.com",
    submitted: 5,
    skipped: 1,
    unattempted: 5,
  });

  const totalQuestions = report.submitted + report.skipped + report.unattempted;
  const score = ((report.submitted / totalQuestions) * 100).toFixed(1);
  const performance = score >= 60 ? "Good 😊" : "Needs Improvement 😅";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handlePublish = () => {
    alert("Report published successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-blue-200 p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-800 drop-shadow-lg">
        📊 Learner Report
      </h1>

      {totalQuestions === 0 ? (
        <div className="p-8 bg-white shadow-xl rounded-2xl text-center w-96">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No Report Found 🛑
          </h2>
          <p className="text-gray-500">
            Looks like you haven’t completed any assessments yet.
          </p>
        </div>
      ) : userRole.role === "learner" ? (
        <div className="p-8 bg-white shadow-xl rounded-2xl text-center w-96 transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Submission Successful 🎉
          </h2>
          <p className="text-gray-600 mb-2">
            <strong>Name:</strong> {report.name}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> {report.email}
          </p>
          <p className="text-green-700 font-semibold mb-1">
            ✅ {report.submitted} Questions Submitted
          </p>
          <p className="text-yellow-600 font-semibold mb-1">
            ⚠️ {report.skipped} Questions Skipped
          </p>
          <p className="text-red-600 font-semibold mb-4">
            ❌ {report.unattempted} Questions Unattempted
          </p>

          <h3
            className={`text-xl font-bold ${
              score >= 60 ? "text-green-500" : "text-red-500"
            }`}
          >
            Score: {score}% — {performance}
          </h3>
        </div>
      ) : (
        <div className="p-8 bg-white shadow-xl rounded-2xl text-center w-96">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Edit Report (Admin Mode) 🛠️
          </h2>

          <div className="flex flex-col gap-4 mb-4">
            {[
              { label: "Name", type: "text", name: "name", color: "gray" },
              { label: "Email", type: "email", name: "email", color: "gray" },
              {
                label: "Questions Submitted",
                type: "number",
                name: "submitted",
                color: "green",
              },
              {
                label: "Questions Skipped",
                type: "number",
                name: "skipped",
                color: "yellow",
              },
              {
                label: "Questions Unattempted",
                type: "number",
                name: "unattempted",
                color: "red",
              },
            ].map((input, index) => (
              <div key={index} className="flex flex-col text-left">
                <label className="text-gray-700 font-semibold mb-1">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  name={input.name}
                  value={report[input.name]}
                  onChange={handleInputChange}
                  className={`p-2 border border-${input.color}-300 rounded focus:ring-2 focus:ring-${input.color}-500 outline-none`}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handlePublish}
            className="bg-blue-600 hover:bg-blue-700 text-gray-100 font-semibold py-2 px-4 rounded shadow-md transition-all duration-300"
          >
            🚀 Publish Report
          </button>
        </div>
      )}
    </div>
  );
};

export default LearnerReport;
