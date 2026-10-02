import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Receipt from "./components/Receipt.jsx";
import Slider from "./components/Slider.jsx";
import Confetti from "./components/Confetti.jsx";
import "./App.css";

export default function App() {
  const [receiptType, setReceiptType] = useState(null);
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setReceiptType("qr"), 800);
    return () => window.clearTimeout(timer);
  }, []);

  function handlePrinted() {
    setConfettiTrigger((current) => current + 1);
    if (receiptType === "qr") {
      window.setTimeout(() => setReceiptType("barcode"), 1300);
    }
  }

  return (
    <main className="page">
      <section className="printer-scene" aria-label="DreamFest ticket printer">
        <div className="concert-background" />
        <Slider isPrinting={Boolean(receiptType)} />
        <div className="paper-window">
          <AnimatePresence mode="wait">
            {receiptType && (
              <Receipt
                key={receiptType}
                type={receiptType}
                onPrinted={handlePrinted}
              />
            )}
          </AnimatePresence>
        </div>
        <Confetti trigger={confettiTrigger} />
      </section>
    </main>
  );
}
