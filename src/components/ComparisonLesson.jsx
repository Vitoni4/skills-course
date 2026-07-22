export default function ComparisonLesson({ lesson }) {
  return (
    <div>
      <div style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{lesson.intro}</div>

      <div style={{ overflowX: "auto", marginBottom: 24 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr>
              {lesson.table.headers.map((h, i) => (
                <th
                  key={i}
                  style={{ textAlign: "left", padding: "8px 12px", borderBottom: `1px solid ${lesson.color}44`, color: lesson.color, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lesson.table.rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #1e1e3a" }}>
                <td style={{ padding: "10px 12px", color: "#f0f0f0", fontWeight: 600 }}>{row.label}</td>
                {row.cells.map((cell, j) => (
                  <td key={j} style={{ padding: "10px 12px", color: "#d1d5db" }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#f0f0f0" }}>Разбор сценариев</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {lesson.scenarios.map((s, i) => (
          <div key={i} style={{ background: "#1a1a2e", border: "1px solid #2d2d4e", borderRadius: 10, padding: "14px 18px", borderLeft: `3px solid ${lesson.color}` }}>
            <div style={{ fontStyle: "italic", color: "#a78bfa", fontSize: 13, marginBottom: 8 }}>«{s.prompt}»</div>
            <div style={{ color: "#f0f0f0", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>→ {s.answer}</div>
            <div style={{ color: "#9ca3af", fontSize: 12, lineHeight: 1.5 }}>{s.reasoning}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
