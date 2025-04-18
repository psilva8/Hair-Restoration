'use client';

import React from 'react';
import Script from 'next/script';

export default function FAQ() {
  // Create comprehensive FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the popular hair transplant methods?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most common hair transplant techniques include FUE (Follicular Unit Extraction), FUT (Follicular Unit Transplantation), and DHI (Direct Hair Implantation). Each technique has its own benefits and is suitable for different types of hair loss patterns."
        }
      },
      {
        "@type": "Question",
        "name": "How do I choose the right hair transplant clinic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When selecting a clinic, consider the surgeon's experience and credentials, before-and-after photos of previous patients, reviews and testimonials, the techniques they offer, and the overall cost. A consultation is usually the best way to determine if a clinic is right for you."
        }
      },
      {
        "@type": "Question",
        "name": "What is the recovery time after a hair transplant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most patients can return to work within 1-3 days after the procedure, depending on the technique used. The transplanted hair will fall out within 2-3 weeks, and new growth should begin within 3-4 months. Full results are typically visible after 12-18 months."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a hair transplant cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The cost of a hair transplant varies widely depending on factors such as the clinic's location, surgeon's experience, technique used, and number of grafts needed. In Los Angeles, prices typically range from $4,000 to $15,000. Some clinics charge per graft, while others offer package pricing."
        }
      },
      {
        "@type": "Question",
        "name": "Are hair transplants permanent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, hair transplants are generally considered permanent. The transplanted hair follicles are taken from areas that are resistant to balding (usually the back of the head). These follicles retain their genetic properties and continue to grow in their new location for a lifetime."
        }
      },
      {
        "@type": "Question",
        "name": "What is the success rate of hair transplants?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hair transplants have a high success rate, typically between 90-95% when performed by experienced surgeons. Success rates refer to the percentage of transplanted follicles that successfully grow hair in their new location. The aesthetic outcome depends on the surgeon's skill and the patient's expectations."
        }
      }
    ]
  };

  return (
    <section className="bg-gray-50 rounded-xl p-8 mb-12">
      {/* Add JSON-LD schema */}
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions About Hair Transplants</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">What are the popular hair transplant methods?</h3>
            <p className="text-gray-700">
              The most common hair transplant techniques include <strong>FUE (Follicular Unit Extraction)</strong>, <strong>FUT (Follicular Unit Transplantation)</strong>, and <strong>DHI (Direct Hair Implantation)</strong>. 
              Each technique has its own benefits and is suitable for different types of hair loss patterns.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">How do I choose the right hair transplant clinic?</h3>
            <p className="text-gray-700">
              When selecting a clinic, consider the surgeon's experience and credentials, before-and-after photos of previous patients, 
              reviews and testimonials, the techniques they offer, and the overall cost. A consultation is usually the best way to 
              determine if a clinic is right for you.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">What is the recovery time after a hair transplant?</h3>
            <p className="text-gray-700">
              Most patients can return to work within 1-3 days after the procedure, depending on the technique used. 
              The transplanted hair will fall out within 2-3 weeks, and new growth should begin within 3-4 months. 
              Full results are typically visible after 12-18 months.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">How much does a hair transplant cost?</h3>
            <p className="text-gray-700">
              The cost of a hair transplant varies widely depending on factors such as the clinic's location, surgeon's experience, 
              technique used, and number of grafts needed. In Los Angeles, prices typically range from $4,000 to $15,000. Some 
              clinics charge per graft, while others offer package pricing.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Are hair transplants permanent?</h3>
            <p className="text-gray-700">
              Yes, hair transplants are generally considered permanent. The transplanted hair follicles are taken from areas 
              that are resistant to balding (usually the back of the head). These follicles retain their genetic properties 
              and continue to grow in their new location for a lifetime.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">What is the success rate of hair transplants?</h3>
            <p className="text-gray-700">
              Hair transplants have a high success rate, typically between 90-95% when performed by experienced surgeons. 
              Success rates refer to the percentage of transplanted follicles that successfully grow hair in their new location. 
              The aesthetic outcome depends on the surgeon's skill and the patient's expectations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 