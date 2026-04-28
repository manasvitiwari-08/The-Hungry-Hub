import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import HeroCanvas from "../components/home/HeroCanvas";
import HeroFoodCards from "../components/home/HeroFoodCards";
import "../styles/home.css";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { icon: "🚀", title: "Fast Delivery", desc: "Hot food at your door in 30 minutes or less" },
  { icon: "👨‍🍳", title: "Expert Chefs", desc: "Crafted by professional chefs with fresh ingredients" },
  { icon: "🌿", title: "Fresh & Healthy", desc: "Locally sourced, organic ingredients every day" },
  { icon: "💳", title: "Easy Payment", desc: "Multiple secure payment options available" },
];

const POPULAR = [
  { emoji: "🍔", name: "Classic Smash Burger", price: "₹299", tag: "Bestseller", rating: "4.9" },
  { emoji: "🍕", name: "Margherita Pizza", price: "₹349", tag: "Popular", rating: "4.8" },
  { emoji: "🍜", name: "Spicy Ramen Bowl", price: "₹249", tag: "New", rating: "4.7" },
  { emoji: "🌮", name: "Chicken Tacos", price: "₹199", tag: "Hot", rating: "4.8" },
  { emoji: "🥗", name: "Caesar Salad", price: "₹179", tag: "Healthy", rating: "4.6" },
  { emoji: "🍰", name: "Chocolate Lava Cake", price: "₹149", tag: "Sweet", rating: "4.9" },
];

export default function Home() {
  const heroTextRef = useRef(null);
  const featuresRef = useRef(null);
  const popularRef = useRef(null);

  useGSAP(() => {
    // Hero text animation
    gsap.fromTo(
      ".hero-badge, .hero-title, .hero-subtitle, .hero-btns, .hero-stats",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.4,
      }
    );

    // Features scroll animation
    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%",
        },
      }
    );

    // Popular items animation
    gsap.fromTo(
      ".food-card",
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".popular-section",
          start: "top 80%",
        },
      }
    );

    // Section titles
    gsap.fromTo(
      ".section-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".section-title",
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div className="home-page">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="hero-section">
        <HeroCanvas />
        <HeroFoodCards />

        <div className="hero-content" ref={heroTextRef}>
          <div className="hero-badge">🔥 #1 Food Delivery App</div>

          <h1 className="hero-title">
            Hungry? <br />
            <span className="hero-title-highlight">We've Got You</span>
            <br /> Covered.
          </h1>

          <p className="hero-subtitle">
            From gourmet burgers to exotic cuisines — order fresh, hot meals
            delivered straight to your door in 30 minutes.
          </p>

          <div className="hero-btns">
            <Link to="/menu" className="btn-primary">
              Explore Menu 🍽️
            </Link>
            <Link to="/register" className="btn-secondary">
              Get Started →
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">500+</span>
              <span className="hero-stat-label">Menu Items</span>
            </div>
            <div className="hero-stat-dot" />
            <div className="hero-stat">
              <span className="hero-stat-num">50K+</span>
              <span className="hero-stat-label">Happy Customers</span>
            </div>
            <div className="hero-stat-dot" />
            <div className="hero-stat">
              <span className="hero-stat-num">4.9 ⭐</span>
              <span className="hero-stat-label">App Rating</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-dot" />
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section className="features-section" ref={featuresRef}>
        <div className="section-header">
          <p className="section-tag">Why Choose Us</p>
          <h2 className="section-title">The Hungry Hub Difference</h2>
          <p className="section-sub">We don't just deliver food — we deliver happiness</p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── POPULAR ITEMS ── */}
      <section className="popular-section" ref={popularRef}>
        <div className="section-header">
          <p className="section-tag">Most Loved</p>
          <h2 className="section-title">Popular Right Now</h2>
          <p className="section-sub">Handpicked favourites our customers can't stop ordering</p>
        </div>

        <div className="food-grid">
          {POPULAR.map((item, i) => (
            <div className="food-card" key={i}>
              <div className="food-emoji">{item.emoji}</div>
              <div className="food-tag">{item.tag}</div>
              <h3 className="food-name">{item.name}</h3>
              <div className="food-footer">
                <span className="food-price">{item.price}</span>
                <span className="food-rating">⭐ {item.rating}</span>
              </div>
              <button className="food-add-btn">Add to Cart +</button>
            </div>
          ))}
        </div>

        <div className="view-all-wrap">
          <Link to="/menu" className="btn-primary">View Full Menu →</Link>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="cta-section">
        <div className="cta-blob" />
        <div className="cta-content">
          <h2 className="cta-title">Ready to Order? 🍔</h2>
          <p className="cta-sub">
            Join 50,000+ food lovers and get your first order with free delivery!
          </p>
          <Link to="/register" className="btn-primary cta-btn">
            Order Now — It's Free
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo">
          <span>🍔</span>
          <span className="footer-logo-text">The Hungry Hub</span>
        </div>
        <p className="footer-copy">© 2026 The Hungry Hub. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
