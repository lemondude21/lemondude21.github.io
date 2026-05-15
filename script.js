// --- 1. Custom Cursor Logic ---
const cursor = document.getElementById('cursor');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

// Track real mouse position
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth trailing effect so dot feels dragged by cursor
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Add hover effect to interactive elements (reused when modal injects new links)
function attachCursorHover(nodes) {
    nodes.forEach((target) => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });
}
attachCursorHover(document.querySelectorAll('.hover-target, a, button'));

// Ensure cursor resets if mouse leaves window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
});
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = 1;
});

// --- 2. Live Local Time (Bandung) ---
function updateTime() {
    const timeDisplay = document.getElementById('local-time');
    const options = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const timeString = formatter.format(new Date());
    timeDisplay.textContent = `BANDUNG ${timeString}`;
}
setInterval(updateTime, 1000);
updateTime();

// --- 2b. Project data & modal ---
const projects = [
    {
        id: 'pertamina-intern',
        title: 'Pertamina Hulu Rokan Internship Project',
        description:
            'Industry internship project at Pertamina Hulu Rokan. Deliverables include technical implementation, documentation, and stakeholder presentation of outcomes.',
        links: {
            presentation: '#', // Replace with your PPT / slides URL
            video: '#', // Replace with your demo or recap video URL
            github: '#', // Replace with your repository URL
        },
    },
    {
        id: 'ugm-community-service',
        title: 'UGM Community Service',
        description:
            'Universitas Gadjah Mada community service program — field work, collaboration with local partners, and documented impact through on-site activities.',
        links: {
            photos: '#', // Replace with album or gallery URL (Google Drive, etc.)
        },
    },
    {
        id: 'ieee-publications',
        title: 'IEEE International Conference Publications',
        description:
            'Two peer-reviewed papers presented at IEEE international conferences — research contributions in AI/ML and data-driven systems with full publication records.',
        links: {
            publications: '#', // Replace with IEEE Xplore, Scholar, or publication list URL
            photos: '#', // Replace with conference photos album URL
        },
    },
    {
        id: 'national-science-finals',
        title: 'National Science Competition Finalist',
        description:
            'National-level science competition finalist — research submission, judging rounds, and recognition as a top-performing team or individual.',
        links: {
            paper: '#', // Replace with paper or preprint URL
            photos: '#', // Replace with competition photos album URL
            certificate: '#', // Replace with certificate scan or PDF URL
        },
    },
];

const LINK_BUTTONS = [
    { key: 'github', label: 'View GitHub' },
    { key: 'presentation', label: 'View presentation' },
    { key: 'video', label: 'Watch video' },
    { key: 'publications', label: 'View publications' },
    { key: 'paper', label: 'View paper' },
    { key: 'photos', label: 'View photos' },
    { key: 'certificate', label: 'View certificate' },
    { key: 'docs', label: 'View docs' },
];

const projectModal = document.getElementById('project-modal');
const projectModalTitle = projectModal.querySelector('#project-modal-title');
const projectModalDescription = projectModal.querySelector('.project-modal__description');
const projectModalLinks = projectModal.querySelector('.project-modal__links');
let lastFocusedBeforeModal = null;

function getProjectById(id) {
    return projects.find((p) => p.id === id);
}

function openProjectModal(projectId) {
    const project = getProjectById(projectId);
    if (!project) return;

    lastFocusedBeforeModal = document.activeElement;
    projectModalTitle.textContent = project.title;
    projectModalDescription.textContent = project.description;

    projectModalLinks.innerHTML = '';
    const links = project.links || {};
    LINK_BUTTONS.forEach(({ key, label }) => {
        const url = links[key];
        if (!url) return;
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'project-modal__link utility-text hover-target';
        a.textContent = label;
        projectModalLinks.appendChild(a);
    });
    attachCursorHover(projectModalLinks.querySelectorAll('a'));

    projectModal.hidden = false;
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    const closeBtn = projectModal.querySelector('.project-modal__close');
    if (closeBtn) closeBtn.focus();
}

function closeProjectModal() {
    projectModal.hidden = true;
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    projectModalLinks.innerHTML = '';

    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
        lastFocusedBeforeModal.focus();
    }
    lastFocusedBeforeModal = null;
}

document.querySelectorAll('.list-item[data-project-id]').forEach((card) => {
    card.addEventListener('click', () => {
        openProjectModal(card.getAttribute('data-project-id'));
    });
});

projectModal.addEventListener('click', (e) => {
    if (e.target.closest('[data-modal-close]')) {
        closeProjectModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !projectModal.hidden) {
        closeProjectModal();
    }
});

// --- 3. GSAP Scroll Animations ---
gsap.registerPlugin(ScrollTrigger);

// Logo + nav links fade out while scrolling down; fade back in near the top
const navFadeEls = gsap.utils.toArray("nav .logo, nav .nav-links");
gsap.fromTo(
    navFadeEls,
    { opacity: 1 },
    {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "+=180",
            scrub: 0.35,
            onUpdate(self) {
                const hideInteractions = self.progress > 0.9;
                navFadeEls.forEach((el) => {
                    el.style.pointerEvents = hideInteractions ? "none" : "";
                });
            },
        },
    }
);

// Hero initial load animation
gsap.from(".gs-reveal", {
    y: 40,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.2
});

// Standard fade up on scroll for sections
gsap.utils.toArray('.gs-fade-up').forEach(elem => {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 85%", // Trigger when element is 85% down viewport
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});
