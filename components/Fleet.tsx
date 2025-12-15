import React from 'react';

const vehicles = [
  {
    name: "Luxury Sedan",
    desc: "Perfect for couples and business travelers. Smooth, quiet, and sophisticated.",
    image: "/images/fleet-sedan.png",
    capacity: "3 Pax",
    luggage: "2 Bags"
  },
  {
    name: "Executive SUV",
    desc: "Spacious comfort for families or groups needing extra room and rugged reliability.",
    image: "/images/fleet-suv.png",
    capacity: "4 Pax",
    luggage: "4 Bags"
  },
  {
    name: "Private Van",
    desc: "The ultimate solution for larger groups, offering ample space without compromising luxury.",
    image: "/images/fleet-hiace.png",
    capacity: "10 Pax",
    luggage: "10 Bags"
  }
];

export const Fleet: React.FC = () => {
  return (
    <section id="fleet" className="py-20 bg-tonga-sand">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-tonga-red font-bold tracking-widest uppercase text-sm">Our Vehicles</span>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mt-2">Premium Fleet</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our modern fleet allows you to travel in style and safety. Each vehicle is meticulously maintained and equipped with air conditioning and complimentary WiFi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicles.map((v, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-tonga-red/90 to-transparent p-4">
                  <h3 className="text-white text-xl font-bold">{v.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-tonga-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    {v.capacity}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-tonga-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    {v.luggage}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{v.desc}</p>
                <button className="text-tonga-red font-bold uppercase text-sm tracking-wider hover:text-red-800 transition-colors">
                  View Details &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};