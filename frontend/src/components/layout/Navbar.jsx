import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button.jsx";
import useAuth from "../../hooks/useAuth.js";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-30">
      <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden -ml-2 p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Open menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link to="/dashboard" className="flex items-center gap-2 min-w-0">
          <span className="text-xl sm:text-2xl shrink-0">📄</span>
          <span className="truncate text-base sm:text-xl font-bold text-slate-900">
            <span className="hidden sm:inline">AI Resume Analyzer</span>
            <span className="sm:hidden">Resume AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm font-semibold">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-slate-600 max-w-[120px] truncate">
              {user?.name || "User"}
            </span>
          </div>

          <Button
            variant="secondary"
            onClick={handleLogout}
            className="!px-3 sm:!px-4 !py-2 text-sm"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;