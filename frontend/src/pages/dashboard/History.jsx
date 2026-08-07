import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import * as analysisService from "../../services/analysis.services.js";

const scoreColor = (score) => {
  if (score >= 80) return "text-emerald-600 bg-emerald-50";
  if (score >= 50) return "text-amber-600 bg-amber-50";
  return "text-red-600 bg-red-50";
};

const History = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await analysisService.getAllAnalyses();
      setAnalyses(data.history || []);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await analysisService.deleteAnalysis(id);
      setAnalyses((prev) => prev.filter((a) => a._id !== id));
      setConfirmId(null);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to delete analysis.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Analysis History
        </h1>
        <p className="mt-2 text-slate-600">
          All your past resume analyses in one place.
        </p>
      </div>

      {loading ? (
        <Card className="max-w-none w-full">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-5xl animate-pulse">⏳</div>
            <p className="mt-3 text-sm text-slate-500">Loading history...</p>
          </div>
        </Card>
      ) : error ? (
        <Card className="max-w-none w-full">
          <div className="py-10 text-center">
            <div className="text-5xl">❌</div>
            <p className="mt-3 text-sm text-red-600">{error}</p>
          </div>
        </Card>
      ) : analyses.length === 0 ? (
        <Card className="max-w-none w-full">
          <div className="py-10 text-center">
            <div className="text-5xl">📚</div>
            <h2 className="mt-3 text-lg font-semibold text-slate-800">
              No analyses yet
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Upload a resume to see your history here.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {analyses.map((item) => (
            <Card
              key={item._id}
              className="max-w-none w-full hover:border-violet-200 transition-colors duration-200"
            >
              <div className="flex items-center justify-between gap-3">
                <Link
                  to={`/analysis/${item._id}`}
                  className="min-w-0 flex-1 flex items-center justify-between gap-4 group"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 truncate group-hover:text-violet-700">
                      {item.fileName || "Resume"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </p>
                  </div>
                  <div
                    className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${scoreColor(
                      item.analysis?.overallScore || 0
                    )}`}
                  >
                    {item.analysis?.overallScore ?? "—"}/100
                  </div>
                </Link>

                {confirmId === item._id ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                      className="text-xs font-medium text-red-600 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === item._id ? "Deleting..." : "Confirm"}
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      className="text-xs font-medium text-slate-500 hover:text-slate-700 px-2 py-1 rounded-lg hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmId(item._id)}
                    aria-label="Delete analysis"
                    className="shrink-0 p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;