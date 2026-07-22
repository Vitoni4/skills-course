import { useEffect, useState } from "react";
import Certificate from "./components/Certificate.jsx";
import Lesson from "./components/Lesson.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Welcome from "./components/Welcome.jsx";
import { skills } from "./data/skills.js";

const STORAGE_KEY = "skills-course-progress";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState(loadProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  }, [completed]);

  const sel = selected ? skills.find((s) => s.id === selected) : null;
  const allDone = completed.size === skills.length;

  const markDone = (id) => {
    setCompleted((prev) => new Set(prev).add(id));
  };

  const resetProgress = () => {
    setCompleted(new Set());
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
        completed={completed}
      />

      <div style={{ flex: 1, overflowY: "auto" }}>
        {allDone && !sel ? (
          <Certificate total={skills.length} onReset={resetProgress} />
        ) : !sel ? (
          <Welcome />
        ) : (
          <Lesson skill={sel} done={completed.has(sel.id)} onPass={() => markDone(sel.id)} />
        )}
      </div>
    </div>
  );
}
