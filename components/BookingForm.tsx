import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { BookingDetails, AddOn, SelectedAddOn } from '../types';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#C8102E',
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '0.5rem',
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
});

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51ScdpmGaX0Dq3NLEGcMCsvugs6hz2Sb7jaEX3PaitW2pPKybn8FpbAXsQiL5r5hE3ntbi0rXgtiXCKf8GbYvbOYK00EeOLFX8X');

const AVAILABLE_ADDONS: AddOn[] = [
  { id: 'baby-capsule', name: 'Baby Capsule', description: 'Baby Capsule (0-6 Months)', price: 31.00, image: '/images/baby-capsule.png' },
  { id: 'car-seat', name: 'Baby Car Seat', description: 'Baby Car Seat (6 Months - 3 Years)', price: 31.00, image: '/images/car-seat.png' },
  { id: 'lei', name: 'Fresh Flower Lei', description: 'Traditional welcome necklace', price: 42.80, image: '/images/lei.png' },
  { id: 'surfboard', name: 'Surfboard', description: 'Surcharge for surfboard handling', price: 16.00, image: '/images/surfboard.png' },
];

type TripType = 'oneway' | 'return';
type PickupContext = 'airport' | 'hotel';

const PaymentForm = ({ onSuccess, onBack, amount }: { onSuccess: (paymentId: string) => void, onBack: () => void, amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: { return_url: window.location.origin },
    });

    if (error) {
      setErrorMessage(error.message ?? 'An unknown error occurred');
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent.id);
    } else {
      setErrorMessage('Payment status: ' + (paymentIntent?.status || 'unknown'));
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-black mb-1">Payment Details</h3>
        <p className="text-md text-gray-600 font-medium">Total Amount: ${amount.toFixed(2)}</p>
      </div>
      <PaymentElement />
      {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
      <div className="flex gap-4 pt-4">
        <Button variant="outline" fullWidth onClick={onBack} type="button" disabled={isProcessing}>Back</Button>
        <Button variant="primary" fullWidth type="submit" disabled={!stripe || isProcessing}>
          {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
};

export const BookingForm: React.FC = () => {
  const [step, setStep] = useState(0); // 0: Details, 1: Extras, 2: Payment
  const [tripType, setTripType] = useState<TripType>('oneway');
  const [pickupContext, setPickupContext] = useState<PickupContext>('airport');

  const [formData, setFormData] = useState<BookingDetails>({
    pickup: "Fua'amotu International Airport (TBU)",
    dropoff: '',
    date: '',
    time: '',
    passengers: '1',
    passengerCounts: { adults: 1, children: 0, infants: 0 },
    bags: 0,
    vehicleType: 'sedan',
    returnDate: '',
    addOns: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isFetchingPayment, setIsFetchingPayment] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalAmount = 50.00 + formData.addOns.reduce((sum, item) => {
    const addon = AVAILABLE_ADDONS.find(a => a.id === item.id);
    return sum + (addon ? addon.price * item.quantity : 0);
  }, 0);

  // Scroll to top of form when step changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [step]);

  const handlePickupContextChange = (context: PickupContext) => {
    setPickupContext(context);
    setFormData(prev => context === 'airport'
      ? { ...prev, pickup: "Fua'amotu International Airport (TBU)", dropoff: "" }
      : { ...prev, pickup: "", dropoff: "Fua'amotu International Airport (TBU)" }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field: 'date' | 'returnDate') => (newValue: dayjs.Dayjs | null) => {
    setFormData(prev => ({ ...prev, [field]: newValue ? newValue.format('YYYY-MM-DD') : '' }));
  };

  // Add-on & Passenger logic
  const updatePassengerCount = (type: 'adults' | 'children' | 'infants', delta: number) => {
    setFormData(prev => {
      const newCounts = { ...prev.passengerCounts, [type]: Math.max(0, prev.passengerCounts[type] + delta) };
      // Keep at least 1 adult
      if (type === 'adults' && newCounts.adults < 1) newCounts.adults = 1;

      const total = newCounts.adults + newCounts.children + newCounts.infants;
      return { ...prev, passengerCounts: newCounts, passengers: total.toString() };
    });
  };

  const updateBags = (delta: number) => {
    setFormData(prev => ({ ...prev, bags: Math.max(0, prev.bags + delta) }));
  };

  const updateAddOn = (id: string, delta: number) => {
    setFormData(prev => {
      const current = prev.addOns.find(a => a.id === id);
      const currentQty = current ? current.quantity : 0;
      const newQty = Math.max(0, currentQty + delta);

      let newAddOns = prev.addOns.filter(a => a.id !== id);
      if (newQty > 0) {
        newAddOns.push({ id, quantity: newQty });
      }
      return { ...prev, addOns: newAddOns };
    });
  };

  const getAddOnQty = (id: string) => formData.addOns.find(a => a.id === id)?.quantity || 0;

  const handleNextStep = () => {
    if (step === 0) {
      if (!formData.date || !formData.pickup || !formData.dropoff) {
        alert('Please fill in all required fields');
        return;
      }
      setStep(1);
    } else if (step === 1) {
      initPayment();
    }
  };

  const initPayment = async () => {
    setIsFetchingPayment(true);
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount.toFixed(2), currency: 'FJD' }),
      });
      const data = await response.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setStep(2);
      } else {
        alert('Failed to initialize payment.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to payment server.');
    } finally {
      setIsFetchingPayment(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setIsSubmitting(true);
    const addonsList = formData.addOns.map(item => {
      const addon = AVAILABLE_ADDONS.find(a => a.id === item.id);
      return addon ? `${addon.name} x${item.quantity}` : '';
    }).join(', ');

    const subject = `New Booking (PAID): ${tripType.toUpperCase()} - ${formData.date}`;
    // Reuse existing email logic
    const text = `
New PAID Booking
----------------
Payment ID: ${paymentIntentId}
Total Paid: $${totalAmount.toFixed(2)}

Trip: ${tripType}
From: ${formData.pickup}
To: ${formData.dropoff}
Date: ${formData.date}
Passengers: ${formData.passengerCounts.adults} Ad, ${formData.passengerCounts.children} Ch, ${formData.passengerCounts.infants} Inf
Bags: ${formData.bags}
Add-ons: ${addonsList || 'None'}
    `;

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
  .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
  .header { background-color: #C8102E; color: #ffffff; padding: 30px; text-align: center; }
  .header h1 { margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px; }
  .content { padding: 30px; color: #333333; }
  .booking-details { background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #C8102E; }
  .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eeeeee; padding-bottom: 5px; }
  .footer { background-color: #333333; color: #aaaaaa; text-align: center; padding: 20px; font-size: 12px; }
</style>
</head>
<body>
  <div class="email-container">
    <div class="header"><h1>🌺 TONGA VIP TRANSFERS</h1></div>
    <div class="content">
      <h2>Booking Confirmed!</h2>
      <p>Total Paid: $${totalAmount.toFixed(2)}</p>
      <div class="booking-details">
        <div class="detail-row"><span>Payment ID</span><span>${paymentIntentId.substring(0, 10)}...</span></div>
        <div class="detail-row"><span>Date</span><span>${formData.date}</span></div>
        <div class="detail-row"><span>Pickup</span><span>${formData.pickup}</span></div>
        <div class="detail-row"><span>Dropoff</span><span>${formData.dropoff}</span></div>
        <div class="detail-row"><span>Passengers</span><span>${formData.passengerCounts.adults} Adults, ${formData.passengerCounts.children} Kids</span></div>
        <div class="detail-row"><span>Bags</span><span>${formData.bags}</span></div>
        ${addonsList ? `<div class="detail-row"><span>Add-ons</span><span>${addonsList}</span></div>` : ''}
      </div>
    </div>
    <div class="footer"><p>&copy; ${new Date().getFullYear()} Tonga VIP Transfers</p></div>
  </div>
</body>
</html>
    `;

    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, text, html, paymentIntentId, ...formData, totalAmount }),
      });
      setIsSuccess(true);
      setClientSecret('');
      setIsFetchingPayment(false);
      setTimeout(() => { setIsSuccess(false); setStep(0); }, 8000);
    } catch (error) {
      console.error(error);
      alert('Error saving booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-2xl h-full flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-tonga-red mb-2">Booking Confirmed!</h3>
        <p className="text-gray-600">Your ride is booked. Check your email for details.</p>
      </div>
    );
  }

  // Counter Component
  const Counter = ({ value, onChange }: { value: number, onChange: (d: number) => void }) => (
    <div className="flex items-center gap-3">
      <button type="button" onClick={() => onChange(-1)} disabled={value <= 0} className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center text-tonga-red hover:bg-gray-50 disabled:opacity-30 font-bold">-</button>
      <span className="w-6 text-center font-bold">{value}</span>
      <button type="button" onClick={() => onChange(1)} className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center text-tonga-red hover:bg-gray-50 font-bold">+</button>
    </div>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div ref={containerRef} className={`bg-white p-6 md:p-8 rounded-xl shadow-2xl flex flex-col relative overflow-hidden ${step === 0 ? '' : 'h-[600px]'}`}>
          {step === 0 && (
            <div className="animate-fade-in flex-1 p-1">
              <div className="text-center mb-2">
                <h3 className="text-2xl font-bold text-black mb-1">Book Your Ride</h3>
                <p className="text-gray-600">Reliable. Fixed Price. Instant.</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-3 pb-2">
                {/* Trip Type */}
                <div className="flex justify-center">
                  <div className="inline-flex bg-white border border-gray-200 rounded-full p-1 shadow-sm">
                    {['oneway', 'return'].map((type) => (
                      <button key={type} type="button" onClick={() => setTripType(type as TripType)}
                        className={`px-6 py-1 rounded-full text-sm font-semibold transition-all ${tripType === type ? 'bg-tonga-red text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}>
                        {type === 'oneway' ? 'One Way' : 'Return'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pickup Context */}
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => handlePickupContextChange('airport')}
                    className={`flex flex-col items-center p-3 border rounded-xl ${pickupContext === 'airport' ? 'border-tonga-red bg-red-50 text-tonga-red' : 'border-gray-200'}`}>
                    <span className="font-bold">Airport Pickup</span>
                  </button>
                  <button type="button" onClick={() => handlePickupContextChange('hotel')}
                    className={`flex flex-col items-center p-3 border rounded-xl ${pickupContext === 'hotel' ? 'border-tonga-red bg-red-50 text-tonga-red' : 'border-gray-200'}`}>
                    <span className="font-bold">Hotel Pickup</span>
                  </button>
                </div>

                <TextField fullWidth label="Pickup Location" name="pickup" value={formData.pickup} onChange={handleChange}
                  InputProps={{ readOnly: pickupContext === 'airport', startAdornment: <InputAdornment position="start">📍</InputAdornment> }} />

                <TextField fullWidth label="Drop-off Destination" name="dropoff" value={formData.dropoff} onChange={handleChange}
                  InputProps={{ readOnly: pickupContext === 'hotel', startAdornment: <InputAdornment position="start">🏁</InputAdornment> }} />

                <div className="grid grid-cols-2 gap-4">
                  <DatePicker label="Date" value={formData.date ? dayjs(formData.date) : null} onChange={handleDateChange('date')} slotProps={{ textField: { fullWidth: true } }} />
                  {tripType === 'return' && <DatePicker label="Return Date" value={formData.returnDate ? dayjs(formData.returnDate) : null} onChange={handleDateChange('returnDate')} slotProps={{ textField: { fullWidth: true } }} />}
                </div>

                <Button variant="primary" fullWidth type="submit" className="rounded-full text-lg mt-2">Next: Passengers & Add-ons</Button>
              </form>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center gap-2 mb-4 shrink-0">
                <button onClick={() => setStep(0)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h3 className="text-xl font-bold">Passengers & Extras</h3>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-6 pb-4">
                {/* Passengers */}
                <div className="space-y-4 border-b border-gray-100 pb-6">
                  <h4 className="font-bold text-gray-800">Passengers</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Adults</span>
                    <Counter value={formData.passengerCounts.adults} onChange={(d) => updatePassengerCount('adults', d)} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Children (3-11 yrs)</span>
                    <Counter value={formData.passengerCounts.children} onChange={(d) => updatePassengerCount('children', d)} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Infants (0-2 yrs)</span>
                    <Counter value={formData.passengerCounts.infants} onChange={(d) => updatePassengerCount('infants', d)} />
                  </div>
                </div>

                {/* Bags */}
                <div className="space-y-4 border-b border-gray-100 pb-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-gray-800">Bags</h4>
                    <Counter value={formData.bags} onChange={updateBags} />
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-4">Add-Ons</h4>
                  <div className="space-y-4">
                    {AVAILABLE_ADDONS.map(addon => (
                      <div key={addon.id} className="flex gap-4 items-center border border-gray-100 p-3 rounded-lg hover:border-red-100 transition-colors">
                        <img src={addon.image} alt={addon.name} className="w-16 h-16 object-contain rounded bg-gray-50" />
                        <div className="flex-1">
                          <div className="font-bold text-sm">{addon.name}</div>
                          <div className="text-xs text-gray-500">{addon.description}</div>
                          <div className="font-semibold text-tonga-red mt-1">FJD {addon.price.toFixed(2)}</div>
                        </div>
                        <Counter value={getAddOnQty(addon.id)} onChange={(d) => updateAddOn(addon.id, d)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="bg-gray-50 -mx-6 -mb-6 md:-mx-8 md:-mb-8 p-6 border-t mt-auto shrink-0 flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Total Estimate</div>
                  <div className="text-xl font-bold text-tonga-red">${totalAmount.toFixed(2)}</div>
                </div>
                <Button variant="primary" onClick={initPayment} disabled={isFetchingPayment}>
                  {isFetchingPayment ? "Loading..." : "Continue to Payment"}
                </Button>
              </div>
            </div>
          )}

          {step === 2 && clientSecret && (
            <div className="animate-fade-in flex-1 overflow-y-auto p-1">
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                <PaymentForm onSuccess={handlePaymentSuccess} onBack={() => setStep(1)} amount={totalAmount} />
              </Elements>
            </div>
          )}
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};