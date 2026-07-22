export default function ConceptLesson({ lesson }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {lesson.sections.map((section, i) => (
        <div key={i} style={{ background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: lesson.color, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
            {section.heading}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {section.body.map((p, j) => (
              <div key={j} style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.6 }}>
                {p}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
