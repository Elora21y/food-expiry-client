import React from "react";
import { motion } from "framer-motion";
import vegetables from "../../public/about/vegetables.jpg";
import protein from "../../public/about/protein.jpg";
import SectionTitle from "../shared/SectionTitle";
import { BiSolidLeaf } from "react-icons/bi";
import { RiTimerLine } from "react-icons/ri";
import { LuLockKeyholeOpen } from "react-icons/lu";
import { GrNotes } from "react-icons/gr";

const aboutData = [
  {
    title: "Why FreshAlert?",
    description:
      "FreshAlert is designed to reduce food waste by helping you track expiry dates in your fridge. Save money, stay healthy, and help the environment.",
    icon: <BiSolidLeaf />,
  },
  {
    title: "Smart Expiry Tracker",
    description:
      "Automatically track expiry dates with visual countdowns and alerts so that you never miss a date again.",
    icon: <RiTimerLine />
  },
  {
    title: "Personalized Notes",
    description:
      "Add custom notes to any food item. Whether it’s a recipe idea or storage instruction, keep everything organized in one place.",
    icon: <GrNotes />
  },
  {
    title: "Secure & User-Friendly",
    description:
      "Your data is securely stored and easily accessible. With a clean interface and fast performance, managing your fridge is now effortless.",
    icon: <LuLockKeyholeOpen />
  },
];

const About = () => {
  return (
    <div className=" max-w-6xl mx-auto overflow-hidden">
      <SectionTitle title={"About Fresh Alert"} />
      <div className="flex flex-col justify-between gap-10 lg:flex-row items-center my-16">
        <motion.div 
        initial={{ opacity: 0.4, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        className="flex-1">
          <img
            src={vegetables}
            className="w-72 md:max-w-md lg:w-md rounded-t-[50px] rounded-br-[50px] shadow-2xl border-s-6 border-b-8 border-primary sm:-ml-12 lg:ml-0"
            alt=""
          />

          <img
            src={protein}
            className="w-56 md:max-w-80 lg:w-sm rounded-t-[45px] rounded-br-[50px] shadow-2xl border-s-6 border-b-8 border-primary ml-12 sm:ml-15 md:ml-18 -mt-10 lg:ml-20 xl:-mt-18 xl:ml-22"
            alt=""
          />
        </motion.div>
        <motion.div
            initial={{ opacity: 0.6, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        className="flex flex-col flex-1 gap-5 ">
          {aboutData.map((item, index) => (
            <div
              key={index}
              className="p-5 border border-primary/50  rounded-xl shadow bg-base-100 hover:shadow-primary/50 hover:shadow-md duration-500 transition-all"
            >
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                <span>{item.icon}</span> {item.title}
              </h3>
              <p className="mt-2 text-accent-content text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
