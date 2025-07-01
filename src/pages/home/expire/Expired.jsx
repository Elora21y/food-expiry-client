import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import Card from "./Card";

import SectionTitle from "../../../shared/SectionTitle";
import NoFoods from "../../../shared/NoFoods";

const Expired = () => {
  const data = useLoaderData();
  const [foods, setFoods] = useState(data);
  useEffect(() => {
    // data.filter(food =>   console.log(food.expire_date , food.expire_date< new Date().toISOString().slice(0,10)))
    setFoods(
      data.filter(
        (food) => food.expire_date < new Date().toISOString().slice(0, 10)
      )
    );
  }, [data]);
  return (
    <>
        <div className="text-accent-content text-sm py-15  my-12 md:my-14 lg:my-18">
          <SectionTitle
            title={"Expired Foods"}
            description={` These food items are approaching their expiry date within the next 5 days. Use them soon to reduce waste and make the most of your inventory.`}
            />
            {foods.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {foods.map((food) => (
              <Card key={food._id} food={food} />
            ))}
          </div>
      ) : (
        <NoFoods title={'No Expire Food'} description={'Please go to the Add Food Page and added a food for  make sure expire that expire'} path={'/add-food'}/>
      )}
        </div>
    </>
  );
};

export default Expired;
