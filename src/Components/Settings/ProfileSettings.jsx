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
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="mt-[12px] pt-[16px] pl-[16px]">
      <h2 className="text-[#000000] font-inter font-medium text-[14px]">
        Profile
      </h2>
      <div className="mt-[16px] flex flex-col gap-[16px]">
        <div>
          <label
            className="font-400 font-inter text-[12px] text-[#8A8A8A]"
            htmlFor="name"
          >
            Name
          </label>
          <div className="h-[40px] mt-1">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[300px] h-full border-[#C7C7C7] focus:outline-[#21ABA5] border-[1px] rounded-[6px] text-[#2F2F2F] text-[12px] font-inter font-400 pl-2 my-focus"
            />
          </div>
        </div>
        <div>
          <label
            className="font-400 font-inter text-[12px] text-[#8A8A8A]"
            htmlFor="email"
          >
            Email
          </label>
          <div className="h-[40px] mt-1">
            <input
              type="text"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[300px] h-full border-[#C7C7C7] focus:outline-[#21ABA5] border-[1px] rounded-[6px] text-[#2F2F2F] text-[12px] font-inter font-400 pl-2 my-focus"
            />
          </div>
        </div>
      </div>
      <button
        disabled={loading}
        onClick={handleSubmit}
        className="mt-[16px] disabled:opacity-50 disabled:cursor-not-allowed font-inter font-medium text-[12px] cursor-pointer text-white bg-[#21ABA5] py-[8px] px-[48px] rounded-[6px]"
      >
        Save Changes
      </button>
    </div>
  );
}

export default ProfileSettings;
