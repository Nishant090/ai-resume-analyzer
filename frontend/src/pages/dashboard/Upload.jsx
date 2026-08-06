import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import * as resumeService from "../../services/resume.services.js";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setSelectedFile(null);
      setError("Only PDF, DOC and DOCX files are allowed.");
      return;
    }
    setError("");
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);
      await resumeService.uploadResume(formData);
      navigate("/analysis");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Upload Resume</h1>
      <p className="mt-2 text-slate-600 max-w-md">
        Upload your resume to receive AI-powered feedback and suggestions.
      </p>
      <Card>
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <div className="rounded-xl border-2 border-dashed border-slate-300 p-10 text-center">
          <div className="text-6xl">📄</div>
          <h2 className="mt-4 text-xl font-semibold">
            Drag & Drop Your Resume
          </h2>

          <p className="mt-2 text-slate-500">
            or choose a file from your computer
          </p>
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
          <Button fullWidth={false} onClick={handleChooseFile}>
            Choose File
          </Button>
          {selectedFile && (
            <p className="mt-4 text-sm font-medium text-green-600">
              Selected: {selectedFile.name}
            </p>
          )}
          <p className="mt-6 text-sm text-slate-500">
            Supported formats: PDF, DOC, DOCX
          </p>
        </div>
      </Card>
      {selectedFile && (
        <Button
          onClick={handleUpload}
          loading={uploading}
          loadingText="Uploading....."
          fullWidth={false}
        >
          Upload resume
        </Button>
      )}
    </div>
  );
};

export default Upload;
