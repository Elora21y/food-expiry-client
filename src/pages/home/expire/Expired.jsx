import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import Card from './Card';

const Expired = () => {
    const data = useLoaderData()
    const [foods , setFoods] = useState(data)
    useEffect(()=>{
      setFoods(data.filter(food =>  food.expire_date < new Date().toISOString().slice(0,10)))
    },[data])
    return (
         <>
         {
          foods.length !== 0 ?
          <div className="text-accent-content text-sm my-12 md:my-14 lg:my-16 xl:mt-20" >
       <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-content">
              Expired Foods
          </h2>
          <p className=" mt-2 max-w-2xl mx-auto text-base ">
         These food items are approaching their expiry date within the next 5 days. Use them soon to reduce waste and make the most of your inventory.
          </p>
       </div>
      <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <Card key={food._id} food={food} />
        ))}
      </div>
    </div>
    :
    <></>
         }
         </>
    );
};

export default Expired;