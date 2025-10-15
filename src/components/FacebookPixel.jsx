import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const FacebookPixel = () => {
  const location = useLocation();
  const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

  useEffect(() => {
    if (!PIXEL_ID) {
      // console.warn("[Meta Pixel] Facebook Pixel ID tidak ditemukan di .env");
      return;
    }

    if (document.getElementById("facebook-pixel-script")) {
      // console.log(
      //   "[Meta Pixel] Facebook Pixel sudah dimuat, kirim PageView..."
      // );
      if (window.fbq) window.fbq("track", "PageView");
      return;
    }

    // console.log("[Meta Pixel] Memuat script Facebook Pixel...");

    const script = document.createElement("script");
    script.id = "facebook-pixel-script";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);

    script.onload = () => {
      // console.log("[Meta Pixel] Script Facebook Pixel berhasil dimuat");

      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );

      window.fbq("init", PIXEL_ID);
      window.fbq("track", "PageView");

      // console.log("[Meta Pixel] ID initialized:", PIXEL_ID);
    };
  }, [PIXEL_ID]);

  useEffect(() => {
    if (window.fbq && PIXEL_ID) {
      // console.log("PageView event:", location.pathname);
      const timeout = setTimeout(() => {
        window.fbq("track", "PageView");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [location, PIXEL_ID]);

  return null;
};

export default FacebookPixel;
