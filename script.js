// --- 1. Custom Cursor Logic ---
// Removed per user request. Dummy function left to prevent errors when calling this elsewhere.
function attachCursorHover(nodes) {
    // no-op
}

// --- 2. Live Local Time (Bandung & Doha) ---
function updateTime() {
    const bandungDisplay = document.getElementById('local-time');
    const dohaDisplay = document.getElementById('doha-time');
    
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    
    const now = new Date();
    
    if (bandungDisplay) {
        const bandungFormatter = new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'Asia/Jakarta' });
        bandungDisplay.textContent = `BANDUNG ${bandungFormatter.format(now)}`;
    }
    
    if (dohaDisplay) {
        const dohaFormatter = new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'Asia/Qatar' });
        dohaDisplay.textContent = `DOHA ${dohaFormatter.format(now)}`;
    }
}
setInterval(updateTime, 1000);
updateTime();

// --- 2b. Project data & modal ---
const projects = [
    {
        id: 'qafco-intern',
        title: 'QAFCO Digitalization Office Internship',
        description:
            'During the Digitalization Office internship at Qatar Fertiliser Company (QAFCO), spearheaded the research and implementation of an enterprise Microsoft Co-Pilot agent designed to streamline corporate document management and retrieval. A primary focus involved leveraging advanced Knowledge Graph architectures (GraphRAG) to significantly enhance agent intelligence and reasoning capabilities across complex, multi-domain topics within a repository exceeding 2,000 corporate documents.',
        thumbnail: 'media/Photos/Screenshot 2026-06-28 103923.png',
        thumbnailAlt: 'QAFCO Digitalization Office Internship',
        thumbnailFallback:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        links: {
            github: 'https://github.com/lemondude21/mcp-graphrag-test',
        },
    },
    {
        id: 'pertamina-intern',
        title: 'Pertamina Hulu Rokan Internship Project',
        description:
            'During the IT Business Solutions internship at PERTAMINA Hulu Rokan, a Multimodal AI assistant was engineered to optimize operations within Commercial Regional 1. The project involved evaluating and deploying fine-tuned Large Language Models (LLMs) locally, alongside developing a visual-question-answering (VQA) feature to process scanned corporate documents efficiently. Built utilizing Python, Microsoft Azure, Milvus, and Hugging Face, the final deployment featured a robust document embedding system that enabled seamless and highly accurate retrieval of information directly from the corporate database.',
        thumbnail: 'media/Photos/Screenshot 2026-05-17 100445.png',
        thumbnailAlt: 'Pertamina Hulu Rokan internship project',
        thumbnailFallback:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        links: {
            presentation: 'https://drive.google.com/file/d/1OHtAzRiaeQwfSwhIruY-pGgNhnvk8f8N/view?usp=sharing',
            video: 'https://drive.google.com/file/d/1yV3e7VpFyqcL3wgBZML86Mw6Hnwojv5L/view?usp=sharing',
            github: 'https://github.com/lemondude21/VQA-URBuddy',
        },
    },
    {
        id: 'ugm-community-service',
        title: 'UGM Community Service (Gantari Mengwi)',
        description:
            'As part of the KKN-PPM UGM 2025 program, technical contributions were made to the "Gantari Mengwi" initiative in Bali. A functional digital mailing system was architected and deployed using PHP and SQL to digitize and streamline administrative processes for the local village government. Additionally, the initiative involved cross-disciplinary collaboration to teach foundational computer science and basic financial literacy concepts to students across four local primary schools.',
        thumbnail: 'media/Photos/WhatsApp Image 2025-08-02 at 11.13.10_3f72197c (1).jpg',
        thumbnailAlt: 'UGM Community Service — Gantari Mengwi',
        thumbnailFallback:
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop',
        links: {
            github: 'https://github.com/lemondude21/SI-Persuratan',
        },
    },
    {
        id: 'ieee-publications',
        title: 'IEEE International Conference Publications',
        description:
            'Research applying machine learning to the medical field has culminated in two Scopus-indexed publications presented at international IEEE conferences. The first paper, presented at the IEEE Conference of Artificial Intelligence 2024 in Singapore, introduced a hybrid ML model utilizing an integrated SMOTE algorithm and ensemble learning to enhance early stunting detection, achieving a 10% increase in predictive accuracy. The second publication, presented at the IEEE Conference of Future Machine Learning and Data Science 2024 in Sydney, explored a few-shot learning approach for classifying Tuberculosis from Chest X-Ray images.',
        thumbnail: 'media/Photos/Screenshot 2026-05-17 100910.png',
        thumbnailAlt: 'IEEE international conference publications',
        thumbnailFallback:
            'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop',
        links: {
            publications: 'https://arxiv.org/abs/2409.11644',
        },
    },
    {
        id: 'national-science-finals',
        title: 'National Science Competition Finalist (GEMASTIK 2024)',
        description:
            'Competing against over 2,900 teams from top universities across Indonesia, finalist status was achieved at the GEMASTIK 2024 National STEM Competition. The competition entry focused on improving the early detection classification of Tuberculosis using Chest X-Ray images. By utilizing a Genetic Algorithm to optimize hyperparameter tuning, the classification model\'s performance was successfully improved by 4%, demonstrating advanced capabilities in applying optimization algorithms to complex medical imaging challenges.',
        thumbnail: 'media/Photos/Gemastik-Unnes.JPG',
        thumbnailAlt: 'GEMASTIK 2024 National Science Competition',
        thumbnailFallback:
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
        links: {
            paper: 'https://drive.google.com/file/d/158WPetWePaS9mkUaNbOAmpMbkOhM_Wsf/view?usp=sharing',
            certificate: 'https://drive.google.com/file/d/1ld86ClaHqGo2_AmqxV_gjSorjcpBRHlE/view?usp=sharing',
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
const projectModalThumbnail = document.getElementById('project-modal-thumbnail');
const projectModalMedia = projectModal.querySelector('.project-modal__media');
const projectModalDescription = projectModal.querySelector('.project-modal__description');
const projectModalLinks = projectModal.querySelector('.project-modal__links');
let lastFocusedBeforeModal = null;

function setProjectModalThumbnail(project) {
    const src = project.thumbnail || project.thumbnailFallback;
    if (!src) {
        projectModalMedia.hidden = true;
        projectModalThumbnail.removeAttribute('src');
        projectModalThumbnail.alt = '';
        return;
    }

    projectModalMedia.hidden = false;
    projectModalThumbnail.alt = project.thumbnailAlt || project.title;
    projectModalThumbnail.onerror = () => {
        if (project.thumbnailFallback && projectModalThumbnail.src !== project.thumbnailFallback) {
            projectModalThumbnail.src = project.thumbnailFallback;
            projectModalThumbnail.onerror = null;
            return;
        }
        projectModalMedia.hidden = true;
    };
    projectModalThumbnail.src = src;
}

function getProjectById(id) {
    return projects.find((p) => p.id === id);
}

function openProjectModal(projectId) {
    const project = getProjectById(projectId);
    if (!project) return;

    lastFocusedBeforeModal = document.activeElement;
    projectModalTitle.textContent = project.title;
    projectModalDescription.textContent = project.description;
    setProjectModalThumbnail(project);

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
    projectModalThumbnail.removeAttribute('src');
    projectModalThumbnail.onerror = null;
    projectModalMedia.hidden = false;

    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
        lastFocusedBeforeModal.focus();
    }
    lastFocusedBeforeModal = null;
}

document.querySelectorAll('.work-card[data-project-id]').forEach((card) => {
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

// --- Carousel Navigation ---
const workGrid = document.querySelector('.work-grid');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (workGrid && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        const scrollAmount = window.innerWidth > 768 ? 640 : window.innerWidth * 0.85;
        workGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        const scrollAmount = window.innerWidth > 768 ? 640 : window.innerWidth * 0.85;
        workGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// --- 3. GSAP Scroll Animations ---
gsap.registerPlugin(ScrollTrigger);

// Navbar persists (no fade out on scroll)

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

// --- 4. Accordion Logic ---
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        
        // Close all other accordions (optional: remove if you want multiple open)
        accordionHeaders.forEach(h => {
            h.setAttribute('aria-expanded', 'false');
        });

        // Toggle the clicked one
        if (!isExpanded) {
            header.setAttribute('aria-expanded', 'true');
        }
    });
});
