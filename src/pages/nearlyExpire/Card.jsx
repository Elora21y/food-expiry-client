import React, { useState } from "react";
import { HiOutlineArrowNarrowRight, HiClock, HiLocationMarker } from "react-icons/hi";
import { MdFoodBank } from "react-icons/md";
import { FaWeightHanging, FaFire } from "react-icons/fa";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { LuTriangleAlert } from "react-icons/lu";
import { FaFireAlt } from "react-icons/fa";
import { GrAlarm } from "react-icons/gr";


const Card = ({ food }) => {
  const [isHover, setHover] = useState(false);
  const { 
    title, 
    foodType, 
    expire_date, 
    quantity, 
    unit, 
    food_photo, 
    storage_location,
    tags,
    _id 
  } = food;

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    const today = new Date();
    const expiryDate = new Date(expire_date + "T23:59:59");
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining();

  // Get urgency configuration
  const getUrgencyConfig = () => {
    if (daysRemaining <= 1) return {
      level: 'critical',
      gradient: 'from-red-500/90 to-red-600/90',
      textGradient: 'from-red-600 to-red-700',
      icon: <FaFireAlt />,
      label: daysRemaining === 0 ? 'USE TODAY!' : 'EXPIRES TOMORROW',
      progressColor: 'bg-red-500',
      glowColor: 'shadow-red-500/50',
      borderGlow: 'group-hover:shadow-red-500/30'
    };
    if (daysRemaining <= 3) return {
      level: 'warning',
      gradient: 'from-orange-500/90 to-orange-600/90',
      textGradient: 'from-orange-600 to-orange-700',
      icon: <LuTriangleAlert />,
      label: `${daysRemaining} DAYS LEFT`,
      progressColor: 'bg-orange-500',
      glowColor: 'shadow-orange-500/50',
      borderGlow: 'group-hover:shadow-orange-500/30'
    };
    return {
      level: 'caution',
      gradient: 'from-amber-500/90 to-amber-600/90',
      textGradient: 'from-amber-600 to-amber-700',
      icon: <GrAlarm />,
      label: `${daysRemaining} DAYS LEFT`,
      progressColor: 'bg-amber-500',
      glowColor: 'shadow-amber-500/50',
      borderGlow: 'group-hover:shadow-amber-500/30'
    };
  };

  const urgency = getUrgencyConfig();

  // Progress bar percentage (5 days max)
  const progressPercentage = Math.max(0, Math.min(100, ((5 - daysRemaining) / 5) * 100));



  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ amount: 0.2 }}
      className="group h-full"
    >
      <Link 
        to={`/food-details/${_id}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="block h-full"
      >
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`
            relative h-full flex flex-col
            bg-white dark:bg-base-100 
            rounded-2xl overflow-hidden
            shadow-lg hover:shadow-2xl
            ${urgency.borderGlow}
            transition-all duration-500
            border border-base-300/20
          `}
        >
          {/* Image Container with Overlay */}
          <div className="relative h-56 overflow-hidden bg-base-300">
            {/* Main Image */}
            <motion.img
              src={food_photo}
              alt={title}
              className="w-full h-full object-cover"
              animate={{ scale: isHover ? 1.06 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />


            {/* Category Badge - Bottom Left */}
            <div className="absolute bottom-3 left-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/95 dark:bg-base-100/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg"
              >
               
                <span className="text-xs font-bold text-base-content">{foodType}</span>
              </motion.div>
            </div>

            {/* Tags - Bottom Right (on hover) */}
            <AnimatePresence>
              {isHover && tags && tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute bottom-3 right-3 flex gap-1.5"
                >
                  {tags.slice(0, 2).map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] font-semibold bg-black/70 text-white px-2 py-1 rounded-full backdrop-blur-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pulse Animation for Critical Items */}
            {urgency.level === 'critical' && (
              <motion.div
                className="absolute inset-0 border-4 border-red-500 rounded-2xl pointer-events-none"
                animate={{
                  opacity: [0.6, 0, 0.6],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col p-5 space-y-4 relative">
            
            {/* Urgency Banner - Top */}
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.8 }}
              className={`
                absolute top-0 left-0 right-0
                bg-gradient-to-r ${urgency.gradient}
                backdrop-blur-sm
                px-4 py-2.5
                flex items-center justify-between
                shadow-lg
              `}
            >
              <div className="flex items-center gap-2">
                <motion.span
                  animate={urgency.level === 'critical' ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, -10, 10, 0]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xl text-white"
                >
                  {urgency.icon}
                </motion.span>
                <span className="text-white font-bold text-sm tracking-wide">
                  {urgency.label}
                </span>
              </div>
              <HiClock className="text-white w-5 h-5" />
            </motion.div>

            {/* Title */}
            <h3 className="text-lg font-bold text-base-content line-clamp-2 leading-snug group-hover:text-primary transition-colors mt-8">
              {title}
            </h3>

            {/* Expiry Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-base-content/70">Freshness</span>
                <span className={`font-bold bg-gradient-to-r ${urgency.textGradient} bg-clip-text text-transparent`}>
                  {Math.max(0, 100 - progressPercentage).toFixed(0)}%
                </span>
              </div>
              <div className="h-2 bg-base-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  className={`h-full ${urgency.progressColor} rounded-full relative`}
                >
                  {urgency.level === 'critical' && (
                    <motion.div
                      className="absolute inset-0 bg-white/30"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </motion.div>
              </div>
            </div>

            {/* Expiry Date Card */}
            <div className="bg-base-200/80 rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wide">Expires</span>
                <HiClock className="w-4 h-4 text-base-content/40" />
              </div>
              <p className={`text-base font-bold bg-gradient-to-r ${urgency.textGradient} bg-clip-text text-transparent`}>
                {new Date(expire_date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Quantity */}
              <div className="flex items-center gap-2 bg-base-200/50 rounded-lg p-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <FaWeightHanging className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-base-content/50 font-semibold uppercase">Qty</p>
                  <p className="text-sm font-bold text-base-content truncate">{quantity} {unit || ''}</p>
                </div>
              </div>

              {/* Storage */}
              {storage_location && (
                <div className="flex items-center gap-2 bg-base-200/50 rounded-lg p-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <HiLocationMarker className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-base-content/50 font-semibold uppercase">Store</p>
                    <p className="text-xs font-bold text-base-content truncate">{storage_location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* View Details Button */}
            <motion.div
              whileHover={{ x: 3 }}
              className="mt-auto flex items-center justify-between pt-2 border-t border-base-200"
            >
              <span className="text-sm font-bold text-primary">View Details</span>
              <motion.div
                animate={{ x: isHover ? [0, 2, 0] : 0 }}
                transition={{ duration: 0.8, repeat: isHover ? Infinity : 0 }}
              >
                <HiOutlineArrowNarrowRight className="w-5 h-5 text-primary" />
              </motion.div>
            </motion.div>
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className={`absolute inset-0 rounded-2xl pointer-events-none ${urgency.glowColor}`}
            animate={{
              opacity: isHover ? 0.15 : 0
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default Card;