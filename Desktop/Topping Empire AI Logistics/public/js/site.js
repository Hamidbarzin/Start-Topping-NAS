// Topping Empire - Site Manager

// Page mappings
const pages = {
    home: '/home.html',
    dashboard: '/classic',
    roadmap: '/roadmap',
    coach: '/coach.html',
    topping: '/topping',
    minimal: '/minimal'
};

// Current active page
let currentPage = 'home';

// Load page into iframe
function loadPage(pageName) {
    const iframe = document.getElementById('contentFrame');
    const page = pages[pageName];
    
    if (!page) {
        console.error('صفحه پیدا نشد:', pageName);
        return;
    }
    
    // Update active nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
    
    // Load page
    iframe.src = page;
    currentPage = pageName;
    
    // Update URL without reload
    history.pushState({ page: pageName }, '', `/#${pageName}`);
}

// Handle browser back/forward
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        loadPage(event.state.page);
    }
});

// Check hash on load
window.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.slice(1); // Remove '#'
    if (hash && pages[hash]) {
        loadPage(hash);
    }
});

// Make loadPage available globally
window.loadPage = loadPage;

