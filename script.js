document.addEventListener('DOMContentLoaded', () => {
    console.log('Log Visualizer Studio loaded.');
    
    // Check for user's preferred color scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check if there's a saved theme preference in local storage
    const savedTheme = localStorage.getItem('theme');
    
    // Consolidated theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Function to update theme appearance
    const updateThemeAppearance = (isDarkMode) => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeToggle) themeToggle.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeToggle) themeToggle.textContent = '🌙';
        }
    };
    
    // Apply the correct theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        updateThemeAppearance(true);
    } else {
        updateThemeAppearance(false);
    }
    
    // Add event listener for theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
            const newMode = !isDarkMode;
            
            updateThemeAppearance(newMode);
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
        });
    }

    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        // Get the href value and extract just the filename or hash
        const linkPage = link.getAttribute('href').split('/').pop();
        
        // Check if the current page matches the link, or if we're on index.html and the link points to a section
        if (linkPage === currentPage || 
            (currentPage === '' || currentPage === 'index.html') && linkPage.startsWith('#')) {
            link.classList.add('active');
        } else if (currentPage === 'purpose.html' && link.getAttribute('href').includes('purpose')) {
            link.classList.add('active');
        } else if (currentPage === 'dive-deeper.html' && link.getAttribute('href').includes('dive-deeper')) {
            link.classList.add('active');
        } else if (currentPage === 'team.html' && link.getAttribute('href').includes('team')) {
            link.classList.add('active');
        }
    });
    
    // Animate elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all feature list items for animation
    document.querySelectorAll('#features li').forEach(item => {
        observer.observe(item);
        item.classList.add('fade-in-element');
    });
    
    // Add pulse animation to the CTA button
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        setInterval(() => {
            button.classList.add('pulse');
            setTimeout(() => {
                button.classList.remove('pulse');
            }, 1000);
        }, 3000);
    });

    // Add hamburger menu button if it doesn't exist
    const headerContainer = document.querySelector('.header-container');
    if (headerContainer && !document.querySelector('.mobile-menu-button')) {
        // Create mobile menu button with hamburger icon
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.setAttribute('aria-label', 'Toggle mobile menu');
        mobileMenuButton.innerHTML = `
            <div class="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        // Insert at the beginning of the header
        headerContainer.insertBefore(mobileMenuButton, headerContainer.firstChild);
        
        // Get main navigation
        const mainNav = document.querySelector('.main-nav') || document.querySelector('nav');
        
        if (mainNav) {
            // Make sure it has the right class
            if (!mainNav.classList.contains('main-nav')) {
                mainNav.classList.add('main-nav');
            }
            
            // Toggle menu on button click
            mobileMenuButton.addEventListener('click', function() {
                mainNav.classList.toggle('mobile-open');
                mobileMenuButton.classList.toggle('mobile-menu-open');
            });
            
            // Close menu when clicking on a link
            const navLinks = mainNav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mainNav.classList.remove('mobile-open');
                    mobileMenuButton.classList.remove('mobile-menu-open');
                });
            });
        }
    }

    // Remove the existing mobile menu toggle code
    window.removeEventListener('resize', function() {
        // Old resize handler
    });
    
    // New resize handler
    window.addEventListener('resize', function() {
        const mainNav = document.querySelector('.main-nav') || document.querySelector('nav');
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        
        // If window is resized larger than mobile breakpoint, close the mobile menu
        if (window.innerWidth > 768 && mainNav && mobileMenuButton) {
            mainNav.classList.remove('mobile-open');
            mobileMenuButton.classList.remove('mobile-menu-open');
        }
    });
});