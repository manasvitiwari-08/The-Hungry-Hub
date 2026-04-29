import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import "../styles/orders.css";

// ── Status config ─────────────────────────────────────────────
const STATUS = {
  pending:          { label: "Pending",          color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  icon: "🕐" },
  confirmed:        { label: "Confirmed",         color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  icon: "✅" },
  preparing:        { label: "Preparing",         color: "#a855f7", bg: "rgba(168,85,247,0.12)",  icon: "👨‍🍳" },
  out_for_delivery: { label: "Out for Delivery",  color: "#ff6b00", bg: "rgba(255,107,0,0.12)",   icon: "🛵" },
  delivered:        { label: "Delivered",         color: "#22c55e", bg: "rgba(34,197,94,0.12)",   icon: "🎉" },
  cancelled:        { label: "Cancelled",         color: "#ff4444", bg: "rgba(255,68,68,0.12)",   icon: "✕"  },
  // legacy keys from old data
  Delivered:        { label: "Delivered",         color: "#22c55e", bg: "rgba(34,197,94,0.12)",   icon: "🎉" },
  Cancelled:        { label: "Cancelled",         color: "#ff4444", bg: "rgba(255,68,68,0.12)",   icon: "✕"  },
  Pending:          { label: "Pending",           color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  icon: "🕐" },
};

const PAYMENT_LABEL = { cod: "Cash on Delivery", upi: "UPI", card: "Card", wallet: "Wallet", netbank: "Net Banking", online: "Online" };

