import { useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import "../styles/wishlist.css";

const INITIAL_WISHLIST = [
  { id: 1,  img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", name: "Classic Smash Burger",   price: 299, rating: 4.9, category: "Burgers",  tag: "Bestseller" },
  { id: 2,  img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop", name: "Margherita Pizza",       price: 349, rating: 4.8, category: "Pizza",    tag: "Classic"    },
  { id: 3,  img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop", name: "Spaghetti Carbonara",    price: 299, rating: 4.9, category: "Pasta",    tag: "Classic"    },
  { id: 4,  img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop", name: "Butter Chicken",         price: 299, rating: 4.9, category: "Indian",   tag: "Bestseller" },
  { id: 5,  img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop",    name: "Chocolate Lava Cake",    price: 149, rating: 4.9, category: "Desserts", tag: "Must Try"   },
  { id: 6,  img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop", name: "Spicy Ramen Bowl",       price: 249, rating: 4.7, category: "Asian",    tag: "Hot"        },
  { id: 7,  img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop", name: "Cold Brew Coffee",       price: 149, rating: 4.8, category: "Drinks",   tag: "Premium"    },
  { id: 8,  img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop", name: "Caesar Salad",           price: 179, rating: 4.6, category: "Healthy",  tag: "Light"      },
];

export default function Wishlist() {
  const [items, setItems] = useState(INITIAL_WISHLIST);
  const [cart,  setCart]  = useState([]);

  useGSAP(() => {
    gsap.fromTo(".wishlist-hero-content > *",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out", delay: 0.3 }
    );
    gsap.fromTo(".wl-card",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.4)", delay: 0.5 }
    );
  }, []);

  const removeFromWishlist = (id) => {
    gsap.to(`#wl-${id}`, {
      opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in",
      onComplete: () => {
        setItems(prev => prev.filter(i => i.id !== id));
        toast.success("Removed from wishlist");
      }
    });
  };

  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
    toast.success(`${item.name} added to cart 🛒`);
    gsap.fromTo(`#wl-${item.id}`,
      { scale: 1 },
      { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }
    );
  };

  return (
    <div className="wishlist-page">
      <Navbar />

      {/* Hero */}
      <section className="wishlist-hero">
        <div className="wishlist-hero-bg" />
        <div className="wishlist-hero-content">
          <p className="section-tag">My Wishlist</p>
          <h1 className="wishlist-title">Your <span className="text-orange">Favourites</span></h1>
          <p className="wishlist-sub">{items.length} saved item{items.length !== 1 ? "s" : ""} — ready to order anytime</p>
        </div>
      </section>

      {/* Wishlist Body */}
      <section className="wishlist-body">
        {items.length === 0 ? (
          <div className="wishlist-empty">
            <span>❤️</span>
            <h3>Your wishlist is empty</h3>
            <p>Save your favourite dishes here</p>
            <Link to="/menu" className="btn-primary">Browse Menu</Link>
          </div>
        ) : (
          <>
            <div className="wl-grid">
              {items.map((item) => (
                <div className="wl-card" key={item.id} id={`wl-${item.id}`}>
                  {/* Image */}
                  <div className="wl-img-wrap">
                    <img src={item.img} alt={item.name} className="wl-img" loading="lazy" />
                    <div className="wl-img-overlay" />
                    {item.tag && <span className="wl-tag">{item.tag}</span>}
                    {/* Remove heart */}
                    <button
                      className="wl-heart-btn"
                      onClick={() => removeFromWishlist(item.id)}
                      aria-label="Remove from wishlist"
                    >
                      ❤️
                    </button>
                  </div>
                  {/* Info */}
                  <div className="wl-body">
                    <span className="wl-category">{item.category}</span>
                    <h3 className="wl-name">{item.name}</h3>
                    <div className="wl-footer">
                      <div className="wl-price-wrap">
                        <span className="wl-price">₹{item.price}</span>
                        <span className="wl-rating">⭐ {item.rating}</span>
                      </div>
                      <button className="wl-add-btn" onClick={() => addToCart(item)}>
                        + Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart summary bar */}
            {cart.length > 0 && (
              <div className="wl-cart-bar">
                🛒 {cart.length} item{cart.length > 1 ? "s" : ""} in cart — ₹{cart.reduce((s, i) => s + i.price, 0)}
                <Link to="/cart" className="wl-cart-bar-btn">View Cart →</Link>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
