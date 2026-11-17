
 

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProjectFilters();
  initContactForm();
  initEmailCopy();
  initBackToTop();
});


function initNavigation() {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Create mobile hamburger toggle button if not present
  let menuToggle = document.querySelector('.mobile-menu-toggle');
  if (!menuToggle) {
    menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.setAttribute('aria-label', 'Toggle Navigation Menu');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = `
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    `;
    nav.appendChild(menuToggle);
  }

  const navList = nav.querySelector('ul');

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navList.classList.toggle('open');
  });

  // Close mobile menu on clicking any link
  if (navList) {
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navList.classList.remove('open');
      });
    });
  }

  // Active link detection based on current URL path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = nav.querySelectorAll('ul li a');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (!linkHref) return;

    const targetFile = linkHref.split('/').pop();

    if (
      currentPath === targetFile ||
      (currentPath === '' && (targetFile === 'Home.html' || targetFile === 'index.html')) ||
      ((currentPath === 'index.html' || currentPath === 'Home.html') &&
        (targetFile === 'Home.html' || targetFile === 'index.html'))
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}


function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || (category && category.includes(filterValue))) {
          card.style.display = 'flex';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
          card.classList.remove('fade-in');
        }
      });
    });
  });
}


function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const statusBox = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
      showFormStatus('Please fill in all required fields.', 'error');
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormStatus('Please enter a valid email address.', 'error');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    // Simulate sending with pleasant feedback and provide mailto link fallback
    setTimeout(() => {
      contactForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }

      const mailtoUrl = `mailto:rahulbalika88@gmail.com?subject=${encodeURIComponent(
        `[Portfolio] ${subject} from ${name}`
      )}&body=${encodeURIComponent(`Hi Rahul,\n\n${message}\n\nFrom: ${name} (${email})`)}`;

      showFormStatus(
        `Thank you, <strong>${name}</strong>! Your message preview is ready. <a href="${mailtoUrl}" class="status-action-btn">Click here to launch email client</a> or send to rahulbalika88@gmail.com directly.`,
        'success'
      );
    }, 600);
  });

  function showFormStatus(msg, type) {
    if (!statusBox) return;
    statusBox.innerHTML = msg;
    statusBox.className = `form-status ${type}`;
    statusBox.style.display = 'block';
  }
}


function initEmailCopy() {
  const copyBtn = document.getElementById('copyEmailBtn');
  if (!copyBtn) return;

  const emailText = copyBtn.getAttribute('data-email') || 'rahulbalika88@gmail.com';

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText).then(() => {
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = `<span>Copied to Clipboard! ✓</span>`;
      copyBtn.classList.add('copied');

      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.classList.remove('copied');
      }, 2500);
    }).catch(() => {
      window.location.href = `mailto:${emailText}`;
    });
  });
}


function initBackToTop() {
  let backBtn = document.getElementById('backToTop');
  if (!backBtn) {
    backBtn = document.createElement('button');
    backBtn.id = 'backToTop';
    backBtn.setAttribute('aria-label', 'Back to top');
    backBtn.innerHTML = '↑';
    document.body.appendChild(backBtn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

