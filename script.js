document.addEventListener('DOMContentLoaded', () => {
    console.log('Log Visualizer Studio loaded.');
    
    // Check for user's preferred color scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check if there's a saved theme preference in local storage
    const savedTheme = localStorage.getItem('theme');
    
    // Apply the correct theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        document.documentElement.setAttribute('data-theme', 'dark'); // Add attribute to HTML element
        document.getElementById('theme-toggle').textContent = '☀️';
    } else {
        document.documentElement.setAttribute('data-theme', 'light'); // Explicitly set light mode
        document.getElementById('theme-toggle').textContent = '🌙';
    }
    
    // Add event listener for theme toggle button
    document.getElementById('theme-toggle').addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            document.getElementById('theme-toggle').textContent = '🌙';
        } else {
            document.body.classList.add('dark-mode');
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            document.getElementById('theme-toggle').textContent = '☀️';
        }
    });

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

    // Mobile menu functionality
    // First, add the mobile menu toggle button dynamically if screen width is small
    if (window.innerWidth <= 360) {
        const headerContainer = document.querySelector('.header-container');
        if (headerContainer) {
            // Create and insert the mobile menu toggle button
            const mobileMenuToggle = document.createElement('button');
            mobileMenuToggle.className = 'mobile-menu-toggle';
            mobileMenuToggle.setAttribute('aria-label', 'Toggle mobile menu');
            mobileMenuToggle.innerHTML = '☰';
            headerContainer.insertBefore(mobileMenuToggle, headerContainer.firstChild);
            
            // Add toggle functionality
            mobileMenuToggle.addEventListener('click', function() {
                const nav = document.querySelector('nav');
                nav.classList.toggle('mobile-open');
                mobileMenuToggle.innerHTML = nav.classList.contains('mobile-open') ? '✕' : '☰';
            });
        }
    }
    
    // Handle window resize events
    window.addEventListener('resize', function() {
        const nav = document.querySelector('nav');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (window.innerWidth > 360) {
            // Remove mobile-specific classes and elements on larger screens
            if (nav) nav.classList.remove('mobile-open');
            if (mobileMenuToggle) mobileMenuToggle.remove();
        } else if (!mobileMenuToggle) {
            // Re-add mobile menu toggle if screen becomes small again
            const headerContainer = document.querySelector('.header-container');
            if (headerContainer) {
                const newMobileMenuToggle = document.createElement('button');
                newMobileMenuToggle.className = 'mobile-menu-toggle';
                newMobileMenuToggle.setAttribute('aria-label', 'Toggle mobile menu');
                newMobileMenuToggle.innerHTML = '☰';
                headerContainer.insertBefore(newMobileMenuToggle, headerContainer.firstChild);
                
                newMobileMenuToggle.addEventListener('click', function() {
                    const nav = document.querySelector('nav');
                    nav.classList.toggle('mobile-open');
                    newMobileMenuToggle.innerHTML = nav.classList.contains('mobile-open') ? '✕' : '☰';
                });
            }
        }
    });
});