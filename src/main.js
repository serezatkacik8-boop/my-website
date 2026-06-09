// Import SCSS styles
import './styles/main.scss';

// -------------------------------------------------------------
// 1. Theme Toggle (Dark / Light Mode)
// -------------------------------------------------------------
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check stored theme or default to system preference
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (storedTheme === 'light') {
  htmlElement.setAttribute('data-theme', 'light');
} else if (storedTheme === 'dark') {
  htmlElement.removeAttribute('data-theme');
} else if (!prefersDark) {
  // If system prefers light and no storage exists
  htmlElement.setAttribute('data-theme', 'light');
}

// Toggle click handler
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  if (currentTheme === 'light') {
    htmlElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    htmlElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// -------------------------------------------------------------
// 2. Mobile Nav Menu Toggle
// -------------------------------------------------------------
const menuToggleBtn = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.header__link');

const toggleMenu = () => {
  menuToggleBtn.classList.toggle('header__menu-toggle--active');
  navMenu.classList.toggle('header__nav--active');
};

menuToggleBtn.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('header__nav--active')) {
      toggleMenu();
    }
  });
});

// -------------------------------------------------------------
// 3. Sticky Header on Scroll
// -------------------------------------------------------------
const header = document.getElementById('header');

const handleScroll = () => {
  if (window.scrollY > 50) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
};

window.addEventListener('scroll', handleScroll);
// Run on initial load too
handleScroll();

// -------------------------------------------------------------
// 4. Scroll Active Link Highlighter
// -------------------------------------------------------------
const sections = document.querySelectorAll('section[id]');

const highlightNavOnScroll = () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120; // offset for sticky header
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.header__nav a[href*=${sectionId}]`);
    
    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('header__link--active');
      } else {
        navLink.classList.remove('header__link--active');
      }
    }
  });
};

window.addEventListener('scroll', highlightNavOnScroll);

// -------------------------------------------------------------
// 5. Typing Text Animation (Hero Section)
// -------------------------------------------------------------
const typingElement = document.getElementById('typing-text');
const words = ['Разработчик.', 'React-специалист.', 'Создатель интерфейсов.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

const typeAnimation = () => {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    // Erase character
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 75; // speed up when deleting
  } else {
    // Type character
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 150;
  }
  
  // Checking transitions
  if (!isDeleting && charIndex === currentWord.length) {
    // Word completed, wait before deleting
    isDeleting = true;
    typeSpeed = 2000; // Pause at full word
  } else if (isDeleting && charIndex === 0) {
    // Word deleted, switch to next word
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500; // Small pause before typing next word
  }
  
  setTimeout(typeAnimation, typeSpeed);
};

// Start typing effect on load
setTimeout(typeAnimation, 1000);

// Add styling cursor blinking helper to typing element
typingElement.style.borderRight = '3px solid var(--accent-primary)';
typingElement.style.paddingRight = '4px';

// Blinking effect
setInterval(() => {
  if (typingElement.style.borderRightColor === 'transparent') {
    typingElement.style.borderRightColor = 'var(--accent-primary)';
  } else {
    typingElement.style.borderRightColor = 'transparent';
  }
}, 500);

// -------------------------------------------------------------
// 6. Projects Filter Logic
// -------------------------------------------------------------
const filterButtons = document.querySelectorAll('.projects__filter-btn');
const projectCards = document.querySelectorAll('.projects__card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Toggle active state on buttons
    filterButtons.forEach(btn => btn.classList.remove('projects__filter-btn--active'));
    button.classList.add('projects__filter-btn--active');
    
    const filterValue = button.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      // Animate transition using scaling/fade effect
      if (filterValue === 'all' || cardCategory === filterValue) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300); // match standard transitions
      }
    });
  });
});

// Initialize all projects visibility styles
projectCards.forEach(card => {
  card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  card.style.opacity = '1';
  card.style.transform = 'scale(1)';
});

// -------------------------------------------------------------
// 7. Contact Form Simulation
// -------------------------------------------------------------
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  
  // UI Loading State
  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправка...';
  submitBtn.style.opacity = '0.7';
  
  // Hide any previous feedback
  formFeedback.className = 'contact__feedback';
  formFeedback.style.display = 'none';
  
  // Simulate network request
  setTimeout(() => {
    try {
      // Form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        throw new Error('Пожалуйста, заполните все поля.');
      }
      
      // Successful mock submission
      formFeedback.classList.add('contact__feedback--success');
      formFeedback.textContent = `Спасибо, ${name}! Ваше сообщение успешно отправлено. Я свяжусь с вами в ближайшее время.`;
      
      // Reset form
      contactForm.reset();
    } catch (error) {
      formFeedback.classList.add('contact__feedback--error');
      formFeedback.textContent = error.message || 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.';
    } finally {
      // Restore Button State
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      submitBtn.style.opacity = '1';
    }
  }, 1500);
});

// -------------------------------------------------------------
// 8. Footer Current Year Auto-updater
// -------------------------------------------------------------
document.getElementById('current-year').textContent = new Date().getFullYear();

// -------------------------------------------------------------
// 9. IT Matrix Canvas Background Animation
// -------------------------------------------------------------
const bgCanvas = document.getElementById('tech-bg');
const bgCtx = bgCanvas.getContext('2d');

const resizeBgCanvas = () => {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
};

window.addEventListener('resize', resizeBgCanvas);
resizeBgCanvas();

const binaryChars = '01';
const bgFontSize = 14;
let bgColumns = bgCanvas.width / bgFontSize;
let bgDrops = Array(Math.floor(bgColumns)).fill(1);

window.addEventListener('resize', () => {
  bgColumns = bgCanvas.width / bgFontSize;
  bgDrops = Array(Math.floor(bgColumns)).fill(1);
});

const drawMatrix = () => {
  const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
  
  // Fade trailing frames
  bgCtx.fillStyle = isLightMode ? 'rgba(248, 250, 252, 0.1)' : 'rgba(10, 14, 23, 0.1)';
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  // Render falling characters
  bgCtx.fillStyle = isLightMode ? 'rgba(124, 58, 237, 0.08)' : 'rgba(139, 92, 246, 0.12)';
  bgCtx.font = `${bgFontSize}px monospace`;

  for (let i = 0; i < bgDrops.length; i++) {
    const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];
    bgCtx.fillText(text, i * bgFontSize, bgDrops[i] * bgFontSize);

    if (bgDrops[i] * bgFontSize > bgCanvas.height && Math.random() > 0.985) {
      bgDrops[i] = 0;
    }
    bgDrops[i]++;
  }
};

setInterval(drawMatrix, 40);

