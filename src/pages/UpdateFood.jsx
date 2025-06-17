import React from 'react';
import toast from 'react-hot-toast';

const UpdateFood = ({food,update}) => {
    const {title,foodType,expire_date,quantity,food_photo,description , _id} = food

    const handleUpdateFood =(e) =>{
        e.preventDefault()
        const form = e.target
    const formData = new FormData(form)
    const updateFood = Object.fromEntries(formData.entries())
    // console.log(updateFood)
    fetch(`http://localhost:2100/foods/update/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateFood),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount) {
            document.getElementById(`my_modal_${_id}`).close();
          toast.success("Updated Food successfully");
        //   setFood(prev => ({
        //     ...prev, ...updateFood
        //   }))
          update?.({...food,...updateFood})
        }
        else{
          toast.error('Update a field')
        }
      });
    }
    return (
         <div className="flex flex-col justify-center items-center ">
      <form onSubmit={handleUpdateFood} className="">
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
            defaultValue={title}
          />
          {/* url  */}
          <label className="label">Food Image URL </label>
          <input
            type="url"
            className="input w-full"
            placeholder="Food Image"
            name="food_photo"
            defaultValue={food_photo}
          />
          {/* Quantity  */}
          <label className="label">Food Quantity </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Food Quantity"
            name="quantity"
            defaultValue={quantity}
          />
        </fieldset>
        {/*Food type selected */}
        <select
            className="w-full select select-bordered  min-w-72 sm:min-w-96 xl:min-w-md mx-auto mt-4 border-primary"
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

        {/* Expiry Date*/}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box  border p-4 max-w-lg mx-auto">
          <legend className="fieldset-legend ">Expired Date</legend>
          <label className="input border-gray-300 focus:border-2 focus:border-primary-300 focus:border-[#FB9E3A] focus:outline-none focus:ring-4 focus:ring-[#f7945220] placeholder:text-gray-300 placeholder:text-xs w-full">
            <span className="label ">Expiry Date</span>
            <input type="date" name="expire_date" defaultValue={expire_date}/>
          </label>
        </fieldset>

        {/* Food Description */}
        <fieldset className="fieldset bg-base-200 border-primary rounded-box max-w-lg mx-auto border p-4">
          <legend className="fieldset-legend">Food Description</legend>
          <textarea
            className="textarea w-full border-gray-300 focus:border-2 focus:border-primary-300 focus:border-[#FB9E3A] focus:outline-none focus:ring-4 focus:ring-[#f7945220] placeholder:text-gray-300 placeholder:text-xs"
            placeholder="Food Description"
            name="description"
            defaultValue={description}
          ></textarea>
        </fieldset>

        {/* button */}
        <button type="submit" className="btn hover:text-white hover:bg-primary text-primary border border-primary btn-soft btn-block mt-4 bg-transparent">
          Update Food
        </button>
      </form>
    </div>
    );
};

export default UpdateFood;