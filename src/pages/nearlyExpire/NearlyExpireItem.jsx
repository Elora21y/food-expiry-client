import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

import NoFoods from "../../shared/NoFoods";
import SectionTitle from "../../shared/SectionTitle";

const NearlyExpireItem = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://food-expiry-tracker-server-three.vercel.app/foods/nearly-expiry"
      )
      .then((res) => setFoods(res.data));
  }, []);
  // console.log(foods);
  return (
    <div className="text-accent-content text-sm my-12 md:my-16 lg:my-22">

      <SectionTitle title={'Nearly Expiry Foods'} description={`These food items are approaching their expiry date within the next 5
          days. Use them soon to reduce waste and make the most of your
          inventory.`}/>
      {foods.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center"
          // className={`${
          //   foods.length % 3 === 1 || foods.length % 6 === 1 
          //   ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          //     : "flex justify-center items-center"
          // }  gap-6 `}
        >
          {foods.map((food) => (
            <Card key={food._id} food={food} />
          ))}
        </div>
      ) : (
        <NoFoods title={'No Food Nearly Expire'} description={'Please go to the Add Food Page and added a food for alert'} path={'/add-food'}/>
      )}
    </div>
  );
};

export default NearlyExpireItem;
