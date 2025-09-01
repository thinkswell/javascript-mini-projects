// Routine options for each cue
const routines = {
  sad: ["Go for a gym workout", "Take a walk in the park", "Do a 10-min meditation"],
  stressed: ["Try deep breathing", "Write down thoughts", "Listen to relaxing music"],
  excited: ["Dance to your favorite song", "Plan something creative", "Share joy with a friend"],
  default: ["Take a deep breath", "Smile and stretch", "Drink water"]
};

// Motivational lines
const motivationLines = [
  "🌟 You're stronger than you think!",
  "💪 Keep going, amazing things await!",
  "🔥 One small step today builds a better tomorrow.",
  "🌈 You're creating a better version of yourself!"
];

// Rewards (with emojis)
const rewards = [
  "🍫 Enjoy a sweet treat!",
  "🍽️ Have a delicious meal!",
  "☕ Relax with your favorite drink!",
  "🎶 Play your favorite song!",
  "🛋️ Take a cozy rest!"
];

// Quotes
const quotes = [
  "Every day is a second chance.",
  "Push yourself, no one else will do it for you.",
  "Small progress is still progress.",
  "Believe you can and you're halfway there."
];

// Initialize variables
let streak = 0;
let timerInterval = null;
let timerSeconds = 0;
let currentRoutine = null;
let userData = {
  activities: [],
  completionStats: {},
  cueStats: {},
  routineTimes: []
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  loadUserData();
  initializeTabs();
  initializeCalendar();
  updateStats();
  
  // Handle cue input
  document.getElementById("cueBtn").addEventListener("click", handleCueInput);
  
  // Timer controls
  document.getElementById("startTimer").addEventListener("click", startTimer);
  document.getElementById("pauseTimer").addEventListener("click", pauseTimer);
  document.getElementById("resetTimer").addEventListener("click", resetTimer);
  document.getElementById("completeRoutine").addEventListener("click", completeRoutine);
  
  // Calendar navigation
  document.getElementById("prevMonth").addEventListener("click", showPreviousMonth);
  document.getElementById("nextMonth").addEventListener("click", showNextMonth);
});

// Tab functionality
function initializeTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById(`${tabId}-tab`).classList.add('active');
      
      // Update stats and calendar when switching to those tabs
      if (tabId === 'stats') updateStats();
      if (tabId === 'calendar') renderCalendar(currentMonth, currentYear);
    });
  });
}

// Handle cue input
function handleCueInput() {
  const cue = document.getElementById("cueInput").value.toLowerCase();
  const routineSection = document.getElementById("routineSection");
  routineSection.innerHTML = "";

  const availableRoutines = routines[cue] || routines.default;

  availableRoutines.forEach(routine => {
    const btn = document.createElement("button");
    btn.textContent = routine;
    btn.classList.add("routine-option");
    btn.addEventListener("click", () => selectRoutine(routine, cue));
    routineSection.appendChild(btn);
  });

  document.getElementById("motivation").textContent = "";
  document.getElementById("reward").style.display = "none";
  document.getElementById("checklist").innerHTML = "";
  document.getElementById("timerSection").style.display = "none";
}

// When user selects a routine
function selectRoutine(routine, cue) {
  currentRoutine = routine;
  const routineSection = document.getElementById("routineSection");
  routineSection.innerHTML = `<h3>${routine}</h3>`;

  // Show timer section
  document.getElementById("timerSection").style.display = "block";
  resetTimer();

  // Motivation
  const motivation = motivationLines[Math.floor(Math.random() * motivationLines.length)];
  document.getElementById("motivation").textContent = motivation;

  // Checklist
  document.getElementById("checklist").innerHTML = `
    <h4>✅ To-Do Checklist</h4>
    <label><input type="checkbox"> Start the routine</label><br>
    <label><input type="checkbox"> Stay consistent</label><br>
    <label><input type="checkbox"> Celebrate progress</label><br>
  `;

  // Track cue usage
  if (userData.cueStats[cue]) {
    userData.cueStats[cue]++;
  } else {
    userData.cueStats[cue] = 1;
  }
  
  saveUserData();
}

