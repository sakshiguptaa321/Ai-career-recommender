import { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import RecommendationsPage from "./RecommendationsPage";

function LandingPage() {
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const navigate = useNavigate();

  const handleRecommend = async () => {
    setLoading(true);
    const skillList = skills
      .split(/[, ]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    // Call the improved backend for career recommendations
    const result = await import("./api").then(({ getCareerRecommendations }) =>
      getCareerRecommendations({ skills: skillList })
    );
    setRecommendations(result);
    setLoading(false);
    navigate("/recommendations", {
      state: { skills: skillList.join(", "), recommendations: result },
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <main className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-2 flex items-center gap-2">
          <span role="img" aria-label="rocket">
            🚀
          </span>{" "}
          AI Career Recommender
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
          Enter your skills and get personalized tech career suggestions with
          growth paths, tools, and opportunities!
        </p>
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl flex flex-col gap-4">
          <label className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
            <span role="img" aria-label="tools">
              🛠️
            </span>{" "}
            Enter your skills (comma or space separated):
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="e.g. python, html, sql"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 font-semibold mt-2"
            onClick={handleRecommend}
            disabled={loading || !skills.trim()}
          >
            Recommend Careers
          </button>
        </div>
        <section className="w-full mt-16 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center gap-2">
            <span role="img" aria-label="search">
              🔍
            </span>{" "}
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl justify-center">
            <div className="bg-white rounded-lg shadow p-6 flex-1 text-center">
              <h3 className="font-bold text-lg text-purple-700 mb-2">
                1. Analyze Your Skills
              </h3>
              <p className="text-gray-600">
                Enter your current skills and we’ll analyze your fit for various
                tech roles.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex-1 text-center">
              <h3 className="font-bold text-lg text-purple-700 mb-2">
                2. Recommend Careers
              </h3>
              <p className="text-gray-600">
                We’ll show career options with score, required tools, and salary
                insights.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex-1 text-center">
              <h3 className="font-bold text-lg text-purple-700 mb-2">
                3. Guide Your Growth
              </h3>
              <p className="text-gray-600">
                Get curated roadmaps, free resources, and downloadable insights
                to grow faster.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm bg-transparent">
        Made with <span className="text-red-500">♥</span> by Sakshi Gupta ·{" "}
        <a
          href="https://github.com/"
          className="underline hover:text-purple-700"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
      </Routes>
    </Router>
  );
}
