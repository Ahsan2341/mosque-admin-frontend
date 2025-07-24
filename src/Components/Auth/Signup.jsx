import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthAPI from "../../api/auth/auth";
import { toast } from "react-toastify";
import CommonAuth from "./CommonAuth";
import eyeOpen from "../../assets/icons/eyeopen.png";
import eyeClose from "../../assets/icons/eyeclose.png";
function Signup() {
  const navigate = useNavigate();
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
    if (!termsChecked) {
      toast.error("Please agree to our Terms & conditions.");
      return;
    }
    setButtonDisable(true);
    AuthAPI.signUp(formData)
      .then((response) => {
        setButtonDisable(false);
        toast.success("Sign Up Successful");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error?.response?.data.message?.message);
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
            Sign Up
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
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-[16px] font-inter font-medium text-[#8A8A8A]"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="block w-[400px] h-[41px] bg-[rgba(138, 138, 138, 0.2)] border-[#8A8A8A] border-[0.7px] rounded-[6px] pl-2 placeholder-black text-black font-inter text-[14px] font-400 leading-[16.94px] focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center ">
                <div className="transition-colors duration-200">
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    className="w-[14px] h-[14px] rounded-[3px] border-[0.7px] border-[#21ABA5] bg-[#EAEAFD] bg-opacity-20 checked:bg-[#21ABA5] checked:border-[#21ABA5] focus:border-[#21ABA5]"
                  />
                </div>

                <span className="ml-2 text-[12px] font-normal font-inter">
                  By registering, you agree to our
                  <span className="text-[#21ABA5]"> Terms & conditions.</span>
                </span>
              </label>
            </div>
            <button
              type="submit"
              disabled={buttonDisable}
              className="w-full h-[43px] bg-[#21ABA5] text-white text-[16px] font-semibold rounded-md shadow-sm hover:bg-[#1b9c8f] transition duration-150"
            >
              Sign Up
            </button>
            <div className="text-center text-sm mt-4">
              <span className="text-[12px] font-400 font-inter">
                Already have an account?{" "}
              </span>
              <Link
                to="/login"
                className="text-[#21ABA5] font-medium underline underline-offset-1"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
