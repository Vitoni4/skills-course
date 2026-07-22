export default function Welcome() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 40, textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🎓</div>
      <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, background: "linear-gradient(135deg, #7C3AED, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Расширенный курс по скиллам Claude
      </div>
      <div style={{ color: "#6b6b8a", maxWidth: 480, lineHeight: 1.7, marginBottom: 32 }}>
        <strong style={{ color: "#9ca3af" }}>Скилл</strong> — это инструкция, которую можно «установить» Claude, чтобы он лучше выполнял определённый тип задач.
        Курс разбит на уровни и модули — от основ до создания собственных скиллов и ассистентов. В конце каждого урока — мини-квиз: он засчитывает урок, когда ты выбираешь правильный ответ. Прогресс сохраняется в браузере.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, maxWidth: 600 }}>
        {[
          { icon: "📌", title: "Триггер", desc: "Claude определяет, какой скилл нужен по твоей задаче" },
          { icon: "📖", title: "Чтение", desc: "Claude читает инструкции из SKILL.md файла" },
          { icon: "⚡", title: "Выполнение", desc: "Использует специальные инструменты и библиотеки" },
        ].map((item, i) => (
          <div key={i} style={{ background: "#0f0f1e", border: "1px solid #1e1e3a", borderRadius: 12, padding: "16px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 11, color: "#6b6b8a", lineHeight: 1.4 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, fontSize: 12, color: "#4b4b6a" }}>Выбери урок слева, чтобы начать →</div>
    </div>
  );
}
