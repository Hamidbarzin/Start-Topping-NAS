// Topping Empire AI Logistics - Main JavaScript

// Initialize sidebar navigation
function initSidebar() {
  const currentPath = window.location.pathname;
  
  // Set active link
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
  
  // Add click handlers for sidebar links
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.addEventListener('click', handleNavClick);
  });
}

// Handle navigation clicks
function handleNavClick(e) {
  e.preventDefault();
  const page = e.currentTarget.getAttribute('data-page');
  
  // Update active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  e.currentTarget.classList.add('active');
  
  // Navigate to page
  window.location.href = `/${page}`;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initSidebar();
  
  // Add sidebar footer if needed
  addSidebarFooter();
});

// Add sidebar footer
function addSidebarFooter() {
  const footer = `
    <div style="position: absolute; bottom: 20px; left: 20px; right: 20px; padding-top: 20px; border-top: 1px solid rgba(229,196,94,.1);">
      <div style="color: var(--muted); font-size: 0.85em; text-align: center;">
        <div style="margin-bottom: 8px;">❤️ توسط حمید برزین</div>
        <div style="font-size: 0.8em;">Toronto, Canada</div>
      </div>
    </div>
  `;
  
  const sidebar = document.querySelector('.sidebar');
  if (sidebar && !sidebar.querySelector('[style*="position: absolute; bottom: 20px"]')) {
    sidebar.insertAdjacentHTML('beforeend', footer);
  }
}

