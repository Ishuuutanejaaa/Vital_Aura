import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReportPage.css';

const ReportPage = () => {
    const [file, setFile] = useState(null);
    const [reports, setReports] = useState([]);

    const fileTypeIcons = {
        pdf: "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg",
        doc: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Word_icon.svg",
        docx: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Word_icon.svg",
        txt: "https://upload.wikimedia.org/wikipedia/commons/8/89/Text_icon.svg",
        default: "https://upload.wikimedia.org/wikipedia/commons/6/65/File_icon.svg",
    };

    const getFileIcon = (filename) => {
        const extension = filename.split('.').pop().toLowerCase();
        return fileTypeIcons[extension] || fileTypeIcons.default;
    };

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/files');
                setReports(response.data.files);
            } catch (err) {
                console.error('Error fetching files:', err);
            }
        };
        fetchFiles();
    }, []);

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file to upload');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData);
            setReports((prev) => [...prev, response.data.file.filename]);
            setFile(null);
        } catch (err) {
            console.error('Error uploading file:', err);
        }
    };

    const handleDelete = async (filename) => {
        try {
            await axios.delete(`http://localhost:5000/remove/${filename}`);
            setReports((prev) => prev.filter((file) => file !== filename));
        } catch (err) {
            console.error('Error deleting file:', err);
        }
    };

    return (
        <div className="container">
            <h1>Report Management</h1>
            <div className="file-upload">
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept=".pdf,.doc,.docx,.txt"
                />
                <button onClick={handleUpload}>Upload</button>
            </div>

            <ul>
                {reports.map((filename) => (
                    <li key={filename}>
                        <span>
                            <img
                                src={getFileIcon(filename)}
                                alt={`${filename} icon`}
                                className="file-icon"
                            />
                            {filename}
                        </span>
                        <button onClick={() => handleDelete(filename)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportPage;