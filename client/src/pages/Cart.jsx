import { useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import "../styles/cart.css";

const INITIAL_CART = [
  { id: 1, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop", name: "Classic Smash Burger",   price: 299, qty: 2, category: "Burgers",  desc: "Double smash patty, secret sauce" },
  { id: 2, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop", name: "Margherita Pizza",       price: 349, qty: 1, category: "Pizza",    desc: "Fresh mozzarella, basil, tomato" },
  { id: 3, img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop",    name: "Mango Lassi",            price: 99,  qty: 2, category: "Drinks",   desc: "Thick yogurt, Alphonso mango" },
  { id: 4, img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop", name: "Spaghetti Carbonara",    price: 299, qty: 1, category: "Pasta",    desc: "Creamy egg sauce, pancetta" },
];

export default function Cart() {
  const [items,    setItems]    = useState(INITIAL_CART);
  const [coupon,   setCoupon]   = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  useGSAP(() => {
    gsap.fromTo(".cart-header-content > *",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(".cart-row",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.4 }
    );
    gsap.fromTo(".cart-summary-box",
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  const updateQty = (id, delta) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeItem = (id) => {
    gsap.to(`#cr-${id}`, {
      opacity: 0, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0,
      duration: 0.35, ease: "power2.in",
      onComplete: () => { setItems(prev => prev.filter(i => i.id !== id)); toast.success("Removed from cart"); }
    });
  };

  const applyCoupon = () => {
    if (couponApplied) return;
    const code = coupon.trim().toUpperCase();
    if (code === "HUNGRY10") { setDiscount(10); setCouponApplied(true); toast.success("10% off applied! 🎉"); }
    else if (code === "FIRST50") { setDiscount(50); setCouponApplied(true); toast.success("₹50 off applied! 🎉"); }
    else toast.error("Invalid coupon code");
  };

  const subtotal     = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt  = discount > 10 ? discount : Math.round(subtotal * discount / 100);
  const delivery     = subtotal > 299 ? 0 : 49;
  const total        = subtotal - discountAmt + delivery;

  return (
    <div className="cart-page">
      <Navbar />

      {/* Header */}
      <div className="cart-header">
        <div className="cart-header-bg" />
        <div className="cart-header-content">
          <p className="section-tag">My Cart</p>
          <h1 className="cart-page-title">Your <span className="text-orange">Cart</span></h1>
          <p className="cart-page-sub">{items.length} item{items.length !== 1 ? "s" : ""} · Est. delivery 30 min</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty-state">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet</p>
          <Link to="/menu" className="cart-browse-btn">Browse Menu →</Link>
        </div>
      ) : (
        <div className="cart-content">
          {/* Left — Items */}
          <div className="cart-items-col">
            <div className="cart-items-header">
              <h2 className="cart-col-title">Order Items <span className="cart-count-badge">{items.length}</span></h2>
              <button className="cart-clear-btn" onClick={() => { setItems([]); toast.success("Cart cleared"); }}>Clear All</button>
            </div>

            <div className="cart-rows">
              {items.map(item => (
                <div className="cart-row" key={item.id} id={`cr-${item.id}`}>
                  <img src={item.img} alt={item.name} className="cart-row-img" />
                  <div className="cart-row-info">
                    <span className="cart-row-cat">{item.category}</span>
                    <h3 className="cart-row-name">{item.name}</h3>
                    <p className="cart-row-desc">{item.desc}</p>
                    <span className="cart-row-unit">₹{item.price} / item</span>
                  </div>
                  <div className="cart-row-right">
                    <div className="cart-qty">
                      <button className="cart-qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                      <span className="cart-qty-num">{item.qty}</span>
                      <button className="cart-qty-btn" onClick={() => updateQty(item.id, +1)}>+</button>
                    </div>
                    <span className="cart-row-total">₹{item.price * item.qty}</span>
                    <button className="cart-del-btn" onClick={() => removeItem(item.id)} aria-label="Remove">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery info */}
            <div className="cart-delivery-info">
              <span>🚀</span>
              <p>Estimated delivery: <strong>25–35 minutes</strong></p>
            </div>
          </div>

          {/* Right — Summary */}
          <div className="cart-summary-box">
            <h2 className="cart-col-title">Order Summary</h2>

            {/* Coupon */}
            <div className="cart-coupon">
              <div className="cart-coupon-input-wrap">
                <span>🏷️</span>
                <input
                  type="text"
                  placeholder="Coupon code (try HUNGRY10)"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  disabled={couponApplied}
                  className="cart-coupon-input"
                  onKeyDown={e => e.key === "Enter" && applyCoupon()}
                />
              </div>
              <button
                className={`cart-coupon-btn ${couponApplied ? "applied" : ""}`}
                onClick={applyCoupon}
                disabled={couponApplied}
              >
                {couponApplied ? "✓ Applied" : "Apply"}
              </button>
            </div>

            {/* Breakdown */}
            <div className="cart-breakdown">
              <div className="cart-breakdown-row">
                <span>Subtotal ({items.reduce((s,i)=>s+i.qty,0)} items)</span>
                <span>₹{subtotal}</span>
              </div>
              {discountAmt > 0 && (
                <div className="cart-breakdown-row green">
                  <span>Discount</span>
                  <span>−₹{discountAmt}</span>
                </div>
              )}
              <div className="cart-breakdown-row">
                <span>Delivery fee</span>
                <span>{delivery === 0 ? <span className="free-label">FREE</span> : `₹${delivery}`}</span>
              </div>
              {delivery === 0 && (
                <p className="free-note">🎉 You saved ₹49 on delivery!</p>
              )}
              <div className="cart-breakdown-divider" />
              <div className="cart-breakdown-row cart-total-row">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button className="cart-checkout-btn">
              Proceed to Checkout
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <div className="cart-secure-note">
              <span>🔒</span> Secure checkout · 100% safe payment
            </div>

            <Link to="/menu" className="cart-continue-link">← Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
}
