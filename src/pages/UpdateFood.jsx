import React, { useState } from 'react';
import toast from 'react-hot-toast';

const UpdateFood = ({ food, update }) => {
  const {
    title,
    foodType,
    expire_date,
    quantity,
    unit,
    food_photo,
    description,
    storage_location,
    purchase_price,
    is_opened,
    opened_date,
    status,
    waste_reason,
    tags: initialTags,
    _id
  } = food;

  const [tags, setTags] = useState(initialTags || []);
  const [tagInput, setTagInput] = useState("");
  const [isOpened, setIsOpened] = useState(is_opened || false);
  const [currentStatus, setCurrentStatus] = useState(status || "active");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleUpdateFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updateFood = Object.fromEntries(formData.entries());

    // Handle checkbox for is_opened
    updateFood.is_opened = formData.get("is_opened") ? true : false;
    
    // Set opened_date based on is_opened status
    if (updateFood.is_opened && !opened_date) {
      updateFood.opened_date = new Date().toISOString().slice(0, 10);
    } else if (!updateFood.is_opened) {
      updateFood.opened_date = null;
    } else {
      updateFood.opened_date = opened_date; // Keep existing date
    }

    // Convert price to number
    updateFood.purchase_price = parseFloat(updateFood.purchase_price) || 0;

    // Add tags
    updateFood.tags = tags;

    // Update recipe suggestions based on food type
    const recipeSuggestions = {
      Dairy: ["Smoothie", "Cheese Sauce", "Yogurt Parfait"],
      Meat: ["Grilled Steak", "Chicken Curry", "Beef Stir Fry"],
      Vegetables: ["Vegetable Stir Fry", "Salad", "Soup"],
      Snacks: ["Snack Mix", "Trail Mix"],
      Fruits: ["Fruit Smoothie", "Fruit Salad", "Juice"]
    };
    updateFood.recipe_suggestions = recipeSuggestions[updateFood.foodType] || [];

    // If status changed to wasted, set wasted_date
    if (updateFood.status === "wasted" && status !== "wasted") {
      updateFood.wasted_date = new Date().toISOString().slice(0, 10);
    }

    // If status changed to consumed, set consumed_date
    if (updateFood.status === "consumed" && status !== "consumed") {
      updateFood.consumed_date = new Date().toISOString().slice(0, 10);
    }

    fetch(`${import.meta.env.VITE_base_url}/foods/update/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateFood),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          document.getElementById(`my_modal_${_id}`).close();
          toast.success("Updated Food successfully! ");
          update?.({ ...food, ...updateFood });
        } else {
          toast.error("No changes detected. Update at least one field!");
        }
      })
      .catch((err) => {
        toast.error("Failed to update. Please try again!");
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleUpdateFood} className="w-full">
        <h2 className="mb-3 text-3xl font-bold text-center">Update Food</h2>

        {/* Basic Information */}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box border p-4 max-w-lg mx-auto">
          <legend className="fieldset-legend">Basic Information</legend>

          {/* Title */}
          <label className="label">
            <span className="label-text font-semibold">Food Title</span>
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Food Title"
            name="title"
            defaultValue={title}
          />

          {/* Image URL */}
          <label className="label mt-3">
            <span className="label-text font-semibold">Food Image URL</span>
          </label>
          <input
            type="url"
            className="input w-full"
            placeholder="Food Image"
            name="food_photo"
            defaultValue={food_photo}
          />

          {/* Quantity & Unit */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Quantity</span>
              </label>
              <input
                type="number"
                className="input w-full"
                placeholder="2"
                name="quantity"
                defaultValue={quantity}
                min="0"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Unit</span>
              </label>
              <select 
                className="select w-full" 
                name="unit" 
                defaultValue={unit || ""}
              >
                <option value="">Select Unit</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="dozen">dozen</option>
                <option value="liter">liter</option>
                <option value="ml">ml</option>
                <option value="pieces">pieces</option>
                <option value="packet">packet</option>
                <option value="bottle">bottle</option>
                <option value="can">can</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Food Type */}
        <select
          className="w-full select select-bordered min-w-72 sm:min-w-96 xl:min-w-md mx-auto mt-4 border-primary"
          name="foodType"
          defaultValue={foodType}
        >
          <option disabled value="">
            Select Food Type
          </option>
          <option>Dairy</option>
          <option>Meat</option>
          <option>Vegetables</option>
          <option>Snacks</option>
          <option>Fruits</option>
        </select>

        {/* Storage & Purchase Info */}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box border p-4 max-w-lg mx-auto mt-4">
          <legend className="fieldset-legend">Storage & Purchase Details</legend>

          {/* Storage Location */}
          <label className="label">
            <span className="label-text font-semibold">Storage Location</span>
          </label>
          <select 
            className="select w-full" 
            name="storage_location" 
            defaultValue={storage_location || ""}
          >
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
            placeholder="80"
            name="purchase_price"
            defaultValue={purchase_price || 0}
            min="0"
          />

          {/* Is Opened Checkbox */}
          <div className="form-control mt-4">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                name="is_opened"
                defaultChecked={is_opened}
                onChange={(e) => setIsOpened(e.target.checked)}
              />
              <span className="label-text font-semibold">
                Package opened?
              </span>
            </label>
            {isOpened && opened_date && (
              <span className="text-xs text-base-content/60 ml-9 mt-1">
                Opened on: {opened_date}
              </span>
            )}
          </div>
        </fieldset>

        {/* Status Management */}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box border p-4 max-w-lg mx-auto mt-4">
          <legend className="fieldset-legend">Status Management</legend>

          {/* Current Status */}
          <label className="label">
            <span className="label-text font-semibold">Current Status</span>
          </label>
          <select
            className="select w-full"
            name="status"
            defaultValue={status || "active"}
            onChange={(e) => setCurrentStatus(e.target.value)}
          >
            <option value="active">Active (In Stock)</option>
            <option value="consumed"> Consumed (Used Up)</option>
            <option value="expired"> Expired</option>
            <option value="wasted"> Wasted (Thrown Away)</option>
          </select>

          {/* Waste Reason - Only show if status is wasted */}
          {currentStatus === "wasted" && (
            <div className="mt-3">
              <label className="label">
                <span className="label-text font-semibold">Waste Reason</span>
              </label>
              <select
                className="select w-full"
                name="waste_reason"
                defaultValue={waste_reason || ""}
              >
                <option value="">Select reason</option>
                <option value="expired">Expired before use</option>
                <option value="spoiled">Got spoiled/rotten</option>
                <option value="not_used">Forgot to use</option>
                <option value="taste_bad">Didn't like the taste</option>
                <option value="overcooked">Overcooked/burnt</option>
                <option value="other">Other reason</option>
              </select>
              <div className="alert alert-warning mt-2 text-xs">
                <span> This helps track waste patterns and save money!</span>
              </div>
            </div>
          )}
        </fieldset>

        {/* Expiry Date */}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box border p-4 max-w-lg mx-auto mt-4">
          <legend className="fieldset-legend">Expiry Date</legend>
          <label className="input border-gray-300 focus:border-2 focus:border-primary-300 focus:border-[#FB9E3A] focus:outline-none focus:ring-4 focus:ring-[#f7945220] placeholder:text-gray-300 placeholder:text-xs w-full">
            <span className="label">Expiry Date</span>
            <input type="date" name="expire_date" defaultValue={expire_date} />
          </label>
        </fieldset>

        {/* Tags */}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box border p-4 max-w-lg mx-auto mt-4">
          <legend className="fieldset-legend">Tags</legend>
          <label className="label">
            <span className="label-text font-semibold">Manage Tags</span>
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
              className="btn btn-primary btn-sm"
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
                  className="badge badge-primary gap-2 cursor-pointer hover:badge-error transition-colors"
                  onClick={() => handleRemoveTag(tag)}
                  title="Click to remove"
                >
                  {tag}
                  <span className="text-xs font-bold">×</span>
                </span>
              ))}
            </div>
          )}
        </fieldset>

        {/* Food Description */}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box max-w-lg mx-auto border p-4 mt-4">
          <legend className="fieldset-legend">Food Description</legend>
          <textarea
            className="textarea w-full border-gray-300 focus:border-2 focus:border-primary-300 focus:border-[#FB9E3A] focus:outline-none focus:ring-4 focus:ring-[#f7945220] placeholder:text-gray-300 placeholder:text-xs"
            placeholder="Food Description"
            name="description"
            defaultValue={description}
            rows="4"
          ></textarea>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn hover:text-white hover:bg-primary text-primary border border-primary btn-soft btn-block mt-4 bg-transparent font-semibold"
        >
          Update Food 
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;