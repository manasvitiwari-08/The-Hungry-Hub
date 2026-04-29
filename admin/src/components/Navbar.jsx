import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const adminUser = JSON.parse(localStorage.getItem("adminUser") || '{"name":"Admin"}');

  return (
    <nav className="admin-navbar">
      <div className="navbar-left">
        <h2>Welcome, {adminUser.name} 👋</h2>
      </div>

      <div className="navbar-right">
        <button className="notification-btn">
          🔔
          <span className="notification-badge">3</span>
        </button>
        
        <div className="admin-profile">
          <img 
            src={`https://ui-avatars.com/api/?name=${adminUser.name}&background=ff6b00&color=fff`}
            alt={adminUser.name}
          />
          <span>{adminUser.name}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout} title="Logout">
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}
