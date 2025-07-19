from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

# Allow all origins for development; restrict in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class SkillInput(BaseModel):
    skills: List[str]

@app.post("/recommend-careers")
async def recommend_careers(data: SkillInput):
    # Enhanced recommendations based on input skills
    skill_to_career = {
        "react": {
            "role": "Frontend Developer",
            "score": 90,
            "tools": ["React", "Vite", "JavaScript"],
            "salary": "$80k-$120k",
            "jobs": [
                {"title": "React Developer", "company": "TechSoft", "location": "Remote", "link": "https://example.com/job/react-dev"},
                {"title": "Frontend Engineer", "company": "WebWorks", "location": "Bangalore", "link": "https://example.com/job/frontend-eng"}
            ]
        },
        "python": {
            "role": "Backend Developer",
            "score": 88,
            "tools": ["Python", "FastAPI", "SQL"],
            "salary": "$85k-$130k",
            "jobs": [
                {"title": "Python Backend Developer", "company": "DataCore", "location": "Remote", "link": "https://example.com/job/python-backend"},
                {"title": "API Engineer", "company": "CloudNet", "location": "Delhi", "link": "https://example.com/job/api-eng"}
            ]
        },
        "fastapi": {
            "role": "Backend Developer",
            "score": 85,
            "tools": ["Python", "FastAPI", "Docker"],
            "salary": "$85k-$130k",
            "jobs": [
                {"title": "FastAPI Developer", "company": "APISolutions", "location": "Remote", "link": "https://example.com/job/fastapi-dev"}
            ]
        },
        "vite": {
            "role": "Frontend Developer",
            "score": 80,
            "tools": ["Vite", "React", "JavaScript"],
            "salary": "$75k-$110k",
            "jobs": [
                {"title": "Vite Frontend Developer", "company": "SpeedyWeb", "location": "Remote", "link": "https://example.com/job/vite-dev"}
            ]
        }
    }

    input_skills = [skill.lower() for skill in data.skills]
    recommendations = []
    for skill in input_skills:
        if skill in skill_to_career:
            recommendations.append(skill_to_career[skill])

    # If no match, return generic roles
    if not recommendations:
        recommendations = [
            {"role": "Software Engineer", "score": 70, "tools": data.skills, "salary": "$60k-$100k", "jobs": []}
        ]
    return {"recommendations": recommendations}

@app.get("/growth-guides")
async def growth_guides():
    # Dummy guides
    guides = [
        {"role": "Frontend Developer", "roadmap": "Learn React, Vite, CSS", "resources": ["react.dev", "vitejs.dev"]},
        {"role": "Backend Developer", "roadmap": "Learn Python, FastAPI, Databases", "resources": ["fastapi.tiangolo.com", "realpython.com"]}
    ]
    return {"guides": guides}
