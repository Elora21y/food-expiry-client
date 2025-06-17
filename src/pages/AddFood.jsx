import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const AddFood = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const handleAddFood =(e)=>{
     e.preventDefault();
    const form = e.target
    const formData = new FormData(form)
    const newFood = Object.fromEntries(formData.entries())

    newFood.user_email = user.email
    newFood.added_date = new Date().toISOString().slice(0,10)

    // console.log(newFood)
    axios.post('http://localhost:2100/foods' , newFood)
    .then(res => {
      console.log(res.data)
      if(res.data.insertedId){
        toast.success('Added Your Food Successfully')
        navigate('/my-items')
      }
    })
    .catch(err =>{
    //   console.log(err)
      toast.error(err)
    })
  }
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <form onSubmit={handleAddFood} className="">
        <h2 className="mb-3 text-3xl font-bold text-center">
          Add Food
        </h2>
        <fieldset className="fieldset bg-base-200 border-primary rounded-box  border p-4 max-w-lg mx-auto">
          {/* title */}
          <label className="label">Food Title</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Food Title"
            name="title"
          />
          {/* url  */}
          <label className="label">Food Image URL </label>
          <input
            type="url"
            className="input w-full"
            placeholder="Food Image"
            name="food_photo"
          />
          {/* Quantity  */}
          <label className="label">Food Quantity </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Food Quantity"
            name="quantity"
          />
        </fieldset>

        {/*Food type selected */}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box  border p-4 min-w-72 sm:min-w-96 xl:min-w-md mx-auto">
          <legend className="fieldset-legend">Select Food Type</legend>
          <div className="filter ">
            <input
              className="btn filter-reset"
              type="radio"
              name="foodType"
              aria-label="All"
            />
            <input
              className="btn"
              type="radio"
              name="foodType"
              aria-label="Dairy"
              value="Dairy"
            />
            <input
              className="btn"
              type="radio"
              name="foodType"
              aria-label="Meat"
              value="Meat"
            />
            <input
              className="btn"
              type="radio"
              name="foodType"
              aria-label="Vegetables"
              value="Vegetables"
            />
            <input
              className="btn"
              type="radio"
              name="foodType"
              aria-label="Snacks"
              value="Snacks"
            />
            <input
              className="btn"
              type="radio"
              name="foodType"
              aria-label="Fruits"
              value="Fruits"
            />
          </div>
        </fieldset>

        {/* Expiry Date*/}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box  border p-4 max-w-lg mx-auto">
          <legend className="fieldset-legend ">Expired Date</legend>
          <label className="input border-gray-300 focus:border-2 focus:border-primary-300 focus:border-[#FB9E3A] focus:outline-none focus:ring-4 focus:ring-[#f7945220] placeholder:text-gray-300 placeholder:text-xs w-full">
            <span className="label ">Expiry Date</span>
            <input type="date" name="expire_date" />
          </label>
        </fieldset>

        {/* Food Description */}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box max-w-lg mx-auto border p-4">
          <legend className="fieldset-legend">Food Description</legend>
          <textarea
            className="textarea w-full border-gray-300 focus:border-2 focus:border-primary-300 focus:border-[#FB9E3A] focus:outline-none focus:ring-4 focus:ring-[#f7945220] placeholder:text-gray-300 placeholder:text-xs"
            placeholder="Food Description"
            name="description"
          ></textarea>
        </fieldset>

        {/* button */}
        <button type="submit" className="btn hover:text-white hover:bg-primary text-primary border border-primary btn-soft btn-block mt-4 bg-transparent">
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
