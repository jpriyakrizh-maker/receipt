export default function Slider({ isPrinting = false }) {
  return (
    <div className={`printer-slot ${isPrinting ? "is-printing" : ""}`} aria-label="Printer slot">
      <span className="printer-slot-line" />
    </div>
  );
}
