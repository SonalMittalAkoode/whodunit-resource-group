function replaceHomeIcons(){const icons=['<circle cx="12" cy="12" r="8.5"/><path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.1-3.3-8.5S9.8 5.8 12 3.5Z"/>','<path d="M12 20c-4.5-2.1-7-5.3-7-9.5C5 7.3 7.1 5 10 5c1 0 1.7.4 2 1.2C12.3 5.4 13 5 14 5c2.9 0 5 2.3 5 5.5 0 4.2-2.5 7.4-7 9.5Z"/><path d="M12 6.2v11.5"/>','<path d="m12 3 7 3v5c0 4.5-2.7 7.7-7 10-4.3-2.3-7-5.5-7-10V6l7-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>','<path d="M4 5h16v11H8l-4 4V5Z"/><path d="M7 9h10M7 12h6"/>','<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/>','<path d="M5 5h14v14H5zM8 12h8M12 8v8"/>','<circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5M8 10.5h5"/>','<path d="M9 4h6M10 4v5l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V4M7 16h10"/>','<path d="M4 19V5h16v14M8 16v-4M12 16V8M16 16v-6"/>','<path d="M5 6h14v12H5zM8 10h8M8 14h5"/>','<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>','<path d="m5 12 4 4L19 6"/>','<circle cx="9" cy="9" r="3"/><circle cx="16" cy="10" r="2.5"/><path d="M3.5 19c.5-3 2.2-4.5 5.5-4.5s5 1.5 5.5 4.5M14 15c3.2-.3 5.2 1 6 4"/>','<path d="m4 7 8-4 8 4v10l-8 4-8-4V7Z"/><path d="m4 7 8 4 8-4M12 11v10"/>'];let iconIndex=0;document.querySelectorAll('.trust-icon,.trade-card-icon,.capability-icon,.value-icon,.workflow-icon').forEach((element)=>{if(!icons[iconIndex])return;element.textContent='';element.innerHTML=`<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[iconIndex]}</svg>`;iconIndex+=1})}
document.addEventListener('error',(event)=>{const image=event.target;if(image.tagName==='IMG'&&image.src.startsWith('https://images.unsplash.com/')&&!image.dataset.fallback){image.dataset.fallback='true';image.src='Images/iStock/web/iStock-1031620134.webp'}},true);
function replaceHomeIcons(){const icons=['<circle cx="12" cy="12" r="8.5"/><path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.1-3.3-8.5S9.8 5.8 12 3.5Z"/>','<path d="M12 20c-4.5-2.1-7-5.3-7-9.5C5 7.3 7.1 5 10 5c1 0 1.7.4 2 1.2C12.3 5.4 13 5 14 5c2.9 0 5 2.3 5 5.5 0 4.2-2.5 7.4-7 9.5Z"/><path d="M12 6.2v11.5"/>','<path d="m12 3 7 3v5c0 4.5-2.7 7.7-7 10-4.3-2.3-7-5.5-7-10V6l7-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>','<path d="M4 5h16v11H8l-4 4V5Z"/><path d="M7 9h10M7 12h6"/>','<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/>','<path d="M5 5h14v14H5zM8 12h8M12 8v8"/>','<circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5M8 10.5h5"/>','<path d="M9 4h6M10 4v5l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V4M7 16h10"/>','<path d="M4 19V5h16v14M8 16v-4M12 16V8M16 16v-6"/>','<path d="M5 6h14v12H5zM8 10h8M8 14h5"/>','<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>','<path d="m5 12 4 4L19 6"/>','<circle cx="9" cy="9" r="3"/><circle cx="16" cy="10" r="2.5"/><path d="M3.5 19c.5-3 2.2-4.5 5.5-4.5s5 1.5 5.5 4.5M14 15c3.2-.3 5.2 1 6 4"/>','<path d="m4 7 8-4 8 4v10l-8 4-8-4V7Z"/><path d="m4 7 8 4 8-4M12 11v10"/>'];let iconIndex=0;document.querySelectorAll('.trust-icon,.trade-card-icon,.capability-icon,.value-icon,.workflow-icon').forEach((element)=>{if(!icons[iconIndex])return;element.textContent='';element.innerHTML=`<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[iconIndex]}</svg>`;iconIndex+=1})}
document.addEventListener('DOMContentLoaded',()=>{replaceHomeIcons();document.querySelectorAll('.faq-question').forEach((button)=>{button.addEventListener('click',()=>{const expanded=button.getAttribute('aria-expanded')==='true';document.querySelectorAll('.faq-question').forEach((item)=>item.setAttribute('aria-expanded','false'));button.setAttribute('aria-expanded',String(!expanded))})})});

