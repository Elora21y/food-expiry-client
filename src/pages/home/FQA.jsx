import React from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  return (
    <div className="bg-base-100 px-3 md:px-4 lg:px-6 pt-8 pb-8  rounded-lg my-15  hover:shadow-primary/60 hover:shadow-lg transition-all duration-300 text-accent-content">
      <div className="text-center mb-5">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 roboto">
          Frequently Asked Questions
        </h2>
        <p className=" max-w-2xl mx-auto poppins">
          Find answers to the most common questions about how FreshAlert works, how you can manage your food items, and how the platform helps reduce food waste effectively.
        </p>
      </div>
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-10 items-center ">
        <motion.div className="space-y-2"
     initial={{ opacity: 0, x: -50 }}
     whileInView={{ opacity: 1, x: 0 }}
     transition={{ duration: 0.7 }}
     viewport={{ once: true }}>
            {/* 1 */}
          <div className="collapse collapse-arrow  border border-gray-200">
            <input type="radio" name="my-accordion-2 " defaultChecked />
            <div className="collapse-title font-bold roboto text-lg text-secondary-content">
                1. What is FreshAlert and how does it work?
            </div>
            <div className="collapse-content text-sm text-gray-400">
             FreshAlert is a food monitoring platform that helps users track food items close to their expiry date. It lets you view, share, and get alerts about items that are nearly expired to reduce waste.
            </div>
          </div>
            {/* 2 */}
          <div className="collapse collapse-arrow  border border-gray-200">
            <input type="radio" name="my-accordion-2 " defaultChecked />
            <div className="collapse-title font-bold roboto text-lg text-secondary-content">
              2.How are nearly expired foods determined?
            </div>
            <div className="collapse-content text-sm text-gray-400">
           FreshAlert checks the expiry date of each item and marks them as “nearly expired” if they’re within 5 days of expiry from today. This helps users take action before the food goes bad.
            </div>
          </div>
            {/* 3 */}
          <div className="collapse collapse-arrow  border border-gray-200">
            <input type="radio" name="my-accordion-2 " defaultChecked />
            <div className="collapse-title font-bold roboto text-lg text-secondary-content">
              3.  Can I donate or share my food items through this platform?
            </div>
            <div className="collapse-content text-sm text-gray-400">
             Yes! You can share your surplus food by adding it with details like quantity, type, and expiry date. Other users can view and use those items if needed.
            </div>
          </div>
            {/* 4 */}
          <div className="collapse collapse-arrow  border border-gray-200">
            <input type="radio" name="my-accordion-2 " defaultChecked />
            <div className="collapse-title font-bold roboto text-lg text-secondary-content">
               4. Is FreshAlert free to use?
            </div>
            <div className="collapse-content text-sm text-gray-400">
           Absolutely! FreshAlert is completely free for all users. Our goal is to reduce food waste by making food tracking and sharing easy and accessible.
            </div>
          </div>
            {/* 5 */}
          <div className="collapse collapse-arrow  border border-gray-200">
            <input type="radio" name="my-accordion-2 " defaultChecked />
            <div className="collapse-title font-bold roboto text-lg text-secondary-content">
              5. How can I keep track of my own food items?
            </div>
            <div className="collapse-content text-sm text-gray-400">
             Once you log in, you can add your food items along with their expiry dates. You’ll be able to see which items are close to expiry and manage your list from your dashboard.
            </div>
          </div>

         
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className=" max-w-[680px] w-full"
        >
        <img src='/fqa.svg' alt="FAQ" />
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
