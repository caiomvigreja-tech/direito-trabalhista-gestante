import { useEffect } from 'react';

export function TrackingScripts() {
  useEffect(() => {
    // Retardar o carregamento de scripts de terceiros para não bloquear a thread principal
    const timer = setTimeout(() => {
      // 1. Meta Pixel Code
      if (!(window as any).fbq) {
        (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
          if (f.fbq) return;
          n = f.fbq = function() {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = '2.0';
          n.queue = [];
          t = b.createElement(e);
          t.async = true;
          t.defer = true;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        
        (window as any).fbq('init', '820811781072112');
        (window as any).fbq('track', 'PageView');
      }

      // 2. Microsoft Clarity Code
      if (!(window as any).clarity) {
        (function(c: any, l: any, a: any, r: any, i: any, t?: any, y?: any) {
          c[a] = c[a] || function() {
            (c[a].q = c[a].q || []).push(arguments);
          };
          t = l.createElement(r);
          t.async = 1;
          t.defer = 1;
          t.src = "https://www.clarity.ms/tag/" + i;
          y = l.getElementsByTagName(r)[0];
          y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "wexonpvi0m");
      }
    }, 3500); // Aguarda 3.5 segundos (ou até a página estar ociosa)

    return () => clearTimeout(timer);
  }, []);

  return null;
}
