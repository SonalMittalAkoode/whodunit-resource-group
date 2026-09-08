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
      { href: 'why-whodunit.html', label: 'Why WHODUNIT', key: 'why' },
      { href: 'quality.html', label: 'Quality & Traceability', key: 'quality' },
      { href: 'sustainability.html', label: 'Sustainability', key: 'sustainability' },
      { href: 'faq.html', label: 'FAQ', key: 'faq' },
    ],
  },
  {
    type: 'dropdown', label: 'Products', key: 'products',
    children: [
      { href: 'product-detail.html#lentils', label: 'Lentils', key: 'lentils', image: 'Images/iStock/web/iStock-2223084329.webp' },
      { href: 'product-detail.html#peas', label: 'Peas', key: 'peas', image: 'Images/iStock/web/iStock-1383100164.webp' },
      { href: 'product-detail.html#beans', label: 'Beans', key: 'beans', image: 'Images/iStock-1211260989-web.jpg' },
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
   ICONS (inline SVG — line-icon style, no font-icon deps)
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
            (child) => child.key === 'lentils' ? `
              <details class="nav-lentils">
                <summary><img src="${child.image}" alt="" width="48" height="40">Lentils <span aria-hidden="true">⌄</span></summary>
                <div class="nav-lentil-links">
                  <a href="product-detail.html#red-lentils">Red Lentils</a>
                  <a href="product-detail.html#green-lentils">Green Lentils</a>
                  <a href="product-detail.html#black-lentils">Black Lentils</a>
                  <a href="product-detail.html#lentils">All Lentil Specifications</a>
                </div>
              </details>
            ` : `
              <a
                href="${child.href}"
                ${child.key === current ? 'aria-current="page"' : ''}
              >
                ${child.image ? `<img src="${child.image}" alt="" width="48" height="40">` : ''}${child.label}
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

    <div class="container footer-grid">

      <!-- BRAND -->
      <div class="footer-brand">

        <span class="logo-wrap">
          <img
            src="LogoImage/Whodunit Resource Group Logo.svg"
            alt="WHODUNIT Resource Group"
          >
        </span>

        <p>
          Canadian-owned and vertically integrated. We farm, store, process, pack, and ship lentils, peas, and dry beans.
        </p>

        <div class="footer-social">
          <a href="#" aria-label="LinkedIn">${icons.linkedin}</a>
          <a href="#" aria-label="Twitter / X">${icons.twitter}</a>
          <a href="mailto:${CONTACT_EMAIL}" aria-label="Email">${icons.mail}</a>
        </div>

      </div>


      <!-- QUICK LINKS -->
      <div class="footer-column">

        <h3>Company &amp; Trade</h3>

        <div class="footer-links">
          <a href="quality.html">Quality &amp; Traceability</a>
          <a href="sustainability.html">Sustainability</a>

          <a href="index.html">
            Home
          </a>

          <a href="about.html">
            About Us
          </a>

          <a href="products.html">
            Products
          </a>

          <a href="sourcing.html">
            Value Enhancement
          </a>

          <a href="markets.html">
            Markets
          </a>

        </div>

      </div>


      <!-- EXPLORE -->
      <div class="footer-column">

        <h3>Products &amp; Resources</h3>

        <div class="footer-links">

          <a href="products.html#lentils">
            Lentils
          </a>

          <a href="products.html#peas">
            Peas
          </a>

          <a href="products.html#beans">
            Beans
          </a>

          <a href="resources.html">
            Resources
          </a>

          <a href="faq.html">
            FAQ
          </a>

        </div>

      </div>


      <!-- CONTACT -->
      <div class="footer-column footer-contact">

        <h3>Contact</h3><p>Available 24/7, 365 days a year.</p>

        <div class="footer-contact-list">

          <a
            class="footer-contact-item"
            href="${WHATSAPP_LINK}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
          >
            <span class="footer-contact-icon">${icons.phone}</span>
            <span>WhatsApp: ${WHATSAPP_DISPLAY}</span>
          </a>

          <div class="footer-contact-item">
            <span class="footer-contact-icon">${icons.mail}</span>
            <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
          </div>

          <div class="footer-contact-item">
            <span class="footer-contact-icon">${icons.pin}</span>
            <span>${MAILING_ADDRESS.join('<br>')}</span>
          </div>

          <a
            class="footer-contact-item"
            href="${PHYSICAL_ADDRESS_LINK}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open physical address in Google Maps"
          >
            <span class="footer-contact-icon">${icons.pin}</span>
            <span>Physical Address: View on Google Maps</span>
          </a>

        </div>

        <a class="footer-quote-box" href="contact.html#quote-form">
          <span>
            <strong>Request Quotation</strong>
            <span>Tell us your requirements and we'll get back to you.</span>
          </span>
          ${icons.arrowRight}
        </a>

      </div>

    </div>


    <!-- BOTTOM FOOTER -->
    <div class="container footer-bottom">

      <span>
        &copy;
        <span data-year></span>
        Whodunit Resource Group.
        All rights reserved.
        <a
  href="https://www.akoode.com/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Made with love by Akoode"
  style="display:inline-flex;align-items:center;gap:4px;white-space:nowrap;"
>
  Made with <span aria-hidden="true" style="color:#fff;">♥</span>
</a>
      </span>


      <div>

        <a href="contact.html">
          Privacy Policy
        </a>

        <a href="contact.html">
          Terms & Conditions
        </a>



      </div>

    </div>

  `;
}


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
