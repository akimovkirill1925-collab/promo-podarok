
// --- Frontend logic (no data leaving device) ---
const codes = Array.from({length:8},(_,i)=>'PROMO-'+(1000+i));
function renderCodes(){
  const el = document.getElementById('codes');
  if(!el) return;
  el.innerHTML = codes.map(c=>`<button class="code-btn" onclick="pickCode('${c}')">${c}</button>`).join('');
  const el2 = document.getElementById('codesList');
  if(el2) el2.innerHTML = codes.map(c=>`<div class="code-btn" onclick="pickCode('${c}')">${c}</div>`).join('');
}
function pickCode(code){
  addLog('Выбран промокод: '+code);
  localStorage.setItem('lastPromo', code);
  location.href='sms.html';
}
// Chat (local-only)
function sendChat(){
  const input = document.getElementById('chatInput');
  if(!input) return;
  const text = input.value.trim();
  if(!text) return;
  appendChat('Вы: '+text);
  input.value='';
  setTimeout(()=>appendChat('Поддержка: Спасибо! Это пранк, мы не можем помочь.'),800);
  addLog('Чат сообщение: '+text);
}
function appendChat(t){ const log = document.getElementById('chatLog'); if(log){ log.innerHTML += '<div>'+t+'</div>'; log.scrollTop = log.scrollHeight; } }
// SMS confirm (fake)
function confirmPhone(){
  const phone = document.getElementById('phone').value || '';
  addLog('Введён номер: '+phone);
  // simulate processing and final prank
  location.href='finish.html';
}
// Final page behaviour
document.addEventListener('DOMContentLoaded',()=>{
  renderCodes();
  if(document.getElementById('finalTitle')){
    // simulate checking and then show prank
    setTimeout(()=>{
      document.getElementById('finalTitle').innerText='Списание…';
      document.getElementById('finalText').innerText='Проверяем перевод 7 590 ₽';
    },500);
    setTimeout(()=>{ document.getElementById('finalActions').classList.remove('hidden'); addLog('Показан финал (пранк)'); },3200);
  }
});
// Local logging
function addLog(text){
  const logs = JSON.parse(localStorage.getItem('prank_logs')||'[]');
  logs.push({t:new Date().toLocaleString(),m:text});
  localStorage.setItem('prank_logs',JSON.stringify(logs));
}
// Admin helpers
