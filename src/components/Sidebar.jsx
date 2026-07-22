import { levels, modules } from "../data/curriculum.js";
import { examPools } from "../data/exams.js";
import { lessons } from "../data/lessons/index.js";
import { isLevelUnlocked, isModuleExamPassed, moduleStats, totalDoneLessons, totalReadyLessons } from "../lib/progress.js";

const categories = [
  { id: "all", label: "Все уроки", count: lessons.length },
  { id: "PUBLIC", label: "Встроенные", count: lessons.filter((l) => l.badge === "PUBLIC").length },
  { id: "EXAMPLE", label: "Примеры", count: lessons.filter((l) => l.badge === "EXAMPLE").length },
  { id: "GUIDE", label: "Теория", count: lessons.filter((l) => l.badge === "GUIDE").length },
];

function pluralizeLesson(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "урок";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "урока";
  return "уроков";
}

export default function Sidebar({
  filter,
  setFilter,
  search,
  setSearch,
  selected,
  setSelected,
  progress,
  onOpenExam,
  activeScreen,
  courseComplete,
  capstoneComplete,
  onOpenGlossary,
  onOpenBestPractices,
  onOpenCapstone,
}) {
  const filtered = lessons.filter((l) => {
    const matchCat = filter === "all" || l.badge === filter;
    const matchSearch =
      !search ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.tagline.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  const filteredIds = new Set(filtered.map((l) => l.id));
  const isFiltering = Boolean(search) || filter !== "all";

  const doneCount = totalDoneLessons(progress);
  const totalCount = totalReadyLessons();

  return (
    <div style={{ width: 320, background: "#0f0f1e", borderRight: "1px solid #1e1e3a", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #1e1e3a" }}>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, background: "linear-gradient(135deg, #7C3AED, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Claude Skills — Курс
        </div>
        <div style={{ fontSize: 12, color: "#6b6b8a" }}>
          Пройдено {doneCount} из {totalCount}
        </div>

        <div style={{ marginTop: 8, height: 6, background: "#1a1a2e", borderRadius: 999, overflow: "hidden" }}>
          <div
            style={{
              width: `${totalCount ? (doneCount / totalCount) * 100 : 0}%`,
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
        {levels.map((level) => {
          const unlocked = isLevelUnlocked(progress, level.id);
          const levelModules = modules.filter((m) => m.levelId === level.id);

          return (
            <div key={level.id} style={{ borderBottom: "1px solid #14142a" }}>
              <div style={{ padding: "12px 16px 6px", display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: unlocked ? "#e5e7eb" : "#4b4b6a" }}>
                  {!unlocked && "🔒 "}
                  Уровень {level.order} · {level.title}
                </span>
                <span style={{ fontSize: 10, color: "#4b4b6a" }}>{level.subtitle}</span>
              </div>

              {!unlocked ? (
                <div style={{ padding: "0 16px 14px", fontSize: 11, color: "#4b4b6a", lineHeight: 1.5 }}>
                  Откроется после завершения предыдущего уровня
                </div>
              ) : (
                levelModules.map((mod) => {
                  const stats = moduleStats(progress, mod.id);
                  const moduleLessons = lessons.filter((l) => l.moduleId === mod.id && filteredIds.has(l.id));
                  const stubCount = Math.max(stats.lessonsPlanned - stats.lessonsReady, 0);

                  if (stats.lessonsReady === 0) {
                    if (isFiltering) return null;
                    return (
                      <div key={mod.id} style={{ padding: "6px 16px 12px" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#4b4b6a", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                          {mod.title}
                        </div>
                        <div style={{ fontSize: 11, color: "#4b4b6a" }}>
                          🚧 {mod.lessonsPlanned} {pluralizeLesson(mod.lessonsPlanned)} — в разработке
                        </div>
                      </div>
                    );
                  }

                  if (moduleLessons.length === 0 && isFiltering) return null;

                  return (
                    <div key={mod.id} style={{ paddingBottom: 4 }}>
                      <div style={{ padding: "6px 16px 2px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#4b4b6a", textTransform: "uppercase", letterSpacing: 0.5 }}>
                          {mod.title}
                        </span>
                        <span style={{ fontSize: 10, color: "#4b4b6a" }}>
                          {stats.lessonsDone}/{stats.lessonsReady}
                        </span>
                      </div>
                      {moduleLessons.map((l) => (
                        <div
                          key={l.id}
                          onClick={() => setSelected(l.id)}
                          style={{ padding: "12px 16px", cursor: "pointer", borderLeft: selected === l.id ? `3px solid ${l.color}` : "3px solid transparent", background: selected === l.id ? l.color + "12" : "transparent", transition: "all 0.15s", borderBottom: "1px solid #0d0d1a" }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                            <span style={{ fontSize: 18 }}>{l.emoji}</span>
                            <span style={{ fontWeight: 700, fontSize: 14, color: selected === l.id ? "#f0f0f0" : "#d1d5db" }}>{l.name}</span>
                            {progress.completedLessons.includes(l.id) && <span style={{ marginLeft: "auto", color: "#22c55e", fontSize: 13 }}>✓</span>}
                            {!progress.completedLessons.includes(l.id) && (
                              <span style={{ marginLeft: "auto", fontSize: 9, padding: "2px 6px", borderRadius: 4, background: l.badgeColor + "33", color: l.badgeColor, fontWeight: 700, letterSpacing: 0.5 }}>{l.badge}</span>
                            )}
                          </div>
                          <div style={{ fontSize: 11, color: "#6b6b8a", lineHeight: 1.4 }}>{l.tagline}</div>
                        </div>
                      ))}
                      {stubCount > 0 && !isFiltering && (
                        <div style={{ padding: "6px 16px", fontSize: 11, color: "#4b4b6a" }}>
                          🚧 ещё {stubCount} {pluralizeLesson(stubCount)} — в разработке
                        </div>
                      )}
                      {examPools[mod.id] && !isFiltering && (
                        stats.allLessonsDone ? (
                          <div
                            onClick={() => onOpenExam(mod.id)}
                            style={{ padding: "10px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, borderTop: "1px solid #14142a" }}
                          >
                            <span style={{ fontSize: 13 }}>📝</span>
                            <span style={{ fontSize: 12, color: "#d1d5db", fontWeight: 600 }}>Экзамен модуля</span>
                            {isModuleExamPassed(progress, mod.id) && <span style={{ marginLeft: "auto", color: "#22c55e", fontSize: 13 }}>✓</span>}
                          </div>
                        ) : (
                          <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderTop: "1px solid #14142a" }}>
                            <span style={{ fontSize: 13, opacity: 0.4 }}>🔒</span>
                            <span style={{ fontSize: 12, color: "#4b4b6a" }}>Экзамен — заверши уроки модуля</span>
                          </div>
                        )
                      )}
                    </div>
                  );
                })
              )}
            </div>
          );
        })}
      </div>

      <div style={{ borderTop: "1px solid #1e1e3a", padding: 8, display: "flex", flexDirection: "column", gap: 2 }}>
        <div
          onClick={onOpenGlossary}
          style={{ padding: "8px 12px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, background: activeScreen === "glossary" ? "#7C3AED22" : "transparent" }}
        >
          <span style={{ fontSize: 14 }}>📖</span>
          <span style={{ fontSize: 12, color: activeScreen === "glossary" ? "#f0f0f0" : "#9ca3af", fontWeight: 600 }}>Глоссарий</span>
        </div>
        <div
          onClick={onOpenBestPractices}
          style={{ padding: "8px 12px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, background: activeScreen === "bestPractices" ? "#7C3AED22" : "transparent" }}
        >
          <span style={{ fontSize: 14 }}>✅</span>
          <span style={{ fontSize: 12, color: activeScreen === "bestPractices" ? "#f0f0f0" : "#9ca3af", fontWeight: 600 }}>Best Practices</span>
        </div>
        <div
          onClick={onOpenCapstone}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            cursor: courseComplete ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: activeScreen === "capstone" ? "#7C3AED22" : "transparent",
            opacity: courseComplete ? 1 : 0.4,
          }}
        >
          <span style={{ fontSize: 14 }}>{courseComplete ? "🏆" : "🔒"}</span>
          <span style={{ fontSize: 12, color: activeScreen === "capstone" ? "#f0f0f0" : "#9ca3af", fontWeight: 600 }}>Капстоун</span>
          {capstoneComplete && <span style={{ marginLeft: "auto", color: "#22c55e", fontSize: 13 }}>✓</span>}
        </div>
      </div>
    </div>
  );
}
