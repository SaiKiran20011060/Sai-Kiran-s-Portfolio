// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll - removed to keep transparent

// Contact form handling (if form exists)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation (skip carousel cards)
document.querySelectorAll('.skill-category, #projGrid .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// About section scroll animations
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.about-header-animate, .about-text-animate, .about-skills-animate').forEach(el => {
    aboutObserver.observe(el);
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Dynamic certificate duplication for infinite scroll
    const certificatesScroll = document.querySelector('.certificates-scroll');
    if (certificatesScroll) {
        const originalCertificates = certificatesScroll.innerHTML;
        const repeatCount = 100; // Change this number to increase/decrease duplicates
        const baseSpeed = 10; // Base speed in seconds for 1 set of certificates
        
        // Duplicate certificates
        certificatesScroll.innerHTML = originalCertificates.repeat(repeatCount);
        
        // Calculate animation duration to maintain consistent speed
        const animationDuration = baseSpeed * repeatCount;
        certificatesScroll.style.animationDuration = animationDuration + 's';
    }
    
    // Mouse wheel scrolling for certificates with infinite loop
    const scrollContainer = document.querySelector('.certificates-scroll-container');
    if (scrollContainer && certificatesScroll) {
        const cardWidth = 320; // 300px card + 20px gap
        const originalSetWidth = cardWidth * 5; // 5 original certificates
        
        scrollContainer.addEventListener('wheel', function(e) {
            e.preventDefault();
            scrollContainer.scrollLeft += e.deltaY;
            
            // Reset scroll position for infinite loop
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const resetPoint = originalSetWidth;
            
            if (scrollContainer.scrollLeft >= maxScroll - 10) {
                // Near end, reset to beginning
                scrollContainer.scrollLeft = resetPoint;
            } else if (scrollContainer.scrollLeft <= 0) {
                // At beginning, jump to end minus one set
                scrollContainer.scrollLeft = maxScroll - resetPoint;
            }
        });
        
        // Also handle touch/drag scrolling
        scrollContainer.addEventListener('scroll', function() {
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const resetPoint = originalSetWidth;
            
            if (scrollContainer.scrollLeft >= maxScroll - 10) {
                scrollContainer.scrollLeft = resetPoint;
            } else if (scrollContainer.scrollLeft <= 0) {
                scrollContainer.scrollLeft = maxScroll - resetPoint;
            }
        });
    }
});

// Projects Carousel
(function () {
    const track = document.getElementById('projTrack');
    const cards = Array.from(track.querySelectorAll('.project-card'));
    const dotsContainer = document.getElementById('projDots');
    const carousel = document.getElementById('projCarousel');
    const projDotsEl = document.getElementById('projDots');
    let current = 0;
    const total = cards.length;
    const CENTER_W = 380;
    const SIDE_W = 260;
    const GAP = 32;

    // Build dots
    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'proj-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    // Add counter badge to each card
    cards.forEach((card, i) => {
        const counter = document.createElement('div');
        counter.className = 'proj-counter';
        counter.textContent = String(i + 1).padStart(2,'0') + '/' + String(total).padStart(2,'0') + ' Projects';
        card.appendChild(counter);
    });

    function goTo(index) {
        current = (index + total) % total;

        cards.forEach((card, i) => {
            card.classList.remove('pos-center', 'pos-left', 'pos-right');
            const dist = ((i - current + total) % total);
            const d = dist > total / 2 ? dist - total : dist;
            if (d === 0) card.classList.add('pos-center');
            else if (d === -1) card.classList.add('pos-left');
            else if (d === 1) card.classList.add('pos-right');
        });

        // Center the active disc: sum widths of all cards before it
        const containerWidth = track.parentElement.offsetWidth;
        let leftEdge = 0;
        for (let i = 0; i < current; i++) {
            leftEdge += SIDE_W + GAP;
        }
        const offset = (containerWidth / 2) - leftEdge - (CENTER_W / 2);
        track.style.transform = `translateX(${offset}px)`;

        document.querySelectorAll('.proj-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('pos-center')) {
                const dist = ((i - current + total) % total);
                const d = dist > total / 2 ? dist - total : dist;
                goTo(current + d);
            }
        });
    });

    document.getElementById('projPrev').addEventListener('click', () => goTo(current - 1));
    document.getElementById('projNext').addEventListener('click', () => goTo(current + 1));
    window.addEventListener('resize', () => goTo(current));

goTo(0);
})();
