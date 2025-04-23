import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { getCities } from '@/utils/data-utils';
import NavbarDropdown from '@/components/NavbarDropdown';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-86TXW9HPH6';

export const metadata: Metadata = {
  title: 'Top Hair Transplant in Los Angeles | Best Clinics & Reviews',
  description: 'Find the best hair transplant clinics in Los Angeles. Compare ratings, reviews, and services to choose the right hair restoration specialists in LA.',
  verification: {
    google: 'odG8vbaFqqExoaVTv_S6vlieK7l2FTZ-AsRyrDi3oDk',
  },
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="google-site-verification" content="odG8vbaFqqExoaVTv_S6vlieK7l2FTZ-AsRyrDi3oDk" />
        
        {/* Google tag (gtag.js) - direct implementation */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DP84WMQJHX"></script>
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-DP84WMQJHX');
            `
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Analytics component - as backup */}
        <GoogleAnalytics />
        
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between py-3 md:py-4">
              {/* Logo */}
              <Link href="/" className="text-xl md:text-2xl font-bold mb-3 sm:mb-0">
                <span className="hidden sm:inline">Top Hair Transplant in LA</span>
                <span className="sm:hidden">Hair Transplant LA</span>
              </Link>
              
              {/* Navigation */}
              <nav className="w-full sm:w-auto">
                <ul className="flex flex-row justify-center sm:justify-end items-center space-x-4 sm:space-x-6">
                  <li>
                    <Link href="/" className="text-sm md:text-base text-gray-800 hover:text-blue-600 font-medium">
                      Home
                    </Link>
                  </li>
                  
                  {/* Neighborhoods Dropdown - Using client component */}
                  <NavbarDropdown title="LA Neighborhoods" items={cities} />
                  
                  <li>
                    <Link href="/about" className="text-sm md:text-base text-gray-800 hover:text-blue-600 font-medium">
                      About
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-gray-800 text-white py-6 md:py-8 mt-8 md:mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Hair Transplant LA</h3>
                <p className="text-gray-300 text-xs md:text-sm">
                  Your guide to the best hair transplant clinics in Los Angeles and surrounding areas.
                </p>
              </div>
              
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Popular LA Neighborhoods</h3>
                <ul className="grid grid-cols-2 gap-y-1 md:gap-y-2">
                  {cities.slice(0, 6).map((city, index) => (
                    <li key={index}>
                      <Link href={`/${city.urlSlug}`} className="text-gray-300 hover:text-white text-xs md:text-sm">
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-6 md:mt-8 pt-4 md:pt-6 text-center text-gray-400 text-xs md:text-sm">
              © {new Date().getFullYear()} Hair Transplant LA. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
