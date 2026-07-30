/* ==========================================================================
   INDUS RANI PORTFOLIO - INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme (Dark/Light Mode)
    initTheme();

    // 2. Mobile Menu & Navbar Scroll Behavior
    initNavbar();

    // 3. Typewriter Effect in Hero Section
    initTypewriter();

    // 4. Animated Counters on Scroll
    initCounters();

    // 5. Project Filtering & Details Modal
    initProjects();

    // 6. Contact Form Validation & Submission
    initContactForm();

    // 7. Dynamic Footer Year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

/* --- 1. Theme Management --- */
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });
}

/* --- 2. Navbar & Mobile Menu --- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightActiveNavLink();
    });

    // Mobile Hamburger Menu Toggle
    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close Mobile Menu on Nav Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Highlight Active Link based on scroll position
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
}

/* --- 3. Typewriter Effect --- */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "Full-Stack Web Applications",
        "MERN Stack Systems",
        "Optimized C++ Algorithms",
        "Responsive User Interfaces"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* --- 4. Animated Counters --- */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const step = Math.ceil(target / (duration / 20));
                    let count = 0;

                    const timer = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = count;
                        }
                    }, 20);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsBanner = document.querySelector('.stats-banner');
    if (statsBanner) observer.observe(statsBanner);
}

/* --- 5. Projects & Modal --- */
function initProjects() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');

    // Data store for project details
    const projectsData = {
        "1": {
            title: "Interview Prep Platform",
            category: "Full Stack MERN Project",
            description: "A comprehensive platform designed for software engineering interview preparation. Features user authentication with JWT, MCQ practice routes, interview module controllers, leaderboard rankings, and error middleware handling.",
            highlights: [
                "Built backend REST API with Express.js & MongoDB.",
                "Implemented secure authentication and route protection.",
                "Designed clean frontend layout in React for test taking.",
                "Included real-time score calculation and leaderboard."
            ],
            github: "https://github.com/InduRani11",
            live: "#"
        },
        "2": {
            title: "Personal Developer Portfolio",
            category: "Frontend Web Design",
            description: "An updated personal portfolio website built with semantic HTML5, glassmorphism CSS styling, dynamic JavaScript interactions, and high-aesthetic UI principles.",
            highlights: [
                "Dark and light theme toggle with persistent storage.",
                "Responsive mobile-first grid layout.",
                "Interactive project category filtering & modals.",
                "SEO & accessibility optimized design."
            ],
            github: "https://github.com/InduRani11",
            live: "https://indurani11.github.io/Explore/Day8-5march/profile.html"
        },
        "3": {
            title: "C++ DSA Solutions Suite",
            category: "Data Structures & Algorithms",
            description: "A well-structured repository containing efficient implementations of classic computer science algorithms and data structure challenges in C++.",
            highlights: [
                "Covers Linked Lists, Binary Trees, Graphs, and DP.",
                "Optimized time and space complexity solutions.",
                "Clean modular code structure with detailed comments."
            ],
            github: "https://github.com/InduRani11",
            live: "#"
        },
        "4": {
            title: "Dynamic Weather App",
            category: "Frontend API Integration",
            description: "Real-time weather dashboard fetching live weather metrics from external REST APIs based on user location search.",
            highlights: [
                "Async/Await fetch API implementation.",
                "Dynamic UI weather condition background updates.",
                "5-day forecast display with metric/imperial toggle."
            ],
            github: "https://github.com/InduRani11",
            live: "#"
        }
    };

    // Category Filter Listener
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Modal Trigger Listeners
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.getAttribute('data-project');
            const data = projectsData[projectId];

            if (data) {
                modalBody.innerHTML = `
                    <h3 class="modal-title">${data.title}</h3>
                    <div class="modal-category">${data.category}</div>
                    <p class="modal-desc">${data.description}</p>
                    <h4 style="margin-bottom: 0.5rem; font-size: 1rem;">Key Highlights:</h4>
                    <ul class="modal-highlights">
                        ${data.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                    <div class="modal-actions">
                        <a href="${data.github}" target="_blank" class="btn btn-primary btn-sm">
                            <i class="fa-brands fa-github"></i> View GitHub Code
                        </a>
                        ${data.live !== '#' ? `
                            <a href="${data.live}" target="_blank" class="btn btn-secondary btn-sm">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Site
                            </a>
                        ` : ''}
                    </div>
                `;
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    // Close Modal Event Handlers
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
}

/* --- 6. Contact Form Handler --- */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Interactive state change
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
            formStatus.className = 'form-status';
            formStatus.textContent = '';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
                formStatus.className = 'form-status success';
                formStatus.textContent = '✨ Thank you! Your message has been sent successfully.';

                contactForm.reset();

                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1200);
        });
    }
}
