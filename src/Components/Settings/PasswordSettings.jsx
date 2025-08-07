import React, { useEffect, useState } from "react";
import eyeOpen from "../../assets/icons/eyeopen.png";
import eyeClose from "../../assets/icons/eyeclose.png";
import AuthAPI from "../../api/auth/auth";
import { toast } from "react-toastify";

function PasswordSettings() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(true);

  const togglePasswordVisibility = (set) => {
    set((state) => !state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      if (showToast) {
        toast.error(
          "Current Password, New Password and Confirm Password are required"
        );
        setShowToast(false);
      }
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      if (showToast) {
        toast.error("Password and confirm password are not the same");
        setShowToast(false);
      }
      setLoading(false);
      return;
    }
    setLoading(true);
    AuthAPI.updatePassword({
      currentPassword,
      newPassword,
      confirmNewPassword: confirmPassword,
    })
      .then((response) => {
        console.log(response.data);
        if (showToast) {
          toast.success("Password Changed");
          setShowToast(false);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (showToast) {
          toast.error(err.response.data.message);
          setShowToast(false);
        }
      });
    setLoading(false);
  };

  useEffect(() => {
    if (!showToast) {
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="mt-[12px] pt-[16px] pl-[16px]">
      <h2 className="text-[#000000] font-inter font-medium text-[14px]">
        Password
      </h2>
      <div className="mt-[16px] flex flex-col gap-[16px]">
        <div className="mt-1 relative">
          <label
            htmlFor="current-password"
            className="block text-[12px] font-medium font-inter text-[#8A8A8A]"
          >
            Current Password
          </label>
          <div className="relative h-[40px] w-[300px]">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="current-password"
              name="current-password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
              className="mt-1 block w-full h-full border-[#C7C7C7] focus:border-[#21ABA5] focus:outline-[#21ABA5] border-[1px] rounded-[6px] text-[#2F2F2F] text-[12px] pl-2 pr-8 placeholder-black font-inter leading-[14px] focus:outline-none"
              required
            />
            <img
              src={showCurrentPassword ? eyeOpen : eyeClose}
              alt="toggle visibility"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer w-[16px] h-[16px]"
              onClick={() => {
                togglePasswordVisibility(setShowCurrentPassword);
              }}
            />
          </div>
        </div>
        <div className="mt-1 relative">
          <label
            htmlFor="new-password"
            className="block text-[12px] font-medium font-inter text-[#8A8A8A]"
          >
            New Password
          </label>
          <div className="relative h-[40px] w-[300px]">
            <input
              type={showNewPassword ? "text" : "password"}
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              className="mt-1 block w-full h-full border-[#C7C7C7] focus:border-[#21ABA5] focus:outline-[#21ABA5] border-[1px] rounded-[6px] text-[#2F2F2F] text-[12px] pl-2 pr-8 placeholder-black font-inter leading-[14px] focus:outline-none"
              required
            />
            <img
              src={showNewPassword ? eyeOpen : eyeClose}
              alt="toggle visibility"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer w-[16px] h-[16px]"
              onClick={() => {
                togglePasswordVisibility(setShowNewPassword);
              }}
            />
          </div>
        </div>
        <div className="mt-1 relative">
          <label
            htmlFor="confirm-new-password"
            className="block text-[12px] font-medium font-inter text-[#8A8A8A]"
          >
            Confirm New Password
          </label>
          <div className="relative h-[40px] w-[300px]">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-new-password"
              name="confirm-new-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="mt-1 block w-full h-full border-[#C7C7C7] focus:border-[#21ABA5] focus:outline-[#21ABA5] border-[1px] rounded-[6px] text-[#2F2F2F] text-[12px] pl-2 pr-8 placeholder-black font-inter leading-[14px] focus:outline-none"
              required
            />
            <img
              src={showConfirmPassword ? eyeOpen : eyeClose}
              alt="toggle visibility"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer w-[16px] h-[16px]"
              onClick={() => {
                togglePasswordVisibility(setShowConfirmPassword);
              }}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-[16px] disabled:opacity-50 disabled:cursor-not-allowed font-inter font-medium text-[12px] cursor-pointer text-white bg-[#21ABA5] py-[8px] px-[48px] rounded-[6px]"
      >
        Save Changes
      </button>
    </div>
  );
}

export default PasswordSettings;
