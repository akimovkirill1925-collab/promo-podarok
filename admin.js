
// Admin panel logic (local-only)
const ADMIN_KEY = 'prank_admin_pass';
const DEFAULT_PASS = 'Akimov_1925';

function adminLogin(){
  const p = document.getElementById('adminPass').value || '';
  const stored = localStorage.getItem(ADMIN_KEY) || DEFAULT_PASS;
  if(p === stored){
    document.getElementById('loginBox').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    loadLogs();
    loadStats();
  } else {
    alert('Неверный пароль');
  }
}

function setNewPassword(){
  const np = document.getElementById('newPass').value;
  if(!np) return alert('Введите пароль');
  localStorage.setItem(ADMIN_KEY, np);
  alert('Пароль сохранён (локально)');
}

function applyAdMode(){
  const m = document.getElementById('adMode').value;
  localStorage.setItem('prank_admode', m);
  alert('Режим рекламы: '+m);
  // apply immediately
  document.querySelectorAll('.adzone').forEach(z=>{
    z.style.display = (m==='on') ? 'block' : 'none';
  });
}

function loadLogs(){
  const logs = JSON.parse(localStorage.getItem('prank_logs')||'[]');
  const el = document.getElementById('logs');
  if(!el) return;
  el.innerHTML = logs.map(l=>`<div>🕒 ${l.t} — ${l.m}</div>`).join('');
}

function clearLogs(){
  localStorage.removeItem('prank_logs');
  loadLogs();
  alert('Логи очищены (локально)');
}

function applyFakeStats(){
  const raw = document.getElementById('fakeStats').value || '';
  localStorage.setItem('prank_fake_stats', raw);
  loadStats();
  alert('Фейковые статистики применены');
}

function loadStats(){
  const raw = localStorage.getItem('prank_fake_stats') || 'visitors:0,caught:0';
  document.getElementById('statsArea').innerText = 'Статистика: '+raw;
}

function previewSite(){
  window.open('index.html','_blank');
}

function logoutAdmin(){
  document.getElementById('adminPanel').classList.add('hidden');
  document.getElementById('loginBox').classList.remove('hidden');
  document.getElementById('adminPass').value = '';
}
