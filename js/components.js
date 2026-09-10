/* =========================================================
   NAV DATA
   'link'     -> a single nav link
   'dropdown' -> a trigger that reveals a set of child links
========================================================= */

const navItems = [
  { type: 'link', href: 'index.html', label: 'Home', key: 'home' },
  {
    type: 'dropdown',
    label: 'About',
    key: 'about-group',
    children: [
      { href: 'about.html', label: 'About Us', key: 'about' },
      { href: 'why-whodunit.html', label: 'Why Whodunit', key: 'why' },
      { href: 'quality.html', label: 'Quality & Traceability', key: 'quality' },
      { href: 'sustainability.html', label: 'Sustainability', key: 'sustainability' },
      { href: 'faq.html', label: 'FAQ', key: 'faq' },
    ],
  },
  {
    type: 'dropdown', label: 'Products', key: 'products',
    children: [
      { href: 'product-detail.html#lentils', label: 'Lentils', key: 'Lentils', image: 'Images/iStock/web/iStock-2223084329.webp' },
      { href: 'product-detail.html#peas', label: 'Peas', key: 'Peas', image: 'Images/products/whole-yellow-peas.jpg' },
      { href: 'product-detail.html#beans', label: 'Beans', key: 'Beans', image: 'Images/iStock-1211260989-web.jpg' },
    ],
  },
  { type: 'link', href: 'sourcing.html', label: 'Value Enhancement', key: 'sourcing' },
  { type: 'link', href: 'markets.html', label: 'Markets', key: 'markets' },
  { type: 'link', href: 'resources.html', label: 'Resources', key: 'resources' },
  { type: 'link', href: 'contact.html#quote-form', label: 'Contact', key: 'contact' },
];


/* =========================================================
   WHATSAPP
========================================================= */

const WHATSAPP_NUMBER = '14036649864';
const WHATSAPP_DISPLAY = '+1 (403) 664-9864';
const WHATSAPP_MESSAGE = 'Hello WHODUNIT Resource Group, I would like to know more about your products.';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const MAILING_ADDRESS = ['Box 191', 'Acadia Valley, Alberta, Canada', 'T0J 0A0'];
const PHYSICAL_ADDRESS_LINK = 'https://maps.app.goo.gl/jg8zhhBwiLXgp6W36?g_st=ic';
const CONTACT_EMAIL = 'info@whodunitresourcegroup.com';


/* =========================================================
   ICONS (inline SVG, line-icon style, no font-icon deps)
========================================================= */

const icons = {
  linkedin: `<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M7.5 10v7"></path><circle cx="7.5" cy="7" r="0.4" fill="currentColor" stroke="none"></circle><path d="M11.5 17v-4.5a2 2 0 0 1 4 0V17"></path><path d="M11.5 12.5V17"></path></svg>`,
  twitter: `<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.5l15 15"></path><path d="M19.5 4.5l-15 15"></path></svg>`,
  mail: `<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 6.5l9 6.5 9-6.5"></path></svg>`,
  phone: `<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2C10 19 5 14 3 5a2 2 0 0 1 2-2z"></path></svg>`,
  pin: `<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z"></path><circle cx="12" cy="9" r="2.4"></circle></svg>`,
  arrowRight: `<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path></svg>`,
  whatsapp: `<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21c-1.6 0-3.1-.4-4.4-1.2L3 21l1.3-4.4A9 9 0 1 1 12 21z"></path><path d="M8.5 8.7c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .5.4.2.5.7 1.6.8 1.7.1.1.1.3 0 .5-.1.1-.2.2-.3.4-.1.1-.3.3-.1.6.2.4.8 1 1.6 1.5.2.1.3.1.5-.1.1-.1.3-.4.5-.5.1-.1.2-.1.4-.1.2.1 1.1.5 1.3.6.2.1.3.1.4.2.1.1.1.7-.1 1.1-.2.4-1.1.8-1.6.8-.5 0-1.2-.2-2.4-1-1.4-1-2.2-2.3-2.4-2.7-.1-.2-.7-1-.7-1.9 0-.9.5-1.4.7-1.6z" fill="currentColor" stroke="none"></path></svg>`,
};


/* =========================================================
   HEADER
========================================================= */

