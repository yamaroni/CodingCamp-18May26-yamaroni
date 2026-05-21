/* =============================================================================
   Todo-Life Dashboard — js/app.js
   ============================================================================= */

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------
const CONFIG = {
  TIMER_DURATION_SECONDS: 25 * 60, // 1500
  STORAGE_KEY_TASKS: 'todo_life_tasks',
  STORAGE_KEY_LINKS: 'todo_life_links',
  GREETING_THRESHOLDS: {
    MORNING:   { start: 5,  end: 12 }, // 05:00–11:59
    AFTERNOON: { start: 12, end: 18 }, // 12:00–17:59
    EVENING:   { start: 18, end: 22 }, // 18:00–21:59
    // NIGHT: everything else (22:00–04:59)
  },
};

// ---------------------------------------------------------------------------
// StorageService
// ---------------------------------------------------------------------------
const StorageService = {
  /**
   * Read and JSON-parse a value from localStorage.
   * Returns null if the key is absent or if JSON parsing fails.
   * @param {string} key
   * @returns {any|null}
   */
  load(key) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return null;
      return JSON.parse(raw);
    } catch (err) {
      console.warn('[StorageService.load] Failed to read key:', key, err);
      return null;
    }
  },

  /**
   * JSON-stringify and write a value to localStorage.
   * On error, fires a non-blocking warning (console.warn + UI toast).
   * @param {string} key
   * @param {any} value
   * @returns {boolean} true on success, false on failure
   */
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn('[StorageService.save] Failed to write key:', key, err);
      showStorageWarning('Unable to save data. Storage may be full or unavailable.');
      return false;
    }
  },

  /**
   * Returns true if localStorage is available and writable.
   * @returns {boolean}
   */
  isAvailable() {
    const testKey = '__storage_test__';
    try {
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return true;
    } catch (err) {
      return false;
    }
  },
};

// ---------------------------------------------------------------------------
// showStorageWarning — UI toast for storage errors
// ---------------------------------------------------------------------------
function showStorageWarning(message) {
  const el = document.getElementById('storage-warning');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 5000);
}

// ---------------------------------------------------------------------------
// generateId — crypto.randomUUID with fallback
// ---------------------------------------------------------------------------
function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return Date.now().toString() + Math.random().toString(36).slice(2);
}

// ---------------------------------------------------------------------------
// GreetingWidget — stub (logic implemented in task 2.x)
// ---------------------------------------------------------------------------
const GreetingWidget = {
  init() {
    // TODO: start setInterval(tick, 60_000), call tick() immediately
  },
  tick() {
    // TODO: read clock, update #greeting-text, #time-display, #date-display
  },
};

// ---------------------------------------------------------------------------
// FocusTimer — stub (logic implemented in task 2.x)
// ---------------------------------------------------------------------------
const FocusTimer = {
  init() {
    // TODO: attach click listeners to #btn-start, #btn-stop, #btn-reset
  },
  start() {
    // TODO: set interval, disable start button
  },
  stop() {
    // TODO: clear interval, enable start button
  },
  reset() {
    // TODO: stop + restore remaining to CONFIG.TIMER_DURATION_SECONDS
  },
  tick() {
    // TODO: decrement remaining, update display, check for 00:00
  },
  render() {
    // TODO: format remaining as MM:SS, write to #timer-display
  },
};

// ---------------------------------------------------------------------------
// TodoList — stub (logic implemented in task 2.x)
// ---------------------------------------------------------------------------
const TodoList = {
  init() {
    // TODO: load from storage, render, attach form listener
  },
  addTask(text) {
    // TODO: create Task, push to tasks[], save, render
  },
  editTask(id, text) {
    // TODO: find by id, update text, save, render
  },
  toggleTask(id) {
    // TODO: flip completed, save, render
  },
  deleteTask(id) {
    // TODO: filter out by id, save, render
  },
  render() {
    // TODO: rebuild #task-list UL from tasks[]
  },
  save() {
    // TODO: StorageService.save(CONFIG.STORAGE_KEY_TASKS, tasks)
  },
};

// ---------------------------------------------------------------------------
// QuickLinks — stub (logic implemented in task 2.x)
// ---------------------------------------------------------------------------
const QuickLinks = {
  init() {
    // TODO: load from storage, render, attach form listener
  },
  addLink(label, url) {
    // TODO: create Link, push, save, render
  },
  deleteLink(id) {
    // TODO: filter out by id, save, render
  },
  render() {
    // TODO: rebuild #links-grid from links[]
  },
  save() {
    // TODO: StorageService.save(CONFIG.STORAGE_KEY_LINKS, links)
  },
};

// ---------------------------------------------------------------------------
// init — bootstrap all widgets on DOMContentLoaded
// ---------------------------------------------------------------------------
function init() {
  GreetingWidget.init();
  FocusTimer.init();
  TodoList.init();
  QuickLinks.init();
}

document.addEventListener('DOMContentLoaded', init);
