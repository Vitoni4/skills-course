import { levels, modules } from "../data/curriculum.js";
import { examPools } from "../data/exams.js";
import { lessons } from "../data/lessons/index.js";

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
  return lessons.filter((l) => l.moduleId === moduleId);
}

export function isModuleExamPassed(progress, moduleId) {
  return progress.examResults[moduleId]?.passed === true;
}

// A module counts as "complete" by its exam once one exists for it (the
// real gate per the curriculum plan); until then, by every ready lesson
// being done. Modules with no ready lessons yet are vacuously complete so
// they never block level gating.
export function moduleStats(progress, moduleId) {
  const mod = modules.find((m) => m.id === moduleId);
  const ready = readyLessonsForModule(moduleId);
  const done = ready.filter((l) => progress.completedLessons.includes(l.id)).length;
  const hasExam = Boolean(examPools[moduleId]);
  const allLessonsDone = ready.length === 0 || done === ready.length;
  return {
    lessonsPlanned: mod?.lessonsPlanned ?? ready.length,
    lessonsReady: ready.length,
    lessonsDone: done,
    hasExam,
    allLessonsDone,
    isComplete: hasExam ? isModuleExamPassed(progress, moduleId) : allLessonsDone,
  };
}

export function recordExamResult(progress, moduleId, { score, passed }) {
  const prev = progress.examResults[moduleId] ?? { bestScore: 0, passed: false, attempts: 0 };
  return {
    ...progress,
    examResults: {
      ...progress.examResults,
      [moduleId]: {
        bestScore: Math.max(prev.bestScore, score),
        passed: prev.passed || passed,
        attempts: prev.attempts + 1,
      },
    },
  };
}

export function isLevelComplete(progress, levelId) {
  const levelModules = modules.filter((m) => m.levelId === levelId);
  return levelModules.every((m) => moduleStats(progress, m.id).isComplete);
}

// A level unlocks once every earlier level is complete — checked
// transitively (not just the immediately preceding one), so a locked level
// can't be skipped just because a later level happens to be vacuously
// complete (no ready content yet).
export function isLevelUnlocked(progress, levelId) {
  const level = levels.find((l) => l.id === levelId);
  if (!level) return false;
  const priorLevels = levels.filter((l) => l.order < level.order);
  return priorLevels.every((l) => isLevelComplete(progress, l.id));
}

export function markLessonDone(progress, lessonId) {
  if (progress.completedLessons.includes(lessonId)) return progress;
  return { ...progress, completedLessons: [...progress.completedLessons, lessonId] };
}

export function totalReadyLessons() {
  return lessons.length;
}

export function totalDoneLessons(progress) {
  return lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
}

export function setPracticeDraft(progress, practiceId, text) {
  return { ...progress, practiceDrafts: { ...progress.practiceDrafts, [practiceId]: text } };
}

export function markPracticeDone(progress, practiceId) {
  return { ...progress, practices: { ...progress.practices, [practiceId]: true } };
}

export function isPracticeDone(progress, practiceId) {
  return Boolean(progress.practices[practiceId]);
}
