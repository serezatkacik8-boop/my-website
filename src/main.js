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
  bgCtx.fillStyle = isLightMode ? 'rgba(248, 250, 252, 0.1)' : 'rgba(0, 0, 0, 0.1)';
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

// -------------------------------------------------------------
// 10. Self-Playing Snake Game Animation on Laptop Screen
// -------------------------------------------------------------
const initSnakeGame = () => {
  const canvas = document.getElementById('snake-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Set resolution to look retro and sharp
  canvas.width = 360;
  canvas.height = 216;

  const cols = 20;
  const rows = 12;
  const cellSize = canvas.width / cols; // 18px

  let snake = [
    {x: 5, y: 6},
    {x: 4, y: 6},
    {x: 3, y: 6}
  ];
  let direction = {x: 1, y: 0};
  let food = {x: 14, y: 6};
  let score = 0;
  let gameTick = 0;
  let flashEffect = 0;

  const spawnFood = () => {
    let attempts = 0;
    while (attempts < 100) {
      const rx = Math.floor(Math.random() * cols);
      const ry = Math.floor(Math.random() * rows);
      // Verify not on snake body
      const onSnake = snake.some(s => s.x === rx && s.y === ry);
      if (!onSnake) {
        food = {x: rx, y: ry};
        break;
      }
      attempts++;
    }
  };

  const getDistance = (p1, p2) => {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
  };

  const calculateNextMove = () => {
    const head = snake[0];
    const moves = [
      {x: 0, y: -1, name: 'UP'},
      {x: 0, y: 1, name: 'DOWN'},
      {x: -1, y: 0, name: 'LEFT'},
      {x: 1, y: 0, name: 'RIGHT'}
    ];

    let bestMove = null;
    let minDistance = Infinity;

    for (const move of moves) {
      const nextX = head.x + move.x;
      const nextY = head.y + move.y;

      // Check boundary collisions
      if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) {
        continue;
      }

      // Check self collision (excluding the tail tip)
      const collidesBody = snake.slice(0, -1).some(s => s.x === nextX && s.y === nextY);
      if (collidesBody) {
        continue;
      }

      const dist = getDistance({x: nextX, y: nextY}, food);
      if (dist < minDistance) {
        minDistance = dist;
        bestMove = move;
      }
    }

    if (bestMove) {
      direction = bestMove;
    }
  };

  const resetGame = () => {
    snake = [
      {x: 5, y: 6},
      {x: 4, y: 6},
      {x: 3, y: 6}
    ];
    direction = {x: 1, y: 0};
    score = 0;
    flashEffect = 10;
    spawnFood();
  };

  const update = () => {
    gameTick++;
    if (flashEffect > 0) {
      flashEffect--;
      return;
    }

    // AI calculations to find path
    calculateNextMove();

    const head = snake[0];
    const nextHead = {x: head.x + direction.x, y: head.y + direction.y};

    // If dead (collides wall or body)
    if (
      nextHead.x < 0 || nextHead.x >= cols || 
      nextHead.y < 0 || nextHead.y >= rows ||
      snake.some(s => s.x === nextHead.x && s.y === nextHead.y)
    ) {
      resetGame();
      return;
    }

    snake.unshift(nextHead);

    // Eating food
    if (nextHead.x === food.x && nextHead.y === food.y) {
      score += 10;
      spawnFood();
    } else {
      snake.pop();
    }
  };

  const draw = () => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background retro grid lines
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
    ctx.lineWidth = 0.5;
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellSize, 0);
      ctx.lineTo(c * cellSize, canvas.height);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellSize);
      ctx.lineTo(canvas.width, r * cellSize);
      ctx.stroke();
    }

    if (flashEffect > 0) {
      // Death flash effect
      ctx.fillStyle = `rgba(239, 68, 68, ${flashEffect * 0.08})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CRASH', canvas.width / 2, canvas.height / 2 + 6);
      ctx.shadowBlur = 0;
      return;
    }

    // Draw food (pulsing neon magenta circle)
    const pulse = 1 + Math.sin(gameTick * 0.2) * 0.15;
    const foodRadius = (cellSize / 2.5) * pulse;
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      foodRadius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = '#ec4899';
    ctx.shadowColor = '#ec4899';
    ctx.shadowBlur = 8;
    ctx.fill();

    // Draw snake
    snake.forEach((segment, idx) => {
      const isHead = idx === 0;
      const size = cellSize - 2;
      const x = segment.x * cellSize + 1;
      const y = segment.y * cellSize + 1;

      ctx.fillStyle = isHead ? '#00ffcc' : '#8b5cf6';
      ctx.shadowColor = isHead ? '#00ffcc' : '#8b5cf6';
      ctx.shadowBlur = isHead ? 8 : 4;
      
      // Draw rounded block
      ctx.beginPath();
      ctx.roundRect(x, y, size, size, isHead ? 5 : 3);
      ctx.fill();
    });

    // Reset shadow blur for text
    ctx.shadowBlur = 0;

    // Draw retro scanlines overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    for (let y = 0; y < canvas.height; y += 3) {
      ctx.fillRect(0, y, canvas.width, 1);
    }

    // Draw score
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${score}`, 10, 20);
    
    ctx.textAlign = 'right';
    ctx.fillText('AUTO_PILOT', canvas.width - 10, 20);
  };

  const gameLoop = () => {
    update();
    draw();
    setTimeout(gameLoop, 130);
  };

  spawnFood();
  gameLoop();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSnakeGame);
} else {
  initSnakeGame();
}

