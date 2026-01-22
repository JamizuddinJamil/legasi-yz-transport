/**
 * 1. GLOBAL FUNCTIONS
 * Exposed to window for HTML onclick events
 */

// Function to handle the manual snap-scroll gallery
window.scrollGallery = function (direction) {
    const container = document.getElementById('modalGallery');
    if (!container) return;
    
    const width = container.clientWidth;
    container.scrollBy({
        left: direction * width,
        behavior: 'smooth'
    });
};

window.openModal = function () {
    const modal = document.getElementById('details-modal');
    if (!modal) return;

    modal.style.display = 'flex';
    // Small delay to allow display:flex to register before adding animation class
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
};

window.closeModal = function () {
    const modal = document.getElementById('details-modal');
    if (!modal) return;

    modal.classList.remove('active');
    // Wait for the CSS transition (0.4s) to finish before hiding
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 400);
};

/**
 * 2. INITIALIZATION
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Legasi YZ System 2026 Initialized');

    /* ===============================
       REVEAL ON SCROLL (Intersection Observer)
    =============================== */
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once animated
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal, .section-title').forEach((el) => {
        revealObserver.observe(el);
    });

    /* ===============================
       NAVBAR SCROLL EFFECT
    =============================== */
    const nav = document.getElementById('navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                // Shrink and blur effect for modern UI
                nav.classList.add('bg-white/80', 'backdrop-blur-lg', 'shadow-lg', 'py-4');
                nav.classList.remove('py-6');
            } else {
                nav.classList.remove('bg-white/80', 'backdrop-blur-lg', 'shadow-lg', 'py-4');
                nav.classList.add('py-6');
            }
        });
    }

    /* ===============================
       MODAL CLICK OUTSIDE TO CLOSE
    =============================== */
    const modal = document.getElementById('details-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            // Only close if the background (the modal div itself) is clicked
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    function openModal() {
    const modal = document.getElementById('details-modal');
    modal.style.display = 'flex';
    document.body.classList.add('modal-open'); // Lock scroll
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeModal() {
    const modal = document.getElementById('details-modal');
    modal.classList.remove('active');
    document.body.classList.remove('modal-open'); // Unlock scroll
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400);
}

    /* ===============================
       LUCIDE ICONS INITIALIZATION
    =============================== */
    if (window.lucide) {
        lucide.createIcons();
    }
});