import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthAPI from "../../api/auth/auth";
import { toast } from "react-toastify";
import CommonAuth from "./CommonAuth";
import eyeOpen from "../../assets/icons/eyeopen.png";
import eyeClose from "../../assets/icons/eyeclose.png";
import googleLogo from "../../assets/icons/GoogleLogo.png";
import line from "../../assets/icons/line.png";

function ForgotPassword() {
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
            Forgot Password?
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

            <button
              type="submit"
              disabled={buttonDisable}
              className="w-full h-[43px] bg-[#21ABA5] text-white text-[16px] font-semibold rounded-md shadow-sm hover:bg-[#1b9c8f] transition duration-150"
            >
              Send Code
            </button>
            <div className="flex justify-center items-center text-center my-4">
              <div>
                <img src={line} alt="" />
              </div>
              <div className="px-2 text-[18px] font-inter font-400 text-[#7C7C7C]">
                or
              </div>
              <div>
                <img src={line} alt="" />
              </div>
            </div>
            <div
              className="mt-4 flex items-center justify-center font-inter bg-[rgba(138, 138, 138, 0.2)] h-[43px] border border-[#21ABA5] rounded-md cursor-pointer hover:bg-opacity-30 transition duration-150"
              //   onClick={login}
            >
              <img src={googleLogo} alt="Google Logo" className="h-5 mr-2" />
              <span className="text-[#21ABA5] text-[14px] font-inter font-medium">
                Login with Google
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
