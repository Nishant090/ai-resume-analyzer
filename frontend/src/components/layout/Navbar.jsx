import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";

const Navbar = () => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-full items-center justify-between px-10">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl">📄</span>

          <span className="text-xl font-bold text-slate-900">
            AI Resume Analyzer
          </span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <span className="text-md font-medium text-slate-600">User</span>

          <Button>Logout</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
