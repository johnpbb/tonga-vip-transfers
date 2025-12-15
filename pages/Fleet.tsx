import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

const fullFleet = [
  {
    name: "Luxury Sedan (Toyota Camry or Similar)",
    type: "VIP Sedan",
    capacity: "3 Passengers",
    luggage: "2 Large Suitcases",
    features: ["Leather Seats", "Climate Control", "Phone Charging", "Complimentary Water"],
    desc: "Our sedan range offers the perfect balance of comfort and economy for solo travelers or couples. Navigate Nuku'alofa in style.",
    image: "/images/fleet-sedan.png"
  },
  {
    name: "Executive SUV (Toyota Prado/Fortuner)",
    type: "Luxury SUV",
    capacity: "4 Passengers",
    luggage: "4 Large Suitcases",
    features: ["4WD Capability", "High Visibility", "Spacious Legroom", "WiFi Onboard"],
    desc: "Ideal for families or those carrying extra luggage. The rugged Tongan roads are no match for our premium SUVs, ensuring a smooth ride.",
    image: "/images/fleet-suv.png"
  },
  {
    name: "Mercedes V-Class / Toyota Alphard",
    type: "Premium Van",
    capacity: "6 Passengers",
    luggage: "5 Large Suitcases",
    features: ["Conference Seating", "Privacy Glass", "Premium Audio", "Automatic Doors"],
    desc: "The ultimate in VIP group transport. Perfect for executive delegations or small groups wanting to travel together in luxury.",
    image: "/images/fleet-alphard.png"
  },
  {
    name: "Toyota HiAce Commuter",
    type: "Group Van",
    capacity: "12 Passengers",
    luggage: "10 Large Suitcases",
    features: ["High Roof", "Dual Air Conditioning", "PA System", "Comfortable Bench Seating"],
    desc: "Efficient and comfortable transport for larger groups, wedding parties, or tour groups. Reliability you can count on.",
    image: "/images/fleet-hiace.png"
  }
];

export const FleetPage: React.FC = () => {
  return (
    <div className="bg-white">
      <PageHeader title="Our Premium Fleet" subtitle="Travel in Comfort & Style" />

      <div className="container mx-auto px-6 py-20">
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16 text-lg">
          We maintain the newest and most diverse fleet in Tonga. Whether you need a <strong>luxury car hire</strong> for a special occasion or a reliable <strong>airport shuttle</strong> van, we have the perfect vehicle for you.
        </p>

        <div className="space-y-16">
          {fullFleet.map((vehicle, index) => (
            <div key={index} className={`flex flex-col md:flex-row gap-10 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-80 object-cover rounded-xl shadow-lg" />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <span className="inline-block px-3 py-1 bg-red-100 text-tonga-red rounded-full text-xs font-bold uppercase tracking-wide">
                  {vehicle.type}
                </span>
                <h3 className="text-3xl font-serif font-bold text-gray-900">{vehicle.name}</h3>
                <p className="text-gray-600 leading-relaxed">{vehicle.desc}</p>

                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    {vehicle.capacity}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    {vehicle.luggage}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-sm text-gray-900">Key Features:</p>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    {vehicle.features.map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-tonga-red rounded-full"></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>


              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};