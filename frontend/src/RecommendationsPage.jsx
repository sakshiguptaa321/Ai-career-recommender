import { useLocation } from "react-router-dom";

export default function RecommendationsPage() {
  const location = useLocation();
  const { skills, recommendations } = location.state || {};

  // Support both single and multiple recommendations
  const recs = recommendations?.recommendations || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-8 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-800 flex items-center gap-2">
            <span role="img" aria-label="search">
              🔍
            </span>{" "}
            Career Recommendations
          </h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold">
            Download as PDF
          </button>
        </div>
        <p className="text-gray-600 mb-4">
          Based on your skills:{" "}
          <span className="font-semibold text-purple-700">{skills}</span>
        </p>
        {recs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 text-center text-gray-500">
            No recommendations found.
          </div>
        ) : (
          recs.map((rec, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {rec.role}
              </h2>
              <p className="mb-1">
                <span className="font-semibold">Salary:</span> {rec.salary}
              </p>
              {rec.companies && (
                <p className="mb-1">
                  <span className="font-semibold">Top Companies:</span>{" "}
                  {rec.companies.join(", ")}
                </p>
              )}
              <div className="flex gap-2 mb-2">
                {rec.matchedSkills && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1 text-sm">
                    <span role="img" aria-label="check">
                      ✔️
                    </span>{" "}
                    Matched Skills:{" "}
                    <span className="font-semibold">
                      {rec.matchedSkills.join(", ")}
                    </span>
                  </span>
                )}
                {rec.unmatchedSkills && (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded flex items-center gap-1 text-sm">
                    <span role="img" aria-label="cross">
                      ❌
                    </span>{" "}
                    Unmatched Skills:{" "}
                    <span className="font-semibold">
                      {rec.unmatchedSkills.join(", ")}
                    </span>
                  </span>
                )}
              </div>
              {rec.matchScore && (
                <div className="mb-2">
                  Match Score:{" "}
                  <span className="font-semibold">{rec.matchScore}%</span>
                </div>
              )}
              {rec.tools && (
                <div className="mb-2">
                  <span className="font-semibold">Tools:</span>{" "}
                  {rec.tools.join(", ")}
                </div>
              )}
              {rec.roadmap && (
                <div className="mb-2 flex gap-4">
                  <a href={rec.roadmap} className="text-blue-600 underline">
                    Roadmap: <span className="font-semibold">View</span>
                  </a>
                </div>
              )}
              {rec.courses && (
                <div className="mb-2 flex gap-4">
                  <a href={rec.courses} className="text-blue-600 underline">
                    Courses: <span className="font-semibold">Watch</span>
                  </a>
                </div>
              )}
              {rec.insight && (
                <div className="bg-indigo-50 rounded p-4 mt-4">
                  <h3 className="font-bold text-indigo-700 mb-1 flex items-center gap-1">
                    <span role="img" aria-label="insight">
                      💡
                    </span>{" "}
                    Career Insight
                  </h3>
                  <p className="mb-2 text-gray-700">
                    <span className="font-semibold">Overview:</span>{" "}
                    {rec.insight.overview}
                  </p>
                  {rec.insight.advantages && (
                    <div className="mb-2">
                      <span className="font-semibold text-green-700">
                        Advantages:
                      </span>
                      <ul className="list-disc ml-6 text-gray-700">
                        {rec.insight.advantages.map((adv, i) => (
                          <li key={i}>{adv}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {rec.insight.challenges && (
                    <div className="mb-2">
                      <span className="font-semibold text-red-700">
                        Challenges:
                      </span>
                      <ul className="list-disc ml-6 text-gray-700">
                        {rec.insight.challenges.map((ch, i) => (
                          <li key={i}>{ch}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {rec.insight.careerPath && (
                    <div>
                      <span className="font-semibold">Career Path:</span>{" "}
                      {rec.insight.careerPath}
                    </div>
                  )}
                </div>
              )}
              {/* Skill Match Chart */}
              {rec.matchScore && (
                <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">
                    Skill Match Comparison
                  </h2>
                  <div className="w-full h-64 flex items-end">
                    <div
                      className="bg-purple-400 w-1/2 rounded-t-lg mx-auto flex flex-col items-center justify-end"
                      style={{ height: `${rec.matchScore}%` }}
                    >
                      <span className="text-purple-700 font-semibold">
                        Match Score (%)
                      </span>
                    </div>
                  </div>
                  <div className="text-center mt-2 text-gray-600">
                    {rec.role}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
