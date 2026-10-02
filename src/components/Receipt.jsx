import { useRef } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

function TicketIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 7.5h14v3a2 2 0 0 0 0 4v3H5v-3a2 2 0 0 0 0-4v-3Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m10 14 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z" fill="currentColor" />
      <circle cx="12" cy="10" r="2.3" fill="#f4f2ff" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="7" r="4" fill="currentColor" />
      <path d="M4 21a8 8 0 0 1 16 0H4Z" fill="currentColor" />
    </svg>
  );
}

function Barcode() {
  const widths = [2,1,3,1,2,4,1,2,1,3,2,1,4,1,2,3,1,1,3,2,1,4,2,1,3,1,2,4,1,2,3,1,2,1,4,2,1,3,2,1,4,1,2,3];
  let x = 4;
  const bars = widths.map((width, index) => {
    const bar = { x, width, height: index % 5 === 0 ? 48 : 40 };
    x += width + (index % 3 === 0 ? 3 : 2);
    return bar;
  });

  return (
    <svg className="barcode" viewBox={`0 0 ${x + 4} 52`} role="img" aria-label="DreamFest ticket barcode">
      {bars.map((bar, index) => (
        <rect key={index} x={bar.x} y="2" width={bar.width} height={bar.height} fill="#17245f" />
      ))}
    </svg>
  );
}

export default function Receipt({ type, onPrinted }) {
  const isBarcode = type === "barcode";
  const hasPrinted = useRef(false);

  function handleAnimationComplete() {
    if (hasPrinted.current) return;
    hasPrinted.current = true;
    onPrinted?.();
  }

  return (
    <motion.article
      className={`receipt ${isBarcode ? "barcode-receipt" : "qr-receipt"}`}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ clipPath: { duration: 1.8, ease: "linear" } }}
      onAnimationComplete={handleAnimationComplete}
    >
      <div className="ticket-icon" aria-label="DreamFest ticket"><TicketIcon /></div>

      <header className="ticket-header">
        {isBarcode ? (
          <>
            <h1>Thank you!</h1>
            <p className="ticket-success">
              Your DreamFest 2026 ticket has been issued successfully.
            </p>
          </>
        ) : (
          <>
            <h1>DreamFest 2026</h1>
            <p className="ticket-location"><PinIcon />Madurai, Tamil Nadu</p>
            <p className="ticket-tags">Music&nbsp; • &nbsp;Food&nbsp; • &nbsp;Fun&nbsp; • &nbsp;Together</p>
          </>
        )}
      </header>

      <section className="ticket-info">
        <div className="ticket-info-item">
        <span>PASS ID</span>
        <strong>DF-28491</strong>
        </div>
        <div className="ticket-info-item align-right">
          <span>ENTRY TYPE</span>
          <strong className="vip-pass">VIP PASS 
          <span className="vip-pass-mark" aria-hidden="true">♛</span>
          </strong>
          </div>
        <div className="ticket-info-item">
          <span>EVENT DATE &amp; TIME</span>
          <strong>15 Oct 2026 · 04:00 PM</strong></div>
        <div className="ticket-info-item align-right">
          <span>STATUS</span>
          <strong className="confirmed">✓ &nbsp;CONFIRMED</strong>
          </div>
        <div className="ticket-info-item with-icon guest-item">
          <PersonIcon />
          <div><span>GUEST NAME</span>
          <strong>Anjali</strong></div></div>
        <div className="ticket-info-item with-icon">
          <TicketIcon />
          <div>
          <span>ENTRY METHOD</span>
          
          <strong>{isBarcode ? "E-Ticket (Barcode)" : "E-Ticket (QR Code)"}</strong>
          </div>
          </div>
      </section>

      <div className="code-frame">
        {isBarcode ? (
          <Barcode />
        ) : (
          <QRCodeSVG value="DREAMFEST-2026-DF-28491-Anjali" size={148} level="H" bgColor="#ffffff" fgColor="#17245f" aria-label="DreamFest entry QR code" />
        )}
      </div>

      <p className="code-number">{isBarcode ? "DF28491  15012026  001" : "Scan for Entry"}</p>
      {isBarcode && (
        <p className="barcode-instruction">Present this barcode at the entrance.</p>
      )}
      <footer className="ticket-footer"><span className="footer-heart" aria-hidden="true">♥</span>See you at DreamFest!</footer>
    </motion.article>
  );
}
