import CaseLesson from "./CaseLesson.jsx";
import ComparisonLesson from "./ComparisonLesson.jsx";
import ConceptLesson from "./ConceptLesson.jsx";
import Practice from "./Practice.jsx";
import Quiz from "./Quiz.jsx";
import SkillLesson from "./SkillLesson.jsx";

const BODY_BY_TYPE = {
  skill: SkillLesson,
  concept: ConceptLesson,
  comparison: ComparisonLesson,
  case: CaseLesson,
};

export default function Lesson({ lesson, done, onPass, practice, practiceDraft, practiceDone, onPracticeDraftChange, onPracticeMarkDone }) {
  const Body = BODY_BY_TYPE[lesson.type] ?? SkillLesson;

  return (
    <div style={{ padding: "32px 40px", maxWidth: 800 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 28 }}>
        <div style={{ fontSize: 52, lineHeight: 1 }}>{lesson.emoji}</div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>{lesson.name}</h1>
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: lesson.badgeColor + "33", color: lesson.badgeColor, fontWeight: 700, letterSpacing: 0.5 }}>{lesson.badge}</span>
            {done && (
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "#22c55e33", color: "#22c55e", fontWeight: 700, letterSpacing: 0.5 }}>
                ✓ ПРОЙДЕНО
              </span>
            )}
          </div>
          <div style={{ color: "#9ca3af", fontSize: 15 }}>{lesson.tagline}</div>
        </div>
      </div>

      <Body lesson={lesson} />

      <Quiz key={lesson.id} skill={lesson} onPass={onPass} />

      {practice && (
        <Practice
          key={practice.id}
          practice={practice}
          draft={practiceDraft}
          onDraftChange={onPracticeDraftChange}
          done={practiceDone}
          onMarkDone={onPracticeMarkDone}
        />
      )}
    </div>
  );
}
