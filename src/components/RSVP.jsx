import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RSVP({ config }) {
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    guests: '1',
    message: '',
    recipient: 'Isuru'
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      setFormData(prev => ({ ...prev, name: to }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const recipientConfig = config.rsvp.contacts.find(c => c.name === formData.recipient);
    if (!recipientConfig) return;

    const attendanceText = formData.attending === 'yes' 
      ? `will be attending with ${formData.guests} guest(s).` 
      : `will NOT be attending.`;
      
    const message = `Hello ${formData.recipient}! This is ${formData.name.trim()}. I ${attendanceText}${formData.message ? `\n\nMessage: ${formData.message}` : ''}`;
    
    const whatsappUrl = `https://wa.me/${recipientConfig.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="max-w-xl mx-auto w-full p-4 md:p-8"
    >
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl text-chocolate mb-3 tracking-widest uppercase">RSVP</h2>
        <p className="font-serif italic text-chocolate/80 text-lg">We look forward to celebrating with you.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-antique-gold mb-2">Guest Name(s)</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b border-chocolate/20 py-2 focus:outline-none focus:border-antique-gold transition-colors font-serif text-lg text-chocolate"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-antique-gold mb-4">Will you attend?</label>
          <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 font-serif text-lg text-chocolate">
            <label className="flex items-center space-x-3 cursor-pointer group p-2 -ml-2">
              <div className="w-5 h-5 rounded-full border border-antique-gold flex items-center justify-center shrink-0">
                {formData.attending === 'yes' && <div className="w-3 h-3 rounded-full bg-antique-gold" />}
              </div>
              <input 
                type="radio" 
                name="attending" 
                value="yes" 
                checked={formData.attending === 'yes'} 
                onChange={handleChange} 
                className="hidden" 
              />
              <span className="group-hover:text-antique-gold transition-colors">Joyfully Accept</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group p-2 -ml-2 sm:ml-0">
              <div className="w-5 h-5 rounded-full border border-antique-gold flex items-center justify-center shrink-0">
                {formData.attending === 'no' && <div className="w-3 h-3 rounded-full bg-antique-gold" />}
              </div>
              <input 
                type="radio" 
                name="attending" 
                value="no" 
                checked={formData.attending === 'no'} 
                onChange={handleChange} 
                className="hidden" 
              />
              <span className="group-hover:text-antique-gold transition-colors">Regretfully Decline</span>
            </label>
          </div>
        </div>

        {formData.attending === 'yes' && (
          <div>
            <label htmlFor="guests" className="block text-xs font-semibold uppercase tracking-widest text-antique-gold mb-2">Number of Guests</label>
            <select 
              id="guests" 
              name="guests" 
              value={formData.guests} 
              onChange={handleChange}
              className="w-full bg-transparent border-b border-chocolate/20 py-2 focus:outline-none focus:border-antique-gold transition-colors font-serif text-lg appearance-none cursor-pointer text-chocolate"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="recipient" className="block text-xs font-semibold uppercase tracking-widest text-antique-gold mb-2">Send RSVP To</label>
          <select 
            id="recipient" 
            name="recipient" 
            value={formData.recipient} 
            onChange={handleChange}
            className="w-full bg-transparent border-b border-chocolate/20 py-2 focus:outline-none focus:border-antique-gold transition-colors font-serif text-lg appearance-none cursor-pointer text-chocolate"
          >
            {config.rsvp.contacts.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-antique-gold mb-2">Message (Optional)</label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message} 
            onChange={handleChange}
            rows="2"
            className="w-full bg-transparent border-b border-chocolate/20 py-2 focus:outline-none focus:border-antique-gold transition-colors font-serif resize-none text-chocolate"
            placeholder="A note for the couple"
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-4 min-h-[52px] bg-chocolate text-ivory uppercase tracking-widest text-sm hover:bg-[#34221a] transition-colors rounded-[10px] shadow-md border border-antique-gold/50 outline-none focus:ring-2 focus:ring-antique-gold focus:ring-offset-2 focus:ring-offset-[#FAF7F2] relative overflow-hidden group mt-6 flex items-center justify-center font-semibold"
        >
          <div className="absolute inset-0 border border-antique-gold/30 scale-95 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-[10px]"></div>
          Send RSVP via WhatsApp
        </button>
      </form>

      <div className="mt-12 border-t border-champagne-gold/30 pt-8">
        <p className="text-center font-serif text-sm text-chocolate/80 uppercase tracking-widest mb-6">Or Call Directly</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          {config.rsvp.contacts.map(c => (
             <a 
               key={c.name}
               href={`tel:${c.phone.replace(/\s+/g, '')}`}
               className="min-h-[44px] px-6 py-3 border border-chocolate/30 text-chocolate text-xs text-center hover:bg-chocolate hover:text-ivory transition-colors rounded-sm uppercase tracking-widest outline-none focus:ring-2 focus:ring-chocolate flex items-center justify-center"
             >
               Call {c.name}
             </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
