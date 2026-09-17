(() => {
  const form = document.getElementById('scorecard-gate-form');
  const status = document.getElementById('scorecard-status');
  const gated = document.getElementById('scorecard-full');
  const gate = document.getElementById('scorecard-gate');
  if (!form || !gated) return;

  const unlock = () => {
    gated.hidden = false;
    if (gate) gate.hidden = true;
    try { sessionStorage.setItem('pb-scorecard-unlocked', '1'); } catch (_) {}
    gated.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  try {
    if (sessionStorage.getItem('pb-scorecard-unlocked') === '1') {
      gated.hidden = false;
      if (gate) gate.hidden = true;
    }
  } catch (_) {}

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (status) {
      status.className = 'form-status';
      status.textContent = 'Saving…';
    }
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(data.get('email') || '').trim(),
          consent: data.get('consent') === 'on',
          website: data.get('website') || '',
          pageUrl: window.location.href,
          referrer: document.referrer || 'direct'
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload.ok === false) {
        throw new Error(payload.error || 'Unable to save');
      }
      if (status) {
        status.className = 'form-status success';
        status.textContent = payload.message || 'You are on the list. Full scorecard unlocked.';
      }
      unlock();
    } catch (_) {
      if (status) {
        status.className = 'form-status error';
        status.textContent = 'We couldn’t save that automatically. Email hello@pratikbajoria.com, or try again.';
      }
    }
  });
})();
