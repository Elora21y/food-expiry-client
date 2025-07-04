import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { SlNotebook } from "react-icons/sl";
import { MdDateRange, MdFoodBank } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import CountDown from "../shared/CountDown";
import { motion } from "framer-motion";

const FoodDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    title,
    foodType,
    expire_date,
    added_date,
    quantity,
    food_photo,
    description,
    user_email,
    text: initialText,
    postedDate: initialPostedDate,
    _id,
  } = useLoaderData();
  const [note, setNote] = useState(initialText || "");
  const [noteDate, setNoteDate] = useState(initialPostedDate || "");
  const [isNote , setIsNote] = useState(false)

  const handleAddNote = (e, id) => {
    e.preventDefault();
    const text = e.target.note.value.trim();
    const postedDate = new Date().toISOString().split("T")[0];
    const note = { text, postedDate };
    if (!text) return toast.error("First add something ");
    // console.log(note);
    fetch(`https://food-expiry-tracker-server-three.vercel.app/foods/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.modifiedCount) {
          toast.success("Note Added");
          setNote(text);
          setNoteDate(postedDate);
          e.target.reset();
        } else {
          toast.error("something wrong, try later");
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto px-3 md:px-5 font-semibold text-accent-content "
    >
      <span onClick={() => navigate(-1)}>
        <FaCircleArrowLeft size={25} className="text-primary mb-5" />
      </span>

      <div className=" space-y-5 bg-primary/10 p-5 md:p-8 py-8 rounded-xl shadow-md shadow-primary/30 hover:shadow-lg duration-500 transition-all">
        <img
          src={food_photo}
          alt={title}
          className="max-h-36 md:max-h-52 lg:max-h-64 xl:max-h-68 w-full object-cover rounded-lg"
        />
        <div className="text-sm space-y-1">
          <div className="flex justify-between items-center">
            {/* food Title */}
            <h3 className="text-2xl md:text-3xl font-semibold text-secondary-content">
              {title}
            </h3>

            {new Date(expire_date + "T23:59:59").getTime() >  new Date().getTime() ? (
              <CountDown expireDate={expire_date} />
            ) : (
              <div className="badge text-xs ml-2 badge-error text-white bg-red-500 border-0">
                <p> Expired </p>
              </div>
            )}
          </div>

          <div className=" flex gap-x-5 gap-y-1 flex-wrap">
            <p className="flex items-center gap-1">
              <MdFoodBank className="text-primary" />
              <span>{foodType}</span>
            </p>

            <p className="flex items-center gap-1">
              <FaStore className="text-primary" />
              <span>{quantity}</span>
            </p>
            {/* add */}
            <p className="flex items-center gap-1">
              <MdDateRange className="text-primary" />
              <span>{added_date}</span>
            </p>
          </div>

          {/* food Description */}
          <p className="first-letter:text-lg">{description}</p>
        </div>
        {note && (
          <div className="mt-5 space-y-2">
            <h4 className="text-primary text-base mb-2 flex items-center gap-1">
              <SlNotebook size={20} />
              All Notes :
            </h4>
            <div className="border border-primary/20 p-2 rounded bg-primary/5">
              <p className="text-sm">{note}</p>
              <p className="text-xs text-gray-500 text-right">
                Posted on {noteDate}
              </p>
            </div>
          </div>
        )}
        {/* add note */}
        <h4 className="text-base  mb-3 flex items-center gap-1 text-primary">
          <SlNotebook size={20} />
          Add Note :
        </h4>

        <form onSubmit={(e) => handleAddNote(e, _id)} >
          <textarea
            className="textarea w-full border-gray-300 focus:border-2 focus:border-primary-300 focus:border-[#FB9E3A] focus:outline-none focus:ring-4 focus:ring-[#f7945220] placeholder:text-gray-300 placeholder:text-xs bg-transparent"
            placeholder="Write note..."
            name="note"
            onChange={() => setIsNote(true)}
          ></textarea>
          {/* button */}
          <div className="text-end">
            <button
              type="submit"
              className={`btn hover:text-white hover:bg-primary text-primary border border-primary btn-soft mt-4 bg-transparent ${
                user?.email !== user_email && "cursor-not-allowed opacity-60" 
              } 
              ${isNote ? '' : "cursor-not-allowed opacity-60"}`}
              disabled={user?.email !== user_email}
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default FoodDetails;