function renderHeader() {
  const current = document.body.dataset.page || 'home';

  const links = navItems
    .map((item) => {

      /* -------- DROPDOWN ITEM (About) -------- */

      if (item.type === 'dropdown') {

        const isChildActive = item.key === current || item.children.some(
          (child) => child.key === current
        );

        const childLinks = item.children
          .map(
            (child) => `
              <a
                href="${child.href}"
                ${child.key === current ? 'aria-current="page"' : ''}
              >
                ${child.image? `<img src="${child.image}" alt="" width="48" height="40">`: ''}${child.label}
              </a>
            `
          )
.join('');

        return `
          <div class="nav-dropdown${isChildActive ? ' is-current' : ''}">
            <button
              type="button"
              class="nav-dropdown-trigger"
              aria-haspopup="true"
              aria-expanded="false"
              aria-controls="nav-${item.key}"
            >
              ${item.label}
              <svg class="dropdown-caret" viewBox="0 0 12 8" aria-hidden="true">
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>

            <div class="nav-dropdown-menu${item.key === 'products' ? ' nav-product-menu' : ''}" id="nav-${item.key}">
              ${childLinks}
            </div>
          </div>
        `;
      }

      /* -------- SIMPLE LINK -------- */

      return `
        <a
          href="${item.href}"
          ${item.key === current ? 'aria-current="page"' : ''}
        >
          ${item.label}
        </a>
      `;
    })
.join('');

  const header = document.querySelector('[data-site-header]');

  if (!header) return;

  header.innerHTML = `
    <div class="container nav">

      <!-- LOGO -->
      <a
        class="brand"
        href="index.html"
        aria-label="WHODUNIT Resource Group home"
      >
        <img
          src="LogoImage/Whodunit Resource Group Logo.svg"
          alt="WHODUNIT Resource Group"
        >
      </a>


      <!-- NAVIGATION -->
      <nav class="nav-links" aria-label="Primary navigation">

        ${links}

        <!-- MOBILE CTA -->
        <a
          class="button button--primary mobile-cta"
          href="contact.html#quote-form"
        >
          Request Quotation
        </a>

      </nav>


      <!-- DESKTOP ACTIONS: WHATSAPP + CTA -->
      <div class="nav-actions">

        <a
          class="whatsapp-btn"
          href="${WHATSAPP_LINK}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          ${icons.whatsapp}
        </a>

        <a
          class="button button--primary nav-cta"
          href="contact.html#quote-form"
        >
          Request Quotation
        </a>

      </div>


      <!-- MOBILE MENU -->
      <button
        class="menu-toggle"
        type="button"
        aria-label="Open menu"
        aria-expanded="false"
      >
        <span></span>
      </button>

    </div>
  `;
}


/* =========================================================
   FOOTER
========================================================= */

