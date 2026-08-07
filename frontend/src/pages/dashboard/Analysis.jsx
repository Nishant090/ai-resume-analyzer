import Card from "../../components/ui/Card";
import AnalysisList from "../../components/layout/AnalysisList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as analysisService from "../../services/analysis.services.js";

const scoreColor = (score) => {
  if (score >= 80) return "text-emerald-600";
  if (score >= 50) return "text-amber-500";
  return "text-red-500";
};

const Analysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  const analysisReport = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await analysisService.getAnalysisFromId(id);
      setAnalysis(data.analysis[0].analysis);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to load analysis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    analysisReport();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Card className="max-w-md w-full">
          <div className="flex flex-col items-center justify-center py-12 sm:py-16">
            <div className="mb-4 text-5xl animate-pulse">⏳</div>
            <h2 className="text-xl font-semibold text-slate-800">
              Loading Analysis
            </h2>
            <p className="mt-2 text-slate-500 text-center">
              Please wait while we fetch your report...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center">
        <Card className="max-w-md w-full">
          <div className="py-10 sm:py-12 text-center">
            <div className="mb-4 text-5xl">❌</div>
            <h2 className="text-xl font-semibold text-red-600">
              Something went wrong
            </h2>
            <p className="mt-2 text-slate-600">{error}</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex justify-center">
        <Card className="max-w-md w-full">
          <div className="py-10 sm:py-12 text-center">
            <div className="mb-4 text-5xl">📄</div>
            <h2 className="text-xl font-semibold">No Analysis Found</h2>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Resume Analysis
        </h1>
        <p className="mt-2 text-slate-600">
          Review your AI-powered resume feedback and suggestions.
        </p>
      </div>

      {/* Score Cards */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        <Card className="max-w-none w-full">
          <div className="text-center">
            <p className="text-base sm:text-lg font-medium text-slate-500">
              Overall Score
            </p>
            <h2 className={`mt-4 text-5xl sm:text-6xl font-bold ${scoreColor(analysis.overallScore)}`}>
              {analysis.overallScore}
            </h2>
            <p className="mt-2 text-slate-500">out of 100</p>
          </div>
        </Card>

        <Card className="max-w-none w-full">
          <div className="text-center">
            <p className="text-base sm:text-lg font-medium text-slate-500">
              ATS Score
            </p>
            <h2 className={`mt-4 text-5xl sm:text-6xl font-bold ${scoreColor(analysis.atsScore)}`}>
              {analysis.atsScore}
            </h2>
            <p className="mt-2 text-slate-500">out of 100</p>
          </div>
        </Card>
      </div>

      {/* Lists */}
      <div className="grid gap-4 sm:gap-6">
        <AnalysisList title="💪 Strengths" items={analysis.strengths || []} />
        <AnalysisList title="⚠️ Weaknesses" items={analysis.weaknesses || []} />
        <AnalysisList title="💡 Suggestions" items={analysis.suggestions || []} />
      </div>
    </div>
  );
};

export default Analysis;