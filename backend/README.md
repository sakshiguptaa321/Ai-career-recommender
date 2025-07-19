# Career Recommender Backend

A simple FastAPI backend for analyzing skills, recommending careers, and providing growth guides.

## Features

- Analyze user skills
- Recommend careers with scores, tools, and salary insights
- Guide growth with roadmaps and resources

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
2. Activate the environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn
   ```
4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

## API Endpoints

- `/analyze-skills` - Analyze user skills
- `/recommend-careers` - Get career recommendations
- `/growth-guides` - Get growth roadmaps and resources
