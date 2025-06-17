import React, { useState } from "react";
import { HiArrowSmRight, HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router";
import { FcExpired } from "react-icons/fc";

const FridgeCard = ({ food }) => {
    const [isHover , setHover] = useState(false)
  console.log(food);
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
    <div className="rounded-2xl shadow-primary/40 hover:shadow-lg transition-all duration-500 hover:scale-102 border border-primary/40 hover:border-primary p-4 bg-base-100">
      <img
        src={food_photo}
        alt={title}
        className="h-48 w-full object-cover rounded-md mb-4"
      />
      {/* <div className="flex justify-between items-start gap-1"> */}
        <div>
          <h3 className="text-xl lg:text-2xl font-semibold text-secondary-content ">
            {title}
            {
            expire_date < new Date().toISOString().slice(0,10) &&
             <div className="badge text-xs ml-2 badge-error text-white bg-red-500 border-0">
            <p> Expired </p>
            </div>
          }
          </h3>
          
          <p className="flex gap-1 items-center mb-2 text-red-500"><FcExpired size={17}/> <span className="font-medium text-xs ">{expire_date}</span></p>

          <div className="flex flex-wrap gap-3 mb-3 text-xs">
          <span className="border border-yellow-500 text-yellow-500 px-2 py-1 rounded-full">
            Quantity: {quantity}
          </span>
          <span className="border border-green-400 text-green-400 px-2 py-1  rounded-full">
            Category: {foodType}
          </span>
        </div>
        </div>
      {/* </div> */}

      <Link
        to={`/food-details/${_id}`}
        className="text-primary font-medium flex  items-center justify-end hover:underline"
        onMouseEnter={() =>setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        View Details {isHover ? <HiOutlineArrowNarrowRight size={20}/>: <HiArrowSmRight size={20}/>}
      </Link>
    </div>
  );
};

export default FridgeCard;
