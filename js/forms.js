document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form#quote-request-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let firstInvalid = null;

    form.querySelectorAll('input, textarea').forEach((field) => {
      const value = field.value.trim();
      let message = '';
      if (field.required && !value) message = 'This field is required.';
      else if (field.type === 'email' && value && !field.validity.valid) message = 'Enter a valid email address.';
      else if (field.type === 'tel' && value && !/^[+()\d\s.-]{7,}$/.test(value)) message = 'Enter a valid phone number.';

      const error = field.parentElement.querySelector('.field-error');
      if (error) error.textContent = message;
      field.setAttribute('aria-invalid', String(Boolean(message)));
      if (message && !firstInvalid) firstInvalid = field;
    });

    const status = form.querySelector('.form-status');
    if (firstInvalid) {
      status.textContent = 'Please check the highlighted fields.';
      status.classList.add('visible');
      firstInvalid.focus();
      return;
    }

    const lines = Array.from(form.querySelectorAll('input, textarea')).map((field) => {
      const label = field.labels[0].textContent.replace('*', '').replace(/\s+/g, ' ').trim();
      return `${label}: ${field.value.trim() || 'Not specified'}`;
    });
    const subject = `Pulse inquiry — ${form.elements.company.value.trim()}`;
    const email = typeof CONTACT_EMAIL === 'string' ? CONTACT_EMAIL : 'info@whodunitresourcegroup.com';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    status.textContent = 'Your inquiry is ready in your email app. Please send it to info@whodunitresourcegroup.com. If no email app opens, email us directly using the details you entered here.';
    status.classList.add('visible');
  });
});
