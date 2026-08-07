import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-slate-50 to-slate-50 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="mb-6 sm:mb-8 text-center">
        <div className="text-3xl sm:text-4xl">📄</div>
        <h1 className="mt-2 text-2xl sm:text-4xl font-bold text-slate-900">
          AI Resume Analyzer
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-sm mx-auto">
          Optimize your resume with AI-powered insights
        </p>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;