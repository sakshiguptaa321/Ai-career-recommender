import { useEffect, useState } from "react";
import {
  auth,
  db,
  collection,
  getDocs,
  signOut,
} from "./firebase";

  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) {
        setHistory([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const recsRef = collection(db, "users", user.uid, "recommendations");
        const snapshot = await getDocs(recsRef);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        data.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
        setHistory(data);
      } catch {
        setHistory([]);
      }
      setLoading(false);
    };
    fetchHistory();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch {}
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-900 min-h-screen transition-colors">
      <div className="flex justify-between items-center mb-4">
        <div>
          <a href="/recommendations" className="text-indigo-600 dark:text-indigo-300 underline hover:text-indigo-800">Back to Recommendations</a>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode((d) => !d)}
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
          {user && (
            <div>
              <span className="mr-2">Hello, {user.displayName}</span>
              <button
                onClick={handleSignOut}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
      <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300 mb-4">My Recommendation History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : !user ? (
        <p className="text-gray-600 dark:text-gray-300">Please sign in to view your history.</p>
      ) : history.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No history found.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item) => (
            <li key={item.id} className="border rounded p-4 bg-white dark:bg-gray-800 shadow">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{new Date(item.createdAt).toLocaleString()}</div>
              <div className="mb-2">
                <span className="font-semibold">Skills:</span> {item.skills}
              </div>
              <div>
                <span className="font-semibold">Recommendations:</span>
                <ul className="list-disc list-inside ml-4">
                  {item.recommendations &&
                    Object.entries(item.recommendations).map(([career, score]) => (
                      <li key={career}>
                        {career}: <span className="text-indigo-600 dark:text-indigo-300 font-bold">{score}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyHistoryPage;
