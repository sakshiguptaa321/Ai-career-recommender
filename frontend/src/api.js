// This file provides API utility functions to connect the React frontend to the FastAPI backend.

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function getCareerRecommendations(profile) {
  const response = await fetch(`${API_BASE_URL}/recommend-careers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  return response.json();
}
