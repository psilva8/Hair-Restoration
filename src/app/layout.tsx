import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { getCities } from '@/utils/data-utils';
import NavbarDropdown from '@/components/NavbarDropdown';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Top Hair Transplant in Los Angeles | Best Clinics & Reviews',
  description: 'Find the best hair transplant clinics in Los Angeles. Compare ratings, reviews, and services to choose the right hair restoration specialists in LA.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get cities for the header navigation
  const cities = getCities();
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between py-4">
              {/* Logo */}
              <Link href="/" className="text-2xl font-bold mb-4 lg:mb-0">
                Top Hair Transplant in LA
              </Link>
              
              {/* Navigation */}
              <nav className="w-full lg:w-auto">
                <ul className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6">
                  <li>
                    <Link href="/" className="text-gray-800 hover:text-blue-600 font-medium">
                      Home
                    </Link>
                  </li>
                  
                  {/* Neighborhoods Dropdown - Using client component */}
                  <NavbarDropdown title="LA Neighborhoods" items={cities} />
                  
                  <li>
                    <Link href="/about" className="text-gray-800 hover:text-blue-600 font-medium">
                      About
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        
        <main>
          {children}
        </main>
        
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Hair Transplant LA</h3>
                <p className="text-gray-300 text-sm">
                  Your guide to the best hair transplant clinics in Los Angeles and surrounding areas.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Popular LA Neighborhoods</h3>
                <ul className="space-y-2">
                  {cities.slice(0, 5).map((city, index) => (
                    <li key={index}>
                      <Link href={`/${city.urlSlug}`} className="text-gray-300 hover:text-white text-sm">
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-gray-300 text-sm mb-2">
                  Have questions about hair transplants in Los Angeles?
                </p>
                <Link 
                  href="/contact"
                  className="bg-blue-600 text-white py-2 px-4 rounded text-sm hover:bg-blue-700 inline-block"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} Hair Transplant LA. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
