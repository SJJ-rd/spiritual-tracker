const steps = [
`【入壇｜前調心】
作揖 → 跪

調息三次
默念五字箴言三遍

觀想：
自心一點光明
與法界光明相應
無二無別`,

`【覺醒觀照】
若人欲了知
三世一切佛
應觀法界性
一切唯心造`,

`【真懺悔核心觀】
罪從心起將心懺
心若滅時罪亦亡
心亡罪滅兩俱空
是則名為真懺悔`,

`【發願文】
感恩仙佛慈悲
給予弟子施竣傑
懺悔之機
修行之法

願我思慮清明
心念穩定
行事有序
辦事精進`,

`【十二項拜懺願】
願我與一切眾生
不犯殺生惡業
培養慈悲之心

願我與一切眾生
不犯偷盜惡業
培養知足之心

願我與一切眾生
不犯邪淫惡業
守護清淨之心

願我與一切眾生
不犯妄言惡業
培養真誠之心

願我與一切眾生
不犯惡口惡業
培養柔和之心

願我與一切眾生
不犯兩舌惡業
培養和合之心

願我與一切眾生
不犯綺語惡業
培養正念之心

願我與一切眾生
不犯貪心惡業
培養布施之心

願我與一切眾生
不犯瞋心惡業
培養忍辱之心

願我與一切眾生
不犯痴心惡業
培養智慧之心

願我與一切眾生
不犯慢心惡業
培養謙卑之心

願我與一切眾生
不犯疑心惡業
建立正信之心`,

`【叩首修行】
明明上帝十叩首

接續一千叩首
一叩一懺悔
一叩一轉心`,

`【回向】
願我今日所修一切功德
優先回向冤親大德

願其離苦得樂
怨結化解
轉為護法善緣

願以此功德
普及於一切

我等與眾生
皆共成佛道`
];

let step = parseInt(localStorage.getItem("step") || 0);
let count = 0;
let timer = null;
let running = false;

function showStep() {
  document.getElementById("ritual").innerText = steps[step];
}
showStep();

function nextStep() {
  if (step < steps.length - 1) {
    step++;
    localStorage.setItem("step", step);
    showStep();
  }
}

function prevStep() {
  if (step > 0) {
    step--;
    localStorage.setItem("step", step);
    showStep();
  }
}

// ===== 音訊 =====
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let bellBuf, muyuBuf, convolver, dryGain, wetGain;

async function loadBuffer(url) {
  const res = await fetch(url);
  const arr = await res.arrayBuffer();
  return await audioCtx.decodeAudioData(arr);
}

async function initAudio() {
  await audioCtx.resume();
  bellBuf = await loadBuffer("assets/bells.mp3");
  muyuBuf = await loadBuffer("assets/muyu.mp3");

  try {
    const ir = await loadBuffer("assets/temple.wav");
    convolver = audioCtx.createConvolver();
    convolver.buffer = ir;

    dryGain = audioCtx.createGain();
    wetGain = audioCtx.createGain();

    dryGain.gain.value = 0.65;
    wetGain.gain.value = 0.35;

    convolver.connect(wetGain);
    wetGain.connect(audioCtx.destination);
  } catch {
    convolver = null;
  }
}

