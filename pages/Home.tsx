import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Fleet } from '../components/Fleet';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <div className="bg-gray-50 py-12 text-center">
        <h2 className="text-3xl font-serif font-bold text-tonga-red mb-4">Why Book With Us?</h2>
        <p className="max-w-2xl mx-auto text-gray-600 px-6">
          We're are the premier choice for <strong>airport transfers in Tonga</strong>. Whether you need a taxi from Fua'amotu International Airport to Nuku'alofa or a private chauffeur for your island tour, we provide reliable, fixed-price service.
        </p>
      </div>
      <Fleet />
    </>
  );
};