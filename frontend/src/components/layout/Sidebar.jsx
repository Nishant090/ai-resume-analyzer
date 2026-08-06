import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
    {
      name: "Upload Resume",
      path: "/upload",
      icon: "📄",
    },
    {
      name: "Analysis History",
      path: "/history",
      icon: "📚",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
  ];

  const linkClass = ({ isActive }) => {
    return `rounded-lg px-4 py-3 transition-colors ${
      isActive
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "text-slate-700 hover:bg-slate-100"
    }`;
  };
  return (
    <aside className="w-64 border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)]">
      <nav className="flex flex-col p-4 space-y-2">
        {navItems.map((items,index) => {
          return (
            <NavLink key={index} to={items.path} className={linkClass}>
              {items.icon}
              {items.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
