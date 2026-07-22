import { useEffect, useState } from "react";
import BestPractices from "./components/BestPractices.jsx";
import Capstone from "./components/Capstone.jsx";
import Certificate from "./components/Certificate.jsx";
import Exam from "./components/Exam.jsx";
import Glossary from "./components/Glossary.jsx";
import Lesson from "./components/Lesson.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Stats from "./components/Stats.jsx";
import Welcome from "./components/Welcome.jsx";
import { modules } from "./data/curriculum.js";
import { examPools } from "./data/exams.js";
import { lessons } from "./data/lessons/index.js";
import { practices } from "./data/practices.js";
import {
  emptyProgress,
  isCapstoneComplete,
  isCourseComplete,
  isPracticeDone,
  loadProgress,
  markCapstonePartDone,
  markLessonDone,
  markPracticeDone,
  recordExamResult,
  saveProgress,
  setCapstoneDraft,
  setCapstoneTrack,
  setPracticeDraft,
  totalReadyLessons,
} from "./lib/progress.js";

const FREE_BROWSE_KEY = "skills-course-free-browse";

export default function App() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [progress, setProgress] = useState(loadProgress);
  const [examModuleId, setExamModuleId] = useState(null);
  const [examAttempt, setExamAttempt] = useState(0);
  const [screen, setScreen] = useState("course");
  const [freeBrowse, setFreeBrowse] = useState(() => localStorage.getItem(FREE_BROWSE_KEY) === "1");

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(FREE_BROWSE_KEY, freeBrowse ? "1" : "0");
  }, [freeBrowse]);

  const sel = selected ? lessons.find((l) => l.id === selected) : null;
  const practice = sel ? practices[sel.id] : null;
  const courseComplete = isCourseComplete(progress);
  const capstoneComplete = isCapstoneComplete(progress);

  const markDone = (id) => {
    setProgress((prev) => markLessonDone(prev, id));
  };

  const resetProgress = () => {
    setProgress(emptyProgress());
    setSelected(null);
  };

  const openExam = (moduleId) => {
    setScreen("course");
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
    setScreen("course");
    setExamModuleId(null);
    setSelected(lessonId);
  };

  const selectLesson = (id) => {
    setScreen("course");
    setExamModuleId(null);
    setSelected(id);
  };

  const openStandaloneScreen = (name) => {
    setSelected(null);
    setExamModuleId(null);
    setScreen(name);
  };

  let content;
  if (screen === "stats") {
    content = <Stats progress={progress} />;
  } else if (screen === "glossary") {
    content = <Glossary onOpenLesson={selectLesson} />;
  } else if (screen === "bestPractices") {
    content = <BestPractices />;
  } else if (screen === "capstone" && courseComplete) {
    content = (
      <Capstone
        progress={progress}
        onDraftChange={(partId, text) => setProgress((prev) => setCapstoneDraft(prev, partId, text))}
        onMarkDone={(partId) => setProgress((prev) => markCapstonePartDone(prev, partId))}
        onSelectTrack={(partId, track) => setProgress((prev) => setCapstoneTrack(prev, partId, track))}
      />
    );
  } else if (examModuleId) {
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
  } else if (courseComplete && capstoneComplete && !sel) {
    content = <Certificate total={totalReadyLessons()} onReset={resetProgress} />;
  } else if (courseComplete && !capstoneComplete && !sel) {
    content = (
      <Capstone
        progress={progress}
        onDraftChange={(partId, text) => setProgress((prev) => setCapstoneDraft(prev, partId, text))}
        onMarkDone={(partId) => setProgress((prev) => markCapstonePartDone(prev, partId))}
        onSelectTrack={(partId, track) => setProgress((prev) => setCapstoneTrack(prev, partId, track))}
      />
    );
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
        setSelected={selectLesson}
        progress={progress}
        onOpenExam={openExam}
        activeScreen={screen}
        courseComplete={courseComplete}
        capstoneComplete={capstoneComplete}
        freeBrowse={freeBrowse}
        onToggleFreeBrowse={() => setFreeBrowse((v) => !v)}
        onOpenGlossary={() => openStandaloneScreen("glossary")}
        onOpenBestPractices={() => openStandaloneScreen("bestPractices")}
        onOpenCapstone={() => courseComplete && openStandaloneScreen("capstone")}
        onOpenStats={() => openStandaloneScreen("stats")}
      />

      <div style={{ flex: 1, overflowY: "auto" }}>{content}</div>
    </div>
  );
}
