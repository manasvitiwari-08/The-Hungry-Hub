import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import "../styles/profile.css";

// ── Three.js background ──────────────────────────────────────
function ProfileBg() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    const w = mount.clientWidth, h = mount.clientHeight;
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Particles
    const count = 80;
    const geo   = new THREE.BufferGeometry();
    const pos   = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random()-0.5)*14;
      pos[i*3+1] = (Math.random()-0.5)*10;
      pos[i*3+2] = (Math.random()-0.5)*6;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0xff6b00, size: 0.05, transparent: true, opacity: 0.4 });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Torus
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(3, 0.012, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.08 })
    );
    torus.rotation.x = Math.PI / 4;
    scene.add(torus);

    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh; camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    let id;
    const clock = new THREE.Clock();
    const animate = () => {
      id = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      particles.rotation.y = t * 0.03;
      torus.rotation.z     = t * 0.1;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} className="p-bg-canvas" />;
}

// ── Main Component ───────────────────────────────────────────
export default function Profile() {
  const [user, setUser]       = useState({ name: "", email: "", phone: "", address: "" });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState({});
  const [tab, setTab]         = useState("info");

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(u); setForm(u);
    } catch {}
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(".p-avatar",  { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" })
      .fromTo(".p-name",    { opacity: 0, x: -20 },   { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
      .fromTo(".p-tags",    { opacity: 0, y: 10 },     { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .fromTo(".p-stat",    { opacity: 0, y: 16 },     { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "back.out(1.4)" }, "-=0.1")
      .fromTo(".p-content", { opacity: 0, y: 20 },     { opacity: 1, y: 0, duration: 0.5 }, "-=0.1");
  }, []);

  const initials = (n) => n ? n.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2) : "U";

  const save = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const u = { ...user, ...form };
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u); setEditing(false);
    toast.success("Profile updated ✅");
    setLoading(false);
  };

  const STATS = [
    { icon: "📦", val: "12", label: "Orders",   to: "/orders"   },
    { icon: "❤️", val: "8",  label: "Wishlist", to: "/wishlist" },
    { icon: "🛒", val: "3",  label: "Cart",     to: "/cart"     },
    { icon: "⭐", val: "5",  label: "Reviews",  to: "#"         },
  ];

  const FIELDS = [
    { key: "name",    label: "Full Name", icon: "👤", type: "text",  ph: "Your name"        },
    { key: "email",   label: "Email",     icon: "✉️", type: "email", ph: "your@email.com"   },
    { key: "phone",   label: "Phone",     icon: "📞", type: "text",  ph: "+91 98765 43210"  },
    { key: "address", label: "Address",   icon: "📍", type: "text",  ph: "Delivery address" },
  ];

  const TOGGLES = [
    { label: "Email Notifications", desc: "Order updates via email",   def: true  },
    { label: "SMS Alerts",          desc: "Delivery updates on phone", def: true  },
    { label: "Promotional Offers",  desc: "Deals and discounts",       def: false },
  ];

  return (
    <div className="pp">
      <Navbar />

      {/* Three.js background */}
      <ProfileBg />

      {/* Glow overlay */}
      <div className="p-glow" />

      {/* ── Profile Header ── */}
      <div className="p-header">
        <div className="p-avatar-wrap">
          <div className="p-avatar">{initials(user.name)}</div>
          <div className="p-avatar-ring" />
        </div>
        <div>
          <h1 className="p-name">{user.name || "Your Name"}</h1>
          <div className="p-tags">
            {user.email  && <span className="p-tag">✉️ {user.email}</span>}
            {user.phone  && <span className="p-tag">📞 {user.phone}</span>}
            <span className="p-tag p-tag-o">🍔 Food Lover</span>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="p-stats">
        {STATS.map((s, i) => (
          <Link to={s.to} className="p-stat" key={i}>
            <span className="p-si">{s.icon}</span>
            <span className="p-sv">{s.val}</span>
            <span className="p-sl">{s.label}</span>
          </Link>
        ))}
      </div>

      <div className="p-hr" />

      {/* ── Tabs ── */}
      <div className="p-tabs">
        {["info","settings"].map(t => (
          <button key={t} className={`p-tab ${tab===t?"active":""}`} onClick={() => {
            setTab(t);
            gsap.fromTo(".p-content", { opacity:0, y:10 }, { opacity:1, y:0, duration:0.3 });
          }}>
            {t === "info" ? "👤 Personal Info" : "⚙️ Settings"}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="p-content">

        {tab === "info" && (
          <>
            <div className="p-row-head">
              <span className="p-row-title">Personal Information</span>
              {!editing
                ? <button className="p-btn-e" onClick={() => setEditing(true)}>Edit</button>
                : <div className="p-btn-group">
                    <button className="p-btn-c" onClick={() => { setEditing(false); setForm(user); }}>Cancel</button>
                    <button className="p-btn-s" onClick={save} disabled={loading}>
                      {loading ? <span className="p-spin"/> : "Save"}
                    </button>
                  </div>
              }
            </div>

            {FIELDS.map(f => (
              <div className="p-field" key={f.key}>
                <span className="p-fl">{f.icon} {f.label}</span>
                {editing
                  ? <input className="p-fi" type={f.type} value={form[f.key]||""} onChange={e=>setForm({...form,[f.key]:e.target.value})} placeholder={f.ph}/>
                  : <span className="p-fv">{user[f.key] || <em className="p-empty">Not set</em>}</span>
                }
              </div>
            ))}
          </>
        )}

        {tab === "settings" && (
          <>
            <p className="p-row-title" style={{marginBottom:"0.5rem"}}>Notifications</p>
            {TOGGLES.map((t,i) => (
              <div className="p-field" key={i}>
                <div>
                  <p className="p-tl">{t.label}</p>
                  <p className="p-td">{t.desc}</p>
                </div>
                <label className="p-toggle">
                  <input type="checkbox" defaultChecked={t.def}/>
                  <span className="p-track"><span className="p-thumb"/></span>
                </label>
              </div>
            ))}

            <p className="p-row-title" style={{margin:"1.2rem 0 0.5rem"}}>Security</p>
            {[
              { icon:"🔒", label:"Change Password", desc:"Update your account password", danger:false },
              { icon:"🗑️", label:"Delete Account",  desc:"Permanently remove your account", danger:true  },
            ].map((a,i) => (
              <button className={`p-action ${a.danger?"p-action-d":""}`} key={i}>
                <span>{a.icon}</span>
                <div><p>{a.label}</p><span>{a.desc}</span></div>
                <span className="p-chev">›</span>
              </button>
            ))}
          </>
        )}

      </div>
    </div>
  );
}
