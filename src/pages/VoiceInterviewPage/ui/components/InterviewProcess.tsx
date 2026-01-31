import React, { useState, useEffect, useRef } from "react";
import { interviewApi } from "@/entities/interview/api/interviewApi";
import { filesApi } from "@/shared/api/filesApi";
import { type MockInterviewQA } from "@/shared/api";
import styles from "./InterviewProcess.module.scss";

interface InterviewProcessProps {
  interviewId: number;
  onFinish: () => void;
}

export const InterviewProcess: React.FC<InterviewProcessProps> = ({
  interviewId,
  onFinish,
}) => {
  const [questions, setQuestions] = useState<MockInterviewQA[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [transcription, setTranscription] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const finishIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
      if (finishIntervalRef.current) clearInterval(finishIntervalRef.current);
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    };
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await interviewApi.getMockInterviewQA(interviewId);
        if (data && data.length > 0) {
          setQuestions(data);
          setLoadingQuestions(false);
          if (pollingIntervalRef.current)
            clearInterval(pollingIntervalRef.current);
        }
      } catch (error) {
        console.error("Polling questions failed", error);
      }
    };

    fetchQuestions();
    pollingIntervalRef.current = setInterval(fetchQuestions, 5000);

    return () => {
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    };
  }, [interviewId]);

  useEffect(() => {
    if (loadingQuestions) return;

    if (currentQuestionIndex < questions.length) {
      const loadQuestionAudio = async () => {
        const question = questions[currentQuestionIndex];
        if (audioUrlRef.current) {
          URL.revokeObjectURL(audioUrlRef.current);
          audioUrlRef.current = null;
        }

        try {
          const blob = await filesApi.downloadFile(question.object_name);
          const url = URL.createObjectURL(blob);
          audioUrlRef.current = url;
          if (audioPlayerRef.current) {
            audioPlayerRef.current.src = url;
            audioPlayerRef.current.play().catch(() => {});
          }
        } catch (error) {
          console.error("Failed to download audio", error);
        }
      };

      loadQuestionAudio();
    }
  }, [currentQuestionIndex, loadingQuestions, questions]);

  useEffect(() => {
    if (loadingQuestions) return;

    if (currentQuestionIndex >= questions.length) {
      if (finishIntervalRef.current) return;

      const checkStatus = async () => {
        try {
          const interview = await interviewApi.getMockInterview(interviewId);
          if (interview.status === "finished") {
            if (finishIntervalRef.current)
              clearInterval(finishIntervalRef.current);
            onFinish();
          }
        } catch (error) {
          console.error("Check status failed", error);
        }
      };

      checkStatus();
      finishIntervalRef.current = setInterval(checkStatus, 5000);
    }
  }, [
    currentQuestionIndex,
    loadingQuestions,
    questions,
    interviewId,
    onFinish,
  ]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US"; 

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setTranscription(() => {
          return finalTranscript + interimTranscript;
        });
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
      };
    }
  }, []);

  const startRecording = async () => {
    try {
      setTranscription("");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = [];
        await submitAnswer(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current = recorder;
      recorder.start(250);
      setIsRecording(true);

      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (err) {
      console.error("Microphone access denied", err);
      alert("Microphone access is required.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const submitAnswer = async (blob: Blob) => {
    setIsProcessing(true);
    setTranscription("Processing answer...");
    try {
      if (questions[currentQuestionIndex]) {
        await interviewApi.answerMockInterviewQA({
          mockInterviewId: interviewId,
          qaId: questions[currentQuestionIndex].id,
          file: blob,
        });
        setCurrentQuestionIndex((prev) => prev + 1);
        setTranscription("");
      }
    } catch (error) {
      console.error("Failed to submit answer", error);
      alert("Error sending answer. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loadingQuestions) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <h3>Generating Interview Questions...</h3>
          <p>This may take a minute.</p>
        </div>
      </div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <h3>Interview Completed!</h3>
          <p>Analyzing your answers...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className={styles.container}>
      <div className={styles.connectionHeader}>
        <span>Connection: Active</span>
        <span>Session time: {formatTime(sessionTime)}</span>
      </div>

      <div className={styles.card}>
        <div className={styles.aiHeader}>
          <img src="/img/ChatGPT.png" alt="AI" className={styles.aiIcon} />
          <h2 className={styles.aiTitle}>AI Interviewer</h2>
        </div>

        <h3 className={styles.question}>{currentQ.question}</h3>

        <div className={styles.visualizerSection}>
          <div className={styles.visualizerLabel}>
            {isRecording
              ? "Listening..."
              : "Preparing to listen to your answer..."}
          </div>
          <div className={styles.waveform}>
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className={styles.bar}
                style={{
                  height: isRecording ? `${Math.random() * 30 + 4}px` : "4px",
                  animationDuration: `${0.2 + Math.random() * 0.3}s`,
                  opacity: isRecording ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          {isProcessing ? (
            <div className={styles.status}>Processing answer...</div>
          ) : (
            <button
              className={`${styles.recordBtn} ${isRecording ? styles.recording : ""}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? "Stop recording" : "Start recording"}
            </button>
          )}
        </div>

        <div className={styles.transcriptionSection}>
          <label className={styles.transcriptionLabel}>
            Your answer (transcribed):
          </label>
          <div className={styles.transcriptionBox}>{transcription}</div>
        </div>

        <div className={styles.footer}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>

      <audio ref={audioPlayerRef} controls style={{ display: "none" }} />
    </div>
  );
};
