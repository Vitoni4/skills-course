import { useEffect, useState } from "react";
import Certificate from "./components/Certificate.jsx";
import Lesson from "./components/Lesson.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Welcome from "./components/Welcome.jsx";
import { skills } from "./data/skills.js";
import { emptyProgress, loadProgress, markLessonDone, saveProgress, totalDoneLessons, totalReadyLessons } from "./lib/progress.js";

export default function App() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const sel = selected ? skills.find((s) => s.id === selected) : null;
  const allDone = totalDoneLessons(progress) === totalReadyLessons();

  const markDone = (id) => {
    setProgress((prev) => markLessonDone(prev, id));
  };

  const resetProgress = () => {
    setProgress(emptyProgress());
    setSelected(null);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0a0a14", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#f0f0f0", overflow: "hidden" }}>
      <Sidebar
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        selected={selected}
        setSelected={setSelected}
        progress={progress}
      />

      <div style={{ flex: 1, overflowY: "auto" }}>
        {allDone && !sel ? (
          <Certificate total={totalReadyLessons()} onReset={resetProgress} />
        ) : !sel ? (
          <Welcome />
        ) : (
          <Lesson skill={sel} done={progress.completedLessons.includes(sel.id)} onPass={() => markDone(sel.id)} />
        )}
      </div>
    </div>
  );
}
