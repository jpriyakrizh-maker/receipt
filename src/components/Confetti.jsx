import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Confetti({ trigger }) {
  useEffect(() => {
    if (!trigger) return;

    confetti({
      particleCount: 110,
      spread: 78,
      startVelocity: 30,
      origin: { x: 0.5, y: 0.22 },
      colors: ["#6048f5", "#9b83ff", "#36b9d1", "#f16bad", "#ffffff"],
      zIndex: 9999,
    });
  }, [trigger]);

  return null;
}
