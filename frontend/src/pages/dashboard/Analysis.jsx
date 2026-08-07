import Card from "../../components/ui/Card";
import AnalysisList from "../../components/layout/AnalysisList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as analysisService from "../../services/analysis.services.js";
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
      console.log;
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
      <Card>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-4 text-5xl">⏳</div>
          <h2 className="text-xl font-semibold text-slate-800">
            Loading Analysis
          </h2>
          <p className="mt-2 text-slate-500">
            Please wait while we fetch your report...
          </p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="py-12 text-center">
          <div className="mb-4 text-5xl">❌</div>
          <h2 className="text-xl font-semibold text-red-600">
            Something went wrong
          </h2>
          <p className="mt-2 text-slate-600">{error}</p>
        </div>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card>
        <div className="py-12 text-center">
          <div className="mb-4 text-5xl">📄</div>
          <h2 className="text-xl font-semibold">No Analysis Found</h2>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Resume Analysis</h1>

        <p className="mt-2 text-slate-600">
          Review your AI-powered resume feedback and suggestions.
        </p>
      </div>

      {/* Score Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="text-center">
            <p className="text-lg font-medium text-slate-500">Overall Score</p>

            <h2 className="mt-4 text-6xl font-bold text-blue-600">
              {analysis.overallScore}
            </h2>

            <p className="mt-2 text-slate-500">out of 100</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-lg font-medium text-slate-500">ATS Score</p>

            <h2 className="mt-4 text-6xl font-bold text-green-600">
              {analysis.atsScore}
            </h2>

            <p className="mt-2 text-slate-500">out of 100</p>
          </div>
        </Card>
      </div>

      {/* Lists */}
      <div className="grid gap-6">
        <AnalysisList title="💪 Strengths" items={analysis.strengths || []} />

        <AnalysisList title="⚠️ Weaknesses" items={analysis.weaknesses || []} />

        <AnalysisList
          title="💡 Suggestions"
          items={analysis.suggestions || []}
        />
      </div>
    </div>
  );
};

export default Analysis;
