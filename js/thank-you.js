document.addEventListener('DOMContentLoaded', () => {
  const link = document.getElementById('inquiry-email');
  const status = document.getElementById('inquiry-status');
  let draft;
  try {
    draft = sessionStorage.getItem('wrg-inquiry-draft');
    sessionStorage.removeItem('wrg-inquiry-draft');
  } catch { return; }
  if (!draft || !draft.startsWith('mailto:info@whodunitresourcegroup.com?')) return;
  // Keep the draft only in this page's link, not in storage or the page URL.
  link.href = draft;
  link.firstChild.textContent = 'Open email draft ';
  status.textContent = 'If your email app did not open, use the button above. Please send the draft to complete your inquiry.';
  link.click();
});
