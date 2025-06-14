import React, { use } from "react";
import icon from "../../public/time.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const Footer = () => {
  const {user} = use(AuthContext)
  return (
    <div className=" bg-[#EB5B00] text-white p-10 text-sm max-w-7xl mx-auto px-5 sm:px-8">
      <footer className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">
        <aside className="max-w-[480px]">
          <div className="flex gap-1 items-center mb-2">
            <img src={icon} alt="" className="w-10 sm:w-12 md:w-14" />
            <h4 className="text-base-300 font-bold text-xl md:text-2xl">
              FreshAlert
            </h4>
          </div>
          <p>
            <strong className="text-base">FreshAlert </strong>
            helps you stay one step ahead of food expiry. Add your items, get
            reminders before they spoil, and waste less every day. A smarter
            kitchen starts here!
          </p>

          <p className="flex items-center gap-2 mt-2">
            <MdMarkEmailUnread /> support@freshalert.com
          </p>
          <p className="flex items-center gap-2">
            <IoLocationSharp /> Dhaka, Bangladesh
          </p>
        </aside>

{/* Services */}
        <nav className="flex flex-col">
          <h2 className="md:text-xl font-bold mb-2">Services</h2>
          <a className="link link-hover" href="/">
            Home
          </a>
          <a className="link link-hover" href="/fridge">
            Fridge
          </a>
          {
            user &&
            <>
            <a className="link link-hover" href="/add-food">
            Add Food
          </a>
          <a className="link link-hover" href="/my-items">
            My Items
          </a>
            </>
          }
        </nav>
        {/* terms */}
         <div>
            <h2 className="md:text-xl font-bold mb-2">Terms</h2>
            <p>
              <a href="#">Privacy Policy</a>
            </p>
            <p>
              <a href="#">Terms of Service</a>
            </p>
            <p>
              <a href="#">Cookies</a>
            </p>
          </div>
{/* Social */}
        <div>
          <h2 className="md:text-xl font-bold mb-2">Social</h2>
          <div className="flex gap-3 pt-2 social">
            <a href="https://www.facebook.com/elora.yasmin.21" target="_blank">
              <FaFacebook size={20} />
            </a>
            <a href="https://www.instagram.com/ajanta__elora/" target="_blank">
              <FaInstagram size={20} />
            </a>
            <a href="https://github.com/Elora21y" target="_blank">
              <BsGithub size={20} />
            </a>
            <a href="https://www.youtube.com/@elora256" target="_blank">
              <IoLogoYoutube size={20} />
            </a>
          </div>
          
          <p className="mt-3">
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
