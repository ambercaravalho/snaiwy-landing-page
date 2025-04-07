document.addEventListener('DOMContentLoaded', function() {
    console.log('Log Visualizer Studio loaded.');
    
    // Theme handling
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme based on saved preference
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        // Use system preference if no saved preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.textContent = '🌙';
        }
    }
    
    // Handle theme toggle click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        console.log('Current theme:', currentTheme);
        
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
            console.log('Switched to light theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
            console.log('Switched to dark theme');
        }
    });
    
    // Also listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newTheme = e.matches ? 'dark' : 'light';
        // Only apply if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            console.log('System preference changed to', newTheme);
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
});