let count=0;

function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

async function startPractice(){
 document.getElementById("status").innerText="開始修行";
 await sleep(2000);
 startMuyu();
}

function startMuyu(){
 let bpm=document.getElementById("bpm").value;
 let delay=60000/bpm;

 let timer=setInterval(()=>{
  count++;
  document.getElementById("count").innerText=count;
  document.getElementById("progressBar").style.width=(count/10)+"%";

  if(count>=1000){
    clearInterval(timer);
    document.getElementById("status").innerText="圓滿";
  }
 },delay);
}

document.getElementById("startBtn").onclick=startPractice;
