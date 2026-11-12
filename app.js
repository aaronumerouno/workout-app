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

const BONUS_WORKOUT = {
  name: "Bonus Full Body (optional)",
  type: "strength",
  exercises: [
    { name: "Dumbbell Deadlift", sets: 3, reps: 10, startWeight: 20 },
    { name: "Dumbbell Floor Press", sets: 3, reps: 10, startWeight: 20 },
    { name: "Dumbbell Goblet Squat", sets: 3, reps: 12, startWeight: 20 },
    { name: "One-Arm Row", sets: 3, reps: 12, startWeight: 20 },
    { name: "Plank", sets: 3, reps: "45s hold", startWeight: null },
  ],
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const HOW_TO = {
  "Goblet Squat": "Hold a dumbbell vertically against your chest with both hands. Feet shoulder-width apart, toes slightly out. Sit your hips back and down, chest up, elbows brushing your knees at the bottom. Drive through your heels to stand back up.",
  "Dumbbell Goblet Squat": "Hold a dumbbell vertically against your chest with both hands. Feet shoulder-width apart, toes slightly out. Sit your hips back and down, chest up, elbows brushing your knees at the bottom. Drive through your heels to stand back up.",
  "Dumbbell Bench Press": "Lie on a bench holding a dumbbell in each hand above your chest, palms forward. Lower the dumbbells slowly to chest level, elbows around 45°, then press back up until arms are extended.",
  "Bent-Over Row": "Hinge at the hips with a slight knee bend, back flat, dumbbells hanging below your shoulders. Pull the weights up toward your lower ribs, squeezing your shoulder blades together, then lower with control.",
  "Dumbbell Shoulder Press": "Sit or stand holding dumbbells at shoulder height, palms forward. Press straight overhead until arms are extended, then lower back to shoulder height with control.",
  "Plank": "Forearms on the floor, elbows under shoulders, body in a straight line from head to heels. Brace your core and glutes — don't let your hips sag or pike up. Hold for the time listed.",
  "Warm-up Walk": "Easy-paced walk on a treadmill or around the gym floor to raise your heart rate and loosen up before training.",
  "Steady-State Cardio (incline walk/bike/elliptical)": "Pick one machine (treadmill incline, bike, elliptical) and hold a pace where you could still talk in short sentences but it takes some effort — that's Zone 2.",
  "HIIT Intervals (30s hard / 90s easy x5)": "Alternate 30 seconds at a hard, near-max effort with 90 seconds at an easy recovery pace. Repeat for the listed number of rounds.",
  "Bicycle Crunch": "Lie on your back, hands behind your head, knees bent. Bring opposite elbow to opposite knee while extending the other leg, alternating sides in a pedaling motion.",
  "Leg Raises": "Lie flat on your back, legs straight. Keeping your lower back pressed into the floor, raise your legs to vertical, then lower them slowly without touching down.",
  "Side Plank (each side)": "Lie on your side, prop yourself up on one forearm with elbow under your shoulder. Lift your hips so your body forms a straight line, hold, then switch sides.",
  "Romanian Deadlift": "Hold dumbbells in front of your thighs. With a slight knee bend, hinge at the hips and lower the weights along your legs, back flat, until you feel a stretch in your hamstrings. Drive your hips forward to stand back up.",
  "Lat Pulldown": "Sit at the machine, grip the bar wider than shoulder-width. Pull the bar down to your upper chest, squeezing your shoulder blades down and together, then let it rise back up with control.",
  "Walking Lunges (per leg)": "Holding dumbbells at your sides, step forward into a lunge until both knees are around 90°, then push off the front foot into the next step.",
  "Incline Dumbbell Press": "On an incline bench (around 30-45°), press dumbbells from shoulder height straight up over your chest, then lower back down with control.",
  "Russian Twists": "Sit with knees bent, lean back slightly, feet lifted or on the floor. Rotate your torso side to side, tapping the floor (or a weight) beside your hips each time.",
  "Deadlift": "Stand with feet hip-width, weight on the floor in front of you. Hinge down keeping your back flat, grip the weight, then drive through your heels to stand tall, keeping the weight close to your body.",
  "Dumbbell Deadlift": "Hold a dumbbell in each hand in front of your thighs, feet hip-width. Hinge at the hips, lowering the weights along your legs with a flat back, then drive through your heels to stand back up.",
  "Push-Ups / DB Floor Press": "Push-up: hands under shoulders, body straight, lower your chest to the floor and press back up. Floor press alternative: lie on the floor, press dumbbells up from chest level to full extension.",
  "Dumbbell Floor Press": "Lie on the floor with knees bent, holding a dumbbell in each hand above your chest. Lower your elbows to the floor, then press the dumbbells back up to full extension.",
  "Seated Cable Row": "Sit at the machine with knees slightly bent, grip the handle. Pull it toward your lower abdomen, squeezing your shoulder blades together, then extend your arms back out with control.",
  "Lateral Raises": "Hold a light dumbbell in each hand at your sides. With a slight elbow bend, raise your arms out to the sides to about shoulder height, then lower slowly.",
  "Mountain Climbers": "Start in a push-up position. Drive your knees alternately toward your chest in a quick running motion, keeping your hips low and core tight.",
  "One-Arm Row": "Place one knee and hand on a bench for support, other foot on the floor. Pull a dumbbell up toward your hip with the free hand, squeezing your shoulder blade, then lower with control. Switch sides after your set.",
};

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
function howToHTML(ex, uid) {
  const text = HOW_TO[ex.name] || "Perform with controlled form, focusing on the target muscles.";
  return `
    <div class="howto-wrap">
      <button type="button" class="howto-toggle" data-target="howto-${uid}">How to ▾</button>
      <p class="exercise-howto hidden" id="howto-${uid}">${text}</p>
    </div>`;
}

function wireHowToToggles(root) {
  root.querySelectorAll(".howto-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = root.querySelector(`#${btn.dataset.target}`);
      const isHidden = target.classList.toggle("hidden");
      btn.textContent = isHidden ? "How to ▾" : "How to ▴";
    });
  });
}

