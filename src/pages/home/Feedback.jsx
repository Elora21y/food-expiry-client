import React from "react";
import image from '/feedback.jpg'

const Feedback = () => {
  return (
    <div
      className="w-full bg-cover bg-center py-16 px-6 flex justify-end"
      style={{
        backgroundImage: `url(${image})`, 
      }}
    >
      {/* Content Right Side */}
      <div className="p-8 rounded-xl  text-[#EEEFE0] ">
        <h2 className="max-w-3xl text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
          Share Your Feedback – We Value Your Opinion
        </h2>
        <p className="mb-6">
          Let us know your thoughts! Your feedback helps us improve and bring
          you the best service possible.
        </p>

        <div className="flex items-center max-w-2xl bg-transparent border-primary border rounded-full overflow-hidden w-full">
          <input
            type="text"
            placeholder="Write your feedback..."
            className="flex-1 px-4 py-2 outline-none "
          />
          <button className="bg-primary px-6 py-2 text-white font-semibold">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
