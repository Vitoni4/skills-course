import { useState } from "react";

export default function Quiz({ skill, onPass }) {
  const [pickedIndex, setPickedIndex] = useState(null);
  const { question, options, correct } = skill.quiz;
  const answered = pickedIndex !== null;
  const isCorrect = answered && pickedIndex === correct;
  const locked = isCorrect;

  const pick = (i) => {
    setPickedIndex(i);
    if (i === correct) onPass();
  };

  return (
    <div style={{ marginTop: 24, background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 12, padding: "18px 20px" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#6b6b8a", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
        🧪 Проверь себя
      </div>
      <div style={{ color: "#f0f0f0", fontSize: 14, fontWeight: 600, marginBottom: 14, lineHeight: 1.5 }}>{question}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((opt, i) => {
          let borderColor = "#2d2d4e";
          let bg = "#1a1a2e";
          if (answered && i === correct) {
            borderColor = "#22c55e";
            bg = "#22c55e15";
          } else if (answered && i === pickedIndex && i !== correct) {
            borderColor = "#ef4444";
            bg = "#ef444415";
          }
          return (
            <button
              key={i}
              onClick={() => !locked && pick(i)}
              disabled={locked}
              style={{
                textAlign: "left",
                padding: "10px 14px",
                borderRadius: 8,
                border: `1px solid ${borderColor}`,
                background: bg,
                color: "#d1d5db",
                fontSize: 13,
                cursor: locked ? "default" : "pointer",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{ marginTop: 12, fontSize: 13, color: isCorrect ? "#22c55e" : "#ef4444", fontWeight: 600 }}>
          {isCorrect ? "✓ Верно! Урок засчитан." : "✗ Неверно, попробуй ещё раз."}
        </div>
      )}
    </div>
  );
}
