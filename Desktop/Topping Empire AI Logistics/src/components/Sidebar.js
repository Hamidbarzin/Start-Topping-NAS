import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: '🏠', label: 'خانه', name: 'home' },
    { path: '/roadmap', icon: '📊', label: 'مسیر راه', name: 'roadmap' },
    { path: '/topping', icon: '🚀', label: 'تاپینگ کوریر', name: 'topping' },
    { path: '/dashboard', icon: '📋', label: 'داشبورد', name: 'dashboard' },
    { path: '/minimal', icon: '⚡', label: 'نسخه ساده', name: 'minimal' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>🚀 Topping Empire</h1>
        <p>AI Logistics Dashboard</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span>
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div>❤️ توسط حمیدرضا برزین</div>
        <div>Toronto, Canada</div>
      </div>
    </aside>
  );
}

export default Sidebar;
