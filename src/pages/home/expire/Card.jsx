import React from 'react';
import { motion } from "framer-motion";

const Card = ({food}) => {
     const {
    title,
    foodType,
    expire_date,
    quantity,
    food_photo,
    // description,
    _id,
  } = food;
    return (
        <motion.div 
        initial={{ opacity: 0.4, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, amount: 0.5 }}
        className="rounded-2xl font-semibold shadow-primary/20 hover:shadow-lg transition-all duration-500 hover:scale-102 border border-primary/30 hover:border-primary p-4 bg-primary/15">
      <img
        src={food_photo}
        alt={title}
        className="h-48 w-full object-cover rounded-md mb-4"
      />
     
        <div>
          <h3 className="text-xl lg:text-2xl font-semibold text-secondary-content ">
            {title}
            
             <div className="badge text-xs ml-2 badge-error text-white bg-red-500 border-0">
            <p> Expired </p>
            </div>
          
          </h3>

          <div className="flex flex-wrap gap-3 my-3 text-xs">
          <span className="border border-yellow-600 text-yellow-600 px-2 py-1 rounded-full">
            Quantity: {quantity}
          </span>
          <span className="border border-green-500 text-green-500 px-2 py-1  rounded-full">
            Category: {foodType}
          </span>
          <span className="border border-red-500 text-red-500 px-2 py-1  rounded-full">
            Expire Date: {expire_date}
          </span>
        </div>
        </div>
    </motion.div>
    );
};

export default Card;