// Timer functions
function startTimer() {
  if (timerInterval) return;
  
  document.getElementById("startTimer").disabled = true;
  document.getElementById("pauseTimer").disabled = false;
  document.getElementById("resetTimer").disabled = false;
  
  timerInterval = setInterval(() => {
    timerSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  
  document.getElementById("startTimer").disabled = false;
  document.getElementById("pauseTimer").disabled = true;
}

function resetTimer() {
  pauseTimer();
  timerSeconds = 0;
  updateTimerDisplay();
  
  document.getElementById("startTimer").disabled = false;
  document.getElementById("pauseTimer").disabled = true;
  document.getElementById("resetTimer").disabled = true;
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  document.getElementById("timerDisplay").textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function completeRoutine() {
  pauseTimer();
  
  // Record activity
  const activity = {
    routine: currentRoutine,
    date: new Date(),
    duration: timerSeconds
  };
  
  userData.activities.push(activity);
  
  // Track routine completion
  if (userData.completionStats[currentRoutine]) {
    userData.completionStats[currentRoutine]++;
  } else {
    userData.completionStats[currentRoutine] = 1;
  }
  
  // Track routine time
  userData.routineTimes.push(timerSeconds);
  
  // Update streak
  updateStreak();
  
  // Reward with emojis + animation
  const reward = rewards[Math.floor(Math.random() * rewards.length)];
  const rewardDiv = document.getElementById("reward");
  rewardDiv.textContent = reward;
  rewardDiv.style.display = "block";
  
  // Update quote
  document.getElementById("quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];
  
  saveUserData();
}

function updateStreak() {
  // Simple streak implementation - in a real app, you'd check consecutive days
  streak++;
  document.getElementById("streak").textContent = streak;
}

// Calendar functionality
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function initializeCalendar() {
  renderCalendar(currentMonth, currentYear);
}

function renderCalendar(month, year) {
  const calendarEl = document.getElementById("calendar");
  const monthNames = ["January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December"];
  
  document.getElementById("currentMonth").textContent = `${monthNames[month]} ${year}`;
  
  // Clear previous calendar
  calendarEl.innerHTML = '';
  
  // Create day headers
  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayHeaders.forEach(day => {
    const dayEl = document.createElement("div");
    dayEl.textContent = day;
    dayEl.style.fontWeight = "bold";
    dayEl.style.textAlign = "center";
    calendarEl.appendChild(dayEl);
  });
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Add empty days before first day of month
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("calendar-day", "empty");
    calendarEl.appendChild(emptyDay);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEl = document.createElement("div");
    dayEl.classList.add("calendar-day");
    dayEl.textContent = day;
    
    // Check if this day has any activities (simplified for demo)
    const hasActivity = Math.random() > 0.7; // Random for demo
    if (hasActivity) {
      const completion = Math.random(); // Random for demo
      if (completion > 0.7) {
        dayEl.classList.add("completed");
      } else if (completion > 0.4) {
        dayEl.classList.add("partial");
      } else {
        dayEl.classList.add("missed");
      }
    }
    
    calendarEl.appendChild(dayEl);
  }
}

function showPreviousMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
}

function showNextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
}

// Statistics functionality
function updateStats() {
  updateCuesChart();
  updateRoutinesChart();
  updateAverageTime();
  updateCompletionRate();
  updateRecentActivities();
}

function updateCuesChart() {
  const chartContainer = document.getElementById("cuesChart");
  chartContainer.innerHTML = '';
  
  // Get top cues
  const topCues = Object.entries(userData.cueStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  if (topCues.length === 0) {
    chartContainer.innerHTML = '<p>No data yet</p>';
    return;
  }
  
  const maxValue = Math.max(...topCues.map(item => item[1]));
  
  topCues.forEach(([cue, count]) => {
    const barHeight = (count / maxValue) * 100;
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${barHeight}%`;
    bar.title = `${cue}: ${count} times`;
    
    const label = document.createElement("div");
    label.classList.add("bar-label");
    label.textContent = cue.substring(0, 3);
    
    chartContainer.appendChild(bar);
    chartContainer.appendChild(label);
  });
}

function updateRoutinesChart() {
  const chartContainer = document.getElementById("routinesChart");
  chartContainer.innerHTML = '';
  
  // Get top routines
  const topRoutines = Object.entries(userData.completionStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  if (topRoutines.length === 0) {
    chartContainer.innerHTML = '<p>No data yet</p>';
    return;
  }
  
  const maxValue = Math.max(...topRoutines.map(item => item[1]));
  
  topRoutines.forEach(([routine, count]) => {
    const barHeight = (count / maxValue) * 100;
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${barHeight}%`;
    bar.title = `${routine}: ${count} times`;
    
    const label = document.createElement("div");
    label.classList.add("bar-label");
    label.textContent = routine.split(' ')[0].substring(0, 3);
    
    chartContainer.appendChild(bar);
    chartContainer.appendChild(label);
  });
}

function updateAverageTime() {
  if (userData.routineTimes.length === 0) {
    document.getElementById("avgTime").textContent = "0 min";
    return;
  }
  
  const totalSeconds = userData.routineTimes.reduce((sum, time) => sum + time, 0);
  const avgSeconds = totalSeconds / userData.routineTimes.length;
  const avgMinutes = Math.round(avgSeconds / 60);
  
  document.getElementById("avgTime").textContent = `${avgMinutes} min`;
}

function updateCompletionRate() {
  // Simplified calculation for demo
  const totalActivities = userData.activities.length;
  const completed = userData.activities.filter(a => a.duration > 60).length;
  const rate = totalActivities > 0 ? Math.round((completed / totalActivities) * 100) : 0;
  
  document.getElementById("completionRate").textContent = `${rate}%`;
}

function updateRecentActivities() {
  const activitiesList = document.getElementById("recentActivities");
  activitiesList.innerHTML = '';
  
  const recentActivities = userData.activities.slice(-5).reverse();
  
  if (recentActivities.length === 0) {
    activitiesList.innerHTML = '<p>No recent activities</p>';
    return;
  }
  
  recentActivities.forEach(activity => {
    const activityItem = document.createElement("div");
    activityItem.classList.add("activity-item");
    
    const minutes = Math.floor(activity.duration / 60);
    const seconds = activity.duration % 60;
    
    activityItem.innerHTML = `
      <span class="activity-routine">${activity.routine}</span>
      <span class="activity-time">${minutes}m ${seconds}s</span>
    `;
    
    activitiesList.appendChild(activityItem);
  });
}

// Data persistence
function saveUserData() {
  localStorage.setItem('habitLoopUserData', JSON.stringify(userData));
  localStorage.setItem('habitLoopStreak', streak.toString());
}

function loadUserData() {
  const savedData = localStorage.getItem('habitLoopUserData');
  const savedStreak = localStorage.getItem('habitLoopStreak');
  
  if (savedData) {
    userData = JSON.parse(savedData);
  }
  
  if (savedStreak) {
    streak = parseInt(savedStreak);
    document.getElementById("streak").textContent = streak;
  }
}