"use strict";

const STORAGE_KEY = "photo-shot-list-planner-cobie1818";

const form = document.getElementById("shot-form");
const titleInput = document.getElementById("shot-title");
const categoryInput = document.getElementById("shot-category");
const priorityInput = document.getElementById("shot-priority");
const filterInput = document.getElementById("shot-filter");
const shotList = document.getElementById("shot-list");
const shotCount = document.getElementById("shot-count");
const emptyMessage = document.getElementById("empty-message");
const feedback = document.getElementById("feedback");

const categories = Array.from(categoryInput.options, option => option.value);
const priorities = Array.from(priorityInput.options, option => option.value);

let storageWarning = "";
let shots = loadShots();

function showFeedback(message) {
  feedback.textContent = [message, storageWarning].filter(Boolean).join(" ");
}

function loadShots() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) {
      return [];
    }

    const parsed = JSON.parse(saved);
    const ids = new Set();

    // Validate stored data before using it in the interface.
    if (!Array.isArray(parsed) || !parsed.every(shot => {
      const valid =
        shot !== null &&
        typeof shot === "object" &&
        typeof shot.id === "string" &&
        shot.id.length > 0 &&
        !ids.has(shot.id) &&
        typeof shot.title === "string" &&
        shot.title.trim().length > 0 &&
        shot.title.length <= 120 &&
        categories.includes(shot.category) &&
        priorities.includes(shot.priority) &&
        typeof shot.completed === "boolean";

      if (valid) {
        ids.add(shot.id);
      }

      return valid;
    })) {
      throw new Error("Invalid saved shot list");
    }

    return parsed;
  } catch {
    storageWarning =
      "The saved list could not be loaded. An empty list is shown.";
    return [];
  }
}

function saveShots() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shots));
    storageWarning = "";
  } catch {
    storageWarning =
      "Changes could not be saved. Keep this page open to retain this list.";
  }
}

function createId() {
  let id;

  do {
    id = `shot-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  } while (shots.some(shot => shot.id === id));

  return id;
}

function createBadge(text, extraClass = "") {
  const badge = document.createElement("span");
  badge.className = `badge ${extraClass}`.trim();
  badge.textContent = text;
  return badge;
}

function createShotCard(shot) {
  const card = document.createElement("li");
  card.className = shot.completed ? "shot-card completed" : "shot-card";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "shot-checkbox";
  checkbox.checked = shot.completed;
  checkbox.id = shot.id;

  const details = document.createElement("div");
  details.className = "shot-details";

  // textContent displays user input as text, never as HTML.
  const title = document.createElement("label");
  title.className = "shot-title";
  title.htmlFor = checkbox.id;
  title.textContent = shot.title;

  const meta = document.createElement("div");
  meta.className = "shot-meta";
  meta.append(
    createBadge(shot.category),
    createBadge(
      `${shot.priority} priority`,
      `priority-${shot.priority.toLowerCase()}`
    )
  );

  details.append(title, meta);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("aria-label", `Delete shot: ${shot.title}`);

  checkbox.addEventListener("change", () => {
    shot.completed = checkbox.checked;
    saveShots();
    renderShots();

    // Restore keyboard focus after rebuilding the list.
    const updatedCheckbox = document.getElementById(shot.id);

    if (updatedCheckbox) {
      updatedCheckbox.focus();
    } else {
      filterInput.focus();
    }

    showFeedback(
      `"${shot.title}" marked ${shot.completed ? "completed" : "pending"}.`
    );
  });

  deleteButton.addEventListener("click", () => {
    shots = shots.filter(item => item.id !== shot.id);
    saveShots();
    renderShots();
    filterInput.focus();
    showFeedback(`Deleted "${shot.title}".`);
  });

  card.append(checkbox, details, deleteButton);
  return card;
}

function renderShots() {
  const selectedFilter = filterInput.value;
  const visibleShots = shots.filter(shot => {
    if (selectedFilter === "pending") {
      return !shot.completed;
    }

    if (selectedFilter === "completed") {
      return shot.completed;
    }

    return true;
  });

  shotList.replaceChildren();

  visibleShots.forEach(shot => {
    shotList.appendChild(createShotCard(shot));
  });

  const completedCount = shots.filter(shot => shot.completed).length;
  shotCount.textContent =
    `${completedCount} of ${shots.length} shots completed`;

  emptyMessage.hidden = visibleShots.length > 0;

  if (shots.length === 0) {
    emptyMessage.textContent =
      "Your list is empty. Add your first shot above.";
  } else {
    emptyMessage.textContent = `No ${selectedFilter} shots to show.`;
  }
}

titleInput.addEventListener("input", () => {
  titleInput.setCustomValidity("");
});

form.addEventListener("submit", event => {
  event.preventDefault();

  const title = titleInput.value.trim();

  if (!title) {
    titleInput.setCustomValidity("Enter a shot idea, not just spaces.");
    titleInput.reportValidity();
    return;
  }

  shots.push({
    id: createId(),
    title,
    category: categoryInput.value,
    priority: priorityInput.value,
    completed: false
  });

  saveShots();
  form.reset();

  // Show the new shot even if the completed filter was selected.
  filterInput.value = "all";
  renderShots();
  titleInput.focus();
  showFeedback(`Added "${title}".`);
});

filterInput.addEventListener("change", renderShots);

renderShots();
showFeedback("");