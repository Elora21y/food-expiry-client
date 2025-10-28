import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { HiClock, HiTag } from "react-icons/hi";
import { LuStore } from "react-icons/lu";
import { TbCurrencyTaka } from "react-icons/tb";
import { MdFoodBank } from "react-icons/md";
import { FaStore } from "react-icons/fa6";

const Card = ({ food }) => {
  const [hover, setHover] = useState(false);
  const {
    title,
    foodType,
    expire_date,
    quantity,
    unit,
    food_photo,
    _id,
    storage_location,
    purchase_price,
    is_opened,
    opened_date,
  } = food;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0.4, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.5 }}
      className="rounded-2xl font-semibold shadow-primary/20 hover:shadow-lg transition-all duration-500 border border-primary/30 hover:border-primary dark:hover:border-primary/60 p-3"
    >
      <Link
        to={`/food-details/${_id}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* <img
        src={food_photo}
        alt={title}
        className="h-48 w-full object-cover rounded-md mb-4"
      /> */}
        <motion.img
          src={food_photo}
          alt={title}
          className="h-52 w-full object-cover rounded-md mb-4"
          animate={{ scale: hover ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        <div className="p-2 space-y-4">
          <div className=" flex justify-between">
            <h3 className="text-xl lg:text-2xl font-semibold text-secondary-content ">
              {title}
            </h3>
            <div className="flex gap-1 justify-center items-center text-primary">
              <LuStore />
              <p> {storage_location}</p>
            </div>
          </div>
          {/* Expiry info box - Prominent */}
          <div
            className={`
              flex items-center justify-between gap-2 
              p-2.5 rounded-xl
              bg-gradient-to-r border border-primary/20
              transition-all duration-300
            `}
          >
            <div className="flex items-center gap-2">
              <HiClock className={` w-5 h-5`} />
              <div>
                <p className="text-xs opacity-70 font-medium">Expires</p>
                <p className={`text-sm font-bold  text-red-500`}>
                  {formatDate(expire_date)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 my-3 text-xs items-center justify-center">
            <span className="flex items-center gap-1 border border-green-500 text-green-500 px-2 py-1  rounded-full">

              <MdFoodBank />
              <span>{foodType}</span>
            </span>
            <span className="flex items-center gap-1 border border-yellow-600 text-yellow-600 px-2 py-1 rounded-full">
             QTY: <FaStore />
              <span>
                {quantity}
                {unit}
              </span>
            </span>
            <span className="flex items-center border border-green-500 text-green-500 px-2 py-1  rounded-full">
             Price: <TbCurrencyTaka className="" size={20} />
              <span>{purchase_price}</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
