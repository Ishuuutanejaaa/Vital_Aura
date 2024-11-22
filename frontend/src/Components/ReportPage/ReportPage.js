import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ReportPage/ReportPage.css';

const ReportPage = () => {
    const [file, setFile] = useState(null);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fileTypeIcons = {
        pdf: "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg",
        doc: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Word_icon.svg",
        docx: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Word_icon.svg",
        txt: "https://upload.wikimedia.org/wikipedia/commons/8/89/Text_icon.svg",
        default: "https://upload.wikimedia.org/wikipedia/commons/6/65/File_icon.svg",
    };

    const getFileIcon = (filename) => {
        if (!filename) return fileTypeIcons.default; // Fallback for missing filename
        const extension = filename.split('.').pop().toLowerCase();
        return fileTypeIcons[extension] || fileTypeIcons.default;
    };

    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost:5000/files');
                setReports(response.data.files || []);
            } catch (err) {
                console.error('Error fetching files:', err);
                setError('Failed to fetch files. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                setReports((prev) => [...prev, response.data.filename]);
                setFile(null);
                document.querySelector('input[type="file"]').value = ''; // Clear file input
            }
        } catch (err) {
            console.error('Error uploading file:', err);
            setError(`Error: ${err.response?.data?.message || 'File upload failed.'}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (filename) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.delete(`http://localhost:5000/remove/${filename}`);
            if (response.status === 200) {
                setReports((prev) => prev.filter((file) => file !== filename));
            }
        } catch (err) {
            console.error('Error deleting file:', err);
            setError(`Error: ${err.response?.data?.message || 'File deletion failed.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reportpage-background">
            <div className="reportpage-container">
                <h1 className="reportpage-title">Report Management</h1>

                {error && <div className="reportpage-error">{error}</div>}

                <div className="reportpage-file-upload">
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept=".pdf,.doc,.docx,.txt"
                        className="reportpage-file-input"
                    />
                    <button
                        className="reportpage-upload-button"
                        onClick={handleUpload}
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>

                {loading && <div className="reportpage-loading">Loading...</div>}

                <ul className="reportpage-file-list">
                    {reports.map((filename) => (
                        <li className="reportpage-file-item" key={filename}>
                            <span className="reportpage-file-details">
                                <img
                                    src={getFileIcon(filename)}
                                    alt={`${filename} icon`}
                                    className="reportpage-file-icon"
                                />
                                {filename || 'Unnamed File'}
                            </span>
                            <button
                                className="reportpage-delete-button"
                                onClick={() => handleDelete(filename)}
                                disabled={loading}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>

                {reports.length === 0 && !loading && (
                    <div className="reportpage-no-files">No files available.</div>
                )}
            </div>
        </div>
    );
};

export default ReportPage;



