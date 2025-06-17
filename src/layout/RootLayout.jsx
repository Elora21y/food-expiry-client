import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Loading from "../shared/Loading";

const RootLayout = () => {
  const navigation = useNavigation()
  const isNavigation = Boolean(navigation.location)
  return (
    <div className='bg-base-200 min-h-screen'>
      <header  className='sticky backdrop-blur-3xl top-0 z-10'>
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-285px)] max-w-7xl mx-auto my-5 md:my-8 lg:my-12 xl:my-16 px-5 sm:px-8 xl:px-0">
         {
                isNavigation && <Loading/>
            }
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
