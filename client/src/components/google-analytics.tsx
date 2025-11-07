import { useEffect } from 'react';

export function GoogleAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

  return (
    <>
      <Helmet>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        />
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure'
            });

            // Track custom events
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              page_path: window.location.pathname
            });
          `}
        </script>
      </Helmet>
    </>
  );
}