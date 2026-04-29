// ===== 儀軌 =====
const steps = [
`【入壇】
調息三次
觀想光明與法界相應`,

`【觀照】
若人欲了知
三世一切佛
一切唯心造`,

`【真懺悔】
罪從心起將心懺
心若滅時罪亦亡`,

`【發願】`,

`【叩首修行】`,

`【回向】願以此功德普及一切`
];

let step = parseInt(localStorage.getItem("step") || 0);

function showStep(){
  document.getElementById("ritual").innerText = steps[step];
}
showStep();

function nextStep(){
  if(step < steps.length-1){
    step++;
    localStorage.setItem("step", step);
    showStep();
    if(step === 4) startPractice();
  }
}

function prevStep(){
  if(step > 0){
    step--;
    localStorage.setItem("step", step);
    showStep();
  }
}

// ===== 音訊系統 =====
const ctx = new (window.AudioContext||window.webkitAudioContext)();
let bellBuf, muyuBuf;

async function load(url){
  let r = await fetch(url);
  let b = await r.arrayBuffer();
  return await ctx.decodeAudioData(b);
}

async function initAudio(){
  await ctx.resume();
  bellBuf = await load("assets/bells.mp3");
  muyuBuf = await load("assets/muyu.mp3");
}

function play(buf, volume=1){
  let s = ctx.createBufferSource();
  let g = ctx.createGain();
  g.gain.value = volume;

  s.buffer = buf;
  s.connect(g);
  g.connect(ctx.destination);
  s.start();
}

// ===== 引磬三響（優化節奏）=====
async function bell3(){
  play(bellBuf,1.0);   // 開
  await sleep(1200);

  play(bellBuf,0.85);  // 承
  await sleep(1600);

  play(bellBuf,0.95);  // 收
}

// ===== 木魚系統 =====
let count = 0;
let timer;

function startMuyu(){
  let bpm = document.getElementById("bpm").value;
  let delay = 60000 / bpm;

  timer = setInterval(()=>{
    play(muyuBuf,0.7);
    count++;
    document.getElementById("count").innerText = count;

    if(count % 100 === 0){
      clearInterval(timer);
      play(bellBuf);
      setTimeout(startMuyu,1200);
    }

    if(count >= 1000){
      clearInterval(timer);
      bell3();
      alert("🪷 一千叩首圓滿");
      saveStreak();
    }

  }, delay);
}

// ===== 開始修行 =====
async function startPractice(){
  await initAudio();
  await bell3();

  setTimeout(()=>{
    startMuyu();
  },2000);
}

document.getElementById("startBtn").onclick = startPractice;

// ===== 工具 =====
function sleep(ms){
  return new Promise(r=>setTimeout(r,ms));
}

// ===== 習氣紀錄 =====
function saveHabit(){
  localStorage.setItem("habit",
    document.getElementById("habit").value);
  alert("已儲存");
}
document.getElementById("habit").value =
  localStorage.getItem("habit") || "";

// ===== 連續天數 =====
function saveStreak(){
  let today = new Date().toDateString();
  let last = localStorage.getItem("last");
  let streak = parseInt(localStorage.getItem("streak") || 0);

  if(last !== today){
    streak++;
    localStorage.setItem("streak", streak);
    localStorage.setItem("last", today);
  }

  document.getElementById("streak").innerText = streak;
}

document.getElementById("streak").innerText =
  localStorage.getItem("streak") || 0;
