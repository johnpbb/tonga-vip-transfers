import React from 'react';

export const Features: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-100 rounded-full z-0"></div>
            <img
              src="/images/feature-chauffeur.png"
              alt="Chauffeur opening car door"
              className="relative z-10 w-full rounded-lg shadow-2xl object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-tonga-red p-8 rounded-lg text-white z-20 hidden md:block">
              <p className="text-3xl font-serif font-bold">10+</p>
              <p className="text-sm uppercase tracking-wide opacity-80">Years of Service</p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold text-tonga-red">
              More Than Just A Ride,<br />
              It's An Experience.
            </h2>
            <p className="text-gray-600 text-lg">
              We understand that your journey begins the moment you land. Our dedication to punctuality, discretion, and local knowledge sets us apart in Tonga.
            </p>

            <div className="space-y-6">
              {[
                { title: "Meet & Greet", desc: "Personalized welcome at the arrivals hall with nameboard." },
                { title: "Flight Monitoring", desc: "We track your flight to ensure we are there when you land, delays or early." },
                { title: "English Speaking", desc: "Friendly, local drivers who are fluent in English and knowledgeable about the island." },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-tonga-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                    <p className="text-gray-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};