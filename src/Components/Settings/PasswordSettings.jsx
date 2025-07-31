import React, { useState } from "react";
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
  const togglePasswordVisibility = (set) => {
    set((state) => {
      return !state;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPassword === "" || newPassword !== confirmPassword) return;
    AuthAPI.updatePassword({
      currentPassword,
      newPassword,
      confirmNewPassword: confirmPassword,
    })
      .then((response) => {
        console.log(response.data);
        toast.success("Password Changed");
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <div className="mt-[22px] pt-[30px] pl-[30px]">
      <h2 className="text-[#000000] font-inter font-medium text-[18px]">
        Password
      </h2>
      <div className="mt-[40px] flex flex-col gap-[28px]">
        <div className="mt-2.5 relative">
          <label
            htmlFor="current-password"
            className="block text-[16px] font-medium font-inter text-[#8A8A8A]"
          >
            Current Password
          </label>
          <div className="relative h-[56px] w-[415px]">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="current-password"
              name="current-password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
              className="mt-1 block w-full h-full border-[#C7C7C7] focus:border-[#21ABA5] focus:outline-[#21ABA5] border-[1px] rounded-[10px] text-[#2F2F2F] text-[18px] pl-3 pr-10   placeholder-black  font-inter  leading-[16.94px] focus:outline-none"
              required
            />
            <img
              src={showCurrentPassword ? eyeOpen : eyeClose}
              alt="toggle visibility"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => {
                togglePasswordVisibility(setShowCurrentPassword);
              }}
            />
          </div>
        </div>
        <div className="mt-2.5 relative">
          <label
            htmlFor="new-password"
            className="block text-[16px] font-medium font-inter text-[#8A8A8A]"
          >
            New Password
          </label>
          <div className="relative h-[56px] w-[415px]">
            <input
              type={showNewPassword ? "text" : "password"}
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              className="mt-1 block w-full h-full border-[#C7C7C7] focus:border-[#21ABA5] focus:outline-[#21ABA5] border-[1px] rounded-[10px] text-[#2F2F2F] text-[18px] pl-3 pr-10   placeholder-black  font-inter  leading-[16.94px] focus:outline-none"
              required
            />
            <img
              src={showNewPassword ? eyeOpen : eyeClose}
              alt="toggle visibility"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => {
                togglePasswordVisibility(setShowNewPassword);
              }}
            />
          </div>
        </div>

        <div className="mt-2.5 relative">
          <label
            htmlFor="confirm-new-password"
            className="block text-[16px] font-medium font-inter text-[#8A8A8A]"
          >
            Confirm New Password
          </label>
          <div className="relative h-[56px] w-[415px]">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-new-password"
              name="confirm-new-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="mt-1 block w-full h-full border-[#C7C7C7] focus:border-[#21ABA5] focus:outline-[#21ABA5] border-[1px] rounded-[10px] text-[#2F2F2F] text-[18px] pl-3 pr-10   placeholder-black  font-inter  leading-[16.94px] focus:outline-none"
              required
            />
            <img
              src={showConfirmPassword ? eyeOpen : eyeClose}
              alt="toggle visibility"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => {
                togglePasswordVisibility(setShowConfirmPassword);
              }}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-[35px] font-inter font-medium text-[16px] cursor-pointer text-white bg-[#21ABA5] py-[14.5px] px-[95.5px] rounded-[6.75px]"
      >
        Save Changes
      </button>
    </div>
  );
}

export default PasswordSettings;
