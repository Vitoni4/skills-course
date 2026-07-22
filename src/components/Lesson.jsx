import Practice from "./Practice.jsx";
import Quiz from "./Quiz.jsx";

export default function Lesson({ skill, done, onPass, practice, practiceDraft, practiceDone, onPracticeDraftChange, onPracticeMarkDone }) {
  return (
    <div style={{ padding: "32px 40px", maxWidth: 800 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 28 }}>
        <div style={{ fontSize: 52, lineHeight: 1 }}>{skill.emoji}</div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>{skill.name}</h1>
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: skill.badgeColor + "33", color: skill.badgeColor, fontWeight: 700, letterSpacing: 0.5 }}>{skill.badge}</span>
            {done && (
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "#22c55e33", color: "#22c55e", fontWeight: 700, letterSpacing: 0.5 }}>
                ✓ ПРОЙДЕНО
              </span>
            )}
          </div>
          <div style={{ color: "#9ca3af", fontSize: 15 }}>{skill.tagline}</div>
        </div>
      </div>

      <div style={{ background: skill.color + "0d", border: `1px solid ${skill.color}33`, borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: skill.color, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>✅ Когда активируется</div>
        <div style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.6 }}>{skill.trigger}</div>
      </div>

      <div style={{ background: "#ff000008", border: "1px solid #ff000022", borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>❌ Не используется для</div>
        <div style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.6 }}>{skill.notTrigger}</div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#f0f0f0" }}>🔧 Что умеет</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {skill.what.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: skill.color + "22", border: `1px solid ${skill.color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, color: skill.color, fontWeight: 700, marginTop: 1 }}>{i + 1}</div>
              <div style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.5 }}>{item}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: "#f0f0f0" }}>💬 Пример запроса</div>
        <div style={{ background: "#1a1a2e", border: "1px solid #2d2d4e", borderRadius: 10, padding: "14px 18px", fontStyle: "italic", color: "#a78bfa", fontSize: 14, lineHeight: 1.6, borderLeft: `3px solid ${skill.color}` }}>
          {skill.example}
        </div>
      </div>

      <div style={{ background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 10, padding: "14px 18px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#6b6b8a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>⚙️ Технический стек</div>
        <div style={{ color: "#9ca3af", fontSize: 13, fontFamily: "monospace" }}>{skill.stack}</div>
      </div>

      <div style={{ marginTop: 24, background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 12, padding: "16px 20px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#6b6b8a", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>📝 Как активировать в чате</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Просто опиши задачу — Claude сам поймёт какой скилл нужен",
            `Или явно напиши: «Используй ${skill.name} скилл чтобы...»`,
            "Прикрепи файл нужного типа — скилл активируется автоматически",
          ].map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 8, color: "#9ca3af", fontSize: 13 }}>
              <span style={{ color: skill.color }}>→</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <Quiz key={skill.id} skill={skill} onPass={onPass} />

      {practice && (
        <Practice
          key={practice.id}
          practice={practice}
          draft={practiceDraft}
          onDraftChange={onPracticeDraftChange}
          done={practiceDone}
          onMarkDone={onPracticeMarkDone}
        />
      )}
    </div>
  );
}
