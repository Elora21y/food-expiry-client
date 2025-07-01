import React from "react";
import food from "../../public/lottie/food.json";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mx-auto min-h-screen max-w-52">
      {/* <span className="loading loading-spinner loading-xl text-primary"> </span> */}
      <Lottie animationData={food} autoplay loop/>
    </div>
  );
};

export default Loading;
