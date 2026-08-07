import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import * as resumeService from "../../services/resume.services.js";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const validateAndSetFile = (file) => {
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      setSelectedFile(null);
      setError("Only PDF, DOC and DOCX files are allowed.");
      return;
    }
    setError("");
    setSelectedFile(file);
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    validateAndSetFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSetFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);
      const data = await resumeService.uploadResume(formData);
      navigate(`/analysis/${data.analysis._id}`);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Upload Resume
        </h1>
        <p className="mt-2 text-slate-600">
          Upload your resume to receive AI-powered feedback and suggestions.
        </p>
      </div>

      <Card className="max-w-2xl space-y-4">
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            rounded-xl border-2 border-dashed
            p-6 sm:p-10 text-center
            transition-colors duration-200
            ${isDragging ? "border-violet-400 bg-violet-50" : "border-slate-300"}
          `}
        >
          <div className="text-5xl sm:text-6xl">📄</div>
          <h2 className="mt-4 text-lg sm:text-xl font-semibold text-slate-900">
            Drag & Drop Your Resume
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            or choose a file from your computer
          </p>

          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />

          <Button className="mt-6" onClick={handleChooseFile}>
            Choose File
          </Button>

          {selectedFile && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-2 text-sm">
              <span className="text-violet-700 font-medium truncate max-w-[200px] sm:max-w-xs">
                {selectedFile.name}
              </span>
              <span className="text-violet-400">·</span>
              <span className="text-violet-500">{formatSize(selectedFile.size)}</span>
            </div>
          )}

          <p className="mt-6 text-xs sm:text-sm text-slate-500">
            Supported formats: PDF, DOC, DOCX
          </p>
        </div>
      </Card>

      {selectedFile && (
        <Button
          onClick={handleUpload}
          loading={uploading}
          loadingText="Uploading..."
          fullWidth={false}
        >
          Upload Resume
        </Button>
      )}
    </div>
  );
};

export default Upload;