const FILTERS = ["All", "Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];

// ── Order Detail Modal ────────────────────────────────────────
function OrderDetailModal({ order, onClose, onReorder, onCancel }) {
  const s = STATUS[order.status] || STATUS.pending;

  useEffect(() => {
    gsap.fromTo(".od-modal",
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }
    );
  }, []);

  const canCancel = ["pending", "confirmed", "Pending"].includes(order.status);

  return createPortal(
    <div className="od-overlay" onClick={onClose}>
      <div className="od-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="od-header">
          <div>
            <p className="od-order-id">{order.id}</p>
            <p className="od-date">{order.date}</p>
          </div>
          <div className="od-header-right">
            <span className="od-status-badge" style={{ background: s.bg, color: s.color }}>
              <span className="od-status-dot" style={{ background: s.color }} />
              {s.label}
            </span>
            <button className="od-close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Timeline */}
        <div className="od-timeline">
          {["pending","confirmed","preparing","out_for_delivery","delivered"].map((step, i) => {
            const st = STATUS[step];
            const statusOrder = ["pending","confirmed","preparing","out_for_delivery","delivered","cancelled"];
            const currentIdx = statusOrder.indexOf(order.status?.toLowerCase?.() || order.status);
            const stepIdx = statusOrder.indexOf(step);
            const isDone = currentIdx >= stepIdx && order.status !== "cancelled" && order.status !== "Cancelled";
            return (
              <div key={step} className={`od-tl-step ${isDone ? "done" : ""}`}>
                <div className="od-tl-dot">{isDone ? "✓" : st.icon}</div>
                <span className="od-tl-label">{st.label}</span>
                {i < 4 && <div className={`od-tl-line ${isDone && currentIdx > stepIdx ? "done" : ""}`} />}
              </div>
            );
          })}
        </div>

        {/* Items */}
        <div className="od-section-label">🛍️ Items Ordered</div>
        <div className="od-items">
          {order.items.map((item, i) => (
            <div className="od-item" key={i}>
              {item.img && <img src={item.img} alt={item.name} className="od-item-img" />}
              <div className="od-item-info">
                <span className="od-item-name">{item.name}</span>
                <span className="od-item-qty">x{item.qty}</span>
              </div>
              <span className="od-item-price">₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        {/* Delivery address */}
        {order.deliveryAddress && (
          <>
            <div className="od-section-label">📍 Delivery Address</div>
            <div className="od-addr-box">
              <p>{order.deliveryAddress.line}</p>
              <p>{order.deliveryAddress.city}{order.deliveryAddress.pincode ? `, ${order.deliveryAddress.pincode}` : ""}</p>
            </div>
          </>
        )}

        {/* Summary */}
        <div className="od-summary">
          <div className="od-summary-row">
            <span>Payment</span>
            <span>{PAYMENT_LABEL[order.paymentMethod] || order.paymentMethod || "—"}</span>
          </div>
          <div className="od-summary-row od-total-row">
            <span>Total Paid</span>
            <span className="od-total-val">₹{order.total}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="od-actions">
          {canCancel && (
            <button className="od-cancel-btn" onClick={() => onCancel(order.id)}>Cancel Order</button>
          )}
          <button className="od-reorder-btn" onClick={() => onReorder(order)}>🔄 Reorder</button>
          <button className="od-close-btn" onClick={onClose}>Close</button>
        </div>

      </div>
    </div>,
    document.body
  );
}

// ── Main Component ────────────────────────────────────────────
export default function Orders() {
  const [orders,       setOrders]       = useState([]);
  const [filter,       setFilter]       = useState("All");
  const [detailOrder,  setDetailOrder]  = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders(saved);
    } catch { setOrders([]); }
  }, []);

  useGSAP(() => {
    gsap.fromTo(".orders-hero-content > *",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      gsap.fromTo(".order-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "power3.out" }
      );
    }
  }, [orders, filter]);

  // Filter
  const filtered = orders.filter(o => {
    if (filter === "All") return true;
    const s = STATUS[o.status];
    return s?.label?.toLowerCase() === filter.toLowerCase();
  });

  // Cancel order
  const handleCancel = (id) => {
    const updated = orders.map(o =>
      o.id === id ? { ...o, status: "cancelled" } : o
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    setDetailOrder(null);
    toast.success("Order cancelled");
  };

  // Reorder
  const handleReorder = (order) => {
    order.items.forEach(item => addToCart(item));
    setDetailOrder(null);
    toast.success("Items added to cart 🛒");
    navigate("/cart");
  };

  const getStatus = (o) => STATUS[o.status] || STATUS.pending;

  return (
    <div className="orders-page">
      <Navbar />

      {/* ── Hero ── */}
      <section className="orders-hero">
        <div className="orders-hero-bg" />
        <div className="orders-hero-content">
          <p className="section-tag">My Orders</p>
          <h1 className="orders-title">Order <span className="text-orange">History</span></h1>
          <p className="orders-sub">{orders.length} order{orders.length !== 1 ? "s" : ""} placed so far</p>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      {orders.length > 0 && (
        <div className="orders-filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`orders-filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
              {f !== "All" && (
                <span className="orders-filter-count">
                  {orders.filter(o => STATUS[o.status]?.label?.toLowerCase() === f.toLowerCase()).length}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── Orders Body ── */}
      <section className="orders-body">
        {orders.length === 0 ? (
          <div className="orders-empty">
            <div className="orders-empty-icon">📦</div>
            <h3>No orders yet</h3>
            <p>Your order history will appear here once you place an order</p>
            <Link to="/menu" className="btn-primary">Browse Menu →</Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="orders-empty">
            <div className="orders-empty-icon">🔍</div>
            <h3>No {filter} orders</h3>
            <p>You don't have any {filter.toLowerCase()} orders</p>
          </div>
        ) : (
          <div className="orders-list">
            {filtered.map((order, i) => {
              const s = getStatus(order);
              return (
                <div className="order-card" key={order.id || i}>

                  {/* Left accent bar */}
                  <div className="order-accent" style={{ background: s.color }} />

                  <div className="order-card-inner">
                    {/* ── Top row ── */}
                    <div className="order-top">
                      <div className="order-id-block">
                        <span className="order-id">{order.id}</span>
                        <span className="order-date">📅 {order.date}</span>
                      </div>
                      <span className="order-status-pill" style={{ background: s.bg, color: s.color }}>
                        <span className="order-status-dot" style={{ background: s.color }} />
                        {s.label}
                      </span>
                    </div>

                    {/* ── Items preview ── */}
                    <div className="order-items-preview">
                      <div className="order-imgs">
                        {order.items.slice(0, 4).map((item, j) => (
                          item.img && (
                            <img
                              key={j}
                              src={item.img}
                              alt={item.name}
                              className="order-preview-img"
                              style={{ zIndex: order.items.length - j }}
                            />
                          )
                        ))}
                        {order.items.length > 4 && (
                          <div className="order-preview-more">+{order.items.length - 4}</div>
                        )}
                      </div>
                      <div className="order-items-names">
                        {order.items.slice(0, 2).map((item, j) => (
                          <span key={j} className="order-item-chip">
                            {item.name} <em>×{item.qty}</em>
                          </span>
                        ))}
                        {order.items.length > 2 && (
                          <span className="order-item-chip order-item-more">
                            +{order.items.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* ── Bottom row ── */}
                    <div className="order-bottom">
                      <div className="order-meta">
                        <span className="order-total-val">₹{order.total}</span>
                        {order.paymentMethod && (
                          <span className="order-pay-tag">
                            {PAYMENT_LABEL[order.paymentMethod] || order.paymentMethod}
                          </span>
                        )}
                      </div>
                      <div className="order-btns">
                        <button className="order-reorder-btn" onClick={() => handleReorder(order)}>
                          🔄 Reorder
                        </button>
                        <button className="order-detail-btn" onClick={() => setDetailOrder(order)}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Detail Modal ── */}
      {detailOrder && (
        <OrderDetailModal
          order={detailOrder}
          onClose={() => setDetailOrder(null)}
          onReorder={handleReorder}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
