import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ADS = [
  {
    emoji: "📊",
    title: "Real-time Analytics",
    desc: "Track orders, revenue, and customer insights instantly",
  },
  {
    emoji: "📦",
    title: "Order Management",
    desc: "Accept, process, and complete orders efficiently",
  },
  {
    emoji: "🍔",
    title: "Menu Control",
    desc: "Add, edit, and manage your menu items easily",
  },
  {
    emoji: "👥",
    title: "Customer Insights",
    desc: "View and manage your customer database",
  },
];

export default function AuthLeft() {
  const leftRef = useRef(null);
  const cardsRef = useRef([]);
  const currentAd = useRef(0);

  useGSAP(() => {
    // Entrance animation
    gsap.fromTo(
      leftRef.current,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }
    );

    // Floating food emojis
    gsap.to(".float-emoji", {
      y: -18,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.4,
    });

    // Ad cards auto-cycle
    const cycleAds = () => {
      const cards = cardsRef.current;
      if (!cards.length) return;

      gsap.to(cards[currentAd.current], {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          currentAd.current = (currentAd.current + 1) % cards.length;
          gsap.fromTo(
            cards[currentAd.current],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        },
      });
    };

    // Show first card
    cardsRef.current.forEach((card, i) => {
      if (card) gsap.set(card, { opacity: i === 0 ? 1 : 0 });
    });

    const interval = setInterval(cycleAds, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="auth-left" ref={leftRef}>
      {/* Background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* Logo */}
      <div className="left-logo">
        <span className="left-logo-icon float-emoji">🍔</span>
        <h1 className="left-logo-text">The Hungry Hub</h1>
        <p className="left-tagline">Admin Control Panel 🎯</p>
      </div>

      {/* Floating food emojis */}
      <div className="floating-foods">
        <span className="float-emoji f1">📊</span>
        <span className="float-emoji f2">📦</span>
        <span className="float-emoji f3">🍔</span>
        <span className="float-emoji f4">👥</span>
        <span className="float-emoji f5">⚙️</span>
        <span className="float-emoji f6">💰</span>
      </div>

      {/* Ad Cards */}
      <div className="ad-cards-wrapper">
        <p className="ad-label">✨ Admin Features</p>
        <div className="ad-cards">
          {ADS.map((ad, i) => (
            <div
              key={i}
              className="ad-card"
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <span className="ad-emoji">{ad.emoji}</span>
              <div>
                <h3 className="ad-title">{ad.title}</h3>
                <p className="ad-desc">{ad.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="auth-stats">
        <div className="stat">
          <span className="stat-num">500+</span>
          <span className="stat-label">Menu Items</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-num">50K+</span>
          <span className="stat-label">Orders Served</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-num">24/7</span>
          <span className="stat-label">Support</span>
        </div>
      </div>
    </div>
  );
}
