import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthAPI from "../../api/auth/auth";
import { toast } from "react-toastify";
import CommonAuth from "./CommonAuth";
import eyeOpen from "../../assets/icons/eyeopen.png";
import eyeClose from "../../assets/icons/eyeclose.png";
import googleLogo from "../../assets/icons/GoogleLogo.png";
import { setAuthData } from "../../store/Auth";
import { useDispatch } from "react-redux";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "MANAGER",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!termsChecked) {
    //   toast.error("Please agree to our Terms & conditions.");
    //   return;
    // }
    setButtonDisable(true);
    AuthAPI.logIn({ ...formData, appType: 0 })
      .then((response) => {
        console.log(response.data);
        const token = response.data.data.api_token;
        localStorage.setItem("token", token);
        AuthAPI.verifyToken(token).then((response) => {
          const verifyEmail = response?.data?.data?.user?.emailVerified;
          const name = response?.data?.data?.user?.name;
          const email = response?.data?.data?.user?.email;
          dispatch(
            setAuthData({
              currentUser: {
                id: response?.data?.data?.user?._id,
                name,
                email,
              },
            })
          );
          toast.success("Login Successful");
          navigate("/dashboard");
          setButtonDisable(false);
        });

        setButtonDisable(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data.error);
        setButtonDisable(false);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleCheckboxChange = (e) => {
    setTermsChecked(e.target.checked);
  };
  return (
    <div className="min-h-screen flex">
      {/* <CommonAuth /> */}
      <div className="w-full flex items-center justify-center">
        <div className="bg-white w-[400px]">
          <div className="text-center text-[30px] font-inter font-medium text-black mb-6">
            Sign In
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-[16px] font-inter font-medium text-[#8A8A8A]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-[400px] h-[41px] bg-[rgba(138, 138, 138, 0.2)] !important border-[#8A8A8A] border-[0.7px] rounded-[6px] pl-2 placeholder-black text-black font-inter text-[14px] font-400 leading-[16.94px] focus:outline-none"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-[16px] font-medium font-inter text-[#8A8A8A]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full h-[41px] bg-[rgba(138, 138, 138, 0.2)] pl-3 pr-10  border-[#8A8A8A]  border-[0.7px] rounded-[6px] placeholder-black text-black font-inter text-[14px] leading-[16.94px] focus:outline-none"
                  required
                />
                <img
                  src={showPassword ? eyeOpen : eyeClose}
                  alt="toggle visibility"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>

            {/* <div className="flex justify-between items-center mb-6">
              <label className="flex items-center ">
                <input
                  type="checkbox"
                  className="w-[14px] h-[14px] rounded-[3px] bg-[#EAEAFD]  border-[#21ABA5] border-2   transition-colors duration-200"
                />
                <span className="ml-2 text-12px font-500 font-inter">
                  Remember Me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[#FF3B30] text-opacity-80 text-sm font-inter font-medium"
              >
                Forgot Password?
              </Link>
            </div> */}
            <button
              type="submit"
              disabled={buttonDisable}
              onClick={handleSubmit}
              className="w-full h-[43px] bg-[#21ABA5] text-white text-[16px] font-semibold rounded-md shadow-sm hover:bg-[#1b9c8f] transition duration-150"
            >
              Sign In
            </button>
            {/* <div className="text-center text-sm mt-4">
              <span className="text-[12px] font-400 font-inter">
                Don't have an account?{" "}
              </span>
              <Link
                to="/signup"
                className="text-[#21ABA5] font-inter font-medium underline underline-offset-1"
              >
                Sign up
              </Link>
            </div> */}
            {/* <div
              className="mt-4 flex items-center justify-center font-inter bg-[rgba(138, 138, 138, 0.2)] h-[43px] border border-[#21ABA5] rounded-md cursor-pointer hover:bg-opacity-30 transition duration-150"
              //   onClick={login}
            >
              <img src={googleLogo} alt="Google Logo" className="h-5 mr-2" />
              <span className="text-[#21ABA5] text-[14px] font-inter font-medium">
                Continue with Google
              </span>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
