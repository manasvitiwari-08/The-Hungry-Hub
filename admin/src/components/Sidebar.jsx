import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  const menuItems = [
    { path: "/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/orders", icon: "📦", label: "Orders" },
    { path: "/menu", icon: "🍔", label: "Menu" },
    { path: "/users", icon: "👥", label: "Users" },
    { path: "/settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🍔 Hungry Hub</h2>
        <p>Admin Panel</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="btn-logout">
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}
