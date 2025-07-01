import React from "react";
import { motion } from "framer-motion";

const workData = [
  {
    id: 1,
    title: "Track Expiry Dates",
    description:
      "Stay updated with countdowns and color-coded indicators based on freshness status.",
  },
  {
    id: 2,
    title: "Add Food Items",
    description:
      "Log your food with title, category, and expiration date to start monitoring.",
  },
  {
    id: 3,
    title: "Get Smart Alerts",
    description:
      "Receive timely alerts so you can consume or donate before your food goes bad.",
  },
];

const HowItWork = () => {
  return (
    <div className="py-16 md:px-24 lg:px-8 lg:py-20 text-accent-content bg-base-100 rounded-lg my-20">
      {/* Section Title */}
      <div className="text-center mb-5">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 roboto">
          How Fresh Alert Works
        </h2>
        <p className=" max-w-2xl mx-auto poppins">
          Keep your fridge organized, reduce food waste, and get notified before your items expire — all in a few easy steps.
        </p>
      </div>
      
      {/* Cards */}
      <div
        // initial={{ opacity: 0.1, y: 40 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.6 }}
        // viewport={{ once: true , amount : 0.7}}
        className="grid gap-8 row-gap-8 lg:grid-cols-3 px-3"
      >
        {/* card */}

        {workData.map((data) => (
          <motion.div
            initial={{ opacity: 0.4, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, amount: 0.8 }}
            key={data.id}
            className="text-center border border-orange-200 hover:border-primary shadow-xs  shadow-orange-300 hover:shadow-md rounded-xl p-5 hover:scale-103 duration-500 "
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4 text-4xl font-bold rounded-full bg-primary text-white mx-auto">
              {data.id}
            </div>
            <h6 className="mb-2 font-semibold text-2xl ">{data.title}</h6>
            <p className="max-w-md text-sm mx-auto">{data.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWork;
