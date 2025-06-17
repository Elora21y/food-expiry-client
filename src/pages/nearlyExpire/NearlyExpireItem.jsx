import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const NearlyExpireItem = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2100/foods/nearly-expiry")
      .then((res) => setFoods(res.data));
  }, []);
  console.log(foods);
  return (
    <div className="text-accent-content text-sm my-12 md:my-14 lg:my-16 xl:mt-20" >
       <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-content">
               Nearly Expiry Foods
          </h2>
          <p className=" mt-2 max-w-2xl mx-auto text-base ">
         These food items are approaching their expiry date within the next 5 days. Use them soon to reduce waste and make the most of your inventory.
          </p>
       </div>
      <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {foods.map((food) => (
          <Card key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default NearlyExpireItem;
