'use client';

import React, { useState } from 'react';
import Script from 'next/script';

export default function FAQ() {
  // Store which FAQ items are expanded
  const [openItems, setOpenItems] = useState<number[]>([]);

  // Toggle FAQ item open/closed state
  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter(item => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  // FAQ content
  const faqItems = [
    {
      question: "What are the popular hair transplant methods?",
      answer: "The most common hair transplant techniques include <strong>FUE (Follicular Unit Extraction)</strong>, <strong>FUT (Follicular Unit Transplantation)</strong>, and <strong>DHI (Direct Hair Implantation)</strong>. Each technique has its own benefits and is suitable for different types of hair loss patterns."
    },
    {
      question: "How do I choose the right hair transplant clinic?",
      answer: "When selecting a clinic, consider the surgeon's experience and credentials, before-and-after photos of previous patients, reviews and testimonials, the techniques they offer, and the overall cost. A consultation is usually the best way to determine if a clinic is right for you."
    },
    {
      question: "What is the recovery time after a hair transplant?",
      answer: "Most patients can return to work within 1-3 days after the procedure, depending on the technique used. The transplanted hair will fall out within 2-3 weeks, and new growth should begin within 3-4 months. Full results are typically visible after 12-18 months."
    },
    {
      question: "How much does a hair transplant cost?",
      answer: "The cost of a hair transplant varies widely depending on factors such as the clinic's location, surgeon's experience, technique used, and number of grafts needed. In Los Angeles, prices typically range from $4,000 to $15,000. Some clinics charge per graft, while others offer package pricing."
    },
    {
      question: "Are hair transplants permanent?",
      answer: "Yes, hair transplants are generally considered permanent. The transplanted hair follicles are taken from areas that are resistant to balding (usually the back of the head). These follicles retain their genetic properties and continue to grow in their new location for a lifetime."
    },
    {
      question: "What is the success rate of hair transplants?",
      answer: "Hair transplants have a high success rate, typically between 90-95% when performed by experienced surgeons. Success rates refer to the percentage of transplanted follicles that successfully grow hair in their new location. The aesthetic outcome depends on the surgeon's skill and the patient's expectations."
    }
  ];

  // Create comprehensive FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.replace(/<\/?strong>/g, '')  // Remove HTML tags for schema
      }
    }))
  };

  return (
    <section className="bg-gray-50 rounded-xl p-6 md:p-8 mb-12">
      {/* Add JSON-LD schema */}
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions About Hair Transplants</h2>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left px-5 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                <span className="text-blue-600 text-2xl">
                  {openItems.includes(index) ? '−' : '+'}
                </span>
              </button>
              
              <div 
                className={`px-5 py-4 bg-gray-50 transition-all duration-300 ease-in-out ${
                  openItems.includes(index) 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0 hidden'
                }`}
              >
                <p 
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 