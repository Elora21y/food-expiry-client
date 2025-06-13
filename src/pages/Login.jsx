import React from "react";
import lottieLogin from '../../public/lottie/login.json'
import Lottie from "lottie-react";
import { Link } from "react-router";

const Login = () => {
  // const { loginUser, signGoogle } = use(AuthContext);
  // const location = useLocation();
  // const from = location.state || "/";
  // const navigate = useNavigate();


  const handleSignin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());
    // console.log(formInformation)
    // loginUser(email, password)
    //   .then((result) => {
    //     // console.log(result.user);
    //     toast.success("Successfully Login");
    //     navigate(from);
    //   })
    //   .catch((error) => {
    //     toast.error(error.message);
    //   });
  };

  // const handleGoogleLogin = () => {
  //   signGoogle()
  //     .then((result) => {
  //       console.log(result);
  //       navigate(from)
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie animationData={lottieLogin} loop={true} />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <div className="card-body">
            <form onSubmit={handleSignin}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Signin</button>
              </fieldset>
            </form>

            <div className="divider">OR</div>
            {/* Google */}
            <button
              // onClick={handleGoogleLogin}
              className="btn bg-white text-black border-[#e5e5e5]"
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
            {/* redirect */}
            <p>Do not have and account ? Please <Link to='/register' className="underline" state={location}>Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
