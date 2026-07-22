import { levels, modules } from "../data/curriculum.js";
import { capstone } from "../data/capstone.js";
import { practices } from "../data/practices.js";
import { isCapstonePartDone, isPracticeDone, moduleStats, totalDoneLessons, totalReadyLessons } from "../lib/progress.js";

export default function Stats({ progress }) {
  const doneLessons = totalDoneLessons(progress);
  const totalLessons = totalReadyLessons();
  const practiceIds = Object.keys(practices);
  const donePractices = practiceIds.filter((id) => isPracticeDone(progress, id)).length;
  const doneCapstoneParts = capstone.parts.filter((p) => isCapstonePartDone(progress, p.id)).length;

  return (
    <div style={{ padding: "32px 40px", maxWidth: 800 }}>
      <div style={{ fontSize: 40, marginBottom: 8 }}>📊</div>
      <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 800 }}>Прогресс</h1>
      <div style={{ color: "#9ca3af", fontSize: 14, marginBottom: 28 }}>Сводка по всему курсу.</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 32 }}>
        {[
          { label: "Уроков пройдено", value: `${doneLessons} / ${totalLessons}` },
          { label: "Практик выполнено", value: `${donePractices} / ${practiceIds.length}` },
          { label: "Капстоун", value: `${doneCapstoneParts} / ${capstone.parts.length}` },
        ].map((s) => (
          <div key={s.label} style={{ background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 12, padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#f0f0f0" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#6b6b8a", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {levels.map((level) => {
        const levelModules = modules.filter((m) => m.levelId === level.id);
        return (
          <div key={level.id} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#f0f0f0", marginBottom: 10 }}>
              Уровень {level.order} · {level.title}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {levelModules.map((mod) => {
                const stats = moduleStats(progress, mod.id);
                const examResult = progress.examResults[mod.id];
                return (
                  <div key={mod.id} style={{ background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 10, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#d1d5db" }}>{mod.title}</div>
                      <div style={{ fontSize: 11, color: "#6b6b8a" }}>
                        {stats.lessonsDone}/{stats.lessonsReady} уроков
                        {stats.hasExam && examResult ? ` · экзамен: ${examResult.bestScore}% (попыток: ${examResult.attempts})` : stats.hasExam ? " · экзамен не сдавался" : ""}
                      </div>
                    </div>
                    <div style={{ fontSize: 16 }}>{stats.isComplete ? "✅" : "⏳"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
