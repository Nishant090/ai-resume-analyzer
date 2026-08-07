import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Upload Resume", path: "/upload", icon: "📄" },
    { name: "Analysis History", path: "/history", icon: "📚" },
    { name: "Profile", path: "/profile", icon: "👤" },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm sm:text-base transition-colors ${
      isActive
        ? "bg-violet-100 text-violet-700 font-semibold"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  const navContent = (
    <nav className="flex flex-col p-4 space-y-1">
      {navItems.map((item) => (
        <NavLink key={item.path} to={item.path} className={linkClass} onClick={onClose}>
          <span className="text-lg shrink-0">{item.icon}</span>
          <span>{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)]">
        {navContent}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/40 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 h-full w-64 bg-white z-50
          transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
          <span className="font-bold text-slate-900">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {navContent}
      </aside>
    </>
  );
};

export default Sidebar;