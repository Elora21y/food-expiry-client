import React from 'react';
import { motion } from "framer-motion";

const HowItWork = () => {
  return (
    <div className="py-16 md:px-24 lg:px-8 lg:py-20 text-accent-content">
      {/* Section Title */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-14"
      >
        <h2 className="mb-4 roboto text-3xl font-bold text-primary sm:text-4xl">
          How FreshAlert Works
        </h2>
        <p className=" md:text-lg">
          
           Keep your fridge organized, reduce food waste, and get notified before your items expire — all in a few easy steps.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid gap-8 row-gap-8 lg:grid-cols-3 px-3"
      >

        {/* Step 1 */}
        <div className="text-center border border-yellow-200 hover:border-primary  shadow-yellow-300 rounded-xl p-5 hover:scale-105 duration-500">
          <div className="flex items-center justify-center w-16 h-16 mb-4 text-4xl font-bold rounded-full bg-primary text-secondary-content mx-auto">
            1
          </div>
          <h6 className="mb-2 font-semibold text-2xl ">
            Track Expiry Dates
          </h6>
          <p className="max-w-md text-sm mx-auto">
            Stay updated with countdowns and color-coded indicators based on freshness status.
          </p>
        </div>
        {/* Step 2 */}
        <div className="text-center border border-yellow-200 hover:border-primary  shadow-yellow-300 rounded-xl p-5 hover:scale-105 duration-500">
          <div className="flex items-center justify-center w-16 h-16 mb-4 text-4xl font-bold rounded-full bg-primary text-secondary-content mx-auto">
            2
          </div>
          <h6 className="mb-2 font-semibold text-2xl ">
            Add Food Items
          </h6>
          <p className="max-w-md text-sm mx-auto">
             Log your food with title, category, and expiration date to start monitoring.
          </p>
        </div>
        {/* Step 3 */}
        <div className="text-center border border-yellow-200 hover:border-primary  shadow-yellow-300 rounded-xl p-5 hover:scale-105 duration-500">
          <div className="flex items-center justify-center w-16 h-16 mb-4 text-4xl font-bold rounded-full bg-primary text-secondary-content mx-auto">
            3
          </div>
          <h6 className="mb-2 font-semibold text-2xl ">
            Get Smart Alerts
          </h6>
          <p className="max-w-md text-sm mx-auto">
             Receive timely alerts so you can consume or donate before your food goes bad.
          </p>
        </div>


      </motion.div>
    </div>
  );
};

export default HowItWork;
