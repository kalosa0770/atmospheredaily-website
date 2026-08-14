// app/contact/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thank you for reaching out to Atmosphere Daily. We will respond shortly.');
  };

  return (
    <main className="w-full bg-white text-text font-body antialiased pt-10 pb-16">
      
      {/* Page Header */}
      <section className="w-full bg-section-background text-section-text py-20 px-4 sm:px-6 lg:px-8 border-b border-text/20">
        <div className="max-w-6xl mx-auto">
          <span className="text-button-hover font-heading text-xs uppercase tracking-widest font-bold">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase tracking-tight mt-1 text-white">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm text-section-text/80 mt-2 max-w-2xl font-body">
            Have a story lead, partnership proposal, or general question? Reach out to the Atmosphere Daily team.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="flex flex-col gap-12 max-w-5xl">
          
          {/* Contact Details Column */}
          <div className="items-center justify-center space-y-6">
            <div className="bg-background/50 border border-text/10 p-6 rounded-none">
              <h2 className="text-base font-heading uppercase font-bold text-text mb-4 border-l-4 border-button-hover pl-3">
                Reach Our Team
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-section-background shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading uppercase font-bold text-text block text-[10px] md:text-sm">Email Us</span>
                    <a href="mailto:info@atmospheredaily.com" className="text-text/80 hover:text-red-700 transition-colors">
                      info@atmospheredaily.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-section-background shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading uppercase font-bold text-text block text-[10px] md:text-sm">Phone Number</span>
                    <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-text/80 hover:text-red-700 transition-colors">
                      +260 967 407 406
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-section-background shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading uppercase font-bold text-text block text-[10px] md:text-sm">HQ Office</span>
                    <span className="text-text/80">Lusaka, Zambia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white border border-text/15 p-6 sm:p-8 rounded-none">
            <h2 className="text-lg font-heading uppercase font-bold text-text mb-6 border-l-4 border-button-hover pl-3">
              Send Us A Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-heading uppercase tracking-wider text-text font-bold">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 text-xs text-text bg-background/40 border border-text/20 focus:border-section-background focus:outline-none rounded-none placeholder:text-text/40"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-heading uppercase tracking-wider text-text font-bold">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2 text-xs text-text bg-background/40 border border-text/20 focus:border-section-background focus:outline-none rounded-none placeholder:text-text/40"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-[10px] font-heading uppercase tracking-wider text-text font-bold">
                  Inquiry Type
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 text-xs text-text bg-background/40 border border-text/20 focus:border-section-background focus:outline-none rounded-none"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Partnership & Sponsorship">Partnership & Sponsorship</option>
                  <option value="Editorial & Story Pitch">Story Pitch</option>
                  <option value="AD Connect Podcast Guest">AD Connect Podcast Guest</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] font-heading uppercase tracking-wider text-text font-bold">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full px-3 py-2 text-xs text-text bg-background/40 border border-text/20 focus:border-section-background focus:outline-none rounded-none placeholder:text-text/40 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-button-background hover:bg-button-hover hover:text-text text-section-text font-heading text-xs font-bold uppercase tracking-widest py-3 transition-colors duration-200 rounded-none cursor-pointer"
              >
                Send Message <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      </section>

    </main>
  );
}