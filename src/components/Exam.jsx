import { useState } from "react";
import { lessons } from "../data/lessons/index.js";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isCorrectAnswer(question, answer) {
  if (question.type === "multiple") {
    const a = [...(answer ?? [])].sort((x, y) => x - y);
    const c = [...question.correct].sort((x, y) => x - y);
    return a.length === c.length && a.every((v, i) => v === c[i]);
  }
  return answer === question.correct;
}

function topicLabel(topic) {
  const lesson = lessons.find((l) => l.id === topic);
  return lesson ? lesson.name : topic;
}

export default function Exam({ moduleTitle, examData, onFinish, onExit, onReviewLesson }) {
  const [questions] = useState(() => shuffle(examData.questions).slice(0, Math.min(examData.selectionSize, examData.questions.length)));
  const [answers, setAnswers] = useState(() => questions.map(() => undefined));
  const [result, setResult] = useState(null);

  const isAnswered = (qi) => {
    const q = questions[qi];
    const a = answers[qi];
    return q.type === "multiple" ? Array.isArray(a) && a.length > 0 : a !== undefined;
  };
  const allAnswered = questions.every((_, qi) => isAnswered(qi));

  const pickSingle = (qi, optIdx) => {
    if (result) return;
    setAnswers((prev) => prev.map((a, i) => (i === qi ? optIdx : a)));
  };

  const toggleMulti = (qi, optIdx) => {
    if (result) return;
    setAnswers((prev) =>
      prev.map((a, i) => {
        if (i !== qi) return a;
        const cur = a ?? [];
        return cur.includes(optIdx) ? cur.filter((x) => x !== optIdx) : [...cur, optIdx].sort((x, y) => x - y);
      })
    );
  };

  const submit = () => {
    let correctCount = 0;
    const missedTopics = [];
    questions.forEach((q, qi) => {
      if (isCorrectAnswer(q, answers[qi])) {
        correctCount += 1;
      } else {
        missedTopics.push(q.topic);
      }
    });
    const percent = Math.round((correctCount / questions.length) * 100);
    const passed = percent >= examData.passPercent;
    const r = { correctCount, total: questions.length, percent, passed, missedTopics: [...new Set(missedTopics)] };
    setResult(r);
    onFinish(r);
  };

  if (result) {
    return (
      <div style={{ padding: "32px 40px", maxWidth: 700 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>{result.passed ? "✅" : "❌"}</div>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>
          {result.passed ? "Экзамен сдан" : "Экзамен не сдан"}
        </h1>
        <div style={{ color: "#9ca3af", fontSize: 14, marginTop: 6 }}>
          {moduleTitle} · {result.correctCount} из {result.total} верно ({result.percent}%, нужно {examData.passPercent}%)
        </div>

        {!result.passed && result.missedTopics.length > 0 && (
          <div style={{ marginTop: 24, background: "#ff000008", border: "1px solid #ff000022", borderRadius: 12, padding: "16px 20px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>
              Стоит повторить
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {result.missedTopics.map((topic) => {
                const lesson = lessons.find((l) => l.id === topic);
                return (
                  <div key={topic} style={{ fontSize: 13, color: "#d1d5db" }}>
                    {lesson ? (
                      <button
                        onClick={() => onReviewLesson(lesson.id)}
                        style={{ background: "none", border: "none", color: "#a78bfa", cursor: "pointer", fontSize: 13, padding: 0, textDecoration: "underline" }}
                      >
                        {lesson.emoji} {lesson.name}
                      </button>
                    ) : (
                      <span>{topicLabel(topic)}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {result.passed && (
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Разбор вопросов</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {questions.map((q) => (
                <div key={q.id} style={{ background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 10, padding: "12px 16px" }}>
                  <div style={{ fontSize: 13, color: "#d1d5db", fontWeight: 600, marginBottom: 6 }}>{q.question}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>{q.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 28, display: "flex", gap: 10 }}>
          {!result.passed && (
            <button
              onClick={() => onExit(true)}
              style={{ padding: "10px 20px", borderRadius: 8, border: "none", background: "#7C3AED", color: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 600 }}
            >
              Пересдать
            </button>
          )}
          <button
            onClick={() => onExit(false)}
            style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #2d2d4e", background: "#1a1a2e", color: "#d1d5db", fontSize: 13, cursor: "pointer" }}
          >
            Вернуться к курсу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 40px", maxWidth: 700 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#6b6b8a", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
        Экзамен модуля
      </div>
      <h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800 }}>{moduleTitle}</h1>
      <div style={{ color: "#9ca3af", fontSize: 13, marginBottom: 24 }}>
        {questions.length} вопросов · нужно {examData.passPercent}% верных ответов · пересдача без ограничений
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {questions.map((q, qi) => (
          <div key={q.id} style={{ background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 12, padding: "16px 20px" }}>
            <div style={{ fontSize: 11, color: "#4b4b6a", marginBottom: 6 }}>
              Вопрос {qi + 1} из {questions.length}
              {q.type === "multiple" && " · выбери все верные варианты"}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#f0f0f0", marginBottom: 12, lineHeight: 1.5 }}>{q.question}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.options.map((opt, oi) => {
                const selected = q.type === "multiple" ? (answers[qi] ?? []).includes(oi) : answers[qi] === oi;
                return (
                  <button
                    key={oi}
                    onClick={() => (q.type === "multiple" ? toggleMulti(qi, oi) : pickSingle(qi, oi))}
                    style={{
                      textAlign: "left",
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: `1px solid ${selected ? "#7C3AED" : "#2d2d4e"}`,
                      background: selected ? "#7C3AED22" : "#1a1a2e",
                      color: "#d1d5db",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    {q.type === "multiple" ? (selected ? "☑ " : "☐ ") : selected ? "● " : "○ "}
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
        <button
          onClick={submit}
          disabled={!allAnswered}
          style={{
            padding: "10px 22px",
            borderRadius: 8,
            border: "none",
            background: allAnswered ? "#7C3AED" : "#2d2d4e",
            color: allAnswered ? "#fff" : "#6b6b8a",
            fontSize: 13,
            fontWeight: 600,
            cursor: allAnswered ? "pointer" : "not-allowed",
          }}
        >
          Сдать экзамен
        </button>
        <button
          onClick={() => onExit(false)}
          style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #2d2d4e", background: "#1a1a2e", color: "#d1d5db", fontSize: 13, cursor: "pointer" }}
        >
          Отмена
        </button>
      </div>
    </div>
  );
}
