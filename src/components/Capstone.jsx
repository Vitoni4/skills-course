import { capstone } from "../data/capstone.js";
import Practice from "./Practice.jsx";

export default function Capstone({ progress, onDraftChange, onMarkDone, onSelectTrack }) {
  const doneCount = capstone.parts.filter((p) => progress.capstone[p.id]?.done).length;
  const allDone = doneCount === capstone.parts.length;

  return (
    <div style={{ padding: "32px 40px", maxWidth: 800 }}>
      <div style={{ fontSize: 40, marginBottom: 8 }}>🏆</div>
      <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 800 }}>Капстоун</h1>
      <div style={{ color: "#9ca3af", fontSize: 14, marginBottom: 8 }}>
        Финальный проект курса — от применения пайплайна до сборки собственного ассистента.
      </div>
      <div style={{ fontSize: 13, color: "#a78bfa", marginBottom: 28 }}>
        Пройдено частей: {doneCount} из {capstone.parts.length}
      </div>

      {capstone.parts.map((part) => {
        if (part.id === "assistant") {
          const track = progress.capstone.assistant?.track;
          return (
            <div key={part.id} style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: "#f0f0f0" }}>{part.title}</div>
              <div style={{ color: "#9ca3af", fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>{part.intro}</div>
              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                {Object.entries(part.tracks).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => onSelectTrack(part.id, key)}
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: `1px solid ${track === key ? "#7C3AED" : "#2d2d4e"}`,
                      background: track === key ? "#7C3AED22" : "#1a1a2e",
                      color: "#f0f0f0",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {track && (
                <Practice
                  key={`${part.id}-${track}`}
                  practice={part.tracks[track]}
                  draft={progress.capstone.assistant?.draft}
                  onDraftChange={(text) => onDraftChange(part.id, text)}
                  done={Boolean(progress.capstone.assistant?.done)}
                  onMarkDone={() => onMarkDone(part.id)}
                />
              )}
            </div>
          );
        }

        return (
          <div key={part.id} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: "#f0f0f0" }}>{part.title}</div>
            <Practice
              practice={part}
              draft={progress.capstone[part.id]?.draft}
              onDraftChange={(text) => onDraftChange(part.id, text)}
              done={Boolean(progress.capstone[part.id]?.done)}
              onMarkDone={() => onMarkDone(part.id)}
            />
          </div>
        );
      })}

      {allDone && (
        <div style={{ marginTop: 8, padding: "16px 20px", background: "#22c55e11", border: "1px solid #22c55e33", borderRadius: 12, color: "#22c55e", fontSize: 14, fontWeight: 600 }}>
          ✓ Все части капстоуна пройдены — сертификат уже открыт.
        </div>
      )}
    </div>
  );
}
