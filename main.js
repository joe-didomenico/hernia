
// =============================
// CONFIG
// =============================
const surgeryDate = new Date("2025-12-12T13:00:00");
const appointmentDate = new Date("2026-01-12T09:00:00"); // follow-up visit

// =============================
// TIME CALCULATIONS
// =============================
const now = new Date();
const elapsedHours = (now - surgeryDate) / (1000 * 60 * 60);
const MS_PER_DAY = 1000 * 60 * 60 * 24;

// =============================
// POST-OP DAY BADGE
// =============================
const postopDay = Math.floor((now - surgeryDate) / MS_PER_DAY) + 1;
const badge = document.getElementById("postopBadge");
if (badge) {
  badge.textContent = `Day ${postopDay} post-op`;
}

// =============================
// TIME BLOCKS (exclude Anytime)
// =============================
const blocks = Array.from(document.querySelectorAll(".time-block"))
  .filter(b => !b.classList.contains("always-active"));

// =============================
// PROGRESS BAR
// =============================
const maxEnd = Math.max(...blocks.map(b => Number(b.dataset.endHours)));
const pct = Math.min((elapsedHours / maxEnd) * 100, 100);

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

if (progressFill) {
  progressFill.style.width = pct + "%";
}
if (progressText) {
  progressText.textContent = `~${Math.floor(pct)}% complete`;
}

// =============================
// APPOINTMENT MARKER
// =============================
const marker = document.getElementById("appointmentMarker");
if (marker) {
  const appointmentHours =
    (appointmentDate - surgeryDate) / (1000 * 60 * 60);

  const markerPct = Math.min(
    Math.max((appointmentHours / maxEnd) * 100, 0),
    100
  );

  marker.style.left = markerPct + "%";
}

// =============================
// SECTION STATE LOGIC
// =============================
blocks.forEach(block => {
  const start = Number(block.dataset.startHours);
  const end = Number(block.dataset.endHours);
  const toggle = block.querySelector(".toggle");

  if (elapsedHours >= end) {
    block.classList.add("completed", "collapsed");
    if (toggle) toggle.textContent = "+";
  } else if (elapsedHours >= start && elapsedHours < end) {
    block.classList.add("current");
    if (toggle) toggle.textContent = "–";
  } else {
    block.classList.add("collapsed");
    if (toggle) toggle.textContent = "+";
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      block.classList.toggle("collapsed");
      toggle.textContent =
        block.classList.contains("collapsed") ? "+" : "–";
    });
  }
});
