import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import Card from "./Card";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "../../../shared/SectionTitle";
import NoFoods from "../../../shared/NoFoods";
import { FaArrowRightLong, FaCircleArrowLeft } from "react-icons/fa6";

const Expired = ({ title, slice, showButton, back }) => {
  const data = useLoaderData();
  const [foods, setFoods] = useState(data);
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // data.filter(food =>   console.log(food.expire_date , food.expire_date< new Date().toISOString().slice(0,10)))|
    // slice(0, slice ? slice : data.length)
    let filtered = data.filter(
      (food) => food.expire_date < new Date().toISOString().slice(0, 10)
    );

    if (slice) {
      filtered = filtered.slice(0, slice);
    }

    setFoods(filtered);
  }, [data, slice]);
  // console.log(foods, data);
  return (
    <>
      <div className="text-accent-content text-sm py-15  my-12 md:my-14 lg:my-18">
        {back && (
          <button
            onClick={() => navigate(-1)}
            className="text-primary mb-5 btn"
          >
            <FaCircleArrowLeft size={25} />
            Back
          </button>
        )}
        {title && (
          <SectionTitle
            title={"Expired Foods"}
            description={` These food items are approaching their expiry date within the next 5 days. Use them soon to reduce waste and make the most of your inventory.`}
          />
        )}
        {foods.length > 0 ? (
          <div
            className={`${
              showButton && `flex flex-col items-center justify-center`
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((food) => (
                <Card key={food._id} food={food} />
              ))}
            </div>
            {/* see more button */}
            {showButton && (
              <motion.div
                onHoverStart={() => setIsHover(true)}
                onHoverEnd={() => setIsHover(false)}
                className="relative inline-block mt-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link
                  to="/all-expired-foods"
                  className="btn bg-primary text-white border-none relative overflow-hidden"
                >
                  {/* Whole button will scale up on hover */}
                  <motion.div
                    animate={{ scale: isHover ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="relative flex items-center justify-center px-8 py-4"
                  >
                    {/* Icon animation */}
                    <motion.span
                      initial={{ x: 0 }}
                      animate={{ x: isHover ? -60 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="block text-lg"
                    >
                      <FaArrowRightLong />
                    </motion.span>

                    {/* Text animation */}
                    <AnimatePresence>
                      {isHover && (
                        <motion.span
                          key="hoverText"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30 }}
                          transition={{ duration: 0.3 }}
                          className="absolute  text-sm font-semibold"
                        >
                          See More
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </motion.div>
            )}

            {/* {
              showButton &&
              <Link
              onMouseEnter={() => setIsHover(true)}
              onMouseOut={() => setIsHover(false)}
              className="btn"
             to='/all-expired-foods'
            >
             
             {isHover ? ` See More` : <FaArrowRightLong />}
            </Link>
            } */}
          </div>
        ) : (
          <NoFoods
            title={"No Expire Food"}
            description={
              "Please go to the Add Food Page and added a food for  make sure expire that expire"
            }
            path={"/add-food"}
          />
        )}
      </div>
    </>
  );
};

export default Expired;
