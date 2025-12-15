import React from 'react';
import { BookingForm } from './BookingForm';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 lg:pt-0 lg:pb-0 overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt="Tonga VIP Transfer Vehicle at Sunset"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Content */}
          <div className="lg:col-span-7 text-white space-y-6 pt-10 lg:pt-0">
            <div className="inline-block px-4 py-1 border border-white text-white rounded-full text-sm font-semibold tracking-widest uppercase mb-2">
              Kingdom of Tonga
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight drop-shadow-lg">
              Arrive in <span className="italic">Luxury.</span><br />
              Explore in <span className="italic">Comfort.</span>
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl font-light drop-shadow-md">
              Experience the warmth of Tonga with our premium VIP transfer service.
              From Fua'amotu Airport to your resort, we ensure a seamless, professional journey.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Professional Chauffeurs</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">24/7 Availability</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Flight Tracking</span>
              </div>
            </div>
          </div>

          {/* Right Content - Booking Form (The Requirement) */}
          <div className="lg:col-span-5 w-full">
            <BookingForm />
          </div>

        </div>
      </div>
    </section>
  );
};