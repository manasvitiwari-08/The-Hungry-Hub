import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import "../styles/profile.css";

export default function Profile() {
  const pageRef = useRef(null);

  const [user, setUser] = useState({
    name: "", email: "", phone: "", address: "", avatar: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        setUser(u);
        setForm(u);
      }
    } catch {}
  }, []);

  useGSAP(() => {
    gsap.fromTo(".profile-hero",
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(".profile-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out", delay: 0.4 }
    );
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Update localStorage
      const updated = { ...user, ...form };
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      setEditing(false);
      toast.success("Profile updated! ✅");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const STATS = [
    { icon: "📦", label: "Orders",   value: "12" },
    { icon: "❤️", label: "Wishlist", value: "8"  },
    { icon: "⭐", label: "Reviews",  value: "5"  },
    { icon: "🛒", label: "Cart",     value: "3"  },
  ];

  return (
    <div className="profile-page" ref={pageRef}>
      <Navbar />

      {/* Hero */}
      <section className="profile-hero">
        <div className="profile-hero-bg" />
        <div className="profile-hero-content">
          {/* Avatar */}
          <div className="profile-avatar-wrap">
            <div className="profile-avatar-circle">
              {getInitials(user.name)}
            </div>
            <div className="profile-avatar-ring" />
          </div>

          <div className="profile-hero-info">
            <h1 className="profile-hero-name">{user.name || "Your Name"}</h1>
            <p className="profile-hero-email">{user.email || "your@email.com"}</p>
            <span className="profile-badge">🍔 Food Lover</span>
          </div>
        </div>

        {/* Stats */}
        <div className="profile-stats">
          {STATS.map((s, i) => (
            <div className="profile-stat-card" key={i}>
              <span className="pstat-icon">{s.icon}</span>
              <span className="pstat-num">{s.value}</span>
              <span className="pstat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Profile Details */}
      <section className="profile-body">
        <div className="profile-grid">

          {/* Personal Info Card */}
          <div className="profile-card">
            <div className="pcard-header">
              <h2 className="pcard-title">👤 Personal Information</h2>
              {!editing ? (
                <button className="pcard-edit-btn" onClick={() => setEditing(true)}>Edit</button>
              ) : (
                <div className="pcard-actions">
                  <button className="pcard-cancel-btn" onClick={() => { setEditing(false); setForm(user); }}>Cancel</button>
                  <button className="pcard-save-btn" onClick={handleSave} disabled={loading}>
                    {loading ? <span className="spinner-sm" /> : "Save"}
                  </button>
                </div>
              )}
            </div>

            <div className="pcard-body">
              <div className="pfield">
                <label>Full Name</label>
                {editing ? (
                  <input value={form.name || ""} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name" />
                ) : (
                  <p>{user.name || <span className="empty-val">Not set</span>}</p>
                )}
              </div>
              <div className="pfield">
                <label>Email Address</label>
                {editing ? (
                  <input value={form.email || ""} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" type="email" />
                ) : (
                  <p>{user.email || <span className="empty-val">Not set</span>}</p>
                )}
              </div>
              <div className="pfield">
                <label>Phone Number</label>
                {editing ? (
                  <input value={form.phone || ""} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 98765 43210" />
                ) : (
                  <p>{user.phone || <span className="empty-val">Not set</span>}</p>
                )}
              </div>
              <div className="pfield">
                <label>Delivery Address</label>
                {editing ? (
                  <textarea value={form.address || ""} onChange={e => setForm({...form, address: e.target.value})} placeholder="Your delivery address" rows={3} />
                ) : (
                  <p>{user.address || <span className="empty-val">Not set</span>}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Settings Card */}
          <div className="profile-card">
            <div className="pcard-header">
              <h2 className="pcard-title">⚙️ Account Settings</h2>
            </div>
            <div className="pcard-body">
              <div className="setting-item">
                <div>
                  <p className="setting-label">Email Notifications</p>
                  <p className="setting-desc">Receive order updates via email</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider" />
                </label>
              </div>
              <div className="setting-item">
                <div>
                  <p className="setting-label">SMS Alerts</p>
                  <p className="setting-desc">Get delivery updates on phone</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider" />
                </label>
              </div>
              <div className="setting-item">
                <div>
                  <p className="setting-label">Promotional Offers</p>
                  <p className="setting-desc">Deals, discounts and new items</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider" />
                </label>
              </div>

              <div className="setting-divider" />

              <button className="change-pass-btn">🔒 Change Password</button>
              <button className="delete-acc-btn">🗑️ Delete Account</button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
