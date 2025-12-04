// EVEA Bilişim - Maxsteel ERP Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Background on Scroll
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Demo Date Minimum Date Set
    const demoDateInput = document.getElementById('demoDate');
    if (demoDateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const formattedDate = tomorrow.toISOString().split('T')[0];
        demoDateInput.setAttribute('min', formattedDate);
    }
    
    // Form Validation (for demo and contact forms)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Show success message
                showMessage('Form başarıyla gönderildi!', 'success');
                form.reset();
            } else {
                showMessage('Lütfen tüm gerekli alanları doldurun.', 'error');
            }
        });
    });
    
    // Message Display Function
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .section-title');
    animateElements.forEach(el => observer.observe(el));
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .section-title {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .feature-card.animate-in, .section-title.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .message {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        }
        
        .message-success {
            background-color: #7AC943;
        }
        
        .message-error {
            background-color: #e74c3c;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .header.scrolled {
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
        }
        
        .nav.active {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            padding: 1rem;
        }
        
        .nav.active .nav-list {
            flex-direction: column;
            gap: 1rem;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    
    document.head.appendChild(style);
    
    // Stats Counter Animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            // Özel semboller için kontrol (∞, ∞, vb.)
            if (stat.textContent.includes('∞') || stat.textContent.includes('Sınırsız')) {
                return; // Bu istatistiği atla
            }
            
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            
            // NaN kontrolü
            if (isNaN(target)) {
                return; // Geçersiz sayı ise atla
            }
            
            const duration = 2000; // 2 saniye
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format the number
                if (stat.textContent.includes('+')) {
                    stat.textContent = Math.floor(current) + '+';
                } else if (stat.textContent.includes('%')) {
                    stat.textContent = Math.floor(current) + '%';
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Stats hover effects
    function addStatsHoverEffects() {
        const statItems = document.querySelectorAll('.stat');
        
        statItems.forEach(stat => {
            stat.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            stat.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Initialize stats when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                addStatsHoverEffects();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // Tab Functionality
    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked button and target pane
                this.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }
    
    // Initialize tabs when DOM is loaded
if (document.querySelector('.why-tabs')) {
    initTabs();
}

// Initialize sector tabs when DOM is loaded
if (document.querySelector('.sector-tabs')) {
    initSectorTabs();
}

// Sector Tabs Function
function initSectorTabs() {
    const tabBtns = document.querySelectorAll('.sector-tabs .tab-btn');
    const tabPanes = document.querySelectorAll('.sector-tabs .tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and target pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Mind Map Canvas Drawing
function initMindMapCanvas() {
    const canvas = document.getElementById('mind-map-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const mindMap = document.querySelector('.mind-map');
    
    function resizeCanvas() {
        canvas.width = mindMap.offsetWidth;
        canvas.height = mindMap.offsetHeight;
    }
    

    
    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Merkez koordinatları
        const center = document.querySelector('.mind-map-center');
        const centerRect = center.getBoundingClientRect();
        const mindMapRect = mindMap.getBoundingClientRect();
        
        const centerX = centerRect.left + centerRect.width / 2 - mindMapRect.left;
        const centerY = centerRect.top + centerRect.height / 2 - mindMapRect.top;
        
        // Modül koordinatları ve okları çiz
        const modules = document.querySelectorAll('.module-branch');
        
        modules.forEach(module => {
            const moduleRect = module.getBoundingClientRect();
            const moduleX = moduleRect.left + moduleRect.width / 2 - mindMapRect.left;
            const moduleY = moduleRect.top + moduleRect.height / 2 - mindMapRect.top;
            
            // Düz çizgi çiz
            ctx.strokeStyle = '#374151';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(moduleX, moduleY);
            ctx.stroke();
        });
    }
    
    // Canvas boyutunu ayarla ve okları çiz
    resizeCanvas();
    drawConnections();
    
    // Resize event listener
    window.addEventListener('resize', () => {
        resizeCanvas();
        drawConnections();
    });
    
    // DOM değişikliklerini izle
    const observer = new MutationObserver(drawConnections);
    observer.observe(mindMap, { childList: true, subtree: true });
}

// Initialize mind map canvas when DOM is loaded
if (document.querySelector('.mind-map')) {
    initMindMapCanvas();
}
    
    // Console welcome message
    console.log('🚀 EVEA Bilişim - Maxsteel ERP Website yüklendi!');
    console.log('📧 Demo talep formu için: demo.html');
    console.log('📞 İletişim için: iletisim.html');
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


