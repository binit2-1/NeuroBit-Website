// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, make it active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Testimonial Slider
    const slider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const testimonials = document.querySelectorAll('.testimonial');
    
    let currentIndex = 0;
    
    function updateSlider() {
        const slideWidth = testimonials[0].offsetWidth + 32; // Width + margin
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateSlider();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, testimonials.length - 1);
        updateSlider();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Initialize slider
    updateSlider();
    
    // Pricing Toggle
    const billingToggle = document.getElementById('billing-toggle');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    billingToggle.addEventListener('change', () => {
        const isAnnual = billingToggle.checked;
        
        pricingCards.forEach(card => {
            const priceElement = card.querySelector('.amount');
            const periodElement = card.querySelector('.period');
            
            if (!priceElement || !periodElement) return;
            
            const monthlyPrice = parseInt(priceElement.getAttribute('data-monthly') || priceElement.textContent);
            const annualPrice = Math.floor(monthlyPrice * 0.8); // 20% discount
            
            if (isAnnual) {
                priceElement.textContent = annualPrice;
                periodElement.textContent = '/year';
            } else {
                priceElement.textContent = monthlyPrice;
                periodElement.textContent = '/month';
            }
        });
    });
    
    // Store monthly prices on load
    pricingCards.forEach(card => {
        const priceElement = card.querySelector('.amount');
        if (priceElement) {
            priceElement.setAttribute('data-monthly', priceElement.textContent);
        }
    });
    
    // Sticky Header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.classList.add('header-hidden');
            } else {
                // Scrolling up
                header.classList.remove('header-hidden');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server here
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }
    
    // Add animation classes when elements come into view
    const animatedElements = document.querySelectorAll('.feature-card, .benefit-item, .step, .pricing-card');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animatedElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in viewport
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('animate-in');
            }
        });
    }
    
    // Run on initial load
    checkIfInView();
    
    // Run on scroll
    window.addEventListener('scroll', checkIfInView);
});