import React, { useState, useRef } from "react";
import { type DragEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { interviewApi } from "@/entities/interview/api/interviewApi";
import styles from "./FileUploader.module.scss";

interface FileUploaderProps {
  acceptedFormats?: string[];
}

type UploadState = "idle" | "selected" | "uploading" | "error";

export const FileUploader: React.FC<FileUploaderProps> = ({
  acceptedFormats = ["mp3", "wav", "m4a"],
}) => {
  const [state, setState] = useState<UploadState>("idle");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const validateFile = (file: File): boolean => {
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!extension || !acceptedFormats.includes(extension)) {
      setErrorMessage(`Only ${acceptedFormats.join(", ")} files are accepted`);
      setState("error");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      setState("selected");
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyse = async () => {
    if (!selectedFile) return;

    setState("uploading");
    try {
      const response = await interviewApi.uploadInterviewFile(selectedFile);
      const interviewId = response.interview_id || response.id;
      if (interviewId) {
        navigate(`/result/${interviewId}`);
      } else {
        throw new Error("Не получен ID интервью от сервера");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setState("error");
      setErrorMessage("Upload failed. Please try again.");
    }
  };

  if (state === "uploading") {
    return (
      <div className={styles.container}>
        <div className={styles.processing}>
          <div className={styles.spinner}></div>
          <p className={styles.processingText}>Processing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ""} ${state === "error" ? styles.error : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.map((f) => `.${f}`).join(",")}
          onChange={handleFileInputChange}
          className={styles.hiddenInput}
        />

        <div className={styles.uploadIcon}>
          <img src="/img/Upload.svg" alt="UploadIcon" />
        </div>

        <h2 className={styles.title}>
          {selectedFile
            ? selectedFile.name
            : "Select your file or drag and drop"}
        </h2>

        <p className={styles.subtitle}>
          {state === "error"
            ? errorMessage
            : `${acceptedFormats.join(", ")} accepted`}
        </p>

        <button
          type="button"
          className={styles.browseButton}
          onClick={(e) => {
            e.stopPropagation();
            if (state === "selected" && selectedFile) {
              handleAnalyse();
            } else {
              handleBrowseClick();
            }
          }}
        >
          {state === "selected" ? "Analyse" : "browse"}
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
