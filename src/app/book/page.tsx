'use client';

import { useState } from 'react';

export default function BookPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '',
    eventType: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ firstName: '', lastName: '', email: '', phone: '', eventDate: '', guestCount: '', eventType: '', message: '' });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <main className="pt-24 pb-20 px-6 min-h-screen bg-darkest">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif text-center mb-3 tracking-wide">
          Book Your Event
        </h1>
        <p className="text-gray-400 text-center text-sm mb-10">
          Tell us about your event and we&apos;ll get back to you within 24 hours with a custom quote.
        </p>

        {status === 'success' ? (
          <div className="bg-dark border border-gold/30 rounded-lg p-8 text-center">
            <div className="text-gold text-4xl mb-4">&#10003;</div>
            <h2 className="text-xl font-serif mb-2">Request Received!</h2>
            <p className="text-gray-400 text-sm">
              Thank you! We&apos;ll be in touch shortly to discuss your event. Check your phone &mdash; you may hear from us via text!
            </p>
            <a
              href="/"
              className="inline-block mt-6 px-6 py-2 border border-gold text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-all"
            >
              Back to Home
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full bg-dark border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full bg-dark border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-gold focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-dark border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="w-full bg-dark border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-gold focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5">Event Date</label>
                <input
                  type="date"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleChange}
                  className="w-full bg-dark border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5">Guest Count</label>
                <input
                  type="number"
                  name="guestCount"
                  value={form.guestCount}
                  onChange={handleChange}
                  placeholder="50"
                  className="w-full bg-dark border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5">Event Type</label>
                <select
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  className="w-full bg-dark border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-gold focus:outline-none transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="graduation">Graduation</option>
                  <option value="fundraiser">Fundraiser</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5">Tell Us About Your Event</label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Location, special requests, dietary needs, etc."
                className="w-full bg-dark border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-gold focus:outline-none transition-colors resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-gold text-black font-semibold py-3.5 uppercase tracking-widest text-sm hover:bg-gold-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Sending...' : 'Request a Quote'}
            </button>

            <p className="text-gray-500 text-xs text-center">
              By submitting, you agree to be contacted about your event. We&apos;ll never spam you.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
