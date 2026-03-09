export default function Toast({ message, type = "error", onClose }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 20px",
        borderRadius: "8px",
        backgroundColor: type === "error" ? "#ff4444" : "#00C851",
        color: "white",
        zIndex: 1000,
        cursor: "pointer",
      }}
      onClick={onClose}
    >
      {message}
    </div>
  );
}
