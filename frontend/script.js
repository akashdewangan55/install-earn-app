
const API_URL = 'https://install-earn-backend.onrender.com/api';
const userId = 'demo-user-id'; // Replace with actual userId after login

fetch(API_URL + '/apps')
  .then(res => res.json())
  .then(data => {
    const appList = document.getElementById('appList');
    data.forEach(app => {
      const div = document.createElement('div');
      div.className = 'app-card';
      div.innerHTML = \`\${app.name} <button onclick="installApp('\${app.id}', this)">Install</button>\`;
      appList.appendChild(div);
    });
  });

function installApp(appId, btn) {
  fetch(API_URL + '/apps/install', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, appId })
  })
  .then(res => res.json())
  .then(data => {
    btn.disabled = true;
    btn.textContent = 'Installed ✅';
    document.getElementById('balance').textContent = data.balance;
    checkWithdraw(data.balance);
  });
}

function checkWithdraw(balance) {
  document.getElementById('withdrawBtn').disabled = balance < 50;
}

document.getElementById('withdrawBtn').onclick = () => {
  fetch(API_URL + '/wallet/withdraw', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('balance').textContent = data.balance;
    document.getElementById('message').textContent = data.message;
    checkWithdraw(data.balance);
  });
};
