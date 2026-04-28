import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "../components/Navbar";
import "../styles/orders.css";

const ORDERS = [
  {
    id: "#ORD-2026-001", date: "Apr 28, 2026", status: "Delivered",
    items: [
      { img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop", name: "Classic Smash Burger", qty: 2, price: 299 },
      { img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=80&h=80&fit=crop",    name: "Mango Lassi",         qty: 1, price: 99  },
    ],
    total: 697, time: "28 min",
  },
  {
    id: "#ORD-2026-002", date: "Apr 25, 2026", status: "Delivered",
    items: [
      { img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&h=80&fit=crop", name: "Margherita Pizza",    qty: 1, price: 349 },
      { img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=80&h=80&fit=crop",    name: "Chocolate Lava Cake",qty: 2, price: 149 },
    ],
    total: 647, time: "32 min",
  },
  {
    id: "#ORD-2026-003", date: "Apr 22, 2026", status: "Cancelled",
    items: [
      { img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=80&h=80&fit=crop", name: "Spaghetti Carbonara", qty: 1, price: 299 },
    ],
    total: 299, time: "—",
  },
  {
    id: "#ORD-2026-004", date: "Apr 20, 2026", status: "Delivered",
    items: [
      { img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=80&h=80&fit=crop", name: "Butter Chicken",      qty: 1, price: 299 },
      { img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=80&h=80&fit=crop", name: "Chicken Biryani",     qty: 1, price: 319 },
      { img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=80&h=80&fit=crop", name: "Cold Brew Coffee",    qty: 2, price: 149 },
    ],
    total: 916, time: "25 min",
  },
];

const STATUS_COLOR = {
  Delivered: { bg: "rgba(34,197,94,0.12)", color: "#22c55e", dot: "#22c55e" },
  Cancelled: { bg: "rgba(255,68,68,0.12)",  color: "#ff4444", dot: "#ff4444" },
  Pending:   { bg: "rgba(245,158,11,0.12)", color: "#f59e0b", dot: "#f59e0b" },
};

export default function Orders() {
  useGSAP(() => {
    gsap.fromTo(".orders-hero-content > *",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out", delay: 0.3 }
    );
    gsap.fromTo(".order-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <div className="orders-page">
      <Navbar />

      {/* Hero */}
      <section className="orders-hero">
        <div className="orders-hero-bg" />
        <div className="orders-hero-content">
          <p className="section-tag">My Orders</p>
          <h1 className="orders-title">Order <span className="text-orange">History</span></h1>
          <p className="orders-sub">Track and manage all your past orders</p>
        </div>
      </section>

      {/* Orders List */}
      <section className="orders-body">
        {ORDERS.length === 0 ? (
          <div className="orders-empty">
            <span>📦</span>
            <h3>No orders yet</h3>
            <p>Your order history will appear here</p>
            <Link to="/menu" className="btn-primary">Browse Menu</Link>
          </div>
        ) : (
          <div className="orders-list">
            {ORDERS.map((order, i) => {
              const s = STATUS_COLOR[order.status] || STATUS_COLOR.Pending;
              return (
                <div className="order-card" key={i}>
                  {/* Order Header */}
                  <div className="order-header">
                    <div className="order-id-wrap">
                      <span className="order-id">{order.id}</span>
                      <span className="order-date">{order.date}</span>
                    </div>
                    <div className="order-status-wrap">
                      {order.time !== "—" && (
                        <span className="order-time">⚡ {order.time}</span>
                      )}
                      <span
                        className="order-status"
                        style={{ background: s.bg, color: s.color }}
                      >
                        <span className="status-dot" style={{ background: s.dot }} />
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="order-items">
                    {order.items.map((item, j) => (
                      <div className="order-item" key={j}>
                        <img src={item.img} alt={item.name} className="order-item-img" />
                        <div className="order-item-info">
                          <span className="order-item-name">{item.name}</span>
                          <span className="order-item-qty">x{item.qty}</span>
                        </div>
                        <span className="order-item-price">₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="order-footer">
                    <span className="order-total">Total: <strong>₹{order.total}</strong></span>
                    <div className="order-actions">
                      {order.status === "Delivered" && (
                        <button className="order-reorder-btn">🔄 Reorder</button>
                      )}
                      <button className="order-detail-btn">View Details</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
