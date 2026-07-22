export default function SkillLesson({ lesson }) {
  return (
    <>
      <div style={{ background: lesson.color + "0d", border: `1px solid ${lesson.color}33`, borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: lesson.color, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>✅ Когда активируется</div>
        <div style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.6 }}>{lesson.trigger}</div>
      </div>

      <div style={{ background: "#ff000008", border: "1px solid #ff000022", borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>❌ Не используется для</div>
        <div style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.6 }}>{lesson.notTrigger}</div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#f0f0f0" }}>🔧 Что умеет</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {lesson.what.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: lesson.color + "22", border: `1px solid ${lesson.color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, color: lesson.color, fontWeight: 700, marginTop: 1 }}>{i + 1}</div>
              <div style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.5 }}>{item}</div>
            </div>
          ))}
        </div>
      </div>

      {lesson.nuances?.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: "#f0f0f0" }}>🔬 Нюансы и edge cases</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {lesson.nuances.map((n, i) => (
              <div key={i} style={{ background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 10, padding: "10px 14px", color: "#d1d5db", fontSize: 13, lineHeight: 1.6 }}>
                {n}
              </div>
            ))}
          </div>
        </div>
      )}

      {lesson.antipatterns?.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: "#f0f0f0" }}>🚫 Антипаттерны</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {lesson.antipatterns.map((ap, i) => (
              <div key={i} style={{ background: "#ff000008", border: "1px solid #ff000022", borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ fontSize: 13, color: "#ef4444", marginBottom: 4 }}>❌ {ap.bad}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 6 }}>{ap.why}</div>
                <div style={{ fontSize: 13, color: "#22c55e" }}>✅ {ap.good}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: "#f0f0f0" }}>💬 Пример запроса</div>
        <div style={{ background: "#1a1a2e", border: "1px solid #2d2d4e", borderRadius: 10, padding: "14px 18px", fontStyle: "italic", color: "#a78bfa", fontSize: 14, lineHeight: 1.6, borderLeft: `3px solid ${lesson.color}` }}>
          {lesson.example}
        </div>
      </div>

      <div style={{ background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 10, padding: "14px 18px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#6b6b8a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>⚙️ Технический стек</div>
        <div style={{ color: "#9ca3af", fontSize: 13, fontFamily: "monospace" }}>{lesson.stack}</div>
      </div>

      <div style={{ marginTop: 24, background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 12, padding: "16px 20px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#6b6b8a", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>📝 Как активировать в чате</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Просто опиши задачу — Claude сам поймёт какой скилл нужен",
            `Или явно напиши: «Используй ${lesson.name} скилл чтобы...»`,
            "Прикрепи файл нужного типа — скилл активируется автоматически",
          ].map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 8, color: "#9ca3af", fontSize: 13 }}>
              <span style={{ color: lesson.color }}>→</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