function play(buf, volume = 1) {
  const source = audioCtx.createBufferSource();
  const gain = audioCtx.createGain();

  source.buffer = buf;
  gain.gain.value = volume;

  source.connect(gain);

  if (convolver) {
    gain.connect(dryGain);
    gain.connect(convolver);
    dryGain.connect(audioCtx.destination);
  } else {
    gain.connect(audioCtx.destination);
  }

  source.start();
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function bell3() {
  play(bellBuf, 1.0);
  await sleep(1200);
  play(bellBuf, 0.85);
  await sleep(1600);
  play(bellBuf, 0.95);
  await sleep(2000);
}

// ===== 叩首 =====
async function startPractice() {
  if (running) return;

  running = true;
  count = 0;
  updateCount();
  setStatus("🔔 入壇引磬中...");

  await initAudio();
  await bell3();

  setStatus("🥁 叩首進行中...");
  startMuyu();
}

function startMuyu() {
  const bpm = parseInt(document.getElementById("bpm").value || 30);
  const delay = 60000 / bpm;

  timer = setInterval(async () => {
    play(muyuBuf, 0.7);
    count++;
    updateCount();

    if (count > 0 && count % 100 === 0 && count < 1000) {
      clearInterval(timer);
      setStatus(`🔔 已完成 ${count} 叩`);
      play(bellBuf, 1);
      await sleep(1600);
      setStatus("🥁 叩首進行中...");
      startMuyu();
    }

    if (count >= 1000) {
      clearInterval(timer);
      setStatus("🪷 一千叩首圓滿");
      await bell3();
      saveDailyRecord(1000);
      saveStreak();
      updateStats();
      document.getElementById("done").checked = true;
      running = false;
      alert("🪷 一千叩首圓滿");
    }
  }, delay);
}

function pausePractice() {
  clearInterval(timer);
  running = false;
  setStatus("已暫停");
}

function resetPractice() {
  clearInterval(timer);
  running = false;
  count = 0;
  updateCount();
  setStatus("已重置");
}

function updateCount() {
  document.getElementById("count").innerText = count;
  const percent = Math.min((count / 1000) * 100, 100);
  document.getElementById("progressBar").style.width = percent + "%";
}

function setStatus(text) {
  document.getElementById("status").innerText = text;
}

document.getElementById("startBtn").onclick = startPractice;

// ===== 習氣 =====
function saveHabit() {
  const today = new Date().toISOString().slice(0,10);
  const habit = document.getElementById("habit").value;
  localStorage.setItem("habit_" + today, habit);
  alert("已儲存");
}

// ===== 連續天數 =====
function saveStreak() {
  const today = new Date().toDateString();
  const last = localStorage.getItem("last");
  let streak = parseInt(localStorage.getItem("streak") || 0);

  if (last !== today) {
    streak++;
    localStorage.setItem("streak", streak);
    localStorage.setItem("last", today);
  }

  document.getElementById("streak").innerText = streak;
}

// ===== 紀錄 =====
function saveDailyRecord(amount) {
  const today = new Date().toISOString().slice(0,10);
  const records = JSON.parse(localStorage.getItem("records") || "{}");
  records[today] = (records[today] || 0) + amount;
  localStorage.setItem("records", JSON.stringify(records));
}

function getRecords() {
  return JSON.parse(localStorage.getItem("records") || "{}");
}

function getTotal() {
  const records = getRecords();
  return Object.values(records).reduce((a,b) => a + b, 0);
}

function getLevel(total) {
  if (total >= 100000) return "圓滿精進｜十萬叩";
  if (total >= 50000) return "深修穩定｜五萬叩";
  if (total >= 10000) return "精進入門｜一萬叩";
  if (total >= 3000) return "穩定累積｜三千叩";
  return "初發心";
}

// ===== 圖表 =====
let chartInstance = null;

function loadChart() {
  const records = getRecords();
  const labels = Object.keys(records);
  const values = Object.values(records);

  const ctx = document.getElementById("chart").getContext("2d");

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "每日叩首數",
        data: values,
        borderColor: "#ffd700",
        backgroundColor: "rgba(255,215,0,0.2)",
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// ===== 熱力圖 =====
function loadHeatmap() {
  const records = getRecords();
  const box = document.getElementById("heatmap");
  box.innerHTML = "";

  for (let i = 89; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0,10);
    const value = records[key] || 0;

    const cell = document.createElement("div");
    cell.className = "day";

    if (value >= 1000) cell.classList.add("lv3");
    else if (value >= 300) cell.classList.add("lv2");
    else if (value > 0) cell.classList.add("lv1");

    cell.title = `${key}：${value} 叩`;
    box.appendChild(cell);
  }
}

function updateStats() {
  const total = getTotal();
  document.getElementById("total").innerText = total;
  document.getElementById("level").innerText = getLevel(total);
  document.getElementById("streak").innerText = localStorage.getItem("streak") || 0;
  loadChart();
  loadHeatmap();
}

updateStats();

// ===== PWA =====
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
