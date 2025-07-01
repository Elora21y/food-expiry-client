import React from 'react';
import { motion } from "framer-motion";

const SectionTitle = ({title , description}) => {
    return (
        <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl lg:text-4xl xl:text-[42px] font-bold text-secondary-content">
        {title}
        </h2>
        <p className=" mt-2 max-w-2xl mx-auto text-base ">
          {description}
        </p>
      </motion.div>
    );
};

export default SectionTitle;