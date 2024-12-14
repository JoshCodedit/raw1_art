import { useLocation } from 'react-router-dom';

function NavLink({ href, children }) {
  const location = useLocation();
  const isActive = location.hash === href;

  return (
    <a
      href={href}
      className={`nav-link ${isActive ? 'text-main-red' : ''}`}
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  return (
    <nav aria-label="Main Navigation" className="flex justify-center items-center">
      <ul className="flex gap-16 items-center font-main-font font-bold">
        <li><NavLink href="#home">Home</NavLink></li>
        <li><NavLink href="#about">About</NavLink></li>
        <li><NavLink href="#custom-orders">Custom Orders</NavLink></li>
        <li><NavLink href="#contact">Contact</NavLink></li>
      </ul>
    </nav>
  );
}
