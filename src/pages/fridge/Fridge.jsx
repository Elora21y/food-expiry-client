import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import FridgeCard from './FridgeCard';
import Search from '../../shared/Search';
import { IoIosArrowDown } from "react-icons/io";


const Fridge = () => {
    const data = useLoaderData()
      const [foods, setFoods] = useState(data);
    const [level, setLevel] = useState("");
    // console.log(foods)
     const filterLevel = (level) => {
    setLevel(level);
    if (level === "") {
      setFoods(data);
    } else if (level === "Dairy") {
      setFoods(data.filter((food) => food.foodType === level));
    } else if (level === "Meat") {
      setFoods(data.filter((food) => food.foodType === level));
    } else if (level === "Vegetables") {
      setFoods(data.filter((food) => food.foodType === level));
    } else if (level === "Snacks") {
      setFoods(data.filter((food) => food.foodType === level));
    }
    else if (level === "Fruits") {
      setFoods(data.filter((food) => food.foodType === level));
    }
  };
  
    return (
        <div className="text-accent-content text-sm">
            <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-secondary-content">
              My Fridge Inventory
          </h2>
        </div>
            <div className=" flex justify-end items-start">
                <div></div>
 {/* search */}
<Search setFoods={setFoods} data={data}/>
        
      {/* filter */}
      <div className="flex flex-col justify-center items-end mr-2 mb-10 text-accent-content">
        <div className="dropdown ">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 bg-primary text-white hover:text-primary hover:bg-white hover:border-primary "
          >
            Filter By{level && `: ${level}`} <IoIosArrowDown size={20} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm"
          >
            <li>
              <a onClick={() => filterLevel("")}>All</a>
            </li>
            <li>
              <a onClick={() => filterLevel("Dairy")}>Dairy</a>
            </li>
            <li>
              <a onClick={() => filterLevel("Meat")}>Meat</a>
            </li>
            <li>
              <a onClick={() => filterLevel("Vegetables")}>Vegetables</a>
            </li>
            <li>
              <a onClick={() => filterLevel("Snacks")}>Snacks</a>
            </li>
            <li>
              <a onClick={() => filterLevel("Fruits")}>Fruits</a>
            </li>
          </ul>
        </div>
      </div>
            </div>
{
  foods?.length !== 0 ?
  <div 
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {
              foods?.map(food => <FridgeCard key={food._id} food={food}/>)
            }
            </div>
            :
            <div className="bg-base-200 flex flex-col items-center justify-center p-6 md:p-10 rounded-xl gap-2 text-center mx-auto">
            <h2 className="text-2xl md:text-4xl font-semibold text-red-600">
              No Foods Founded
            </h2>
            <p>Please search another thing with food title or category</p>
          </div>
            }
        </div>
    );
};

export default Fridge;