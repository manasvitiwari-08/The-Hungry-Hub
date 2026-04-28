import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "../../styles/herofood.css";

const FOOD_ITEMS = [
  { emoji: "🍔", name: "Smash Burger", price: "₹299", rating: "4.9", color: "#ff6b00", delay: 0 },
  { emoji: "🍕", name: "Margherita", price: "₹349", rating: "4.8", color: "#ff3d00", delay: 0.3 },
  { emoji: "🍜", name: "Spicy Ramen", price: "₹249", rating: "4.7", color: "#e65c00", delay: 0.6 },
  { emoji: "🌮", name: "Chicken Taco", price: "₹199", rating: "4.8", color: "#ff6b00", delay: 0.9 },
  { emoji: "🍰", name: "Lava Cake", price: "₹149", rating: "4.9", color: "#ff3d00", delay: 1.2 },
  { emoji: "🥗", name: "Caesar Salad", price: "₹179", rating: "4.6", color: "#e65c00", delay: 1.5 },
];

// Positions for each card on the right side
const POSITIONS = [
  { top: "8%",  right: "18%", rotate: "-6deg",  scale: 1.05 },
  { top: "5%",  right: "52%", rotate: "5deg",   scale: 0.95 },
  { top: "38%", right: "8%",  rotate: "8deg",   scale: 1.0  },
  { top: "42%", right: "48%", rotate: "-5deg",  scale: 0.9  },
  { top: "68%", right: "20%", rotate: "6deg",   scale: 1.0  },
  { top: "65%", right: "55%", rotate: "-8deg",  scale: 0.92 },
];

export default function HeroFoodCards() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = containerRef.current.querySelectorAll(".hf-card");

    // Entrance animation
    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.5, y: 60 },
      {
        opacity: 1,
        scale: (i) => POSITIONS[i].scale,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1.6)",
        delay: 0.6,
      }
    );

    // Individual floating animations for each card
    cards.forEach((card, i) => {
      const yAmt  = 12 + (i % 3) * 6;
      const dur   = 2.2 + i * 0.4;
      const xAmt  = 6 + (i % 2) * 4;

      gsap.to(card, {
        y: `-=${yAmt}`,
        x: i % 2 === 0 ? `+=${xAmt}` : `-=${xAmt}`,
        rotation: `+=${i % 2 === 0 ? 3 : -3}`,
        duration: dur,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.3,
      });
    });

    // Glow pulse on each card
    gsap.to(".hf-card-glow", {
      opacity: 0.6,
      scale: 1.2,
      duration: 1.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.4,
    });

    // Rotating ring
    gsap.to(".hf-ring", {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
    gsap.to(".hf-ring-2", {
      rotation: -360,
      duration: 15,
      ease: "none",
      repeat: -1,
    });

    // Orbiting dots
    gsap.to(".hf-orbit-dot", {
      rotation: 360,
      duration: 8,
      ease: "none",
      repeat: -1,
      transformOrigin: "center center",
      stagger: { each: 1, from: "start" },
    });

  }, []);

  return (
    <div className="hf-container" ref={containerRef}>

      {/* Decorative rings */}
      <div className="hf-ring" />
      <div className="hf-ring-2" />

      {/* Center glow */}
      <div className="hf-center-glow" />

      {/* Orbit dots */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="hf-orbit-dot"
          style={{
            top: `${20 + i * 14}%`,
            left: `${10 + i * 12}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* Food Cards */}
      {FOOD_ITEMS.map((item, i) => (
        <div
          key={i}
          className="hf-card"
          style={{
            top: POSITIONS[i].top,
            right: POSITIONS[i].right,
            "--card-color": item.color,
          }}
        >
          {/* Glow behind card */}
          <div className="hf-card-glow" style={{ background: item.color }} />

          {/* Card content */}
          <div className="hf-card-inner">
            <span className="hf-card-emoji">{item.emoji}</span>
            <div className="hf-card-info">
              <span className="hf-card-name">{item.name}</span>
              <div className="hf-card-meta">
                <span className="hf-card-price">{item.price}</span>
                <span className="hf-card-rating">⭐ {item.rating}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Floating mini badges */}
      <div className="hf-badge hf-badge-1">🔥 Hot Deal</div>
      <div className="hf-badge hf-badge-2">⚡ 30 min</div>
      <div className="hf-badge hf-badge-3">🌿 Fresh</div>
    </div>
  );
}
