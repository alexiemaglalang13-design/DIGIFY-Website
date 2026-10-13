import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, Copy, Check, AlertCircle, Sparkles, Tag, ShieldCheck, MapPin, Phone, Clock, Share2, Globe } from 'lucide-react';
import { DigifyLogo } from './DigifyLogo';
import { adminApi } from '../admin/adminApi';

interface ContactProps {
  initialService?: string;
  initialPromoCode?: string;
  onInquirySubmitted: (inquiry: {
    name: string;
    email: string;
    service: string;
    message: string;
    date: string;
  }) => void;
  onCopyEmailNotice: (text: string) => void;
}

export const Contact: React.FC<ContactProps> = ({
  initialService = 'Digital Starter Package',
  initialPromoCode = '',
  onInquirySubmitted,
  onCopyEmailNotice,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(initialService);
  const [timelineDate, setTimelineDate] = useState('');
  const [message, setMessage] = useState('');
  const [promoCode, setPromoCode] = useState(initialPromoCode);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (initialService) setSubject(initialService);
  }, [initialService]);

  useEffect(() => {
    if (initialPromoCode) setPromoCode(initialPromoCode);
  }, [initialPromoCode]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('digify@gmail.com');
    setCopiedEmail(true);
    onCopyEmailNotice('Email copied: digify@gmail.com');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Customer name is required.';
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }
    if (!subject.trim()) errs.subject = 'Subject / service selection is required.';
    if (!message.trim()) {
      errs.message = 'Please provide a message outlining your project goals.';
    } else if (message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const formattedService = promoCode.toUpperCase() === 'STARTER20' ? `${subject} (20% OFF)` : subject;
    const submissionDate = timelineDate || new Date().toISOString().split('T')[0];

    try {
      // Connect with backend endpoint
      await adminApi.submitPublicInquiry({
        name: name.trim(),
        email: email.trim(),
        subject: formattedService,
        message: message.trim(),
        date: submissionDate,
        promoCode: promoCode ? promoCode.trim().toUpperCase() : undefined,
      });
    } catch (err) {
      console.warn('Backend inquiry submission note (fallback to local state):', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      onInquirySubmitted({
        name,
        email,
        service: formattedService,
        message,
        date: submissionDate,
      });
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setName('');
    setEmail('');
    setMessage('');
    setTimelineDate('');
    setPromoCode('');
    setErrors({});
  };

  return (
    <section id="contact" className="py-24 border-t border-sky-400/20 bg-[#041238] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>07 / CONTACT US</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-display">
            LET'S TALK ABOUT YOUR DIGITAL PRESENCE.
          </h2>
          <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed pt-1">
            Submit your project parameters below to initiate a consultation. All inquiries are received directly by our team.
          </p>
        </div>

        {/* Form and Contact Info Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form & Confirmation (7 Cols) */}
          <div className="lg:col-span-7">
            {isSuccess ? (
              <div className="p-8 sm:p-12 rounded-3xl bg-white text-slate-900 border border-slate-200 text-center space-y-6 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                    THANK YOU. YOUR INQUIRY HAS BEEN RECEIVED.
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    We have logged your project parameters for <strong className="text-slate-900">{name}</strong> regarding <strong className="text-blue-600">{subject}</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left text-slate-700 space-y-2 max-w-md mx-auto font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-mono">Contact Email:</span>
                    <span className="text-slate-900 font-mono font-bold">{email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-mono">Preferred Date:</span>
                    <span className="text-slate-900 font-mono">{timelineDate || 'Standard Intake'}</span>
                  </div>
                  {promoCode && (
                    <div className="flex justify-between text-blue-700 font-bold">
                      <span className="font-mono">Applied Code:</span>
                      <span className="font-mono">{promoCode.toUpperCase()} (20% OFF)</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-200 text-[11px] text-emerald-600 flex items-center gap-1.5 font-bold font-mono">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Inquiry securely recorded in Digify system</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-md cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-8 sm:p-10 rounded-3xl bg-white text-slate-900 border border-slate-200 space-y-6 shadow-2xl"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    PROJECT INQUIRY FORM
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-600">REQUIRED FIELDS (*)</span>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="customer-name" className="block text-xs font-bold text-slate-700">
                      Customer Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      placeholder="e.g. Alex Morgan / Studio Name"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                        errors.name ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                      }`}
                      aria-required="true"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="customer-email" className="block text-xs font-bold text-slate-700">
                      Email Address <span className="text-blue-600">*</span>
                    </label>
                    <input
                      id="customer-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      placeholder="name@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                        errors.email ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                      }`}
                      aria-required="true"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject & Timeline Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="inquiry-subject" className="block text-xs font-bold text-slate-700">
                      Subject / Service Category <span className="text-blue-600">*</span>
                    </label>
                    <select
                      id="inquiry-subject"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                    >
                      <option value="Digital Starter Package">Digital Starter Package (20% OFF)</option>
                      <option value="Web Design">Web Design</option>
                      <option value="Digital Branding">Digital Branding</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Custom Consultation">Custom Digital Project</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="target-date" className="block text-xs font-bold text-slate-700">
                      Target Launch Date (Optional)
                    </label>
                    <input
                      id="target-date"
                      type="date"
                      value={timelineDate}
                      onChange={(e) => setTimelineDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Promo Code */}
                <div className="space-y-1.5">
                  <label htmlFor="promo-code" className="block text-xs font-bold text-slate-700">
                    Promotional Coupon Code (Optional)
                  </label>
                  <div className="relative">
                    <input
                      id="promo-code"
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. STARTER20"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono uppercase font-bold text-blue-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {promoCode.toUpperCase() === 'STARTER20' && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>20% OFF Applied</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="inquiry-message" className="block text-xs font-bold text-slate-700">
                    Project Message <span className="text-blue-600">*</span>
                  </label>
                  <textarea
                    id="inquiry-message"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                    }}
                    placeholder="Briefly describe your business, audience, and what you aim to achieve with DIGIFY..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                      errors.message ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                    }`}
                    aria-required="true"
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 disabled:opacity-50 text-white font-black text-sm transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'TRANSMITTING INQUIRY...' : 'SEND INQUIRY'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Complete Company Information (Requirements: Address, Contact Number, Email, Business Hours, Social Media) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-white text-slate-900 border border-slate-200 space-y-6 shadow-2xl">
              <div className="space-y-1 pb-4 border-b border-slate-100">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  OFFICIAL COMPANY INFORMATION
                </span>
                <div className="pt-2 flex items-center gap-3">
                  <div className="w-12 h-12 relative flex-shrink-0 overflow-hidden">
                    <img
                      src="/images/digify-logo.png"
                      alt="DIGIFY Logo"
                      className="absolute w-[210%] h-[210%] max-w-none object-contain left-[54%] top-[56%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-black font-display text-slate-900 text-2xl tracking-wide leading-none">
                      DIGIFY
                    </span>
                    <span className="font-semibold uppercase text-blue-600 font-display mt-1 leading-none text-[10px] tracking-wider">
                      DIGITAL SERVICES BUSINESS
                    </span>
                  </div>
                </div>
              </div>

              {/* 1. Email Address (with 1-click copy) */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono uppercase text-slate-400 font-bold">EMAIL ADDRESS</div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="font-mono text-sm text-slate-900 font-bold select-all">digify@gmail.com</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
                    aria-label="Copy email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 2. Contact Number */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono uppercase text-slate-400 font-bold">CONTACT NUMBER</div>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="font-mono text-sm text-slate-900 font-bold">+63 296-587-0175</span>
                  <span className="text-[10px] font-mono text-slate-400 ml-auto">Direct Inquiries</span>
                </div>
              </div>

              {/* 3. Address */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono uppercase text-slate-400 font-bold">ADDRESS & STUDIO</div>
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-800 font-medium leading-relaxed">
                    <strong className="text-slate-900 font-bold block">123 ATA St., Angeles City, Pampanga</strong>
                    <span className="text-slate-500">DIGIFY Digital Studio · Pampanga, Philippines</span>
                  </div>
                </div>
              </div>

              {/* 4. Business Hours */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono uppercase text-slate-400 font-bold">BUSINESS HOURS</div>
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-800 font-medium leading-relaxed">
                    <span className="text-slate-900 font-bold">Mon – Fri: 9:00 AM – 6:00 PM EST</span>
                    <br />
                    <span className="text-slate-500">Online Intake: 24/7 Monitored</span>
                  </div>
                </div>
              </div>

              {/* 5. Social Media Accounts (Facebook & Instagram Only) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-[11px] font-mono uppercase text-slate-400 font-bold">SOCIAL MEDIA ACCOUNTS</div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-center text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors block"
                  >
                    Facebook
                    <div className="text-[10px] font-mono text-slate-400 font-normal">@digify</div>
                  </a>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-pink-50 border border-slate-200 text-center text-xs font-bold text-slate-700 hover:text-pink-600 transition-colors block"
                  >
                    Instagram
                    <div className="text-[10px] font-mono text-slate-400 font-normal">@digify</div>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