function renderFooter() {
  const footer = document.querySelector('[data-site-footer]');

  if (!footer) return;

  footer.innerHTML = `
    <div class="wrg-footer-panel">
      <div class="wrg-footer-grid">
        <div class="wrg-footer-brand">
          <a href="index.html" aria-label="Whodunit Resource Group home"><img src="LogoImage/Whodunit Resource Group Logo.svg" alt="Whodunit Resource Group" width="384" height="128"></a>
          <p>Whodunit Resource Group is a fully vertically integrated, Canadian-owned and operated company based in Alberta. We farm, store, process, value-enhance, package, and ship Lentils, Peas, and Dry Beans directly, working with buyers of every size.</p>
          <span class="wrg-footer-tagline">CANADIAN PULSES.<br>GLOBAL OPPORTUNITIES.</span>
        </div>
        <nav class="wrg-footer-column" aria-label="Company and trade">
          <h3 class="wrg-footer-heading">Company &amp; Trade</h3>
          <div class="wrg-footer-links"><a href="about.html">Our Story</a><a href="sustainability.html">Sustainability</a><a href="resources.html#events">News &amp; Events</a><a href="quality.html">Quality &amp; Traceability</a><a href="products.html">Products</a><a href="sourcing.html">Value Enhancement</a><a href="markets.html">Markets</a></div>
        </nav>
        <nav class="wrg-footer-column wrg-footer-column--products" aria-label="Products and resources">
          <h3 class="wrg-footer-heading">Products &amp;<br>Resources</h3>
          <div class="wrg-footer-links"><a href="product-detail.html#lentils">Lentils</a><a href="product-detail.html#peas">Peas</a><a href="product-detail.html#beans">Beans</a><a href="resources.html">Resources</a><a href="faq.html">FAQ</a></div>
        </nav>
        <div class="wrg-footer-contact">
          <h3 class="wrg-footer-heading">Contact</h3>
          <div class="wrg-footer-contact-list">
            <div class="wrg-footer-contact-row"><span class="wrg-footer-icon">${icons.phone}</span><span>Available 24/7, 365 days a year<br><a href="tel:+${WHATSAPP_NUMBER}">${WHATSAPP_DISPLAY}</a> &middot; <a href="${WHATSAPP_LINK}" target="_blank" rel="noopener noreferrer">WhatsApp</a></span></div>
            <div class="wrg-footer-contact-row"><span class="wrg-footer-icon">${icons.mail}</span><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></div>
            <div class="wrg-footer-contact-row"><span class="wrg-footer-icon">${icons.pin}</span><span>${MAILING_ADDRESS.join('<br>')}</span></div>
            <div class="wrg-footer-contact-row"><span class="wrg-footer-icon"><svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 7h14M5 17h14"/></svg></span><a href="${PHYSICAL_ADDRESS_LINK}" target="_blank" rel="noopener noreferrer">Proudly Canadian. Worldwide Opportunities.<br>View our location</a></div>
          </div>
          <a class="wrg-footer-quote button button--primary nav-cta" href="contact.html#quote-form">Request Quotation <span aria-hidden="true">&rarr;</span></a>
        </div>
        <div class="wrg-footer-motto" aria-hidden="true"><span>PEOPLE<br>SOIL<br>PULSES<br>A STRONGER<br>TOMORROW</span></div>
      </div>
      <svg class="wrg-footer-botanical" viewBox="0 0 350 230" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><defs><g id="footer-leaf"><path d="M0 0C-32-12-45-43-38-65C-6-51 8-26 0 0ZM0 0-38-65M-7-12-25-19m14 11-8-27m-2-1-15-5m10-1-4-14"/></g></defs><path d="M165 230C147 148 110 97 77 13M160 227c30-59 76-104 133-139M165 225c-39-12-70-51-95-85M180 230c39-14 99-35 166-12"/><use href="#footer-leaf" transform="translate(136 161)"/><use href="#footer-leaf" transform="translate(112 108) scale(-.85 .85) rotate(-16)"/><use href="#footer-leaf" transform="translate(93 58) scale(.7)"/><use href="#footer-leaf" transform="translate(193 178) rotate(70)"/><use href="#footer-leaf" transform="translate(232 137) rotate(102) scale(.85)"/><use href="#footer-leaf" transform="translate(252 117) rotate(28) scale(.75)"/><use href="#footer-leaf" transform="translate(113 192) rotate(-35) scale(.7)"/><use href="#footer-leaf" transform="translate(258 221) rotate(70) scale(.8)"/><path d="M78 80c-22-8-27-25-18-41 17 4 28 21 18 41Zm-6-6c-5-12-5-20-9-27M78 85c14-7 27 5 18 12-13 9-19-1-18-12Z"/></svg>
      <svg class="wrg-footer-mountains" viewBox="0 0 200 65" fill="none" stroke="currentColor" aria-hidden="true"><path d="m0 65 52-46 14 11L92 8l20 22 12-9 76 44ZM12 65l40-46-13 28 14-8-8 13 17-11-9 18M66 30l26-22-6 28 8-8 15 30M112 30l12-9 3 25 12-3 36 20M76 65l16-28 20 28"/></svg>
      <div class="wrg-footer-bottom"><p>&copy; <span data-year></span> Whodunit Resource Group.<br>A division of 1318982 Alberta Ltd. All rights reserved.</p><nav class="wrg-footer-legal" aria-label="Legal"><a href="legal.html">Privacy Policy &amp; Terms and Conditions</a></nav></div>
    </div>
  `;}


/* =========================================================
   FLOATING WHATSAPP CTA
========================================================= */

function renderFloatingWhatsApp() {
  if (document.querySelector('.floating-whatsapp')) return;

  document.body.insertAdjacentHTML(
    'beforeend',
    `
      <a
        class="floating-whatsapp"
        href="${WHATSAPP_LINK}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order now on WhatsApp"
      >
        ${icons.whatsapp}
        <span>Order Now</span>
      </a>
    `
  );
}


/* =========================================================
   HEADER INTERACTIONS
========================================================= */

