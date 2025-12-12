import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force scrolled state on internal pages so header is visible against white backgrounds
  const isHomePage = location.pathname === '/';
  const headerClass = scrolled || !isHomePage ? 'bg-white shadow-md py-3' : 'bg-transparent py-6';
  const textClass = scrolled || !isHomePage ? 'text-tonga-red' : 'text-white';
  const linkClass = scrolled || !isHomePage ? 'text-gray-700 hover:text-tonga-red' : 'text-white hover:text-red-200';
  
  const activeClass = scrolled || !isHomePage ? 'text-tonga-red font-bold' : 'font-bold underline decoration-2 underline-offset-4';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Fleet', href: '/fleet' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${headerClass}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl">🌺</span>
          <div className={`flex flex-col ${textClass}`}>
            <h1 className="text-xl font-serif font-bold leading-tight tracking-wide">TONGA</h1>
            <span className="text-xs font-sans tracking-widest uppercase">VIP Transfers</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-sm font-semibold uppercase tracking-wider transition-all ${linkClass} ${location.pathname === link.href ? activeClass : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/">
            <Button variant="primary" className="py-2 px-4 text-sm shadow-lg">
              Book Now
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           <svg className={`w-8 h-8 ${textClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 md:hidden flex flex-col gap-4 border-t border-gray-100">
           {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className={`font-semibold py-2 border-b border-gray-100 ${location.pathname === link.href ? 'text-tonga-red' : 'text-gray-800'}`}
            >
              {link.name}
            </Link>
          ))}
           <Link to="/" onClick={() => setMobileMenuOpen(false)}>
             <Button variant="primary" fullWidth>
              Book Now
            </Button>
           </Link>
        </div>
      )}
    </header>
  );
};