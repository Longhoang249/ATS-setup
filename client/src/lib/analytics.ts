/**
 * Hàm gửi sự kiện tới Google Analytics
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('event', eventName, eventParams);
      console.log(`[Analytics] Tracked event: ${eventName}`, eventParams);
    } catch (error) {
      console.error(`[Analytics] Error tracking event: ${eventName}`, error);
    }
  } else {
    console.warn(`[Analytics] gtag not available for event: ${eventName}`);
  }
}

/**
 * Hàm gửi sự kiện pageview tới Google Analytics
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('config', 'G-V0J096HXTY', {
        page_path: pagePath,
        page_title: pageTitle
      });
      console.log(`[Analytics] Tracked pageview: ${pagePath}`);
    } catch (error) {
      console.error(`[Analytics] Error tracking pageview: ${pagePath}`, error);
    }
  } else {
    console.warn(`[Analytics] gtag not available for pageview: ${pagePath}`);
  }
}
