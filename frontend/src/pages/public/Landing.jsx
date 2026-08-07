import { Link } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";

const features = [
  {
    icon: "🎯",
    title: "ATS Optimization",
    desc: "Get a real ATS compatibility score so your resume actually reaches human eyes.",
  },
  {
    icon: "💡",
    title: "AI-Powered Feedback",
    desc: "Instant, actionable suggestions on strengths, weaknesses, and what to fix first.",
  },
  {
    icon: "📊",
    title: "Track Your Progress",
    desc: "Compare analyses over time and watch your resume score improve.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-slate-100">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <span className="font-bold text-slate-900">AI Resume Analyzer</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 px-2 sm:px-3"
            >
              Login
            </Link>
            <Link to="/register">
              <Button className="!px-4 !py-2 text-sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 text-violet-700 text-xs sm:text-sm font-medium px-4 py-1.5 mb-6">
          ✨ Powered by AI
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
          Land more interviews with a
          <span className="text-violet-600"> resume that passes ATS</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
          Upload your resume and get instant, AI-powered feedback on what's
          working, what's not, and exactly how to fix it.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/register">
            <Button fullWidth className="sm:w-auto sm:!px-8">
              Analyze My Resume — Free
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" fullWidth className="sm:w-auto sm:!px-8">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-100 shadow-sm"
              >
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Ready to improve your resume?
        </h2>
        <p className="mt-3 text-slate-600">
          It takes less than a minute to get your first analysis.
        </p>
        <Link to="/register" className="inline-block mt-6">
          <Button className="sm:!px-8">Get Started Free</Button>
        </Link>
      </section>

      <footer className="border-t border-slate-100 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} AI Resume Analyzer
      </footer>
    </div>
  );
};

export default Landing;