function renderWorkoutCard(container, plan, dateISO, dayIndex, isBonus) {
  const existingLog = appData.logs[dateISO] || { exercises: {}, completed: false };
  const cardPrefix = isBonus ? "bonus" : "main";

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
        ${howToHTML(ex, `${cardPrefix}-${i}`)}
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

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${formatDate(dateISO)} — ${plan.name} <span class="badge ${plan.type}">${plan.type}</span></h2>
    ${rows}
    <div class="save-bar">
      <button class="save-today">Save workout</button>
      <span class="save-toast toast"></span>
    </div>`;

  card.querySelector(".save-today").addEventListener("click", () => {
    const log = { exercises: {}, dayIndex, completed: true, bonus: !!isBonus };
    plan.exercises.forEach((ex, i) => {
      const weightInput = card.querySelector(`input[data-ex="${i}"][data-field="weight"]`);
      const repsInput = card.querySelector(`input[data-ex="${i}"][data-field="actualReps"]`);
      const doneInput = card.querySelector(`input[data-ex="${i}"][data-field="done"]`);
      log.exercises[ex.name] = {
        weight: weightInput ? parseFloat(weightInput.value) || null : null,
        actualReps: repsInput ? repsInput.value : "",
        done: doneInput ? doneInput.checked : false,
      };
    });
    log.planName = plan.name;
    appData.logs[dateISO] = log;
    saveData(appData);
    const toast = card.querySelector(".save-toast");
    toast.textContent = "Saved!";
    setTimeout(() => (toast.textContent = ""), 2000);
  });

  container.appendChild(card);
  wireHowToToggles(card);
}

function renderToday() {
  const container = document.getElementById("today-content");
  container.innerHTML = "";
  const dateISO = todayISO();
  const dayIndex = new Date().getDay();
  const plan = WORKOUT_PLAN[dayIndex];

  if (plan.type === "rest") {
    const restCard = document.createElement("div");
    restCard.className = "card";
    restCard.innerHTML = `
      <h2>${formatDate(dateISO)}</h2>
      <div class="rest-day">
        <div class="badge rest">Rest Day</div>
        <p>${plan.name}. Optional light walk or stretching — no lifting today.</p>
      </div>
      <div class="save-bar">
        <button class="secondary" id="train-anyway">Train anyway</button>
      </div>`;
    container.appendChild(restCard);

    restCard.querySelector("#train-anyway").addEventListener("click", () => {
      restCard.querySelector("#train-anyway").remove();
      renderWorkoutCard(container, BONUS_WORKOUT, dateISO, dayIndex, true);
    });
    return;
  }

  renderWorkoutCard(container, plan, dateISO, dayIndex, false);
}

// ---------- Schedule ----------
function renderSchedule() {
  const container = document.getElementById("schedule-content");
  const order = [1, 2, 3, 4, 5, 6, 0];
  container.innerHTML = "";

  order.forEach((dayIdx) => {
    const plan = WORKOUT_PLAN[dayIdx];
    const card = document.createElement("div");
    card.className = "card";

    const exRows = plan.exercises.length
      ? plan.exercises.map((ex, i) => `
          <div class="exercise-row">
            <div class="exercise-title">
              <span>${ex.name}</span>
              <span class="exercise-target">${ex.sets} x ${ex.reps}${ex.startWeight ? ` @${ex.startWeight}kg` : ""}</span>
            </div>
            ${howToHTML(ex, `sched-${dayIdx}-${i}`)}
          </div>`).join("")
      : `<p class="muted">Rest</p>`;

    card.innerHTML = `
      <div class="schedule-day">
        <strong>${DAY_NAMES[dayIdx]}</strong>
        <span class="badge ${plan.type}">${plan.name}</span>
      </div>
      ${exRows}`;

    container.appendChild(card);
    wireHowToToggles(card);
  });
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
    const planName = log.planName || WORKOUT_PLAN[log.dayIndex]?.name || "Workout";
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
