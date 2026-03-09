const form = document.getElementById('generator-form');
const statusEl = document.getElementById('status');

const linkRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|open\.spotify\.com)\//i;

function setStatus(message, type = '') {
  statusEl.textContent = message;
  statusEl.classList.remove('success', 'error');
  if (type) {
    statusEl.classList.add(type);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const trackUrl = String(data.get('trackUrl') || '').trim();
  const charterName = String(data.get('charterName') || '').trim();
  const instruments = data.getAll('instrument');

  if (!linkRegex.test(trackUrl)) {
    setStatus('Please enter a valid YouTube or Spotify track URL.', 'error');
    return;
  }

  if (!charterName) {
    setStatus('Please add your charter name before generating.', 'error');
    return;
  }

  if (instruments.length === 0) {
    setStatus('Select at least one instrument track to generate.', 'error');
    return;
  }

  const difficulty = String(data.get('difficulty'));
  const offset = Number(data.get('offset')) || 0;

  setStatus('Analyzing audio, extracting BPM map, and generating chart package...');

  window.setTimeout(() => {
    const packageName = `${charterName.replace(/\s+/g, '_')}_${difficulty.toLowerCase()}_chart.zip`;
    setStatus(
      `Done! Your package (${packageName}) is ready with ${instruments.join(', ')} at ${difficulty} difficulty (offset ${offset} ms).`,
      'success'
    );
  }, 1250);
});
