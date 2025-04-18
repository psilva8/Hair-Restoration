import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About Our Hair Transplant Directory | Los Angeles',
  description: 'Learn about our comprehensive hair transplant directory for Los Angeles and surrounding areas, and how we help you find the best clinics for your needs.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          About Our Hair Transplant Directory
        </h1>
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <div className="max-w-4xl">
            <p className="text-gray-700 mb-4">
              Our hair transplant directory helps you find the best clinics throughout Los Angeles and surrounding areas.
              We provide comprehensive information about each clinic, including ratings, reviews, and specialties.
            </p>
            <p className="text-gray-700 mb-4">
              Whether you're looking for FUE, FUT, or other hair restoration procedures in Beverly Hills, Hollywood, 
              or any other part of Los Angeles, our directory helps you make an informed decision about 
              where to get your treatment.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Our Mission
        </h2>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-700 mb-4">
            We believe that everyone deserves access to quality hair restoration services. Our mission is to connect people 
            experiencing hair loss with reputable, experienced clinics that can provide the best possible treatment outcomes.
          </p>
          <p className="text-gray-700">
            By providing detailed information, verified reviews, and comprehensive clinic profiles, we aim to make the process 
            of choosing a hair transplant clinic as transparent and stress-free as possible.
          </p>
        </div>
      </section>

      {/* How We Rate Clinics Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          How We Rate Clinics
        </h2>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-700 mb-4">
            Our directory uses a comprehensive rating system that considers multiple factors:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Patient reviews and satisfaction scores</li>
            <li>Surgeon credentials and experience</li>
            <li>Clinic facilities and technology</li>
            <li>Before and after results</li>
            <li>Range of services offered</li>
            <li>Pricing transparency</li>
            <li>Follow-up care quality</li>
          </ul>
          <p className="text-gray-700">
            We regularly update our information to ensure you have access to the most current and accurate details about 
            each clinic in our directory.
          </p>
        </div>
      </section>
      
      {/* Back to Home Button */}
      <div className="text-center mt-8">
        <Link 
          href="/" 
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
} 