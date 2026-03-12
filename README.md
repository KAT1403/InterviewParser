# Interview Parser UI (Frontend)

React-based client for the Interview Parser AI system. This repository handles the interactive interview flow, audio stream processing, and technical evaluation dashboards.

## Architecture

The application is built on **React 18** and **TypeScript**, compiled for both web and desktop environments.

## Core Technical Implementations

### 1. Audio Processing & VAD
The client manages the full recording lifecycle without manual stop triggers by implementing a **Voice Activity Detection (VAD)** algorithm:
* **Analysis**: Utilizes the `Web Audio API` and `AnalyserNode` to monitor real-time frequency data .
* **Logic**: Calculates root-mean-square (RMS) volume and triggers `mediaRecorder.stop()` after a 5000ms period of silence.
* **Visualization**: Renders a live frequency spectrum via HTML5 Canvas during active recording.

### 2. Binary Data Management
To ensure compatibility with the backend transcription engine (OpenAI Whisper):
* **MIME Detection**: Implements a helper to detect MIME types by inspecting **magic bytes** (binary signatures) rather than file extensions.
* **Transmission**: Chunks recorded audio into Blobs, converts them to Base64, and transmits them via the `AnswerMockInterviewQA` method].
* **Caching**: Supports exponential backoff for audio object retrieval to handle transient API errors.

### 3. Interview State Machine
The interview flow is managed through a centralized state machine:
* **Session Lifecycle**: Tracks states from `pending` (question generation) to `running` and `finished` (analysis complete).
* **Polling Logic**: Executes a 5-second interval status check to synchronize the UI with the backend's asynchronous AI processing.

## Tech Stack

* **Framework**: React 18
* **Language**: TypeScript (Strict)
* **API Communication**: Wails Go-bindings / Fetch API
* **Build Tool**: Vite / Wails CLI
* **Audio**: Web Audio API / MediaRecorder API

## Project Structure

* `src/components`: UI modules including VoiceInterview, Analytics, and Profile.
* `src/services`: Integration layer for backend API endpoints and Wails methods.
* src/utils`: Binary processing, MIME sniffing, and retry logic.

## Deployment & Build

1. Install dependencies:
   ```bash
   cd "YOUR PATH"
   npm install
   npm run dev
   
## Author: Spectr123(KAT)
