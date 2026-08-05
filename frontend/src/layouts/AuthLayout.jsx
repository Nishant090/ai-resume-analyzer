import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {" "}
      <div className="mb-8 text-center">
        <div className="text-4xl">📄</div>
        <h1 className="text-4xl font-bold text-slate-900">
          AI Resume Analyzer
        </h1>

        <p className="mt-2 text-slate-600">
          Optimize your resume with AI-powered insights
        </p>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
