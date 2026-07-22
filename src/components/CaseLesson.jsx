export default function CaseLesson({ lesson }) {
  return (
    <div>
      <div style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{lesson.intro}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {lesson.steps.map((step, i) => (
          <div key={i} style={{ background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 12, padding: "16px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div
                style={{ width: 24, height: 24, borderRadius: 8, background: lesson.color + "22", border: `1px solid ${lesson.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: lesson.color, fontWeight: 700, flexShrink: 0 }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#f0f0f0" }}>{step.title}</div>
              <span style={{ marginLeft: "auto", fontSize: 10, padding: "2px 8px", borderRadius: 12, background: lesson.color + "22", color: lesson.color, fontWeight: 700 }}>{step.skill}</span>
            </div>
            <div style={{ background: "#1a1a2e", border: "1px solid #2d2d4e", borderRadius: 8, padding: "10px 14px", fontStyle: "italic", color: "#a78bfa", fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}>
              {step.prompt}
            </div>
            <div style={{ color: "#9ca3af", fontSize: 12, lineHeight: 1.5 }}>💡 {step.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
