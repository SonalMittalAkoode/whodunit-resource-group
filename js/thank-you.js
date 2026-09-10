document.addEventListener('DOMContentLoaded', () => {
  const status = document.getElementById('inquiry-status');
  const params = new URLSearchParams(window.location.search);

  if (params.get('status') === 'success' && status) {
    status.textContent = 'Your inquiry has been successfully delivered to our trading team.';
  }

  // Clear any legacy mailto draft session if present
  try {
    sessionStorage.removeItem('wrg-inquiry-draft');
  } catch (e) { }
});
