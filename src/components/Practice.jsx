import { useState } from "react";

const MIN_DRAFT_LENGTH = 20;

export default function Practice({ practice, draft, onDraftChange, done, onMarkDone }) {
  const [revealed, setRevealed] = useState(false);
  const [checks, setChecks] = useState(() => practice.rubric.map(() => false));

  const draftText = draft ?? "";
  const canReveal = draftText.trim().length >= MIN_DRAFT_LENGTH;
  const allChecked = checks.every(Boolean);

  const toggleCheck = (i) => {
    setChecks((prev) => prev.map((c, idx) => (idx === i ? !c : c)));
  };

  return (
    <div style={{ marginTop: 24, background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 12, padding: "18px 20px" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#6b6b8a", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
        🧩 Практика {done && <span style={{ color: "#22c55e" }}>· выполнено</span>}
      </div>

      <div style={{ color: "#d1d5db", fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>{practice.scenario}</div>
      <div style={{ color: "#f0f0f0", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{practice.task}</div>

      <textarea
        value={draftText}
        onChange={(e) => onDraftChange(e.target.value)}
        placeholder="Напиши свой промпт здесь..."
        rows={3}
        style={{ width: "100%", boxSizing: "border-box", background: "#1a1a2e", border: "1px solid #2d2d4e", borderRadius: 8, padding: "10px 12px", color: "#f0f0f0", fontSize: 13, fontFamily: "inherit", resize: "vertical", outline: "none" }}
      />

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          disabled={!canReveal}
          style={{
            marginTop: 10,
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: canReveal ? "#7C3AED" : "#2d2d4e",
            color: canReveal ? "#fff" : "#6b6b8a",
            fontSize: 12,
            fontWeight: 600,
            cursor: canReveal ? "pointer" : "not-allowed",
          }}
        >
          Показать эталон и рубрику
        </button>
      ) : (
        <div style={{ marginTop: 14 }}>
          <div style={{ background: "#1a1a2e", border: "1px solid #2d2d4e", borderRadius: 10, padding: "12px 16px", fontStyle: "italic", color: "#a78bfa", fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
            {practice.sampleSolution}
          </div>

          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b6b8a", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            Рубрика самопроверки
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
            {practice.rubric.map((item, i) => (
              <label key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#d1d5db", cursor: "pointer" }}>
                <input type="checkbox" checked={checks[i]} onChange={() => toggleCheck(i)} style={{ marginTop: 2 }} />
                <span>{item}</span>
              </label>
            ))}
          </div>

          <button
            onClick={onMarkDone}
            disabled={!allChecked || done}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              background: done ? "#22c55e33" : allChecked ? "#7C3AED" : "#2d2d4e",
              color: done ? "#22c55e" : allChecked ? "#fff" : "#6b6b8a",
              fontSize: 12,
              fontWeight: 600,
              cursor: done || !allChecked ? "default" : "pointer",
            }}
          >
            {done ? "✓ Практика засчитана" : "Отметить выполненным"}
          </button>
        </div>
      )}
    </div>
  );
}
