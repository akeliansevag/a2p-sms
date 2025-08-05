'use client';
import React, { useState } from 'react';

const faqData = [
  {
    question: 'How do you ensure message deliverability?',
    answer: 'We use direct routes, real-time monitoring, and partner with Tier-1 carriers to ensure optimal delivery rates and speed.'
  },
  {
    question: 'Do you offer real-time reporting?',
    answer: 'Yes. Our dashboards give you full visibility into performance and delivery'
  },
  {
    question: 'Is support included?',
    answer: 'Yes. Our team is available 24/7 with technical and onboarding support'
  }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="max-lg:py-12 lg:py-24">
      <div className="container">
        <h2 className="section-title text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray rounded-2xl bg-[rgba(0,0,0,0.4)] px-6 py-4"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left cursor-pointer"
                >
                  <span className="text-2xl">{faq.question}</span>
                  <div className="w-6 h-[25px] shrink-0 flex items-center justify-center border border-gray-400 rounded-lg text-base">
                    {isOpen ? '−' : '+'}
                  </div>
                </button>
                <div
                  className={`mt-3 text-gray-100 transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-lg">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQs;