import React, { useState } from "react";
import ShowComponent from "./ShowComponent";
import Popup from "./Popup";
import MosquesAPI from "../../api/mosques";
import { toast } from "react-toastify";

function RemoveManagerPopup({
  removeData,
  setPopupId,
  popupId,
  setFetchManager,
}) {
  const [loading, setLoading] = useState(false);
  const handleRemoveManager = () => {
    setLoading(true);
    MosquesAPI.removemanagerApi(removeData.manager, removeData.mosque)
      .then((response) => {
        console.log(response.data);
        setFetchManager((state) => !state);
        setPopupId("");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
        setLoading(false);
      });
  };
  return (
    <ShowComponent condition={popupId === "removeManager"}>
      <Popup setPopup={() => setPopupId("")} className="w-[30%] 2xl:w-[40%] ">
        <div className="flex flex-col justify-center items-center w-full text-center mb-10 ">
          <h2 className="text-[#17908B] font-inter font-medium text-[26px]">
            Remove Manager
          </h2>
          <p className="text-[#000000] mt-[48px] font-inter font-medium text-[18px]">
            Are you sure you want to remove manager?
          </p>
        </div>
        <div className="flex justify-center gap-10 mt-[56px] pb-[64px]">
          <button
            onClick={() => {
              setPopupId("");
              //   setNewFacility("");
            }}
            className="w-[137px] h-[41px] text-[#8A8A8A] border border-[#8A8A8A] text-[13px] font-500 font-inter rounded-[7.31px] cursor-pointer"
          >
            Cancel
          </button>

          <button
            disabled={loading ? true : false}
            className="w-[137px] h-[41px] disabled:bg-[#a8ede9] disabled:cursor-not-allowed bg-[#21ABA5] text-white text-[13px] font-500 font-inter rounded-[7.31px] cursor-pointer"
            onClick={handleRemoveManager}
          >
            Remove
          </button>
        </div>
      </Popup>
    </ShowComponent>
  );
}

export default RemoveManagerPopup;
