import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Loading from "../shared/Loading";

const AuthLayout = () => {
   const navigation = useNavigation()
    const isNavigation = Boolean(navigation.location)
  return (
    <div className=" bg-white">
      <header className="sticky backdrop-blur-lg top-0 z-10">
        <Navbar />
      </header>
      {
                isNavigation && <Loading/>
            }
      <main className="min-h-[calc(100vh-285px)] ">
         <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AuthLayout;
