"use client";
import { usePathname } from "next/navigation";
import Navbar from "./homepage/navbar";
import Footer from "./homepage/footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/bdd/admin") || pathname === "/bdd" || pathname.startsWith("/bdd/login") || pathname.startsWith("/bdd/certificate") ;

  return (
    <div>
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
