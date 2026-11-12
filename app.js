const STORAGE_KEY = "workoutAppData";

const WORKOUT_PLAN = {
  1: { // Monday
    name: "Full Body Strength A",
    type: "strength",
    exercises: [
      { name: "Goblet Squat", sets: 3, reps: 12, startWeight: 20 },
      { name: "Dumbbell Bench Press", sets: 3, reps: 10, startWeight: 20 },
      { name: "Bent-Over Row", sets: 3, reps: 12, startWeight: 20 },
      { name: "Dumbbell Shoulder Press", sets: 3, reps: 10, startWeight: 20 },
      { name: "Plank", sets: 3, reps: "45s hold", startWeight: null },
    ],
  },
  2: { // Tuesday
    name: "Cardio & Core",
    type: "cardio",
    exercises: [
      { name: "Warm-up Walk", sets: 1, reps: "5 min", startWeight: null },
      { name: "Steady-State Cardio (incline walk/bike/elliptical)", sets: 1, reps: "25 min, Zone 2", startWeight: null },
      { name: "HIIT Intervals (30s hard / 90s easy x5)", sets: 1, reps: "10 min", startWeight: null },
      { name: "Plank", sets: 3, reps: "45s hold", startWeight: null },
      { name: "Bicycle Crunch", sets: 3, reps: 20, startWeight: null },
      { name: "Leg Raises", sets: 3, reps: 15, startWeight: null },
      { name: "Side Plank (each side)", sets: 2, reps: "30s hold", startWeight: null },
    ],
  },
  3: { // Wednesday
    name: "Full Body Strength B",
    type: "strength",
    exercises: [
      { name: "Romanian Deadlift", sets: 3, reps: 10, startWeight: 20 },
      { name: "Lat Pulldown", sets: 3, reps: 10, startWeight: 20 },
      { name: "Walking Lunges (per leg)", sets: 3, reps: 12, startWeight: 20 },
      { name: "Incline Dumbbell Press", sets: 3, reps: 10, startWeight: 20 },
      { name: "Russian Twists", sets: 3, reps: 20, startWeight: null },
    ],
  },
  4: { name: "Rest / Active Recovery", type: "rest", exercises: [] }, // Thursday
  5: { // Friday
    name: "Full Body Strength C",
    type: "strength",
    exercises: [
      { name: "Deadlift", sets: 3, reps: 10, startWeight: 20 },
      { name: "Push-Ups / DB Floor Press", sets: 3, reps: 12, startWeight: 20 },
      { name: "Seated Cable Row", sets: 3, reps: 12, startWeight: 20 },
      { name: "Lateral Raises", sets: 3, reps: 12, startWeight: 8 },
      { name: "Mountain Climbers", sets: 3, reps: "30s", startWeight: null },
    ],
  },
  6: { // Saturday
    name: "Cardio & Core",
    type: "cardio",
    exercises: [
      { name: "Warm-up Walk", sets: 1, reps: "5 min", startWeight: null },
      { name: "Steady-State Cardio (incline walk/bike/elliptical)", sets: 1, reps: "25 min, Zone 2", startWeight: null },
      { name: "HIIT Intervals (30s hard / 90s easy x5)", sets: 1, reps: "10 min", startWeight: null },
      { name: "Plank", sets: 3, reps: "45s hold", startWeight: null },
      { name: "Bicycle Crunch", sets: 3, reps: 20, startWeight: null },
      { name: "Leg Raises", sets: 3, reps: 15, startWeight: null },
      { name: "Side Plank (each side)", sets: 2, reps: "30s hold", startWeight: null },
    ],
  },
  0: { name: "Rest / Active Recovery", type: "rest", exercises: [] }, // Sunday
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { logs: {}, bodyweight: [] };
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

let appData = loadData();

function todayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
    weekday: "short", month: "short", day: "numeric",
  });
}

// ---------- Tabs ----------
function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
      if (btn.dataset.tab === "progress") renderWeightChart();
      if (btn.dataset.tab === "history") renderHistory();
    });
  });
}

// ---------- Today ----------
function renderToday() {
  const container = document.getElementById("today-content");
  const dateISO = todayISO();
  const dayIndex = new Date().getDay();
  const plan = WORKOUT_PLAN[dayIndex];
  const existingLog = appData.logs[dateISO] || { exercises: {}, completed: false };

  if (plan.type === "rest") {
    container.innerHTML = `
      <div class="card">
        <h2>${formatDate(dateISO)}</h2>
        <div class="rest-day">
          <div class="badge rest">Rest Day</div>
          <p>${plan.name}. Optional light walk or stretching — no lifting today.</p>
        </div>
      </div>`;
    return;
  }

  const rows = plan.exercises.map((ex, i) => {
    const log = existingLog.exercises[ex.name] || {};
    const weightVal = log.weight ?? ex.startWeight ?? "";
    const weightField = ex.startWeight !== null
      ? `<input type="number" step="0.5" data-ex="${i}" data-field="weight" placeholder="kg" value="${weightVal}">`
      : "";
    const repsVal = log.actualReps ?? "";
    return `
      <div class="exercise-row">
        <div class="exercise-title">
          <span>${ex.name}</span>
          <span class="exercise-target">${ex.sets} x ${ex.reps}${ex.startWeight ? ` @ ${ex.startWeight}kg start` : ""}</span>
        </div>
        <div class="exercise-inputs">
          ${weightField}
          <input type="text" data-ex="${i}" data-field="actualReps" placeholder="reps done" value="${repsVal}">
          <label class="complete-row">
            <input type="checkbox" data-ex="${i}" data-field="done" ${log.done ? "checked" : ""}>
            done
          </label>
        </div>
      </div>`;
  }).join("");

  container.innerHTML = `
    <div class="card">
      <h2>${formatDate(dateISO)} — ${plan.name} <span class="badge ${plan.type}">${plan.type}</span></h2>
      ${rows}
      <div class="save-bar">
        <button id="save-today">Save workout</button>
        <span id="save-toast" class="toast"></span>
      </div>
    </div>`;

  container.querySelector("#save-today").addEventListener("click", () => {
    const log = { exercises: {}, dayIndex, completed: true };
    plan.exercises.forEach((ex, i) => {
      const weightInput = container.querySelector(`input[data-ex="${i}"][data-field="weight"]`);
      const repsInput = container.querySelector(`input[data-ex="${i}"][data-field="actualReps"]`);
      const doneInput = container.querySelector(`input[data-ex="${i}"][data-field="done"]`);
      log.exercises[ex.name] = {
        weight: weightInput ? parseFloat(weightInput.value) || null : null,
        actualReps: repsInput ? repsInput.value : "",
        done: doneInput ? doneInput.checked : false,
      };
    });
    appData.logs[dateISO] = log;
    saveData(appData);
    const toast = container.querySelector("#save-toast");
    toast.textContent = "Saved!";
    setTimeout(() => (toast.textContent = ""), 2000);
  });
}

