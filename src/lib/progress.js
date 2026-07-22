import { levels, modules } from "../data/curriculum.js";
import { skills } from "../data/skills.js";

const STORAGE_KEY = "skills-course-progress";
const VERSION = 2;

export function emptyProgress() {
  return {
    version: VERSION,
    completedLessons: [],
    practices: {},
    examResults: {},
    capstone: {},
    practiceDrafts: {},
  };
}

function migrate(raw) {
  if (!raw) return emptyProgress();
  if (Array.isArray(raw)) {
    // v1 shape: plain array of completed skill ids (JSON.stringify([...Set]))
    return { ...emptyProgress(), completedLessons: raw };
  }
  if (raw.version === VERSION) return raw;
  return { ...emptyProgress(), completedLessons: raw.completedLessons ?? [] };
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    return migrate(JSON.parse(raw));
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function readyLessonsForModule(moduleId) {
  return skills.filter((s) => s.moduleId === moduleId);
}

// A module is "complete" once every lesson that actually has content is
// done. Modules whose lessons aren't written yet (lessonsReady === 0) are
// vacuously complete so they never block level gating.
export function moduleStats(progress, moduleId) {
  const mod = modules.find((m) => m.id === moduleId);
  const ready = readyLessonsForModule(moduleId);
  const done = ready.filter((l) => progress.completedLessons.includes(l.id)).length;
  return {
    lessonsPlanned: mod?.lessonsPlanned ?? ready.length,
    lessonsReady: ready.length,
    lessonsDone: done,
    isComplete: ready.length === 0 || done === ready.length,
  };
}

export function isLevelComplete(progress, levelId) {
  const levelModules = modules.filter((m) => m.levelId === levelId);
  return levelModules.every((m) => moduleStats(progress, m.id).isComplete);
}

// Interim gating: level N+1 unlocks once level N is complete. Once module
// exams exist (Этап 2) this should switch to "all exams of the level passed"
// instead of raw lesson completion.
export function isLevelUnlocked(progress, levelId) {
  const level = levels.find((l) => l.id === levelId);
  if (!level) return false;
  if (level.order === 1) return true;
  const prevLevel = levels.find((l) => l.order === level.order - 1);
  if (!prevLevel) return true;
  return isLevelComplete(progress, prevLevel.id);
}

export function markLessonDone(progress, lessonId) {
  if (progress.completedLessons.includes(lessonId)) return progress;
  return { ...progress, completedLessons: [...progress.completedLessons, lessonId] };
}

export function totalReadyLessons() {
  return skills.length;
}

export function totalDoneLessons(progress) {
  return skills.filter((s) => progress.completedLessons.includes(s.id)).length;
}
