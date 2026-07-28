# HireAI

HireAI is an AI-powered resume-to-job matching application that compares a candidate's PDF resume with a job description to generate a match score, skills analysis, resume improvement suggestions, interview questions, and an overall hiring recommendation.

Built with **React**, **Flask**, and **IBM watsonx.ai**.

> **Live Demo:** https://hirematch.hafsa-172001.workers.dev/

---

## Features

- Upload PDF resumes via drag-and-drop or file picker
- Compare resumes against job descriptions
- AI-generated match score (0–100)
- Matched and missing skills analysis
- Resume improvement suggestions
- Role-specific interview questions
- Overall hiring recommendation
- Retry failed AI analyses
- Responsive, modern UI

---

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

### Backend
- Python
- Flask
- LangChain
- IBM watsonx.ai
- pypdf

### Deployment
- Frontend: Cloudflare Pages
- Backend: Render

---

## Architecture

```text
User
   │
   ▼
React Frontend
   │
   ▼
Flask API
   │
   ├── Extract Resume Text
   ├── Send Resume + Job Description to watsonx.ai
   ▼
AI Analysis
   ▼
Frontend Results
```

---

## Project Structure

```text
hirematch-ai/
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```
---

## Run Locally

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python run.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API

**POST** `/analyze`

| Field | Type | Required |
|------|------|----------|
| `resume` | PDF File | ✅ |
| `job_description` | String | ✅ |
| `model` | String | Optional |

Example:

```bash
curl -X POST http://127.0.0.1:5000/analyze \
  -F "resume=@resume.pdf" \
  -F "job_description=Python Developer..."
```

---

## Deployment

### Backend (Render)

```text
Root: backend
Build: pip install -r requirements.txt
Start: gunicorn run:app
```

### Frontend (Cloudflare Pages)

```text
Root: frontend
Build: npm run build
Output: dist
```
---
