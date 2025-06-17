import React from 'react';
import { useLoaderData } from 'react-router';
import FridgeCard from './FridgeCard';

const Fridge = () => {
    const foods = useLoaderData()
    // console.log(foods)
    return (
        <div className="text-accent-content text-sm">
            <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-secondary-content">
              My Fridge Inventory
          </h2>
          <p className=" mt-2 max-w-2xl mx-auto text-base ">
         Browse through all your added food items at a glance. Keep track of quantities, categories, and expiry statuses so you never let food go to waste.
          </p>
        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {
                foods.map(food => <FridgeCard key={food._id} food={food}/>)
            }
            </div>
        </div>
    );
};

export default Fridge;