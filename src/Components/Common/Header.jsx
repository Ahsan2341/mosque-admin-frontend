import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { clearAllAuthData } from "../../store/Auth";
import ShowComponent from "./ShowComponent";
import Popup from "./Popup";
import jb from "../../assets/icons/jb.png";
import logoutIcon from "../../assets/svg/logoutIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearAllAuthData } from "../../store/Auth";
function Header() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popupId, setPopupId] = useState("");

  const handleLogout = () => {
    dispatch(clearAllAuthData());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleShowPopup = () => {
    setPopupId("Logout");
  };

  return (
    <>
      <ShowComponent condition={popupId === "Logout"}>
        <Popup setPopup={() => setPopupId("")} className="w-[30%]">
          <div className="px-5 pb-5 text-center h-[300px]">
            <div className="font-inter font-500 text-[26px] py-14">
              Are you sure you want to Logout?
            </div>
            <div className="flex justify-center gap-10 ">
              <button
                onClick={() => setPopupId("")}
                className="w-[137px] h-[41px] text-[#8A8A8A] border border-[#8A8A8A] text-[13px] font-500 font-inter rounded-[7.31px] cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="w-[137px] h-[41px] bg-[#21ABA5] text-white text-[13px] font-500 font-inter rounded-[7.31px] cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </Popup>
      </ShowComponent>
      <div className="flex justify-end items-center pr-[54px]">
        <div className="flex items-center">
          <p className="font-inter font-normal text-[16px]">
            {currentUser.name}
          </p>
          <img
            // src={`https://ui-avatars.com/api/?name=${currentUser.name}&size=128&background=108A85&color=FFFFFF`}
            src={`https://ui-avatars.com/api/?name=A&size=128&background=108A85&color=FFFFFF`}
            alt="jb"
            className="w-[35px] rounded-full h-[35px] ml-[15px]"
          />
        </div>
        <img
          onClick={handleLogout}
          src={logoutIcon}
          alt="logoutIcon"
          className="w-[26px] cursor-pointer h-[26px] ml-[37px]"
        />
      </div>
    </>
  );
}

export default Header;
