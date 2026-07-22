// Flattens every text field a lesson might have (shape differs by
// lesson.type) into one lowercase string for full-content search.
export function lessonSearchText(lesson) {
  const parts = [lesson.name, lesson.tagline];

  if (lesson.trigger) parts.push(lesson.trigger);
  if (lesson.notTrigger) parts.push(lesson.notTrigger);
  if (lesson.what) parts.push(...lesson.what);
  if (lesson.nuances) parts.push(...lesson.nuances);
  if (lesson.antipatterns) parts.push(...lesson.antipatterns.flatMap((a) => [a.bad, a.why, a.good]));
  if (lesson.example) parts.push(lesson.example);
  if (lesson.stack) parts.push(lesson.stack);

  if (lesson.sections) parts.push(...lesson.sections.flatMap((s) => [s.heading, ...s.body]));
  if (lesson.intro) parts.push(lesson.intro);
  if (lesson.table) {
    parts.push(...lesson.table.headers, ...lesson.table.rows.flatMap((r) => [r.label, ...r.cells]));
  }
  if (lesson.scenarios) parts.push(...lesson.scenarios.flatMap((s) => [s.prompt, s.answer, s.reasoning]));
  if (lesson.steps) parts.push(...lesson.steps.flatMap((s) => [s.title, s.skill, s.prompt, s.note]));

  if (lesson.quiz) parts.push(lesson.quiz.question, ...lesson.quiz.options);

  return parts.join(" ").toLowerCase();
}