function initPhotoSequence() {
  const sequence = document.querySelector('[data-photo-sequence]');
  const control = document.querySelector('[data-sequence-toggle]');
  if (!sequence || !control) return;
  const slides = Array.from(sequence.querySelectorAll('.home-hero-slide'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let paused = reducedMotion.matches;
  let timer;

  function syncPlayback() {
    window.clearInterval(timer);
    control.textContent = paused ? 'Play photos' : 'Pause photos';
    control.setAttribute('aria-pressed', String(paused));
    if (paused || document.hidden || slides.length < 2) return;
    timer = window.setInterval(() => {
      const next = (current + 1) % slides.length;
      // Keep the current photo visible until the next photo has loaded.
      if (!slides[next].complete || !slides[next].naturalWidth) return;
      slides[current].classList.remove('is-active');
      slides[next].classList.add('is-active');
      current = next;
    }, 2500);
  }
  control.addEventListener('click', () => { paused = !paused; syncPlayback(); });
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; syncPlayback(); });
  document.addEventListener('visibilitychange', syncPlayback);
  syncPlayback();
}

function initProductQuickMenu() {
  document.querySelectorAll('[data-product-menu]').forEach((menu) => {
    const trigger = menu.querySelector('button');
    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    }
    trigger.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
    menu.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover)').matches) setOpen(true);
    });
    menu.addEventListener('mouseleave', () => {
      if (!menu.contains(document.activeElement)) setOpen(false);
    });
    menu.addEventListener('focusout', (event) => {
      if (!menu.contains(event.relatedTarget)) setOpen(false);
    });
    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { setOpen(false); trigger.focus(); }
    });
    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target)) setOpen(false);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPhotoSequence();
  initProductQuickMenu();
});

function initProductSpecModal() {
  const modal = document.getElementById('product-spec-modal');
  if (!modal) return;
  const title = modal.querySelector('#product-spec-title');
  const content = modal.querySelector('.pd-spec-modal__content');
  let opener;
  document.querySelectorAll('.pd-spec-trigger').forEach((button) => {
    button.addEventListener('click', () => {
      const template = document.getElementById(button.dataset.specTemplate);
      if (!template || modal.open) return;
      opener = button;
      title.textContent = button.closest('.lentil-detail').querySelector('h3').textContent;
      content.replaceChildren(template.content.cloneNode(true));
      modal.showModal();
      document.body.classList.add('spec-modal-open');
    });
  });
  modal.querySelector('.pd-spec-close').addEventListener('click', () => modal.close());
  // Only close for a click entirely outside the panel, not a drag from its content.
  let backdropPress = false;
  function outsidePanel(event) {
    const rect = modal.getBoundingClientRect();
    return event.target === modal && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
  }
  modal.addEventListener('pointerdown', (event) => { backdropPress = outsidePanel(event); });
  modal.addEventListener('click', (event) => {
    if (backdropPress && outsidePanel(event)) modal.close();
    backdropPress = false;
  });
  modal.addEventListener('close', () => {
    document.body.classList.remove('spec-modal-open');
    if (opener && opener.isConnected) opener.focus({ preventScroll: true });
  });
}
document.addEventListener('DOMContentLoaded', initProductSpecModal);

// Preserve old bookmarked category URLs and highlight linked varieties.
function syncProductLocation() {
  if (!document.body.classList.contains('product-detail-page')) return;
  const fragment = window.location.hash.slice(1);
  const normalized = fragment.toLowerCase();
  const target = document.getElementById(normalized);
  if (!target) return;
  if (fragment !== normalized) {
    history.replaceState(null, '', '#' + normalized);
    target.scrollIntoView();
  }
  const category = target.classList.contains('lentil-detail') ? 'lentils' : normalized;
  document.querySelectorAll('.product-category-nav a').forEach((link) => {
    if (link.hash === '#' + category) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
document.addEventListener('DOMContentLoaded', syncProductLocation);
window.addEventListener('hashchange', syncProductLocation);
