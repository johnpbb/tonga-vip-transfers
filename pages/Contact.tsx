import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailSubject = `Contact Form: ${formData.subject} - ${formData.firstName} ${formData.lastName}`;
    const text = `
New Contact Message

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
    `;

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: emailSubject,
          text
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: 'General Inquiry',
          message: ''
        });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 p-8 rounded-xl text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600">Thank you for contacting us. We will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">First Name</label>
            <input
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-tonga-red"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Last Name</label>
            <input
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-tonga-red"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
          <input
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-tonga-red"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-tonga-red"
          >
            <option>General Inquiry</option>
            <option>Existing Booking</option>
            <option>Lost & Found</option>
            <option>Feedback</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
          <textarea
            required
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-tonga-red"
          ></textarea>
        </div>
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </>
  );
};

export const Contact: React.FC = () => {
  return (
    <div className="bg-white">
      <PageHeader title="Contact Us" subtitle="We're Here To Help" />

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-tonga-red mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Have a special request or need a custom quote for a tour? Our team is available 24/7 to assist you.
              Fill out the form or reach us directly via the details below.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-tonga-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Head Office</h4>
                  <p className="text-gray-600">Taufa'ahau Road, Nuku'alofa<br />Kingdom of Tonga</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-tonga-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Phone / WhatsApp</h4>
                  <p className="text-gray-600">+676 12 345 67<br /><span className="text-sm text-gray-400">Available 24/7</span></p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-tonga-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email</h4>
                  <p className="text-gray-600">bookings@tongavip.to</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg border-t-4 border-tonga-red">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};