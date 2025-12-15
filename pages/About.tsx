import React from 'react';
import { PageHeader } from '../components/PageHeader';

export const About: React.FC = () => {
  return (
    <div className="bg-white">
      <PageHeader title="About Us" subtitle="Our Story & Values" />

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-serif font-bold text-tonga-red mb-6">Tonga's Most Trusted Transfer Service</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Welcome to <strong>Tonga VIP Transfers</strong>, the Kingdom's premier provider of luxury transportation. Established with a vision to elevate the travel experience in Tongatapu, we bridge the gap between traditional island hospitality and modern professional standards.
              </p>
              <p>
                Our mission is simple: to provide safe, reliable, and comfortable <strong>airport transfers and private car hire in Tonga</strong>. We understand that arriving in a new country can be stressful, which is why our drivers are trained not just to drive, but to host. From the moment you step out of Fua'amotu International Airport (TBU), you are in safe hands.
              </p>
              <p>
                We serve a diverse clientele ranging from government officials and corporate executives to families on holiday and honeymooners seeking a romantic escape.
              </p>
            </div>
          </div>
          <div className="relative">
            <img src="/images/about-driver.png" alt="Tongan Driver" className="rounded-lg shadow-xl w-full object-cover" />
            <div className="absolute -bottom-6 -left-6 bg-white border-2 border-tonga-red p-6 rounded-lg shadow-lg">
              <p className="font-serif text-2xl font-bold text-tonga-red">Malo e lelei</p>
              <p className="text-gray-800 text-sm font-bold uppercase">Warm Greetings</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Safety First",
              desc: "All our vehicles undergo rigorous weekly inspections and our drivers are certified in defensive driving."
            },
            {
              title: "Local Expertise",
              desc: "Our drivers are locals who know every corner of the island. Ask them for the best hidden beaches or cafes!"
            },
            {
              title: "Punctuality",
              desc: "We track your flight in real-time. If your flight is delayed, we wait. If it's early, we are there."
            }
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-xl border-t-4 border-tonga-red hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};