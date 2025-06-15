import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

const datas = [
  {
    title: 'Never Miss an Expiry Date',
    description:'Add food items with expiry dates and get timely alerts before they go bad. Stay in control of your kitchen!',
    url : '../../../public/banner/timer.jpg'
  },
  {
    title: 'Save Food, Save Money',
    description:'Avoid unnecessary food waste by keeping track of what you have and when it expires. A little tracking goes a long way.',
   url : '../../../public/banner/vegetable.jpg'
  },
  {
    title: 'Smart. Simple. Efficient.',
    description:'FreshAlert helps you manage your fridge with ease. From adding items to getting expiry notifications — all in one place.',
    url: '../../../public/banner/fridge.jpg'
  },
  {
    title: "Let the food list be digital now!",
    description:'You can easily track all types of food, including your dates, raisins, dried fruits.And the days start journey to healthy life',
    url: '../../../public/banner/list.jpg'
  }
 
];

const Banner = () => {
    return (
      <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-5 text-accent-content">
        {/* main content */}
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary-content mb-4"> Keep Your Food <span className='text-primary inter'>Fresh</span> Always!</h1>
          <p className="text-sm sm:text-lg">FreshAlert helps you track your food items, get notified before expiry, and reduce waste. 
  Organize your kitchen smarter with our simple and powerful food tracking system.</p>
        </div>
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
        className="w-full max-w-md md:max-w-lg lg:max-w-xl h-54 sm:h-80 lg:h-76 xl:h-88"
      >
        {
          datas.map(data =>
            <SwiperSlide>
            <div className="text-white w-full max-w-md md:max-w-lg lg:max-w-xl h-54 sm:h-80 lg:h-76 xl:h-88 rounded-2xl overflow-hidden border-2 border-primary" 
            style={{
              backgroundImage : `linear-gradient(to bottom right, rgba(0,0,0,0.5), rgba(0,0,0,0.10)) , url(${data.url})`,
              backgroundSize : 'cover',
              backgroundPosition:'center',
              
            }}>
              <div className="absolute bottom-5  p-2 md:p-3 xl:p-5">
                <h3 className='sm:text-lg md:text-xl xl:text-2xl'>{data.title} </h3>
              <p className='text-[10px] sm:text-xs md:text-sm'>{data.description} </p>
              </div>
            </div>
        </SwiperSlide>
          )
        }
        {/* <SwiperSlide>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMg_ziVh2MXltCakc62lIU2qqHMl3WUOxnLQ&s" alt="" /> 
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAPX72zRye0yKp_n8EXUUkyJ54fn-lsfwwzY_y5uvjg241pHEEgV6UbsJK4iraOf2BZYQ&usqp=CAU" alt="" />
        </SwiperSlide> */}
      </Swiper>
      </div>
    );
};

export default Banner;