function initHeader() {

  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');

  if (!header || !toggle || !links) return;


  function closeAllDropdowns() {

    document
      .querySelectorAll('.nav-dropdown.open')
      .forEach((dropdown) => {

        dropdown.classList.remove('open');
        dropdown.querySelectorAll('details[open]').forEach((details) => { details.open = false; });

        const trigger = dropdown.querySelector(
          '.nav-dropdown-trigger'
        );

        if (trigger) {
          trigger.setAttribute('aria-expanded', 'false');
        }

      });

  }


  function setMenuState(open) {

    toggle.classList.toggle('active', open);

    links.classList.toggle('open', open);

    toggle.setAttribute(
      'aria-expanded',
      String(open)
    );

    toggle.setAttribute(
      'aria-label',
      open ? 'Close menu' : 'Open menu'
    );

    document.body.classList.toggle(
      'menu-open',
      open
    );

    if (!open) {
      closeAllDropdowns();
    }
  }


  /* MENU CLICK */

  toggle.addEventListener('click', () => {

    const isOpen =
      links.classList.contains('open');

    setMenuState(!isOpen);

  });


  /* DROPDOWN TRIGGER CLICK (About) */

  links
    .querySelectorAll('.nav-dropdown-trigger')
    .forEach((trigger) => {

      trigger.addEventListener('click', (event) => {

        event.stopPropagation();

        const dropdown = trigger.closest('.nav-dropdown');
        const isOpen = dropdown.classList.contains('open');

        closeAllDropdowns();

        if (!isOpen) {
          dropdown.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }

      });

    });


  /* CLOSE MENU AFTER CLICKING A DROPDOWN CHILD LINK */

  links
    .querySelectorAll('.nav-dropdown-menu a')
    .forEach((link) => {

      link.addEventListener('click', () => {
        setMenuState(false);
      });

    });


  /* CLOSE MENU AFTER CLICKING A TOP-LEVEL LINK */

  links
    .querySelectorAll(':scope > a')
    .forEach((link) => {

      link.addEventListener('click', () => {
        setMenuState(false);
      });

    });


  /* CLOSE DROPDOWN WHEN CLICKING OUTSIDE OF IT (DESKTOP) */

  document.addEventListener('click', (event) => {

    if (!event.target.closest('.nav-dropdown')) {
      closeAllDropdowns();
    }

  });


  /* CLOSE DROPDOWN ON ESCAPE */

  document.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {
      const activeDropdown = document.activeElement.closest('.nav-dropdown.open');
      closeAllDropdowns();
      if (activeDropdown) activeDropdown.querySelector('.nav-dropdown-trigger').focus();
    }

  });


  links.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    dropdown.addEventListener('mouseenter', () => {
      if (!window.matchMedia('(hover: hover) and (min-width: 1001px)').matches) return;
      closeAllDropdowns();
      dropdown.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    });
    dropdown.addEventListener('mouseleave', () => {
      if (window.matchMedia('(hover: hover) and (min-width: 1001px)').matches && !dropdown.contains(document.activeElement)) closeAllDropdowns();
    });
    dropdown.addEventListener('focusout', (event) => {
      if (!dropdown.contains(event.relatedTarget)) closeAllDropdowns();
    });
  });

  /* HEADER SCROLL EFFECT */

  function handleScroll() {

    header.classList.toggle(
      'scrolled',
      window.scrollY > 12
    );

  }

  window.addEventListener(
    'scroll',
    handleScroll,
    { passive: true }
  );

  handleScroll();


  /* CLOSE MOBILE MENU ON RESIZE */

  window.addEventListener('resize', () => {

    if (window.innerWidth > 1000) {
      setMenuState(false);
    }

  });

}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

  const revealElements =
    document.querySelectorAll('.reveal');

  if (!revealElements.length) return;


  /* fallback for older browsers */

  if (!('IntersectionObserver' in window)) {

    revealElements.forEach((element) => {
      element.classList.add('is-visible');
    });

    return;
  }


  const observer = new IntersectionObserver(
    (entries, observerInstance) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add(
          'is-visible'
        );

        observerInstance.unobserve(
          entry.target
        );

      });

    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );


  revealElements.forEach((element) => {
    observer.observe(element);
  });

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

  const button =
    document.querySelector('.back-top');

  if (!button) return;


  function updateButton() {

    button.classList.toggle(
      'visible',
      window.scrollY > 500
    );

  }


  window.addEventListener(
    'scroll',
    updateButton,
    { passive: true }
  );


  button.addEventListener('click', () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  });


  updateButton();

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initYear() {

  document
    .querySelectorAll('[data-year]')
    .forEach((element) => {

      element.textContent =
        new Date().getFullYear();

    });

}


/* =========================================================
   GLOBAL INITIALIZATION
========================================================= */

function initGlobal() {

  renderHeader();

  renderFooter();

  renderFloatingWhatsApp();

  initHeader();

  initYear();

  initBackToTop();

  initRevealAnimations();

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
  'DOMContentLoaded',
  initGlobal
);
