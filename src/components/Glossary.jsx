import { useState } from "react";
import { glossary, glossaryCategories } from "../data/glossary.js";
import { lessons } from "../data/lessons/index.js";

export default function Glossary({ onOpenLesson }) {
  const [search, setSearch] = useState("");

  const filtered = glossary.filter(
    (g) => !search || g.term.toLowerCase().includes(search.toLowerCase()) || g.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "32px 40px", maxWidth: 800 }}>
      <div style={{ fontSize: 40, marginBottom: 8 }}>📖</div>
      <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 800 }}>Глоссарий</h1>
      <div style={{ color: "#9ca3af", fontSize: 14, marginBottom: 20 }}>
        Термины курса — не гейтится, доступен на любом этапе.
      </div>

      <input
        placeholder="Поиск термина..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", boxSizing: "border-box", background: "#1a1a2e", border: "1px solid #2d2d4e", borderRadius: 8, padding: "10px 14px", color: "#f0f0f0", fontSize: 13, outline: "none", marginBottom: 28 }}
      />

      {glossaryCategories.map((cat) => {
        const items = filtered.filter((g) => g.category === cat.id);
        if (items.length === 0) return null;
        return (
          <div key={cat.id} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#3B82F6", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
              {cat.title}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((g) => (
                <div key={g.term} style={{ background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 10, padding: "14px 18px" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f0f0f0", marginBottom: 4 }}>{g.term}</div>
                  <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.5, marginBottom: g.example ? 6 : 0 }}>{g.definition}</div>
                  {g.example && <div style={{ fontSize: 12, color: "#a78bfa", fontStyle: "italic" }}>{g.example}</div>}
                  {g.lessons?.length > 0 && (
                    <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {g.lessons.map((lessonId) => {
                        const lesson = lessons.find((l) => l.id === lessonId);
                        if (!lesson) return null;
                        return (
                          <button
                            key={lessonId}
                            onClick={() => onOpenLesson(lessonId)}
                            style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, border: "1px solid #2d2d4e", background: "#1a1a2e", color: "#9ca3af", cursor: "pointer" }}
                          >
                            {lesson.emoji} {lesson.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && <div style={{ color: "#6b6b8a", fontSize: 13 }}>Ничего не найдено.</div>}
    </div>
  );
}
