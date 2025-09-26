# Swipe Internship Assignment — AI-Powered Interview Assistant

## Overview
This React application serves as an **AI-powered interview assistant**. It provides a seamless experience for both interviewees (candidates) and interviewers (HR/Technical panel) with live chat, AI-generated questions, scoring, and progress tracking.  

The app consists of **two tabs**:  

1. **Interviewee (Chat)** — Candidates interact with the AI, upload resumes, answer timed questions, and receive real-time feedback.  
2. **Interviewer (Dashboard)** — View all candidates, their scores, chat history, and AI-generated summaries.

---

## Features

### 1. Resume Upload
- Accepts **PDF** (mandatory) and **DOCX** (optional).  
- Automatically extracts **Name, Email, Phone**.  
- If fields are missing, chatbot collects them before starting the interview.  

### 2. Interview Flow
- AI dynamically generates **6 questions** for Full Stack (React/Node) role:  
  - 2 Easy → 2 Medium → 2 Hard.  
- Questions appear **one at a time** with timers:  
  - Easy: 20s, Medium: 60s, Hard: 120s.  
- Automatic submission occurs when time runs out.  
- AI evaluates answers and calculates a **final score** with a **summary**.

### 3. Interviewee Tab
- Chat interface with questions, answers, timers, and progress bar.  
- Resume upload and missing field collection before interview.  

### 4. Interviewer Tab (Dashboard)
- List all candidates with **score and AI summary**.  
- Detailed candidate view: questions, answers, individual scores.  
- Search and sort functionality included.  

### 5. Persistence
- All **timers, answers, and progress** saved locally (Redux + redux-persist / IndexedDB).  
- Closing or refreshing the page restores the session.  
- Shows a **“Welcome Back” modal** for unfinished sessions.

---

## Tech Stack
- **Frontend:** React  
- **State Management & Persistence:** Redux, redux-persist  
- **UI Library:** Ant Design / shadcn / modern UI alternatives  
- **Optional:** AI APIs for dynamic question generation and answer evaluation  
- **File Parsing:** PDF and DOCX parsing libraries  

---

## Installation

```bash
# Clone the repository
git clone https://github.com/vasanth27s/swipe-.git

# Install dependencies
npm install

# Start the development server
npm run dev
