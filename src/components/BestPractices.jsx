import { bestPracticeBlocks } from "../data/bestPractices.js";

export default function BestPractices() {
  return (
    <div style={{ padding: "32px 40px", maxWidth: 800 }}>
      <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
      <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 800 }}>Best Practices</h1>
      <div style={{ color: "#9ca3af", fontSize: 14, marginBottom: 28 }}>
        Правила курса в одном месте — не гейтится, доступен на любом этапе.
      </div>

      {bestPracticeBlocks.map((block) => (
        <div key={block.id} style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f0f0f0", marginBottom: 14 }}>{block.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {block.rules.map((r, i) => (
              <div key={i} style={{ background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 12, padding: "16px 20px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f0f0f0", marginBottom: 8 }}>{r.rule}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5, marginBottom: 10 }}>{r.why}</div>
                <div style={{ fontSize: 13, color: "#ef4444", marginBottom: 4 }}>❌ {r.bad}</div>
                <div style={{ fontSize: 13, color: "#22c55e" }}>✅ {r.good}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
