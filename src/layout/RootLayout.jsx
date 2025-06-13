import React from "react";
import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const RootLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-285px)]">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
