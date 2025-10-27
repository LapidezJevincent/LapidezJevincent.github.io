// Portfolio Website JavaScript
// Author: Jevincent A. Lapidez

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initMobileMenu();
    initAnimations();
    initCopyEmail();
    initGalleryModal();
    initBlogModal();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
        
        // Add hover effects
        link.addEventListener('mouseenter', function() {
            this.style.color = '#8A2BE2';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '';
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Copy email functionality
function initCopyEmail() {
    const copyButtons = document.querySelectorAll('[data-copy-email]');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const email = 'jlapidez.chmsu@gmail.com';
            
            navigator.clipboard.writeText(email).then(function() {
                showNotification('Email address copied to clipboard!', 'success');
                // Change button text temporarily
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.style.backgroundColor = '#10B981';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                }, 2000);
            }).catch(function() {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('Email address copied to clipboard!', 'success');
                
                // Change button text temporarily
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.style.backgroundColor = '#10B981';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                }, 2000);
            });
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    const socialLinks = document.querySelector('.social-links');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none';
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
            }
            
            .nav, .social-links {
                display: none;
            }
            
            .nav.mobile-open, .social-links.mobile-open {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: #1a1a1a;
                padding: 1rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            
            .nav.mobile-open {
                gap: 1rem;
            }
            
            .social-links.mobile-open {
                gap: 1rem;
                margin-top: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add button to header
    header.appendChild(mobileMenuBtn);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('mobile-open');
        socialLinks.classList.toggle('mobile-open');
        
        // Change button icon
        this.innerHTML = nav.classList.contains('mobile-open') ? '✕' : '☰';
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.nav a, .social-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('mobile-open');
            socialLinks.classList.remove('mobile-open');
            mobileMenuBtn.innerHTML = '☰';
        });
    });
    
    // Show/hide mobile menu button based on screen size
    function toggleMobileMenu() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
        } else {
            mobileMenuBtn.style.display = 'none';
            nav.classList.remove('mobile-open');
            socialLinks.classList.remove('mobile-open');
            mobileMenuBtn.innerHTML = '☰';
        }
    }
    
    window.addEventListener('resize', toggleMobileMenu);
    toggleMobileMenu();
}

// Animation effects
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.project-card, .certificate-card, .gallery-item, .journey-card, .blog-post-main, .blog-post-sidebar');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Stagger animations for grid items
    const gridItems = document.querySelectorAll('.projects-grid .project-card, .certificates-grid .certificate-card, .gallery-grid .gallery-item');
    gridItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .notification-success {
            background-color: #10B981;
        }
        
        .notification-error {
            background-color: #EF4444;
        }
        
        .notification-info {
            background-color: #3B82F6;
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Download resume functionality
function initDownloadResume() {
    const downloadBtn = document.querySelector('.btn-download');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Create a simple PDF download simulation
            showNotification('Resume download will be available soon!', 'info');
            
            // In a real implementation, you would link to an actual PDF file
            // window.open('assets/files/resume.pdf', '_blank');
        });
    }
}

// Initialize download functionality
initDownloadResume();

// Scroll to top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #8A2BE2;
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
initScrollToTop();

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Console welcome message
console.log(`
🎉 Welcome to Jevincent A. Lapidez's Portfolio Website!
📧 Contact: jlapidez.chmsu@gmail.com
🔗 LinkedIn: https://linkedin.com/in/jevincentlapidez
💻 GitHub: https://github.com/jevincentlapidez

Built with ❤️ using HTML, CSS, and JavaScript
`);

// Gallery Modal functionality
function initGalleryModal() {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalClose = document.querySelector('.modal-close');
    const viewPhotoBtns = document.querySelectorAll('.view-photo-btn');
    
    if (!modal) return; // Exit if modal doesn't exist (not on gallery page)
    
    // Open modal when "View Photo" button is clicked
    viewPhotoBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imageSrc = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            
            // Set modal content
            modalImage.src = imageSrc;
            modalImage.alt = title;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal when close button is clicked
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
    
    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
}

// Blog Modal functionality
function initBlogModal() {
    const modal = document.getElementById('blogModal');
    const modalTitle = document.getElementById('blogModalTitle');
    const modalContent = document.getElementById('blogModalContent');
    const modalClose = document.querySelector('.blog-modal-close');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    if (!modal) return; // Exit if modal doesn't exist (not on blog page)
    
    // Open modal when "Read More" button is clicked
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const title = this.getAttribute('data-title');
            const content = this.getAttribute('data-content');
            
            // Set modal content
            modalTitle.textContent = title;
            modalContent.textContent = content;
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal when close button is clicked
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
    
    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
}

// Export functions for potential external use
window.PortfolioWebsite = {
    showNotification,
    isValidEmail,
    initNavigation,
    initSmoothScrolling,
    initGalleryModal,
    initBlogModal
};