// ---------- Schedule ----------
function renderSchedule() {
  const container = document.getElementById("schedule-content");
  const order = [1, 2, 3, 4, 5, 6, 0];
  const rows = order.map((dayIdx) => {
    const plan = WORKOUT_PLAN[dayIdx];
    const exList = plan.exercises.length
      ? plan.exercises.map((ex) => `${ex.name} — ${ex.sets}x${ex.reps}${ex.startWeight ? ` @${ex.startWeight}kg` : ""}`).join("<br>")
      : "Rest";
    return `
      <div class="card">
        <div class="schedule-day">
          <strong>${DAY_NAMES[dayIdx]}</strong>
          <span class="badge ${plan.type}">${plan.name}</span>
        </div>
        <p class="muted">${exList}</p>
      </div>`;
  }).join("");
  container.innerHTML = rows;
}

// ---------- Progress ----------
function renderWeightChart() {
  const canvas = document.getElementById("weight-chart");
  const ctx = canvas.getContext("2d");
  const entries = [...appData.bodyweight].sort((a, b) => a.date.localeCompare(b.date));
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const summary = document.getElementById("weight-summary");
  if (entries.length === 0) {
    summary.textContent = "No entries yet. Log your weight weekly to see trend.";
    return;
  }

  const weights = entries.map((e) => e.weight);
  const min = Math.min(...weights) - 2;
  const max = Math.max(...weights) + 2;
  const padding = 30;
  const w = canvas.width - padding * 2;
  const h = canvas.height - padding * 2;

  ctx.strokeStyle = "#30363d";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  ctx.strokeStyle = "#2f81f7";
  ctx.lineWidth = 2;
  ctx.beginPath();
  entries.forEach((entry, i) => {
    const x = padding + (entries.length === 1 ? 0 : (i / (entries.length - 1)) * w);
    const y = padding + h - ((entry.weight - min) / (max - min)) * h;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = "#2f81f7";
  entries.forEach((entry, i) => {
    const x = padding + (entries.length === 1 ? 0 : (i / (entries.length - 1)) * w);
    const y = padding + h - ((entry.weight - min) / (max - min)) * h;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#8b949e";
  ctx.font = "12px sans-serif";
  ctx.fillText(max.toFixed(1) + "kg", 2, padding);
  ctx.fillText(min.toFixed(1) + "kg", 2, canvas.height - padding);

  const first = entries[0].weight;
  const last = entries[entries.length - 1].weight;
  const delta = (last - first).toFixed(1);
  summary.textContent = `${entries.length} entries. ${first}kg -> ${last}kg (${delta >= 0 ? "+" : ""}${delta}kg)`;
}

function initWeightForm() {
  const form = document.getElementById("weight-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("weight-input");
    const weight = parseFloat(input.value);
    if (!weight) return;
    const date = todayISO();
    const existingIdx = appData.bodyweight.findIndex((entry) => entry.date === date);
    if (existingIdx >= 0) appData.bodyweight[existingIdx].weight = weight;
    else appData.bodyweight.push({ date, weight });
    saveData(appData);
    input.value = "";
    renderWeightChart();
  });
}

// ---------- History ----------
function renderHistory() {
  const container = document.getElementById("history-content");
  const dates = Object.keys(appData.logs).sort().reverse();
  if (dates.length === 0) {
    container.innerHTML = `<div class="card muted">No workouts logged yet.</div>`;
    return;
  }
  container.innerHTML = dates.map((date) => {
    const log = appData.logs[date];
    const planName = WORKOUT_PLAN[log.dayIndex]?.name || "Workout";
    const items = Object.entries(log.exercises || {}).map(([name, v]) =>
      `${name}: ${v.weight ? v.weight + "kg" : ""} ${v.actualReps ? "x " + v.actualReps : ""} ${v.done ? "✓" : ""}`
    ).join("<br>");
    return `
      <div class="history-entry">
        <div class="date">${formatDate(date)} — ${planName}</div>
        <div class="muted">${items}</div>
      </div>`;
  }).join("");
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  renderToday();
  renderSchedule();
  initWeightForm();
  renderWeightChart();
});
