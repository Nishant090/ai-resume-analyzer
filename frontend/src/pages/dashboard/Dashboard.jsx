import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import * as analysisService from "../../services/analysis.services.js";

const Dashboard = () => {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await analysisService.getAllAnalyses();
        setAnalyses(data.history || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const recent = analyses.slice(0, 5);
  const totalAnalyses = analyses.length;
  const avgScore = totalAnalyses
    ? Math.round(
        analyses.reduce((sum, a) => sum + (a.analysis?.overallScore || 0), 0) /
          totalAnalyses
      )
    : null;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Welcome back{user?.name ? `, ${user.name}` : ""} 👋
        </h1>
        <p className="mt-2 text-slate-600">
          Here's an overview of your resume analyses.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="max-w-none w-full">
          <p className="text-sm font-medium text-slate-500">Total Analyses</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {loading ? "—" : totalAnalyses}
          </p>
        </Card>
        <Card className="max-w-none w-full">
          <p className="text-sm font-medium text-slate-500">Average Score</p>
          <p className="mt-2 text-3xl font-bold text-violet-600">
            {loading ? "—" : avgScore ?? "N/A"}
          </p>
        </Card>
        <Card className="max-w-none w-full flex flex-col justify-between">
          <p className="text-sm font-medium text-slate-500">Ready to improve?</p>
          <Link to="/upload" className="mt-2">
            <Button fullWidth className="!py-2 text-sm">
              Upload New Resume
            </Button>
          </Link>
        </Card>
      </div>

      <Card className="max-w-none w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Analyses
          </h2>
          <Link
            to="/history"
            className="text-sm font-medium text-violet-600 hover:underline"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <p className="mt-6 text-sm text-slate-400">Loading...</p>
        ) : recent.length === 0 ? (
          <div className="mt-6 py-8 text-center">
            <div className="text-4xl">📄</div>
            <p className="mt-3 text-sm text-slate-500">
              No analyses yet — upload your first resume to get started.
            </p>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-slate-100">
            {recent.map((item) => (
              <li key={item._id}>
                <Link
                  to={`/analysis/${item._id}`}
                  className="flex items-center justify-between py-3 hover:bg-slate-50 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <span className="text-sm text-slate-700 truncate">
                    {item.fileName || "Resume"}
                  </span>
                  <span className="text-sm font-semibold text-violet-600 shrink-0 ml-3">
                    {item.analysis?.overallScore ?? "—"}/100
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;