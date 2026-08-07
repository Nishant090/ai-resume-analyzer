import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import * as analysisService from "../../services/analysis.services.js";

const Profile = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({ total: 0, avg: null });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await analysisService.getAllAnalyses();
        const history = data.history || [];
        const total = history.length;
        const avg = total
          ? Math.round(
              history.reduce((sum, a) => sum + (a.analysis?.overallScore || 0), 0) /
                total
            )
          : null;
        setStats({ total, avg });
      } catch (error) {
        console.error(error);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Profile
        </h1>
        <p className="mt-2 text-slate-600">
          Your account details.
        </p>
      </div>

      <Card className="max-w-none w-full">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-2xl font-semibold shrink-0">
            {(user?.name || "U").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold text-slate-900 truncate">
              {user?.name || "User"}
            </p>
            <p className="text-sm text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="max-w-none w-full">
          <p className="text-sm font-medium text-slate-500">Total Analyses</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {statsLoading ? "—" : stats.total}
          </p>
        </Card>
        <Card className="max-w-none w-full">
          <p className="text-sm font-medium text-slate-500">Average Score</p>
          <p className="mt-2 text-3xl font-bold text-violet-600">
            {statsLoading ? "—" : stats.avg ?? "N/A"}
          </p>
        </Card>
      </div>

      <Card className="max-w-none w-full">
        <h2 className="text-lg font-semibold text-slate-900">
          Account Details
        </h2>

        <div className="mt-5 space-y-5">
          <Input label="Name" id="name" type="text" value={user?.name || ""} disabled />
          <Input label="Email" id="email" type="email" value={user?.email || ""} disabled />
          <p className="text-xs text-slate-400">
            Editing account details isn't available yet.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Profile;