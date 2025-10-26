import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const AddFood = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
    const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState(""); 
  //tag
  const handleAddTag = () =>{
    if(tagInput.trim() && !tags.includes(tagInput.trim())){
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }
  //remove
  const handleRemoveTag = (tagToRemove) =>{
      setTags(tags.filter((tag) => tag !== tagToRemove));
  }
  const handleAddFood =(e)=>{
     e.preventDefault();
    const form = e.target
    const formData = new FormData(form)
    const newFood = Object.fromEntries(formData.entries())

    newFood.user_email = user.email
    newFood.added_date = new Date().toISOString().slice(0,10)
    newFood.status = "active";
    // newFood.is_opened = formData.get("is_opened") === "on";
    newFood.is_opened = formData.get("is_opened") ? true : false;
    newFood.opened_date = newFood.is_opened ? new Date().toISOString().slice(0, 10) : null;
    newFood.waste_reason = null;
    newFood.tags = tags;

      newFood.purchase_price = parseFloat(newFood.purchase_price) || 0;
        const recipeSuggestions = {
      Dairy: ["Smoothie", "Cheese Sauce", "Yogurt Parfait"],
      Meat: ["Grilled Steak", "Chicken Curry", "Beef Stir Fry"],
      Vegetables: ["Vegetable Stir Fry", "Salad", "Soup"],
      Snacks: ["Snack Mix", "Trail Mix"],
      Fruits: ["Fruit Smoothie", "Fruit Salad", "Juice"]
    };
   newFood.recipe_suggestions = recipeSuggestions[newFood.foodType] || []

    // console.log(newFood)
    axios.post(`${import.meta.env.VITE_base_url}/foods` , newFood)
    .then(res => {
      // console.log(res.data)
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
    <div className="flex flex-col justify-center items-center my-10 mx-auto md:max-w-3xl">
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
            required
          />
          {/* url  */}
          <label className="label">Food Image URL </label>
          <input
            type="url"
            className="input w-full"
            placeholder="Food Image"
            name="food_photo"
            required
          />
          {/* Quantity  */}
          <label className="label">Food Quantity </label>
          <input
            type="number"
            className="input w-full"
             placeholder="e.g. 2"
            name="quantity"
            defaultValue={1}
            min={1}
            required
          />
          {/* unit */}
             <div>
              <label className="label">
                <span className="label-text font-semibold">Unit </span>
              </label>
              <select className="select w-full" name="unit" required>
                <option value="">Select Unit</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="liter">liter</option>
                <option value="ml">ml</option>
                <option value="pieces">pieces</option>
                <option value="packet">packet</option>
                <option value="bottle">bottle</option>
                <option value="can">can</option>
              </select>
            </div>
        </fieldset>

        {/*Food type selected */}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box  border p-4 min-w-72 sm:min-w-96 md:min-w-lg mx-auto">
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

        {/* Storage & Purchase Info */}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box border p-4 max-w-lg mx-auto mt-4">
          <legend className="fieldset-legend">Storage & Purchase Details</legend>

          {/* Storage Location */}
          <label className="label">
            <span className="label-text font-semibold">Storage Location *</span>
          </label>
          <select className="select w-full" name="storage_location" required defaultValue="">
            <option value="" disabled>Where to store?</option>
            <option value="Refrigerator">Refrigerator </option>
            <option value="Freezer">Freezer </option>
            <option value="Pantry">Pantry </option>
            <option value="Room Temperature">Room Temperature </option>
            <option value="Cabinet">Cabinet</option>
          </select>

          {/* Purchase Price */}
          <label className="label mt-3">
            <span className="label-text font-semibold">Purchase Price (৳)</span>
          </label>
          <input
            type="number"
            step="0.01"
            className="input w-full"
            placeholder=" e.g. 80"
            name="purchase_price"
            min="0"
          />

          {/* Is Opened Checkbox */}
          <div className="form-control mt-4">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                name="is_opened"
              />
              <span className="label-text font-semibold">
                Package already opened?
              </span>
            </label>
            <span className="text-xs text-base-content/60 ml-5">
              Check this if you've already opened the package
            </span>
          </div>
        </fieldset>

        {/* Expiry Date*/}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box  border p-4 max-w-lg mx-auto">
          <legend className="fieldset-legend ">Expired Date</legend>
          <label className="input border-gray-300 focus:border-2 focus:border-primary-300 focus:border-[#FB9E3A] focus:outline-none focus:ring-4 focus:ring-[#f7945220] placeholder:text-gray-300 placeholder:text-xs w-full">
            <span className="label ">Expiry Date</span>
            <input type="date" name="expire_date" required/>
          </label>
        </fieldset>

         {/* Tags */}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box border p-4 max-w-lg mx-auto mt-4">
          <legend className="fieldset-legend">Tags (Optional)</legend>
          <label className="label">
            <span className="label-text font-semibold">Add Tags :</span>
            <span className="label-text-alt">e.g., fresh, organic</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="input w-full"
              placeholder="Add a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddTag}
            >
              Add
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="badge badge-primary gap-2 cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag}
                  <span className="text-xs">×</span>
                </span>
              ))}
            </div>
          )}
        </fieldset>

        {/* Food Description */}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box max-w-lg mx-auto border p-4">
          <legend className="fieldset-legend">Food Description</legend>
          <textarea
            className="textarea w-full border-gray-300 focus:border-2 focus:border-primary-300 focus:border-[#FB9E3A] focus:outline-none focus:ring-4 focus:ring-[#f7945220] placeholder:text-gray-300 placeholder:text-xs"
            placeholder="Add any additional text about this food item..."
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
