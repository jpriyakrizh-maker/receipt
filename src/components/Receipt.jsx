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

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h4l1.5-2h5L16 7h4v12H4V7Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
    <svg
      className="barcode"
      viewBox={`0 0 ${x + 4} 52`}
      role="img"
      aria-label="DreamFest ticket barcode"
    >
      {bars.map((bar, index) => (
        <rect
          key={index}
          x={bar.x}
          y="2"
          width={bar.width}
          height={bar.height}
          fill="#17245f"
        />
      ))}
    </svg>
  );
}

export default function Receipt({ type, onPrinted }) {
  const isBarcode = type === "barcode";
  const isPhoto = type === "photo";
  const hasPrinted = useRef(false);

  function handleAnimationComplete() {
    if (hasPrinted.current) return;
    hasPrinted.current = true;
    onPrinted?.();
  }

  return (
    <motion.article
      className={`receipt ${
        isPhoto
          ? "photo-receipt"
          : isBarcode
            ? "barcode-receipt"
            : "qr-receipt"
      }`}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ clipPath: { duration: 1.8, ease: "linear" } }}
      onAnimationComplete={handleAnimationComplete}
    >
      <div className="ticket-icon" aria-label="DreamFest ticket">
        {isPhoto ? <CameraIcon /> : <TicketIcon />}
      </div>

      <header className="ticket-header">
        {isPhoto ? (
          <>
            <h1>PHOTO BOOTH PASS</h1>
            <p className="ticket-location">
              <PinIcon />
              Fun Zone
            </p>
            <p className="ticket-tags">
              Capture&nbsp; • &nbsp;Smile&nbsp; • &nbsp;Memories
            </p>
          </>
        ) : isBarcode ? (
          <>
            <h1>Thank you!</h1>
            <p className="ticket-success">
              Your DreamFest 2026 ticket has been issued successfully.
            </p>
          </>
        ) : (
          <>
            <h1>DreamFest 2026</h1>
            <p className="ticket-location">
              <PinIcon />
              Madurai, Tamil Nadu
            </p>
            <p className="ticket-tags">
              Music&nbsp; • &nbsp;Food&nbsp; • &nbsp;Fun&nbsp; • &nbsp;Together
            </p>
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
          <strong className="vip-pass">
            VIP PASS
            <span className="vip-pass-mark" aria-hidden="true">
              ♛
            </span>
          </strong>
        </div>

        <div className="ticket-info-item">
          <span>EVENT DATE &amp; TIME</span>
          <strong>15 Oct 2026 · 04:00 PM</strong>
        </div>

        <div className="ticket-info-item align-right">
          <span>STATUS</span>
          <strong className="confirmed">✓ &nbsp;CONFIRMED</strong>
        </div>

        <div className="ticket-info-item with-icon guest-item">
          <PersonIcon />
          <div>
            <span>GUEST NAME</span>
            <strong>Anjali</strong>
          </div>
        </div>

        <div className="ticket-info-item with-icon">
          <TicketIcon />
          <div>
            <span>ENTRY METHOD</span>
            <strong>
              {isPhoto
                ? "Photo Booth Pass"
                : isBarcode
                  ? "E-Ticket (Barcode)"
                  : "E-Ticket (QR Code)"}
            </strong>
          </div>
        </div>

        {isPhoto && (
          <>
            <div className="ticket-info-item with-icon">
              <CameraIcon />
              <div>
                <span>BOOTH NO</span>
                <strong>PB-04</strong>
              </div>
            </div>

            <div className="ticket-info-item align-right with-icon">
              <ClockIcon />
              <div>
                <span>SESSION</span>
                <strong>06:30 PM</strong>
              </div>
            </div>

            <div className="ticket-info-item">
              <span>PHOTO CODE</span>
              <strong>SNAP-5827</strong>
            </div>

            <div className="ticket-info-item align-right">
              <span>LOCATION</span>
              <strong>Fun Zone</strong>
            </div>
          </>
        )}
      </section>
{isPhoto ? (
  <div className="photo-code-frame">
    <CameraIcon />
    <strong>PHOTO VERIFICATION</strong>
    <span>Capture the Moment!</span>
  </div>
) : (
  <div className="code-frame">
    {isBarcode ? (
      <Barcode />
    ) : (
      <QRCodeSVG
        value="DREAMFEST-2026-DF-28491-Anjali"
        size={148}
        level="H"
        bgColor="#ffffff"
        fgColor="#17245f"
        aria-label="DreamFest entry QR code"
      />
    )}
  </div>
)}

      <p className="code-number">
        {isPhoto
          ? "PB04  SNAP5827  DF28491"
          : isBarcode
            ? "DF28491  15012026  001"
            : "Scan for Entry"}
      </p>

      {isBarcode && (
        <p className="barcode-instruction">
          Present this barcode at the entrance.
        </p>
      )}

      {isPhoto && (
        <p className="barcode-instruction">
          PHOTO VERIFICATION • Capture the Moment!
        </p>
      )}

      <footer className="ticket-footer">
        <span className="footer-heart" aria-hidden="true">
          ♥
        </span>
        See you at DreamFest!
      </footer>
    </motion.article>
  );
}