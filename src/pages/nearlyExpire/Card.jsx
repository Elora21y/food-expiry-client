import React, { useState } from "react";
import { FcExpired } from "react-icons/fc";
import { HiArrowSmRight, HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router";

const Card = ({ food }) => {
    const [isHover , setHover] = useState(false)
  const {
    title,
    foodType,
    expire_date,
    quantity,
    food_photo,
    _id,
  } = food;
  return (
    <div className="rounded-2xl  bg-base-100 shadow-primary/40 hover:shadow-lg transition-all duration-500 hover:scale-102 border border-primary/40 hover:border-primary p-4 font-semibold">
      <img
        src={food_photo}
        alt={title}
        className="h-48 w-full object-cover rounded-md mb-4"
      />

      <div>
        <h3 className="text-lg lg:text-2xl font-semibold text-secondary-content ">
          {title}
        </h3>

        <p className="flex gap-1 items-center mb-2 text-red-500 font-bold">
          <FcExpired size={17} />{" "}
          <span className="text-xs ">{expire_date}</span>
        </p>

        <div className="flex flex-wrap gap-3 mb-3 text-xs">
          <span className="border border-yellow-500 text-yellow-500 px-2 py-1 rounded-full">
            Quantity: {quantity}
          </span>
          <span className="border border-green-400 text-green-400 px-2 py-1  rounded-full">
            Category: {foodType}
          </span>
        </div>
      </div>

      <Link
        to={`/food-details/${_id}`}
        className="text-primary font-medium flex  items-center justify-end hover:underline"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        View Details{" "}
        {isHover ? (
          <HiOutlineArrowNarrowRight size={20} />
        ) : (
          <HiArrowSmRight size={20} />
        )}
      </Link>
    </div>
  );
};

export default Card;
