document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Management (Light/Dark)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const rootEl = document.documentElement;
    
    // Check local storage or system preference
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
        rootEl.setAttribute('data-theme', storedTheme);
    } else if (systemPrefersDark) {
        rootEl.setAttribute('data-theme', 'dark');
    } else {
        rootEl.setAttribute('data-theme', 'light');
    }
    
    function toggleTheme() {
        const currentTheme = rootEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        rootEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    
    // Mobile theme toggle
    const mobileThemeBtn = document.getElementById('mobile-theme-toggle');
    if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);

    // 2. RTL Management
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    const storedDir = localStorage.getItem('dir');
    
    if (storedDir) {
        rootEl.setAttribute('dir', storedDir);
    }
    
    function toggleRTL() {
        const currentDir = rootEl.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        rootEl.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
    }
    
    if (rtlToggleBtn) rtlToggleBtn.addEventListener('click', toggleRTL);
    
    const mobileRtlBtn = document.getElementById('mobile-rtl-toggle');
    if (mobileRtlBtn) mobileRtlBtn.addEventListener('click', toggleRTL);

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 4. Sticky Header
    const header = document.querySelector('.global-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Initialize AOS Animation
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
    }
});
