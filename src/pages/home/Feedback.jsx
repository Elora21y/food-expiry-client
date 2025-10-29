import React, { useState } from "react";
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import image from '/feedback.jpg';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

const Feedback = () => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()
  // console.log(user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      toast.error("Please write your feedback first!");
      return;
    }

    if (!user) {
      navigate('/auth/login')
      return;
    }

    setIsSubmitting(true);

    const feedbackData = {
      user_name: user.displayName || "Anonymous",
      user_email: user.email,
      user_photo: user.photoURL || "",
      feedback_text: feedback.trim(),
      submitted_at: new Date().toISOString(),
    };

    try {
      // Replace with your backend URL
      const response = await axios.post(
        `${import.meta.env.VITE_base_url}/feedbacks`,
        feedbackData
      );

      if (response.data.insertedId) {
        toast.success("Thank you for your feedback! ", {
          duration: 4000,
        });
        setFeedback(""); // Clear input
      }
    } catch (error) {
      // console.error("Feedback submission error:", error);
      toast.error("Failed to submit feedback. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-screen left-1/2 right-1/2 -mx-[52vw] md:-mx-[51vw] my-16 md:my-20 lg:my-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="relative h-[450px] md:h-[500px] lg:h-[550px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        {/* Gradient Overlay - Stronger on left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/35 to-black/30 pointer-events-auto" />
        
        {/* Animated Dots Pattern Overlay */}
        {/* <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div> */}

        {/* Content Container */}
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 xl:px-0 flex justify-end">
            <div className="max-w-lg md:max-w-xl lg:max-w-3xl">
              
              {/* Animated Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true , amount : 0.3 }}
                className="space-y-6"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  <span className="bg-primary/20 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/30">
                     We're Listening
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
                >
                  Share Your Feedback
                  <br />
                  <span className="text-primary">We Value Your Opinion</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-white/90 text-base md:text-lg max-w-2xl"
                >
                  Let us know your thoughts! Your feedback helps us improve and bring you the best service possible.
                </motion.p>

                {/* Feedback Form */}
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-row items-stretch sm:items-center max-w-2xl"
                >
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Write your feedback..."
                      className="w-full px-4 py-2 sm:px-6 sm:py-3 rounded-l-full rounded-r-none 
                        bg-white/10 backdrop-blur-md border-2 border-white/20 
                        text-white placeholder-white/60
                        focus:outline-none focus:border-primary focus:bg-white/20
                        transition-all duration-300"
                      disabled={isSubmitting}
                    />
                    {/* Character count (optional) */}
                    {feedback.length > 0 && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50">
                        {feedback.length}/500
                      </span>
                    )}
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !feedback.trim()}
                    whileTap={{ scale: 0.95 }}
                    className=" py-2 sm:px-4 sm:py-[13px] rounded-l-none rounded-r-full
                      bg-gradient-to-r from-primary to-primary/80
                      text-white font-bold text-sm sm:text-base
                      hover:from-primary/90 hover:to-primary
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all duration-300 shadow-lg hover:shadow-primary/50
                      flex items-center justify-center gap-2 min-w-[140px] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit <FaArrowRight />
                      </>
                    )}
                  </motion.button>
                </motion.form>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-white/70 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>Your feedback is anonymous and helps us improve</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default Feedback;