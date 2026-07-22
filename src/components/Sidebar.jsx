import { modules, skills } from "../data/skills.js";

const categories = [
  { id: "all", label: "Все скиллы", count: skills.length },
  { id: "PUBLIC", label: "Встроенные", count: skills.filter((s) => s.badge === "PUBLIC").length },
  { id: "EXAMPLE", label: "Примеры", count: skills.filter((s) => s.badge === "EXAMPLE").length },
];

export default function Sidebar({ filter, setFilter, search, setSearch, selected, setSelected, completed }) {
  const filtered = skills.filter((s) => {
    const matchCat = filter === "all" || s.badge === filter;
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tagline.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const doneCount = skills.filter((s) => completed.has(s.id)).length;

  return (
    <div style={{ width: 300, background: "#0f0f1e", borderRight: "1px solid #1e1e3a", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #1e1e3a" }}>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, background: "linear-gradient(135deg, #7C3AED, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Claude Skills — Курс
        </div>
        <div style={{ fontSize: 12, color: "#6b6b8a" }}>
          Пройдено {doneCount} из {skills.length}
        </div>

        <div style={{ marginTop: 8, height: 6, background: "#1a1a2e", borderRadius: 999, overflow: "hidden" }}>
          <div
            style={{
              width: `${(doneCount / skills.length) * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg, #7C3AED, #3B82F6)",
              transition: "width 0.3s",
            }}
          />
        </div>

        <input
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginTop: 12, width: "100%", background: "#1a1a2e", border: "1px solid #2d2d4e", borderRadius: 8, padding: "8px 12px", color: "#f0f0f0", fontSize: 12, outline: "none", boxSizing: "border-box" }}
        />
      </div>

      <div style={{ padding: "8px 12px", borderBottom: "1px solid #1e1e3a", display: "flex", gap: 4 }}>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            style={{ flex: 1, padding: "5px 4px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 600, background: filter === c.id ? "#7C3AED" : "#1a1a2e", color: filter === c.id ? "#fff" : "#6b6b8a", transition: "all 0.2s" }}
          >
            {c.label}
            <br />
            <span style={{ fontWeight: 400, opacity: 0.8 }}>{c.count}</span>
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {modules.map((mod) => {
          const items = filtered.filter((s) => s.module === mod.id);
          if (items.length === 0) return null;
          return (
            <div key={mod.id}>
              <div style={{ padding: "10px 16px 4px", fontSize: 10, fontWeight: 700, color: "#4b4b6a", textTransform: "uppercase", letterSpacing: 0.5 }}>
                {mod.title}
              </div>
              {items.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  style={{ padding: "12px 16px", cursor: "pointer", borderLeft: selected === s.id ? `3px solid ${s.color}` : "3px solid transparent", background: selected === s.id ? s.color + "12" : "transparent", transition: "all 0.15s", borderBottom: "1px solid #0d0d1a" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 18 }}>{s.emoji}</span>
                    <span style={{ fontWeight: 700, fontSize: 14, color: selected === s.id ? "#f0f0f0" : "#d1d5db" }}>{s.name}</span>
                    {completed.has(s.id) && <span style={{ marginLeft: "auto", color: "#22c55e", fontSize: 13 }}>✓</span>}
                    {!completed.has(s.id) && (
                      <span style={{ marginLeft: "auto", fontSize: 9, padding: "2px 6px", borderRadius: 4, background: s.badgeColor + "33", color: s.badgeColor, fontWeight: 700, letterSpacing: 0.5 }}>{s.badge}</span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: "#6b6b8a", lineHeight: 1.4 }}>{s.tagline}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
