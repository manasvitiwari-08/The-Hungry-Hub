import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function AuthLeft() {
  const leftRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      leftRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="auth-left" ref={leftRef}>
      <div className="left-content">
        <span className="left-logo-icon">🍔</span>
        <h1 className="left-logo-text">The Hungry Hub</h1>
        <p className="left-tagline">Admin Control Panel</p>
      </div>
    </div>
  );
}
