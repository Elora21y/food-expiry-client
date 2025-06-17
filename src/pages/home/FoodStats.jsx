import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FoodStats = () => {
  const [expiredCount, setExpiredCount] = useState(0);
  const [nearlyExpiryCount, setNearlyExpiryCount] = useState(0);
    const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce:1
  });

 
  useEffect(() => {
    // Expired foods
    axios.get("https://food-expiry-tracker-server-three.vercel.app/foods")
      .then(res => {
        const today = new Date().toISOString().slice(0, 10);
        const expired = res.data.filter(food => food.expire_date < today);
        setExpiredCount(expired.length);
      });

    // Nearly Expiry
   axios.get("https://food-expiry-tracker-server-three.vercel.app/foods")
  .then(res => {
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 5);
    const next5Days = futureDate.toISOString().slice(0, 10);

    const upcoming = res.data.filter(food =>
      food.expire_date >= todayStr && food.expire_date <= next5Days
    );
//     console.log("Today:", todayStr);
// console.log("Future (5 days later):", next5Days);

    
    setNearlyExpiryCount(upcoming.length);
  });

  }, []);

  return (
    <div  ref={ref}
    className="flex flex-col md:flex-row gap-6 text-center my-16 items-center justify-center">
      <motion.div 
        className="bg-base-200 p-6 rounded-xl shadow-lg border border-red-300 max-w-md min-w-72"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl text-secondary-content font-semibold mb-2">Expired Foods</h3>
        <p className="text-4xl font-bold text-error">
          {inView && <CountUp end={expiredCount} duration={5} />}
        </p>
      </motion.div>

      <motion.div 
        className="bg-base-200 p-6 rounded-xl shadow-lg border border-yellow-200 max-w-md min-w-72"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl text-secondary-content font-semibold mb-2">Nearly Expiry Foods</h3>
        <p className="text-4xl font-bold text-warning">
           {inView && <CountUp end={nearlyExpiryCount} duration={5} />}
        </p>
      </motion.div>
    </div>
  );
};

export default FoodStats;
