import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const Services: React.FC = () => {
  return (
    <div className="bg-white">
      <PageHeader title="Our Services" subtitle="Beyond Just Transport" />

      <div className="container mx-auto px-6 py-20">

        {/* Airport Transfers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-serif font-bold text-tonga-red mb-4">Fua'amotu Airport Transfers</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Start your Tongan adventure stress-free. Our <strong>Tonga airport taxi service</strong> is pre-booked and fixed-price, avoiding the hassle of negotiating fares upon arrival. We service all resorts including the Tanoa International Dateline Hotel, Seaview Lodge, and Little Italy Hotel.
            </p>
            <ul className="space-y-3 mb-8">
              {['Meet & Greet in Arrivals Hall', 'Help with Luggage', 'Air-conditioned Comfort', 'Flight Tracking'].map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/">
              <Button>Book Airport Transfer</Button>
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <img src="/images/service-airport.png" alt="Airport Transfer Tonga" className="rounded-xl shadow-2xl w-full object-cover" />
          </div>
        </div>

        {/* Island Tours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <img src="/images/service-tour.png" alt="Tonga Island Tour" className="rounded-xl shadow-2xl w-full object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-serif font-bold text-tonga-red mb-4">Private Island Tours</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Discover the hidden gems of Tongatapu with our <strong>private chauffeur service</strong>. Create your own itinerary or let our experienced drivers guide you to the Blowholes, Captain Cook's Landing Site, and the Ha'amonga 'a Maui Trilithon.
            </p>
            <ul className="space-y-3 mb-8">
              {['Custom Itineraries', 'Knowledgeable Local Guides', 'Flexible Durations (Half/Full Day)', 'Photo Opportunities'].map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/contact">
              <Button variant="outline">Inquire About Tours</Button>
            </Link>
          </div>
        </div>

        {/* Wedding & Corporate */}
        <div className="bg-tonga-sand rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-serif font-bold text-tonga-red mb-4">Corporate & Event Transport</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-8">
            Planning a wedding in Tonga or a corporate retreat? We manage logistics for large groups with our fleet of executive vans. Ensure your guests arrive on time and in style.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/fleet">
              <Button variant="secondary">View Fleet</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">Contact Support</Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};