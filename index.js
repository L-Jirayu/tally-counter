const apiBaseUrl = window.API_BASE_URL || 'http://localhost:8000/count';

const countDisplay = document.getElementById('count');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
const clearBtn = document.getElementById('clearBtn');
const activityText = document.getElementById('activityText');

function safeSetTextContent(el, text) {
  if (el) el.textContent = text;
}

function showAlertAndMessage(alertMsg, message = '') {
  alert(alertMsg);
  safeSetTextContent(activityText, message);
}

function handleError(action, error) {
  console.error(`Error ${action}:`, error);
  showAlertAndMessage(`ไม่สามารถกด${action}`);
}

async function fetchCount() {
  try {
    const res = await fetch(`${apiBaseUrl}`);
    if (!res.ok) throw new Error('Response not OK');
    const data = await res.json();
    safeSetTextContent(countDisplay, data.count);
  } 
  catch (error) {
    console.error('Error fetching count:', error);
    showAlertAndMessage('ไม่สามารถโหลดข้อมูลได้');
  }
}

async function postApiAction(action) {
  const res = await fetch(`${apiBaseUrl}/${action}`, { method: 'POST' });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || `Error on ${action}`);
  }
  return await res.json();
}

async function withButtonDisabled(button, fn) {
  if (!button) return;
  button.disabled = true;
  try {
    await fn();
  } 
  finally {
    button.disabled = false;
  }
}

increaseBtn?.addEventListener('click', () => {
  withButtonDisabled(increaseBtn, async () => {
    try {
      const data = await postApiAction('increment');
      safeSetTextContent(countDisplay, data.count);
      if (data.message) safeSetTextContent(activityText, data.message);
    } 
    catch (error) {
      handleError('เพิ่มค่าได้', error);
    }
  });
});

decreaseBtn?.addEventListener('click', () => {
  withButtonDisabled(decreaseBtn, async () => {
    try {
      const data = await postApiAction('decrement');
      safeSetTextContent(countDisplay, data.count);
      if (data.message) {
        safeSetTextContent(activityText, data.message);
      } else {
        safeSetTextContent(activityText, '');
      }
    } 
    catch (error) {
      handleError('ลดค่าได้', error);
    }
  });
});

clearBtn?.addEventListener('click', () => {
  withButtonDisabled(clearBtn, async () => {
    try {
      const data = await postApiAction('reset');
      safeSetTextContent(countDisplay, data.count);
      safeSetTextContent(activityText, data.message);
    } 
    catch (error) {
      handleError('รีเซ็ตได้', error);
    }
  });
});

window.addEventListener('load', () => {
  fetchCount();
  setInterval(fetchCount, 2000);
});
