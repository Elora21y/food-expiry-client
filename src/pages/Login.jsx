import React, { useState } from "react";
import lottieLogin from "../../public/lottie/login.json";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { loginUser, googleLogin } = useAuth()
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state)

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    loginUser(email, password)
      .then((result) => {
        // console.log(result.user);
        toast.success("Successfully Login");
        navigate(`${location.state ?  location.state : '/'}`);
      })
      .catch((error) => {
        if (error.code == "auth/invalid-credential")
          return toast.error("Incorrect email or password");
        if (error.code == "auth/invalid-email")
          return toast.error("Please enter your email");
        if (error.code == "auth/missing-password")
          return toast.error("Please enter your password");
        toast.error("Something went wrong. Please try again.");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Successfully Login");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div className="hero ">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <div className="text-center lg:text-left hidden lg:flex">
          <Lottie
            animationData={lottieLogin}
            loop={true}
            style={{
              maxWidth: "520px",
            }}
          />
        </div>
        <div>
          <h2 className="text-center text-4xl lg:text-5xl font-bold mb-5 text-secondary">
            Welcome Back
          </h2>
          <div className="card bg-base-300 dark:bg-base-200 shrink-0 shadow shadow-primary hover:shadow-md duration-500 transition-shadow">
            <div className="card-body w-[300px] sm:w-96 md:w-[400px]">
              {/* form */}
              <form onSubmit={handleLogin} className="fieldset">
                {/* email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input "
                  placeholder="Email"
                  name="email"
                />
                {/* password */}
                <div className="relative">
                  <label htmlFor="password" className="block">
                    Password
                  </label>
                  <input
                    type={`${showPass ? "text" : "password"}`}
                    name="password"
                    placeholder="Password"
                    className="input border-[#9ca3af62] focus:border-2 focus:border-primary-300 focus:border-[#FB9E3A] focus:outline-none focus:ring-4 focus:ring-[#f7945220] bg-white dark:bg-base-100 placeholder:text-gray-300 placeholder:text-xs w-full"
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    type="button"
                    className="absolute text-gray-400 btn btn-xs btn-ghost z-10 right-1 top-6 hover:bg-base-100 border-0"
                  >
                    {showPass ? (
                      <FaRegEyeSlash size={15} />
                    ) : (
                      <FaRegEye size={15} />
                    )}
                  </button>
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn orange-btn mt-2" type="submit">
                  Login
                </button>
              </form>
              {/* social login */}
              <div className="flex items-center my-3 space-x-1">
                <div className="flex-1 h-px sm:w-16 bg-primary"></div>
                <p className=" text-sm text-center">OR</p>
                <div className="flex-1 h-px sm:w-16 bg-primary"></div>
              </div>
              {/* Google */}
              <button
                onClick={handleGoogleLogin}
                className="btn bg-white text-gray-500 mb-2 border-gray-300"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
              <p className="text-xs sm:text-[14px] text-center">
                Don't have an account? Please
                <Link
                  to="/auth/register"
                  state={location.state || "/"}
                  className="hover:underline text-primary font-semibold text-[13px] sm:text-base"
                >
                  {" "}
                  {"  "}Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
