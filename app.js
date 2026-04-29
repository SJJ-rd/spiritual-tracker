const TARGET = 1000;
const vows = [
  '不犯殺生惡業｜培養慈悲之心', '不犯偷盜惡業｜培養知足之心', '不犯邪淫惡業｜守護清淨之心',
  '不犯妄言惡業｜培養真誠之心', '不犯惡口惡業｜培養柔和之心', '不犯兩舌惡業｜培養和合之心',
  '不犯綺語惡業｜培養正念之心', '不犯貪心惡業｜培養布施之心', '不犯瞋心惡業｜培養忍辱之心',
  '不犯痴心惡業｜培養智慧之心', '不犯慢心惡業｜培養謙卑之心', '不犯疑心惡業｜建立正信之心'
];

let count = Number(localStorage.getItem('todayBowCount') || 0);
let bpm = Number(localStorage.getItem('bpm') || 30);
let timer = null;
let running = false;

const $ = id => document.getElementById(id);
const todayKey = () => new Date().toISOString().slice(0,10);

function beep(freq = 520, dur = 0.18, type = 'sine', gain = 0.18) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const vol = ctx.createGain();
  osc.type = type; osc.frequency.value = freq;
  vol.gain.setValueAtTime(gain, ctx.currentTime);
  vol.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  osc.connect(vol); vol.connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + dur);
}
function playBell(times = 1) {
  for (let i=0;i<times;i++) setTimeout(()=>beep(880, 1.8, 'sine', i===1?0.13:0.18), i*900);
}
function playMokugyo() { beep(180, 0.12, 'triangle', 0.12); }
function intervalMs() { return 60000 / bpm; }

function updateUI() {
  $('bowCount').textContent = count;
  const pct = Math.min(100, count / TARGET * 100);
  $('progressFill').style.width = pct + '%';
  document.querySelector('.progress-ring').style.background = `conic-gradient(var(--gold) ${pct*3.6}deg, rgba(255,255,255,.08) 0deg)`;
  $('secondsPerBow').textContent = (intervalMs()/1000).toFixed(1);
  $('bpmInput').value = bpm;
  localStorage.setItem('todayBowCount', count);
  localStorage.setItem('bpm', bpm);
}
function step() {
  if (!running) return;
  count++;
  playMokugyo();
  if (count % 100 === 0 && count < TARGET) {
    $('statusText').textContent = `第 ${count} 叩，鳴磬一響`;
    playBell(1);
  } else {
    $('statusText').textContent = `修持中：第 ${count} 叩`;
  }
  updateUI();
  if (count >= TARGET) finish();
}
function start() {
  if (running || count >= TARGET) return;
  running = true;
  $('statusText').textContent = '開始前鳴磬三響';
  playBell(3);
  setTimeout(() => {
    if (!running) return;
    $('statusText').textContent = '木魚節奏開始';
    timer = setInterval(step, intervalMs());
  }, 3000);
}
function pause() {
  running = false;
  clearInterval(timer);
  $('statusText').textContent = '已暫停';
}
function reset() {
  pause(); count = 0; updateUI(); $('statusText').textContent = '已重置';
}
function finish() {
  pause(); count = TARGET; updateUI();
  $('statusText').textContent = '一千叩圓滿，鳴磬三響';
  playBell(3);
  saveRecord(true);
}
function saveRecord(autoFull=false) {
  const records = JSON.parse(localStorage.getItem('records') || '{}');
  const key = todayKey();
  records[key] = {
    date: key,
    bowCount: count,
    fullBow: autoFull || count >= TARGET,
    ritualDone: $('ritualDone').checked,
    mantraDone: $('mantraDone').checked,
    dedicationDone: $('dedicationDone').checked,
    vow: $('vowSelect').value,
    vowDone: $('vowDone').checked,
    vowReflect: $('vowReflect').checked,
    awareness: $('awareness').value,
    transformation: $('transformation').value,
    rightMind: $('rightMind').value,
    savedAt: new Date().toLocaleString('zh-TW')
  };
  localStorage.setItem('records', JSON.stringify(records));
  renderHistory(); renderStreak();
}
function loadToday() {
  const records = JSON.parse(localStorage.getItem('records') || '{}');
  const rec = records[todayKey()]; if (!rec) return;
  ['ritualDone','mantraDone','dedicationDone','vowDone','vowReflect'].forEach(id => $(id).checked = !!rec[id]);
  $('vowSelect').value = rec.vow || vows[0];
  $('awareness').value = rec.awareness || '';
  $('transformation').value = rec.transformation || '';
  $('rightMind').value = rec.rightMind || '';
}
function renderHistory() {
  const records = Object.values(JSON.parse(localStorage.getItem('records') || '{}')).sort((a,b)=>b.date.localeCompare(a.date));
  $('historyList').innerHTML = records.slice(0,14).map(r=>`<div class="history-item"><strong>${r.date}</strong><br>叩首：${r.bowCount || 0}｜完整儀軌：${r.ritualDone?'是':'否'}｜回向：${r.dedicationDone?'是':'否'}<br><small>${r.vow || ''}</small></div>`).join('') || '<p>尚無紀錄</p>';
}
function renderStreak() {
  const records = JSON.parse(localStorage.getItem('records') || '{}');
  let d = new Date(); let streak = 0;
  while (true) {
    const key = d.toISOString().slice(0,10);
    if (records[key] && (records[key].ritualDone || records[key].bowCount > 0)) { streak++; d.setDate(d.getDate()-1); }
    else break;
  }
  $('streakDays').textContent = streak;
}

vows.forEach(v => { const opt = document.createElement('option'); opt.value = v; opt.textContent = v; $('vowSelect').appendChild(opt); });
$('startBtn').onclick = start; $('pauseBtn').onclick = pause; $('resetBtn').onclick = reset;
$('saveBtn').onclick = () => { saveRecord(false); $('statusText').textContent = '今日紀錄已儲存'; };
$('clearHistoryBtn').onclick = () => { if(confirm('確定清除全部紀錄？')) { localStorage.removeItem('records'); renderHistory(); renderStreak(); } };
$('bpmInput').onchange = e => { bpm = Math.max(10, Math.min(120, Number(e.target.value)||30)); if(running){ pause(); } updateUI(); };
document.querySelectorAll('[data-bpm]').forEach(btn => btn.onclick = () => { bpm = Number(btn.dataset.bpm); if(running){ pause(); } updateUI(); });
updateUI(); loadToday(); renderHistory(); renderStreak();
