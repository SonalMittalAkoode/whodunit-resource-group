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
  const destination = form.elements.destination;
  const phone = form.elements.phone;
  const submitBtn = form.querySelector('.contact-submit');
  const status = form.querySelector('.form-status');
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
      } else if (window.libphonenumber) {
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

  if (country) {
    country.addEventListener('change', () => { if (phone && phone.value.trim()) validate(phone); });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let firstInvalid = null;
    fields.forEach((field) => {
      touched.add(field);
      if (!validate(field) && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      if (status) {
        status.textContent = 'Please check the highlighted fields.';
        status.classList.add('visible');
      }
      firstInvalid.focus();
      return;
    }

    if (status) {
      status.textContent = '';
      status.classList.remove('visible');
    }

    // Button loading state
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending inquiry... <span>⏳</span>';
    }

    // Build form data
    const formData = new FormData(form);

    // Append human-readable country names from selected option labels
    if (country && country.selectedIndex > 0) {
      formData.set('companyCountryName', country.options[country.selectedIndex].text);
    }
    if (destination && destination.selectedIndex > 0) {
      formData.set('destinationCountryName', destination.options[destination.selectedIndex].text);
    }

    const actionUrl = form.getAttribute('action') || 'send-mail.php';

    try {
      const response = await fetch(actionUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result && result.status === 'success') {
        window.location.assign('thank-you.html?status=success');
      } else {
        const errorMsg = (result && result.message)
          ? result.message
          : 'Unable to send your inquiry at this moment. Please try again or email us directly.';
        if (status) {
          status.textContent = errorMsg;
          status.classList.add('visible');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    } catch (err) {
      // If fetch fails (e.g. network/CORS or local static preview), fallback to traditional submit
      try {
        form.submit();
      } catch (submitErr) {
        if (status) {
          status.textContent = 'There was a connection issue. Please email your inquiry directly to eati@akoode.in';
          status.classList.add('visible');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    }
  });
});
