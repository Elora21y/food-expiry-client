import React, { useState } from "react";
import { motion } from "framer-motion";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import banner1 from '/banner/timer.jpg'
import banner2 from '/banner/vegetable.jpg'
import banner3 from '/banner/fridge.jpg'
import banner4 from '/banner/list.jpg'
import GrediantButton from "../../shared/GrediantButton";

const datas = [
  {
    title: "Never Miss an Expiry Date",
    description:
      "Add food items with expiry dates and get timely alerts before they go bad. Stay in control of your kitchen!",
    url: banner1,
  },
  {
    title: "Save Food, Save Money",
    description:
      "Avoid unnecessary food waste by keeping track of what you have and when it expires. A little tracking goes a long way.",
    url: banner2,
  },
  {
    title: "Smart. Simple. Efficient.",
    description:
      "Fresh Alert helps you manage your fridge with ease. From adding items to getting expiry notifications — all in one place.",
    url: banner3,
  },
  {
    title: "Let the food list be digital now!",
    description:
      "You can easily track all types of food, including your dates, raisins, dried fruits.And the days start journey to healthy life",
    url: banner4,
  },
];

const Banner = () => {
   const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-5 text-accent-content mb-15 px-4">
      {/* main content */}
      <motion.div className="max-w-2xl text-center lg:text-left space-y-3"
      initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{once : true}}>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary-content mb-4">
          {" "}
          Keep Your Food <span className="text-primary inter">Fresh</span>{" "}
          Always!
            {/* animate={{
          scale: [1, 1.09, 1], 
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }} */}
        </h1>
        <p className="text-sm sm:text-lg">
          Fresh Alert helps you track your food items, get notified before
          expiry, and reduce waste. Organize your kitchen smarter with our
          simple and powerful food tracking system.
        </p>
        <GrediantButton text={'Read More'} path={'/about'}/>
      </motion.div>
      {/* slider */}
      <Swiper
        slidesPerView={1.5}
        
        spaceBetween={20}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        // className="mySwiper"
        autoplay={{ delay: 5000 }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full max-w-md md:max-w-lg lg:max-w-xl h-54 sm:h-80 lg:h-76 xl:h-88"
      >
        {datas.map((data , index) => (
          <SwiperSlide>
            <div 
            key={index}
              className={`text-white w-full max-w-md md:max-w-lg lg:max-w-xl h-54 sm:h-80 lg:h-76 xl:h-88 rounded-2xl overflow-hidden border-2 border-primary ${
                index === activeIndex ? "opacity-100" : "opacity-55 "
              }`}
              style={{
                backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.5), rgba(0,0,0,0.28)) , url(${data.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute bottom-5  p-2 md:p-3 xl:p-5">
                <h3 className="sm:text-lg md:text-xl xl:text-2xl">
                  {data.title}{" "}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm">
                  {data.description}{" "}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
