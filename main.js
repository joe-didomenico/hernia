// =============================
// CONFIG: SET SURGERY DATE HERE
// =============================
const surgeryDate = new Date("2025-12-12T13:00:00");

// =============================
const now = new Date();
const elapsedHours = (now - surgeryDate) / (1000 * 60 * 60);

const blocks = Array.from(document.querySelectorAll(".time-block"))
  .filter(b => !b.classList.contains("always-active"));

// ---------- Progress ----------
const maxEnd = Math.max(...blocks.map(b => Number(b.dataset.endHours)));
const pct = Math.min((elapsedHours / maxEnd) * 100, 100);

document.getElementById("progressFill").style.width = pct + "%";
document.getElementById("progressText").textContent =
  `~${Math.floor(pct)}% complete`;

// ---------- Section Logic ----------
blocks.forEach(block => {
  const start = Number(block.dataset.startHours);
  const end = Number(block.dataset.endHours);
  const toggle = block.querySelector(".toggle");

  // Completed
  if (elapsedHours >= end) {
    block.classList.add("completed", "collapsed");
    toggle.textContent = "+";
  }
  // Current
  else if (elapsedHours >= start && elapsedHours < end) {
    block.classList.add("current");
    toggle.textContent = "–";
  }
  // Future
  else {
    block.classList.add("collapsed");
    toggle.textContent = "+";
  }

  // Toggle click
  toggle.addEventListener("click", () => {
    block.classList.toggle("collapsed");
    toggle.textContent =
      block.classList.contains("collapsed") ? "+" : "–";
  });
});
