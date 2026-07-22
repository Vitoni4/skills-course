import { useEffect, useState } from "react";
import Certificate from "./components/Certificate.jsx";
import Exam from "./components/Exam.jsx";
import Lesson from "./components/Lesson.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Welcome from "./components/Welcome.jsx";
import { modules } from "./data/curriculum.js";
import { examPools } from "./data/exams.js";
import { lessons } from "./data/lessons/index.js";
import { practices } from "./data/practices.js";
import {
  emptyProgress,
  isPracticeDone,
  loadProgress,
  markLessonDone,
  markPracticeDone,
  recordExamResult,
  saveProgress,
  setPracticeDraft,
  totalDoneLessons,
  totalReadyLessons,
} from "./lib/progress.js";

export default function App() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [progress, setProgress] = useState(loadProgress);
  const [examModuleId, setExamModuleId] = useState(null);
  const [examAttempt, setExamAttempt] = useState(0);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const sel = selected ? lessons.find((l) => l.id === selected) : null;
  const allDone = totalDoneLessons(progress) === totalReadyLessons();
  const practice = sel ? practices[sel.id] : null;

  const markDone = (id) => {
    setProgress((prev) => markLessonDone(prev, id));
  };

  const resetProgress = () => {
    setProgress(emptyProgress());
    setSelected(null);
  };

  const openExam = (moduleId) => {
    setExamModuleId(moduleId);
    setExamAttempt(0);
  };

  const finishExam = (result) => {
    setProgress((prev) => recordExamResult(prev, examModuleId, { score: result.percent, passed: result.passed }));
  };

  const exitExam = (retry) => {
    if (retry) {
      setExamAttempt((a) => a + 1);
    } else {
      setExamModuleId(null);
    }
  };

  const reviewLesson = (lessonId) => {
    setExamModuleId(null);
    setSelected(lessonId);
  };

  let content;
  if (examModuleId) {
    const mod = modules.find((m) => m.id === examModuleId);
    content = (
      <Exam
        key={`${examModuleId}-${examAttempt}`}
        moduleTitle={mod.title}
        examData={examPools[examModuleId]}
        onFinish={finishExam}
        onExit={exitExam}
        onReviewLesson={reviewLesson}
      />
    );
  } else if (allDone && !sel) {
    content = <Certificate total={totalReadyLessons()} onReset={resetProgress} />;
  } else if (!sel) {
    content = <Welcome />;
  } else {
    content = (
      <Lesson
        lesson={sel}
        done={progress.completedLessons.includes(sel.id)}
        onPass={() => markDone(sel.id)}
        practice={practice}
        practiceDraft={practice ? progress.practiceDrafts[practice.id] : undefined}
        practiceDone={practice ? isPracticeDone(progress, practice.id) : false}
        onPracticeDraftChange={(text) => practice && setProgress((prev) => setPracticeDraft(prev, practice.id, text))}
        onPracticeMarkDone={() => practice && setProgress((prev) => markPracticeDone(prev, practice.id))}
      />
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0a0a14", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#f0f0f0", overflow: "hidden" }}>
      <Sidebar
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        selected={selected}
        setSelected={(id) => {
          setExamModuleId(null);
          setSelected(id);
        }}
        progress={progress}
        onOpenExam={openExam}
      />

      <div style={{ flex: 1, overflowY: "auto" }}>{content}</div>
    </div>
  );
}
