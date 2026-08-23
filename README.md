
<div align="center">

# 🤖 AiMentor

### AI-Powered Career Mentor for Learning, Resumes & Interviews

<p>
  <strong>Plan your career • Improve your resume • Practice interviews • Learn with AI</strong>
</p>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=for-the-badge&logo=google)

</div>

---


## Overview

AiMentor is designed for job seekers and career switchers who want a structured, personalized path to reach their goals. It brings together four core workflows in one experience:

- AI-generated career roadmaps
- Resume analysis and optimization guidance
- Mock interview question generation and answer evaluation
- Secure authentication and profile management

## ✨ Features

<table>
<tr>
<td width="50%">

### 🗺️ AI Career Roadmap

Generate a personalized month-by-month roadmap based on:

- Career goal
- Current skills
- Experience level
- Daily study hours
- Target timeline

</td>

<td width="50%">

### 📄 AI Resume Analyzer

Upload a PDF resume and receive AI-powered analysis including:

- ATS score
- Strengths
- Missing skills
- Weak areas
- Improvement suggestions
- Interview preparation

</td>
</tr>

<tr>
<td width="50%">

### 💬 AI Career Mentor

Chat with an AI career mentor for:

- Career guidance
- Skill-gap analysis
- Learning plans
- Job-search strategy
- Interview preparation

</td>

<td width="50%">

### 🎤 AI Mock Interview

Practice realistic interviews with:

- Role-specific questions
- AI-generated questions
- Voice-based answers
- Camera-based interview experience
- AI evaluation
- Score and feedback

</td>
</tr>
</table>



---

# 🛠️ Tech Stack

```markdown
## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| ⚛️ React 19 | User interface |
| ⚡ Vite | Frontend tooling |
| 🎨 Tailwind CSS | Styling |
| 🧭 React Router | Navigation |
| 🔄 React Query | Server state management |
| 🗃️ Zustand | Client state management |
| ✨ Framer Motion | UI animations |

### Backend

| Technology | Purpose |
|---|---|
| 🟢 Node.js | Runtime |
| 🚂 Express 5 | REST API |
| 🍃 MongoDB | Database |
| 🔗 Mongoose | MongoDB ODM |
| 🔐 JWT | Authentication |
| 🛡️ Helmet | Security headers |
| 🌐 CORS | Cross-origin configuration |
| 📁 Multer | Resume uploads |

### AI & Processing

| Technology | Purpose |
|---|---|
| 🤖 Google Gemini | AI generation and evaluation |
| 📄 PDF Parser | Resume text extraction |
| 🎤 Web Speech API | Voice interaction |
| 📹 MediaDevices API | Interview camera |


```
## Project Structure

```text

AiMentor/
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── server/
│   ├── src/
│   ├── package.json
│   └── .env.example (if added locally)
├── README.md

```
## 📸 Application Preview

<div align="center">

<img src="./screenshots/dashboard.png" width="48%" />
<img src="./screenshots/roadmap.png" width="48%" />

<br/>

<img src="./screenshots/chat.png" width="48%" />
<img src="./screenshots/resume.png" width="48%" />

<br/>

<img src="./screenshots/interview.png" width="70%" />

</div>

## Frontend Highlights

The frontend is a polished single-page application with route-based screens for:

- landing page
- login and registration
- dashboard
- profile
- AI chat
- roadmap generation
- resume review
- interview practice

The UI is designed to feel intuitive and supportive, focusing on clarity and professional job-search workflows.

## Backend Highlights

The backend exposes a REST API organized by feature area:

- /api/auth
- /api/users
- /api/ai
- /api/ai/chat
- /api/ai/resume
- /api/ai/interview

It includes:

- request validation
- JWT-protected routes
- centralized error handling
- MongoDB connectivity setup
- AI service integrations with Gemini

## API Workflow Overview

### Authentication
- Register a user
- Log in and receive a JWT token
- Access protected user and AI routes

### Career Guidance
- Submit career goals, skills, and timeline
- Receive a structured roadmap from the AI service

### Resume Review
- Upload a PDF resume
- Parse text content
- Analyze strengths and improvement opportunities with AI

### Interview Practice
- Select a target role
- Generate interview questions
- Submit answers for evaluation and feedback

## Security Notes

This project uses industry-standard protections such as:

- JWT-based user authentication
- environment-based secrets management
- CORS configuration
- Helmet security headers
- protected routes on the frontend

## Roadmap

Potential improvements for this project include:

- richer user analytics and progress tracking
- stronger resume scoring models
- conversation memory for AI sessions
- improved frontend UX patterns and onboarding
- deployment-ready Docker and CI/CD setup




## Author

Built as an AI-powered career mentor platform for professional growth and job readiness.
