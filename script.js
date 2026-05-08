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

// Add hover effect to interactive elements
const hoverTargets = document.querySelectorAll('.hover-target, a, button');
hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
    });
    target.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
    });
});

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

// --- 3. GSAP Scroll Animations ---
gsap.registerPlugin(ScrollTrigger);

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
