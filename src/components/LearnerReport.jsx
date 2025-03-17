import React, { useEffect, useState } from "react";
import axios from "axios";

const LearnerReport = () => {
  const userRole = JSON.parse(localStorage.getItem("user"));
  const [reports, setReports] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedReport, setEditedReport] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const apiUrl =
          userRole.role === "learner"
            ? `${process.env.REACT_APP_API_URL}/assessments/get/2`
            : `${process.env.REACT_APP_API_URL}/assessments/get`;

        const response = await axios.get(apiUrl);
        console.log(response)
        setReports(Array.isArray(response.data) ? response.data :[response.data]);
      } catch (error) {
        console.log("Error fetching reports:", error);
      }
    })();
  }, []);

  console.log(reports)

  const handleEdit = (report) => {
    setEditingId(report.id);
    setEditedReport({ ...report });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedReport({ ...editedReport, [name]: value });
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/assessments/update/${id}`,
        editedReport
      );

      if (response.status === 200) {
        const updatedReports = reports.map((r) =>
          r.id === id ? { ...r, ...editedReport } : r
        );
        setReports(updatedReports);
        setEditingId(null);
        console.log("Report updated successfully!");
      }
    } catch (error) {
      console.log("Error updating report:", error);
    }
  };

  const publishReportHandler = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/assessments/publish/${id}`
      );

      if (response.status === 200) {
        const updatedReports = reports.map((report) =>
          report.id === id ? { ...report, published: true } : report
        );
        setReports(updatedReports);
        console.log("Report published successfully!");
      }
    } catch (error) {
      console.error("Failed to publish report:", error);
    }
  };

  console.log(reports)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-blue-200 p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-800 drop-shadow-lg">
        📊 Learner Reports
      </h1>
      {reports.length === 0 ? (
        <div className="p-8 bg-white shadow-xl rounded-2xl text-center w-96">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No Reports Found 🛑
          </h2>
          <p className="text-gray-500">
            Looks like no assessments have been completed yet.
          </p>
        </div>
      ) : userRole.role === "learner" ? (
        <div className="p-8 bg-white shadow-xl rounded-2xl text-center w-96 transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Your Report 🎉
          </h2>
          {reports.map((report) => (
            <div key={report.id} className="text-left mb-4">
              <p className="text-gray-600 mb-1">
                <strong>Name:</strong> {report.User.name}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Email:</strong> {report.User.email}
              </p>
              <p className="text-green-700 font-semibold">
                ✅ {report.correct} Correct
              </p>
              <p className="text-red-600 font-semibold">
                ❌ {report.unattempted} Unattempted
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 bg-white shadow-xl rounded-2xl text-center w-96">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Admin Report List 🛠️
          </h2>
          {reports?.map((report) => (
            <div key={report.id} className="border-b pb-4 mb-4">
              {editingId === report.id ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="number"
                    name="correct"
                    value={editedReport.correct}
                    onChange={handleInputChange}
                    className="p-2 border rounded outline-none"
                  />

                  <input
                    type="number"
                    name="unattempted"
                    value={editedReport.unattempted}
                    onChange={handleInputChange}
                    className="p-2 border rounded outline-none"
                  />

                  <button
                    onClick={() => handleSave(report.id)}
                    className="bg-green-600 hover:bg-green-700 text-gray-100 font-semibold py-1 px-3 rounded shadow-md"
                  >
                    💾 Save
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <p>
                    <strong>{report.User.name}</strong> ({report.User.email})
                  </p>
                  <p>
                    ✅ Correct: {report.correct} | ❌ Unattempted:{" "}
                    {report.unattempted}
                  </p>
                  <button
                    onClick={() => handleEdit(report)}
                    className="bg-blue-600 hover:bg-blue-700 text-gray-100 font-semibold py-1 px-3 rounded shadow-md"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => publishReportHandler(report.user_id)}
                    className="bg-blue-600 hover:bg-blue-700 text-gray-100 font-semibold py-1 px-3 rounded shadow-md"
                  >
                    🚀 Publish
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearnerReport;
