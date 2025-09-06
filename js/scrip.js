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

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
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