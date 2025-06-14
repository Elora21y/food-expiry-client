import React, { use, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import lottieRegister from "../../public/lottie/register.json";
import Lottie from "lottie-react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser, googleLogin } = use(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...restFormData } = Object.fromEntries(
      formData.entries()
    );

    // console.log(email, password, restFormData);

    if (!restFormData.terms) return toast.error("Accept Terms of Condition");
    if (!password) return toast.error("Please Enter a password");
    if (!/(?=.*[a-z])/.test(password))
      return toast.error(" Must have a Lowercase letter in the password ");

    if (!/(?=.*[A-Z])/.test(password))
      return toast.error("Must have an Uppercase letter in the password ");

    if (!/.{6,}/.test(password))
      return toast.error("Password should be at least 6 characters ");

    createUser(email, password)
      .then((result) => {
        // console.log(result.user);
        updateProfile(result.user, {
          displayName: restFormData.name,
          photoURL: restFormData.photo,
        })
          .then(() => {
            // console.log("Profile update");
            navigate(`${location.state ? location.state : "/"}`);
            toast.success("Successfully Sing Up");
          })
          .catch((error) => toast.error(error));
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Successfully Login");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.og(error);
      });
  };
  return (
    <div className="hero bg-base-100 min-h-screen text-accent">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <div className="text-center lg:text-left hidden lg:flex">
          <Lottie
            animationData={lottieRegister}
            loop={true}
            style={{
              maxWidth: "520px",
            }}
          />
        </div>
        <div>
          <h2 className="text-center text-4xl lg:text-5xl font-bold mb-5 text-secondary">
            Please Register
          </h2>
          <div className="card bg-base-200 shrink-0 shadow shadow-primary hover:shadow-md duration-500 transition-shadow">
            <div className="card-body w-[300px] sm:w-96 md:w-[400px]">
              {/* form */}
              <form onSubmit={handleRegister} className="fieldset">
                {/* name */}
                <label className="label">User Name</label>
                <input
                  type="text"
                  className="input "
                  placeholder="Your Name"
                  name="name"
                />
                {/* photo */}
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  className="input"
                  placeholder="URL"
                  name="photo"
                />
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
                  <label htmlFor="password" className="block text-gray-400">
                    Password
                  </label>
                  <input
                    type={`${showPass ? "text" : "password"}`}
                    name="password"
                    placeholder="Password"
                    className="input border-gray-300 focus:border-2 focus:border-primary-300 focus:border-[#FB9E3A] focus:outline-none focus:ring-4 focus:ring-[#f7945220] bg-white placeholder:text-gray-300 placeholder:text-xs w-full"
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    type="button"
                    className="absolute text-gray-400 btn btn-xs btn-ghost z-10 right-1 top-6 hover:bg-white border-0"
                  >
                    {showPass ? (
                      <FaRegEyeSlash size={15} />
                    ) : (
                      <FaRegEye size={15} />
                    )}
                  </button>
                </div>
                {/* check */}
                <label className="label">
                  <input
                    name="terms"
                    type="checkbox"
                    className="checkbox checkbox-primary text-white"
                  />
                  I accept the Terms of Service
                </label>

                <button className="btn orange-btn" type="submit">
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
              <p className="text-xs sm:text-base">
                Already have an account? Please 
                <Link
                  to="/login"
                  state={location.state || "/"}
                  className="hover:underline text-primary font-semibold text-[13px]"
                > {"  "}Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
