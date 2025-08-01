import React, { useEffect, useState } from "react";
import AuthAPI from "../../api/auth/auth";
import { setAuthData } from "../../store/Auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function ProfileSettings({ user }) {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const handleSubmit = () => {
    if (email === currentUser.email && name === currentUser.name) {
      if (showToast) {
        toast.error("No changes made");
        setShowToast(false);
      }

      setLoading(false);
      return;
    }
    setLoading(true);
    if (name === "" || email === "") {
      toast.error("Name and email are required");
      setLoading(false);
      return;
    }
    if (!email.includes("@")) {
      toast.error("Invalid email");
      setLoading(false);
      return;
    }
    AuthAPI.updateUser({ name, email }).then((response) => {
      if (showToast) {
        toast.success(response.data.message);
        setShowToast(false);
      }

      dispatch(
        setAuthData({
          currentUser: {
            ...currentUser,
            name: response.data.data.name,
            email: response.data.data.email,
          },
        })
      );
      setLoading(false);
    });
  };
  useEffect(() => {
    if (!showToast) {
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 5000); // 5 seconds delay

      // Cleanup function to clear timeout if component unmounts or isActive changes
      return () => clearTimeout(timer);
    }
  }, [showToast]);
  return (
    <div className="mt-[22px] pt-[30px] pl-[30px]">
      <h2 className="text-[#000000] font-inter font-medium text-[18px]">
        Profile
      </h2>
      <div className="mt-[40px] flex flex-col gap-[28px]">
        <div className="">
          <label
            className="font-400 font-inter text-[16px] text-[#8A8A8A]"
            htmlFor="name"
          >
            Name
          </label>
          <div className="h-[56px]  mt-2.5">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[415px] h-full border-[#C7C7C7] focus:outline-[#21ABA5] border-[1px] rounded-[10px] text-[#2F2F2F] text-[16px] font-inter font-400 pl-3 my-focus"
            />
          </div>
        </div>
        <div className="">
          <label
            className="font-400 font-inter text-[16px] text-[#8A8A8A]"
            htmlFor="email"
          >
            Email
          </label>
          <div className="h-[56px]  mt-2.5">
            <input
              type="text"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[415px] h-full border-[#C7C7C7] focus:outline-[#21ABA5] border-[1px] rounded-[10px] text-[#2F2F2F] text-[18px] font-inter font-400 pl-3 my-focus"
            />
          </div>
        </div>
      </div>
      <button
        disabled={loading}
        onClick={handleSubmit}
        className="mt-[35px] disabled:opacity-50 disabled:cursor-not-allowed font-inter font-medium text-[16px] cursor-pointer text-white bg-[#21ABA5] py-[14.5px] px-[95.5px] rounded-[6.75px]"
      >
        Save Changes
      </button>
    </div>
  );
}

export default ProfileSettings;
