"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "./homepage/navbar";
import Footer from "./homepage/footer";
import LogoLoader from "./homepage/LogoLoader";
import Image from "next/image";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // Routes where layout is hidden
  const hideLayout =
    pathname.startsWith("/bdd/admin") ||
    pathname === "/bdd" ||
    pathname.startsWith("/bdd/login") ||
    pathname.startsWith("/bdd/certificate")||
    pathname.startsWith("/know-your-prahar");
    

  useEffect(() => {
    const handleLoad = () => {
      // Delay to allow loader animation if needed
      setTimeout(() => setIsLoading(false), 1000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <div>
      {/* Loader Overlay */}
      {isLoading && <LogoLoader />}

      {/* Conditionally render Navbar */}
      {!hideLayout && <Navbar />}

      {/* Main content container */}
      <main className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex-grow bg-mist-texture">{children}</div>
      </main>

      {/* Conditionally render Footer */}
      {!hideLayout && <Footer />}
    </div>
  );
}
