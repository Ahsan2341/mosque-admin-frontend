import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
// import AuthAPI from "../../api/auth/auth";
// import { toast } from "react-toastify";
// import { useGoogleLogin } from "@react-oauth/google";
// import { useDispatch } from "react-redux";
// import { setAuthData } from "../../store/Auth";
import GoogleLogo from "../../assets/icons/GoogleLogo.png";
import line from "../../assets/icons/line.png";

function EnterCode() {
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const [code, setCode] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < 5 && value) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index]) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const enteredCode = code.join("");
  //     if (enteredCode.length !== 6 || code.includes("")) {
  //       toast.error("Please enter the complete OTP.");
  //       return;
  //     }
  //     if (name && email) {
  //       AuthAPI.verifyEmail({ otp: enteredCode })
  //         .then((response) => {
  //           const mosqueStatus = "null";
  //           const mosqueId = "null";

  //           dispatch(
  //             setAuthData({
  //               currentUser: {
  //                 name,
  //                 email,
  //                 mosqueStatus,
  //                 mosqueId,
  //               },
  //             })
  //           );
  //           navigate("/");
  //           localStorage.removeItem("email");
  //           localStorage.removeItem("name");
  //         })
  //         .catch((error) => {
  //           console.error("Token verification error:", error);
  //           toast.error("Token verification failed");
  //         });
  //     } else if (email) {
  //       localStorage.setItem("otp", enteredCode);
  //       navigate("/reset-password");
  //     }
  //   };
  //   const handleGenerateOtp = (e) => {
  //     e.preventDefault();
  //     if (!email) {
  //       return;
  //     }
  //     AuthAPI.generateOtp({ email })
  //       .then((res) => {
  //         setTimer(60);
  //         toast.success("A new OTP has been sent to your email.");
  //       })
  //       .catch((error) => {
  //         toast.error("Failed to send OTP. Please try again.");
  //       });
  //   };

  //   const login = useGoogleLogin({
  //     flow: "auth-code",
  //     scope: "openid profile email",
  //     onSuccess: (response) => {
  //       AuthAPI.googleLogIn({
  //         code: response.code,
  //         appType: 2,
  //       })
  //         .then((res) => {
  //           const token = res.data.data.token;
  //           localStorage.setItem("token", token);
  //           AuthAPI.verifyToken(token)
  //             .then((res) => {
  //               const name = res?.data?.data?.user?.name;
  //               const email = res?.data?.data?.user?.email;
  //               const mosqueId = res?.data?.data?.mosqueProfile?.mosque?._id;
  //               const mosqueName = res?.data?.data?.mosqueProfile?.mosqueName;
  //               const mosqueStatus =
  //                 res?.data?.data?.mosqueProfile?.mosque?.mosqueStatus || "null";
  //               dispatch(
  //                 setAuthData({
  //                   currentUser: {
  //                     name,
  //                     email,
  //                     mosqueStatus,
  //                     mosqueId,
  //                     mosqueName,
  //                   },
  //                 })
  //               );
  //               if (mosqueStatus === "null") {
  //                 navigate("/");
  //               } else if (mosqueStatus === "PENDING") {
  //                 navigate("/pending");
  //               } else if (mosqueStatus === "APPROVED") {
  //                 navigate("/dashboard");
  //               }
  //             })
  //             .catch((error) => {
  //               console.log("error", error);
  //             });
  //         })
  //         .catch((error) => console.log("error", error));
  //     },
  //     onError: (error) => {
  //       toast.error(error, error.response.message);
  //     },
  //   });

  return (
    <div className="min-h-screen flex">
      <div className="w-full flex items-center justify-center">
        <div className="bg-white w-[400px] p-6">
          <div className="text-center text-[30px] font-inter font-500 text-black mb-6">
            Enter Code
          </div>
          <form>
            <div className="flex justify-between mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={`w-[50px] h-[50px] text-center text-[24px] border border-gray-300 rounded-[11px] focus:outline-none focus:bg-[#21ABA5] 
                    ${digit ? "bg-[#21ABA5] bg-opacity-50" : "bg-white"}`}
                />
              ))}
            </div>

            <div className="text-center text-[16px] font-inter font-400 mb-4">
              {timer > 0 ? (
                <span className="text-[#21ABA5]">00:{timer}s</span>
              ) : (
                <div className="cursor-pointer">Send code again</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-[43px] bg-[#21ABA5] text-white text-[16px] font-inter font-semibold rounded-md shadow-sm hover:bg-[#1b9c8f] transition duration-150"
            >
              Submit
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
              className="flex items-center justify-center font-inter rgba(234, 234, 253, 0.2) h-[43px] border border-[#21ABA5] rounded-md cursor-pointer hover:bg-opacity-30 transition duration-150"
              //   onClick={login}
            >
              <img src={GoogleLogo} alt="Google Logo" className="h-5 mr-2" />
              <span className="text-[#21ABA5] text-[14px] font-inter font-medium">
                Continue with Google
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EnterCode;
