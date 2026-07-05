import React, { useState } from "react";
import "./History.css";

const History = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "resume1.pdf",
      date: "2026-04-01",
      status: "Processed",
    },
    {
      id: 2,
      name: "report.docx",
      date: "2026-04-02",
      status: "Pending",
    },
    {
      id: 3,
      name: "data.csv",
      date: "2026-04-03",
      status: "Processed",
    },
  ]);

  const handleDelete = (id) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
  };

  const handleView = (file) => {
    alert(`Viewing file: ${file.name}`);
    // future: open modal / preview page
  };

  return (
    <div className="history-container">
      <h1>Upload History</h1>

      <div className="history-table">
        <div className="history-header">
          <span>File Name</span>
          <span>Date</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {files.map((file) => (
          <div key={file.id} className="history-row">
            <span>{file.name}</span>
            <span>{file.date}</span>
            <span
              className={
                file.status === "Processed"
                  ? "status success"
                  : "status pending"
              }
            >
              {file.status}
            </span>

            <span className="actions">
              <button
                className="view-btn"
                onClick={() => handleView(file)}
              >
                View
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(file.id)}
              >
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;