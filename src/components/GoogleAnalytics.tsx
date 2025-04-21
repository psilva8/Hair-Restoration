'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

// Measurement ID
const GA_MEASUREMENT_ID = 'G-DP84WMQJHX';

// Add type for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();

  // Track page views when the pathname changes
  useEffect(() => {
    if (pathname && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Google Analytics script loaded successfully');
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
        onLoad={() => {
          console.log('Google Analytics configuration loaded');
        }}
      />
    </>
  );
} 