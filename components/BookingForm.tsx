import React, { useState } from 'react';
import { Button } from './Button';
import { BookingDetails } from '../types';

type TripType = 'oneway' | 'return';
type PickupContext = 'airport' | 'hotel';

export const BookingForm: React.FC = () => {
  const [tripType, setTripType] = useState<TripType>('oneway');
  const [pickupContext, setPickupContext] = useState<PickupContext>('airport');

  const [formData, setFormData] = useState<BookingDetails>({
    pickup: "Fua'amotu International Airport (TBU)",
    dropoff: '',
    date: '',
    time: '',
    passengers: '1',
    vehicleType: 'sedan'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePickupContextChange = (context: PickupContext) => {
    setPickupContext(context);
    if (context === 'airport') {
      setFormData(prev => ({ ...prev, pickup: "Fua'amotu International Airport (TBU)" }));
    } else {
      setFormData(prev => ({ ...prev, pickup: "" }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format the email content
    const subject = `New Quote Request: ${tripType.toUpperCase()} - ${formData.date}`;
    const text = `
New Booking Quote Request

Trip Type: ${tripType}
Pickup: ${formData.pickup}
Dropoff: ${formData.dropoff}
Date: ${formData.date}
Passengers: ${formData.passengers}
Context: ${pickupContext}
    `;

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          text
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Reset after showing success
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert('Failed to send request. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-2xl h-full flex flex-col items-center justify-center text-center animate-fade-in min-h-[500px]">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-serif text-tonga-red font-bold mb-2">Quote Requested!</h3>
        <p className="text-gray-600">We have received your details. One of our VIP agents will contact you shortly with a personalized quote.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-black mb-1">Book Your Ride</h3>
        <p className="text-md text-gray-600 font-medium">Reliable. Fixed Price. Instant.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Trip Type Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex bg-white border border-gray-200 rounded-full p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setTripType('oneway')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${tripType === 'oneway' ? 'bg-white shadow-md text-black border border-gray-100' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              One Way
            </button>
            <button
              type="button"
              onClick={() => setTripType('return')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${tripType === 'return' ? 'bg-white shadow-md text-black border border-gray-100' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Return
            </button>
          </div>
        </div>

        {/* Pickup Context Selection */}
        <div>
          <label className="block text-sm font-bold text-black mb-2">Pickup From</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handlePickupContextChange('airport')}
              className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all ${pickupContext === 'airport'
                  ? 'border-tonga-red bg-red-50 text-tonga-red'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
            >
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="font-bold">Airport</span>
            </button>

            <button
              type="button"
              onClick={() => handlePickupContextChange('hotel')}
              className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all ${pickupContext === 'hotel'
                  ? 'border-tonga-red bg-red-50 text-tonga-red'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
            >
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-bold">Hotel</span>
            </button>
          </div>
        </div>

        {/* Dynamic Fields */}
        <div className="space-y-4">

          {/* Pickup Location */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-black">Pickup Location</label>
            <div className="flex items-center border border-gray-300 rounded-md p-3 focus-within:ring-1 focus-within:ring-tonga-red focus-within:border-tonga-red transition-all">
              {pickupContext === 'airport' ? (
                <svg className="w-5 h-5 text-tonga-red mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              ) : (
                <svg className="w-5 h-5 text-gray-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
              <input
                type="text"
                name="pickup"
                className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent text-sm font-medium"
                placeholder="Enter pickup location"
                value={formData.pickup}
                onChange={handleChange}
                readOnly={pickupContext === 'airport'} // Lock if airport
              />
            </div>
          </div>

          {/* Drop-off */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-black">Drop-off Destination</label>
            <div className="flex items-center border border-gray-300 rounded-md p-3 focus-within:ring-1 focus-within:ring-tonga-red focus-within:border-tonga-red transition-all">
              <input
                type="text"
                name="dropoff"
                className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent text-sm font-medium"
                placeholder="e.g. Tanoa International Dateline Hotel"
                value={formData.dropoff}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-black">Date</label>
              <div className="flex items-center border border-gray-300 rounded-md p-3 focus-within:ring-1 focus-within:ring-tonga-red focus-within:border-tonga-red transition-all">
                <input
                  type="date"
                  name="date"
                  className="w-full outline-none text-gray-800 bg-transparent text-sm font-medium"
                  value={formData.date}
                  onChange={handleChange}
                />
                <svg className="w-5 h-5 text-black ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
            </div>

            {/* Passengers */}
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-black">Passengers</label>
              <div className="flex items-center border border-gray-300 rounded-md p-3 focus-within:ring-1 focus-within:ring-tonga-red focus-within:border-tonga-red transition-all">
                <input
                  type="number"
                  name="passengers"
                  min="1"
                  className="w-full outline-none text-gray-800 bg-transparent text-sm font-medium"
                  value={formData.passengers}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button variant="black" fullWidth type="submit" disabled={isSubmitting} className="rounded-full text-lg">
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating...
              </span>
            ) : "Get Quote"}
          </Button>
        </div>
      </form>
    </div>
  );
};