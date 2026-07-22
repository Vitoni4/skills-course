export default function Certificate({ total, onReset }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 40, textAlign: "center" }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>🏆</div>
      <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, background: "linear-gradient(135deg, #7C3AED, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Курс пройден!
      </div>
      <div style={{ color: "#9ca3af", maxWidth: 440, lineHeight: 1.7, marginBottom: 28 }}>
        Все {total} уроков пройдены с правильными ответами на квизы. Теперь ты знаешь, какой скилл выбрать под любую задачу — от Word-документов до генеративного искусства.
      </div>
      <button
        onClick={onReset}
        style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #2d2d4e", background: "#1a1a2e", color: "#d1d5db", fontSize: 13, cursor: "pointer" }}
      >
        Сбросить прогресс и пройти заново
      </button>
    </div>
  );
}
