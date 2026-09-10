document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form#quote-request-form');
  if (!form) return;

  const eventNames = {
    'pscc-2026': 'Pulse & Special Crops Convention 2026 in Halifax, September 15–17',
    'agrofood-2026': 'AgroFoodSummit 2026 in Mersin, September 24–25',
  };
  const meeting = eventNames[new URLSearchParams(window.location.search).get('event')];
  const additional = form.querySelector('#additional');
  if (meeting && additional && !additional.value) {
    additional.value = `I would like to arrange a meeting with WRG at ${meeting}.`;
  }

  const fields = Array.from(form.querySelectorAll('input, select, textarea'));
  const country = form.elements.companyCountry;
  const phone = form.elements.phone;
  const touched = new Set();
  function validate(field) {
      const value = field.value.trim();
      let message = '';
      if (field.required && !value) message = 'This field is required.';
      else if (field.type === 'email' && value &&
        (field.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) {
        message = 'Enter a valid email address, e.g. name@company.com.';
      } else if (field.type === 'tel' && value) {
        if (!/^[+()\d\s.-]+$/.test(value)) {
          message = 'Enter a phone number using digits and an optional + calling code.';
        } else if (!country.value && !value.startsWith('+')) {
          message = 'Select a country or include a calling code, e.g. +1 403 664 9864.';
        } else {
          const parsed = window.libphonenumber.parsePhoneNumberFromString(value, {
            defaultCountry: country.value || undefined,
            extract: false,
          });
          if (!parsed || !parsed.isValid()) message = 'Enter a valid phone number for the selected country, or use a + calling code.';
        }
      }

      const error = field.parentElement.querySelector('.field-error');
      if (error) error.textContent = message;
      field.setAttribute('aria-invalid', String(Boolean(message)));
      return !message;
  }

  fields.forEach((field) => {
    const error = field.parentElement.querySelector('.field-error');
    if (error) {
      error.id = `${field.id}-error`;
      error.setAttribute('aria-live', 'polite');
      field.setAttribute('aria-describedby', [field.getAttribute('aria-describedby'), error.id].filter(Boolean).join(' '));
    }
    field.addEventListener('blur', () => { touched.add(field); validate(field); });
    field.addEventListener('input', () => { if (touched.has(field)) validate(field); });
    field.addEventListener('change', () => { if (touched.has(field)) validate(field); });
  });
  country.addEventListener('change', () => { if (phone.value.trim()) validate(phone); });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let firstInvalid = null;
    fields.forEach((field) => {
      touched.add(field);
      if (!validate(field) && !firstInvalid) firstInvalid = field;
    });

    const status = form.querySelector('.form-status');
    if (firstInvalid) {
      status.textContent = 'Please check the highlighted fields.';
      status.classList.add('visible');
      firstInvalid.focus();
      return;
    }

    const lines = fields.map((field) => {
      const label = field.labels[0].textContent.replace('*', '').replace(/\s+/g, ' ').trim();
      const value = field.tagName === 'SELECT' && field.value
        ? field.selectedOptions[0].textContent : field.value.trim();
      return `${label}: ${value || 'Not specified'}`;
    });
    const subject = `Pulse inquiry: ${form.elements.company.value.trim()}`;
    const email = typeof CONTACT_EMAIL === 'string' ? CONTACT_EMAIL : 'info@whodunitresourcegroup.com';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    status.textContent = 'Your inquiry has not been sent. We attempted to open a draft in your email app. Please send it to info@whodunitresourcegroup.com. If no email app opens, email us directly using the details you entered here.';
    status.classList.add('visible');
  });
});
