document.addEventListener('DOMContentLoaded', () => {
  const status = document.getElementById('inquiry-status');
  const params = new URLSearchParams(window.location.search);

  if (params.get('status') === 'success' && status) {
    status.textContent = 'Your inquiry has been submitted. Our team will review your requirements.';
  }

  // Clear any legacy mailto draft session if present
  try {
    sessionStorage.removeItem('wrg-inquiry-draft');
  } catch (e) { }
});
