import React, { use, useState } from "react";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import UpdateFood from "../pages/UpdateFood";
import NoFoods from "./NoFoods";

const MyItemList = ({ AddPromiseFood }) => {
  const data = use(AddPromiseFood);
  const [foods, setFoods] = useState(data);
  // console.log(foods)

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_base_url}/foods/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Food has been deleted.",
                icon: "success",
              });
              const remainingFoods = foods.filter((food) => food._id !== id);
              setFoods(remainingFoods);
            }
          });
      }
    });
  };
  const handleUpdate = (updatedFood) => {
    const updatedList = foods.map((food) =>
      food._id === updatedFood._id ? { ...food, ...updatedFood } : food
    );
    setFoods(updatedList);
  };

  return (
    <div>
      <div className="overflow-x-auto overflow-y-hidden text-accent-content text-xs lg:text-base">
        <h2 className="text-3xl lg:text-4xl font-bold text-secondary-content text-center mb-5 lg:mb-7">
          My Food List
        </h2>
        {foods.length !== 0 ? (
          <table className="table table-zebra ">
            {/* head */}
            <thead className=" bg-primary/30 text-orange-400">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Expire Date</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food, index) => (
                <tr key={food._id}>
                  <th>
                    <div className="flex items-center gap-3">
                      {index + 1}
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={food.food_photo} alt="Food" />
                        </div>
                      </div>
                    </div>
                  </th>
                  <td>
                    <div>
                      <div className="font-bold">{food.title}</div>
                    </div>
                  </td>
                  <td>{food.foodType}</td>
                  <td>{food.expire_date}</td>
                  <td>{food.quantity}</td>
                  <th>
                    <div className="flex gap-4 items-center ">
                      {/* edit button*/}
                      <button
                        className="text-secondary btn btn-xs border-primary/30 hover:bg-primary hover:text-white"
                        onClick={() =>
                          document
                            .getElementById(`my_modal_${food._id}`)
                            .showModal()
                        }
                      >
                        <RiEdit2Fill size={20} />
                      </button>
                      <dialog id={`my_modal_${food._id}`} className="modal">
                        <div className="modal-box">
                          <UpdateFood food={food} update={handleUpdate} />
                          <form method="dialog" className="modal-backdrop">
                            <button className="btn btn-soft btn-error mt-3">
                              close
                            </button>
                          </form>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                      {/* <button className="text-secondary btn btn-xs border-primary/30 hover:bg-primary hover:text-white">
                        <RiEdit2Fill size={20} />
                      </button> */}

                      {/* delete */}
                      <button
                        onClick={() => handleDelete(food._id)}
                        className="text-red-600 btn btn-xs border-primary/30 hover:bg-red-500 hover:text-white "
                      >
                        <RiDeleteBin6Line size={15} />
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoFoods title={'No Foods Added'} description={'Please go back the Add Food page and added a food for list'}/>
        )}
      </div>
    </div>
  );
};

export default MyItemList;
