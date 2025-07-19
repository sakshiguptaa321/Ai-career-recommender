# Neo Career Recommender

A full-stack application to help users discover tech careers based on their skills, get recommendations, and access growth guides.

## Features

- Analyze your skills
- Recommend careers with scores, tools, and salary insights
- Guide your growth with curated roadmaps and resources

## Structure

- **backend/**: FastAPI Python backend
- **frontend (root)**: Vite React frontend

## Getting Started

### Backend

1. Navigate to `backend/`
2. Create and activate a Python virtual environment
3. Install dependencies: `pip install fastapi uvicorn`
4. Run: `uvicorn main:app --reload`

### Frontend

1. Run `npm install` in the root directory
2. Start the dev server: `npm run dev`

## API Endpoints

- `POST /analyze-skills`
- `POST /recommend-careers`
- `GET /growth-guides`

---

For more details, see the `backend/README.md`.
