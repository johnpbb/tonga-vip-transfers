import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-tonga-red text-white pt-20 pb-10" id="contact">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl">🌺</span>
              <div className="flex flex-col">
                <h1 className="text-xl font-serif font-bold leading-tight tracking-wide">TONGA</h1>
                <span className="text-xs font-sans tracking-widest uppercase opacity-70">VIP Transfers</span>
              </div>
            </div>
            <p className="text-red-100 max-w-sm mb-6">
              Providing premier transportation services across the Kingdom of Tonga. Experience the island with comfort, safety, and local expertise.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-tonga-red transition-colors cursor-pointer">
                <span className="font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-tonga-red transition-colors cursor-pointer">
                <span className="font-bold">in</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-tonga-red transition-colors cursor-pointer">
                <span className="font-bold">ig</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm border-b border-red-700 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-4 text-red-100">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/fleet" className="hover:text-white transition-colors">Our Fleet</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm border-b border-red-700 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4 text-red-100">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Taufa'ahau Rd, Nuku'alofa,<br />Kingdom of Tonga</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>+676 12 345 67</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>bookings@tongavip.to</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-800 pt-8 flex flex-col md:flex-row justify-between items-center text-red-200 text-sm">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Tonga VIP Transfers. All rights reserved. <span className="text-gray-600 ml-2 text-xs">v1.1</span>
          </p>
          <p>Designed with 🤍 for the Kingdom.</p>
        </div>
      </div>
    </footer>
  );
};