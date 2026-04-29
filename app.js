const TARGET = 1000;
const ritualSteps = ["【入壇｜前調心】\n作揖 → 跪\n\n（調息三次，呼吸平穩）\n默念五字箴言（三遍）\n\n觀想：\n自心一點光明\n與法界光明相應\n無二無別", "【覺醒觀照（三遍）】\n若人欲了知\n三世一切佛\n應觀法界性\n一切唯心造\n\n（三遍）", "【真懺悔核心觀】\n罪從心起將心懺\n心若滅時罪亦亡\n心亡罪滅兩俱空\n是則名為真懺悔\n\n觀想：業由心起 → 念止業空 → 歸於光明", "【發願文】\n感恩仙佛慈悲\n給予弟子施竣傑\n懺悔之機\n修行之法\n\n感恩上天垂憐\n包容過往一切罪過錯\n賜予改過之因緣\n\n弟子至心祈請\n上天加被\n\n賜我覺察智慧\n能觀自心\n明辨善惡\n遠離顛倒\n\n願我思慮清明\n心念穩定\n行事有序\n辦事精進\n\n於一切人事境界\n應對得宜\n不起煩惱", "【本願】\n願生生世世\n護持正法\n永不退轉\n\n願此一生\n護持修身齊家班\n道心堅定\n實修實證\n\n願我認理實修\n依教奉行\n不偏不倚\n\n願我持守五戒\n清淨身口意\n遠離染污", "【修行願】\n願我精進修持\n專心準備淫戒課程\n\n以正知正見\n自淨其意\n\n願我定期精進\n不懈怠\n不退轉", "【弘願】\n願我以智慧德行\n漸渡公司老闆一家\n\n離迷入正\n聞法得度\n\n願我代天宣化\n弘法利生\n\n使有緣眾生\n離苦得樂", "【冤親大德發願】\n願我無始以來\n所結一切冤親債主\n\n今皆轉為\n護法善緣\n冤親大德\n\n感恩諸冤親大德\n因我無明造業\n受苦受難\n\n今日至誠懺悔\n回向功德\n\n願其離苦得樂\n怨結化解\n心開意解\n\n願不再障礙我修行\n轉為護持道業\n\n同聞正法\n同修正道\n\n未來因緣成熟\n共證菩提", "【願力總結】\n願上天加靈加智慧\n賜我勇氣與承擔\n\n使我內心堅定\n不退道心\n\n願我一切起心動念\n皆趨於正\n\n一切行為作為\n皆契於道\n\n一切因緣際會\n皆為修行助緣\n\n弟子施竣傑\n至誠發願\n\n改過自新\n永不再犯\n\n感恩仙佛慈悲攝受\n感恩上天護念加持", "【正修行】\n明明上帝十叩首\n（一叩一觀光明入心）\n\n或\n\n持誦五字箴言（108遍）", "【懺悔文】\n往昔所造諸惡業\n皆由無始貪嗔癡\n從身語意之所生\n一切我今皆懺悔\n\n愚夫施竣傑\n六萬多年來\n\n身口意業\n及所有無明\n\n造作無邊罪孽\n無邊罪業\n無邊惡業\n無邊罪過錯\n\n一併叩求\n老母大慈大悲\n赦罪容寬\n\n凡人昔日的愚痴\n造成這些冤親債主\n的痛苦折磨\n\n今日願在\n老母蓮前\n真心求懺悔\n\n叩請老母\n慈悲作主\n\n我現在真誠的懺悔\n永不再犯\n\n感恩老母\n大慈大悲\n赦罪銷業\n伏魔息考\n消災解厄", "【十二項拜懺願】\n願我與一切眾生\n不犯殺生惡業\n培養慈悲之心\n\n願我與一切眾生\n不犯偷盜惡業\n培養知足之心\n\n願我與一切眾生\n不犯邪淫惡業\n守護清淨之心\n\n願我與一切眾生\n不犯妄言惡業\n培養真誠之心\n\n願我與一切眾生\n不犯惡口惡業\n培養柔和之心\n\n願我與一切眾生\n不犯兩舌惡業\n培養和合之心\n\n願我與一切眾生\n不犯綺語惡業\n培養正念之心\n\n願我與一切眾生\n不犯貪心惡業\n培養布施之心\n\n願我與一切眾生\n不犯瞋心惡業\n培養忍辱之心\n\n願我與一切眾生\n不犯痴心惡業\n培養智慧之心\n\n願我與一切眾生\n不犯慢心惡業\n培養謙卑之心\n\n願我與一切眾生\n不犯疑心惡業\n建立正信之心", "【叩首修行】\n（一千叩首，可分段：100 / 300 / 500 / 1000）\n\n音聲規則：\n開始前：鳴磬三響\n叩首中：依 BPM 播放木魚\n每滿 100 叩：鳴磬一次\n1000 叩圓滿：鳴磬三響", "【七佛滅罪真言】（三至七遍）\n離婆離婆帝\n求訶求訶帝\n陀羅尼帝\n\n尼訶囉帝\n毗黎你帝\n摩訶伽帝\n\n真陵乾帝\n莎婆訶", "【補缺真言】（三至七遍）\n南謨喝囉怛那\n哆囉夜耶\n\n佉囉佉囉\n俱住俱住\n\n摩囉摩囉\n虎囉 吽 賀賀\n\n蘇怛拏 吽\n潑抹拏 娑婆訶", "【懺淨偈】\n懺如浣滌\n以水為名\n\n至心頂禮\n罪清淨\n\n罪滅福生\n慧日昭靈\n\n覺海性圓澄", "【求懺悔菩薩（三稱）】\n南無求懺悔菩薩摩訶薩", "【自性誓願（三遍）】\n自性眾生誓願度\n自性煩惱誓願斷\n自性法門誓願學\n自性佛道誓願成", "【冤親大德回向】\n願我今日所修一切功德\n優先回向冤親大德\n\n願其離苦得樂\n怨結化解\n轉為護法善緣", "【生活定錨】\n我心清淨\n業力轉化\n智慧現前\n行皆正道\n\n今日我覺察一個習氣\n今日我轉化一個習氣\n今日我堅定一個正念", "【普迴向】\n願以此功德\n普及於一切\n\n我等與眾生\n皆共成佛道"];
const vows = ['不犯殺生惡業｜培養慈悲之心','不犯偷盜惡業｜培養知足之心','不犯邪淫惡業｜守護清淨之心','不犯妄言惡業｜培養真誠之心','不犯惡口惡業｜培養柔和之心','不犯兩舌惡業｜培養和合之心','不犯綺語惡業｜培養正念之心','不犯貪心惡業｜培養布施之心','不犯瞋心惡業｜培養忍辱之心','不犯痴心惡業｜培養智慧之心','不犯慢心惡業｜培養謙卑之心','不犯疑心惡業｜建立正信之心'];
const $ = id => document.getElementById(id);
const todayKey = () => new Date().toISOString().slice(0,10);
const storageKey = name => `spiritualTracker:${todayKey()}:${name}`;
let count = Number(localStorage.getItem(storageKey('bowCount')) || 0);
let bpm = Number(localStorage.getItem('spiritualTracker:bpm') || 30);
let timer = null, running = false;
let currentStep = Number(localStorage.getItem(storageKey('ritualStep')) || 0);
function cloneAudio(el){ const a = el.cloneNode(true); a.volume = Number(el.volume || 1); return a; }
function playAudio(id){ const a = cloneAudio($(id)); a.currentTime = 0; a.play().catch(()=>{}); }
function playBell(times=1){ for(let i=0;i<times;i++) setTimeout(()=>playAudio('bellAudio'), i*950); }
function playMuyu(){ playAudio('muyuAudio'); }
function intervalMs(){ return 60000 / bpm; }
function showStep(){
  currentStep = Math.max(0, Math.min(currentStep, ritualSteps.length-1));
  $('ritualContent').textContent = ritualSteps[currentStep];
  $('stepMeta').textContent = `第 ${currentStep+1} 段 / 共 ${ritualSteps.length} 段`;
  $('stepProgressFill').style.width = `${((currentStep+1)/ritualSteps.length)*100}%`;
  $('stepDoneChk').checked = localStorage.getItem(storageKey(`stepDone:${currentStep}`)) === '1';
  localStorage.setItem(storageKey('ritualStep'), currentStep);
}
function nextStep(){ if(currentStep < ritualSteps.length-1){ currentStep++; showStep(); window.scrollTo({top:0,behavior:'smooth'}); } }
function prevStep(){ if(currentStep > 0){ currentStep--; showStep(); window.scrollTo({top:0,behavior:'smooth'}); } }
function updateUI(){
  $('bowCount').textContent = count;
  const pct = Math.min(100, count/TARGET*100);
  $('progressFill').style.width = pct + '%';
  document.querySelector('.progress-ring').style.background = `conic-gradient(var(--gold) ${pct*3.6}deg, rgba(255,255,255,.08) 0deg)`;
  $('secondsPerBow').textContent = (intervalMs()/1000).toFixed(1);
  $('bpmInput').value = bpm;
  localStorage.setItem(storageKey('bowCount'), count);
  $('totalBows').textContent = count.toLocaleString('zh-Hant');
}
function tick(){
  if(count >= TARGET) return finishPractice();
  playMuyu(); count++; updateUI();
  if(count > 0 && count % 100 === 0 && count < TARGET){
    clearInterval(timer); timer = null; $('statusText').textContent = `第 ${count} 叩，鳴磬一響`;
    setTimeout(()=>playBell(1), 180);
    setTimeout(()=>{ if(running) startLoop(); }, 1300);
  }
  if(count >= TARGET) finishPractice();
}
function startLoop(){
  if(timer) clearInterval(timer);
  running = true; $('startBtn').textContent = '進行中'; $('statusText').textContent = `木魚節奏 ${bpm} BPM`;
  timer = setInterval(tick, intervalMs());
}
async function unlockAudio(){
  for(const id of ['bellAudio','muyuAudio']) {
    try { await $(id).play(); $(id).pause(); $(id).currentTime = 0; } catch(e) {}
  }
}
async function startPractice(){
  if(running) return;
  await unlockAudio();
  $('statusText').textContent = '開壇鳴磬三響';
  playBell(3);
  setTimeout(()=>startLoop(), 3100);
}
function pausePractice(){ running = false; if(timer) clearInterval(timer); timer = null; $('startBtn').textContent = '繼續叩首'; $('statusText').textContent = '已暫停'; }
function resetPractice(){ pausePractice(); count = 0; updateUI(); $('statusText').textContent = '已重置'; $('startBtn').textContent = '開始叩首'; }
function finishPractice(){
  running = false; if(timer) clearInterval(timer); timer = null;
  count = TARGET; updateUI(); $('statusText').textContent = '🪷 一千叩首圓滿';
  playBell(3); $('ritualDone').checked = true; saveCheck('ritualDone'); $('startBtn').textContent = '圓滿';
}
function saveCheck(id){ localStorage.setItem(storageKey(id), $(id).checked ? '1':'0'); updateStats(); }
function loadChecks(){ ['ritualDone','vowDone','dedicateDebt','dedicateAll'].forEach(id=>{ $(id).checked = localStorage.getItem(storageKey(id))==='1'; $(id).addEventListener('change',()=>saveCheck(id)); }); }
function saveJournal(){ ['awareText','transformText','rightText'].forEach(id=>localStorage.setItem(storageKey(id), $(id).value)); updateStats(); alert('今日紀錄已儲存'); }
function loadJournal(){ ['awareText','transformText','rightText'].forEach(id=>$(id).value = localStorage.getItem(storageKey(id)) || ''); }
function updateStats(){
  const completed = localStorage.getItem(storageKey('ritualDone')) === '1';
  let days = JSON.parse(localStorage.getItem('spiritualTracker:completedDays') || '[]');
  const t = todayKey();
  if(completed && !days.includes(t)) days.push(t);
  if(!completed) days = days.filter(d=>d!==t);
  days.sort(); localStorage.setItem('spiritualTracker:completedDays', JSON.stringify(days));
  $('completedDays').textContent = days.length; $('streakDays').textContent = calcStreak(days);
}
function calcStreak(days){ const set = new Set(days); let d = new Date(); let s=0; while(set.has(d.toISOString().slice(0,10))){ s++; d.setDate(d.getDate()-1); } return s; }
function exportData(){
  const data = {}; for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(k && k.startsWith('spiritualTracker')) data[k]=localStorage.getItem(k); }
  const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download=`修持紀錄-${todayKey()}.json`; a.click(); URL.revokeObjectURL(url);
}
function init(){
  $('fullRitualText').textContent = ritualSteps.join('\n\n────────────────────\n\n');
  showStep(); updateUI(); loadChecks(); loadJournal(); updateStats();
  vows.forEach((v,i)=>{ const o=document.createElement('option'); o.value=v; o.textContent=`${i+1}. ${v}`; $('vowSelect').appendChild(o); });
  $('vowSelect').value = localStorage.getItem(storageKey('vowSelect')) || vows[0];
  $('vowSelect').addEventListener('change',()=>localStorage.setItem(storageKey('vowSelect'), $('vowSelect').value));
  $('prevStepBtn').onclick = prevStep; $('nextStepBtn').onclick = nextStep;
  $('stepDoneChk').onchange = ()=>localStorage.setItem(storageKey(`stepDone:${currentStep}`), $('stepDoneChk').checked?'1':'0');
  $('toggleFullRitualBtn').onclick = ()=>$('fullRitualPanel').classList.toggle('hidden');
  $('startBtn').onclick = startPractice; $('pauseBtn').onclick = pausePractice; $('resetBtn').onclick = resetPractice;
  $('bellTestBtn').onclick = ()=>playBell(1); $('muyuTestBtn').onclick = playMuyu;
  $('bpmInput').addEventListener('change', e=>{ bpm = Math.max(10, Math.min(120, Number(e.target.value)||30)); localStorage.setItem('spiritualTracker:bpm', bpm); updateUI(); if(running) startLoop(); });
  document.querySelectorAll('[data-bpm]').forEach(b=>b.onclick=()=>{ bpm=Number(b.dataset.bpm); localStorage.setItem('spiritualTracker:bpm', bpm); updateUI(); if(running) startLoop(); });
  $('bellVol').addEventListener('input', e=> $('bellAudio').volume = Number(e.target.value));
  $('muyuVol').addEventListener('input', e=> $('muyuAudio').volume = Number(e.target.value));
  $('bellAudio').volume = Number($('bellVol').value); $('muyuAudio').volume = Number($('muyuVol').value);
  $('saveJournalBtn').onclick = saveJournal; $('exportBtn').onclick = exportData;
}
init();
