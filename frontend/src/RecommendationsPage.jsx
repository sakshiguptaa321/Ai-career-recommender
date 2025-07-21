import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  auth,
  db,
  doc,
  provider,
  setDoc,
  signInWithPopup,
  signOut,
} from "./firebase";

  const location = useLocation();
  const { skills, recommendations } = location.state || {};
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Render chart and save recommendations if logged in
  useEffect(() => {
    if (!recommendations) return;

    const ctx = document.getElementById("careerChart");
    if (ctx) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(recommendations),
          datasets: [
            {
              label: "Match Score",
              data: Object.values(recommendations),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
          ],
        },
        options: {
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }

    if (user) {
      const saveData = async () => {
        setSaving(true);
        try {
          const recId = Date.now();
          await setDoc(
            doc(db, "users", user.uid, "recommendations", recId.toString()),
            {
              skills,
              recommendations,
              createdAt: new Date().toISOString(),
            }
          );
        } catch {
          // Optionally handle error
        }
        setSaving(false);
      };
      saveData();
    }
  }, [recommendations, user, skills]);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch {
      // Optionally handle error
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch {
      // Optionally handle error
    }
  };

  return (
    <div className="p-6 text-center bg-white dark:bg-gray-900 min-h-screen transition-colors">
      <div className="flex justify-between items-center mb-4">
        <div>
          <a href="/history" className="text-indigo-600 dark:text-indigo-300 underline hover:text-indigo-800">My History</a>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode((d) => !d)}
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
          {user ? (
            <div>
              <span className="mr-2">Hello, {user.displayName}</span>
              <button
                onClick={handleSignOut}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </div>
      <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300 mb-4">
        Career Recommendations
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-200">
        Based on your skills: <strong>{skills}</strong>
      </p>

      {recommendations ? (
        <>
          <div className="max-w-xl mx-auto">
            <canvas id="careerChart"></canvas>
            {user && (
              <p className="mt-2 text-green-600 dark:text-green-400 text-sm">
                {saving ? "Saving to your history..." : "Saved to your history!"}
              </p>
            )}
          </div>
          {/* Dynamic Career Roadmap Generator */}
          <CareerRoadmap recommendations={recommendations} />
        </>
      ) : (
        <p>Loading recommendations...</p>
      )}
    </div>
  );
}



const ROADMAPS = {
  'Data Scientist': {
    timeline: [
      { month: 'Month 1', skills: ['Python', 'Pandas', 'Numpy'], resources: [
        { name: 'Python for Everybody (Coursera)', url: 'https://www.coursera.org/specializations/python' },
        { name: 'Kaggle Python Course', url: 'https://www.kaggle.com/learn/python' },
      ] },
      { month: 'Month 2', skills: ['Data Visualization', 'Matplotlib', 'Seaborn'], resources: [
        { name: 'Data Visualization with Python (Coursera)', url: 'https://www.coursera.org/learn/python-for-data-visualization' },
      ] },
      { month: 'Month 3', skills: ['Machine Learning Basics', 'scikit-learn'], resources: [
        { name: 'Intro to ML (YouTube)', url: 'https://www.youtube.com/watch?v=Gv9_4yMHFhI' },
      ] },
    ]
  },
  'Frontend Developer': {
    timeline: [
      { month: 'Month 1', skills: ['HTML', 'CSS', 'JavaScript'], resources: [
        { name: 'freeCodeCamp Responsive Web Design', url: 'https://www.freecodecamp.org/learn/' },
      ] },
      { month: 'Month 2', skills: ['React', 'Vite'], resources: [
        { name: 'React Docs', url: 'https://react.dev/learn' },
        { name: 'Vite Guide', url: 'https://vitejs.dev/guide/' },
      ] },
      { month: 'Month 3', skills: ['State Management', 'APIs'], resources: [
        { name: 'Redux Essentials', url: 'https://redux.js.org/tutorials/essentials/part-1-overview-concepts' },
      ] },
    ]
  },
  // Add more careers as needed
};

function CareerRoadmap({ recommendations }) {
  // Pick the top recommended career
  const topCareer = Object.entries(recommendations)
    .sort((a, b) => b[1] - a[1])[0]?.[0];
  const roadmap = ROADMAPS[topCareer];
  if (!topCareer || !roadmap) return null;
  return (
    <div className="mt-10 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">{topCareer} Roadmap (3 Months)</h3>
      <ol className="space-y-6">
        {roadmap.timeline.map((step, idx) => (
          <li key={idx} className="border-l-4 border-indigo-400 pl-4">
            <div className="font-semibold text-indigo-700 dark:text-indigo-300 mb-1">{step.month}</div>
            <div className="mb-1">
              <span className="font-semibold">Skills:</span> {step.skills.join(", ")}
            </div>
            <div>
              <span className="font-semibold">Resources:</span>
              <ul className="list-disc list-inside ml-4">
                {step.resources.map((res) => (
                  <li key={res.url}>
                    <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-300 underline">{res.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default RecommendationsPage;
