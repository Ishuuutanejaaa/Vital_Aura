import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ReportPage.css";

const ReportPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get("http://localhost:5000/files");
            setFileList(response.data.files);
        } catch (err) {
            console.error(err);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setError(""); // Clear any previous error
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setError("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            setLoading(true);
            await axios.post("http://localhost:5000/upload", formData);
            setLoading(false);
            setSelectedFile(null);
            fetchFiles(); // Refresh file list after upload
        } catch (err) {
            setLoading(false);
            setError("File upload failed. Please try again.");
        }
    };

    const handleFileDelete = async (filename) => {
        try {
            await axios.delete(`http://localhost:5000/remove/${filename}`);
            fetchFiles(); // Refresh file list after deletion
        } catch (err) {
            console.error(err);
            setError("File deletion failed.");
        }
    };

    const handleFileOpen = (filename) => {
        navigate(`/uploads/${filename}`);
    };

    return (
        <div className="reportpage-background">
            <div className="reportpage-container">
                <h2 className="reportpage-title">Report Management</h2>

                {error && <p className="reportpage-error">{error}</p>}

                <div className="reportpage-file-upload">
                    <input
                        type="file"
                        className="reportpage-file-input"
                        onChange={handleFileChange}
                    />
                    <button
                        className="reportpage-upload-button"
                        onClick={handleFileUpload}
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload File"}
                    </button>
                </div>

                <div className="reportpage-file-list">
                    {fileList.length > 0 ? (
                        fileList.map((file) => (
                            <div key={file} className="reportpage-file-item">
                                <div className="reportpage-file-details">
                                    <img
                                        src="/file-icon.png"
                                        alt="File Icon"
                                        className="reportpage-file-icon"
                                    />
                                    <span>{file}</span>
                                </div>

                                <div className="reportpage-buttons">
                                    <button
                                        className="reportpage-open-button"
                                        onClick={() => handleFileOpen(file)}
                                    >
                                        Open
                                    </button>
                                    <button
                                        className="reportpage-delete-button"
                                        onClick={() => handleFileDelete(file)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="reportpage-no-files">No files available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportPage;
