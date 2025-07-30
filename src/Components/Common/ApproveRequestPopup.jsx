import React, { useState } from "react";
import ShowComponent from "./ShowComponent";
import Popup from "./Popup";
import MosquesAPI from "../../api/mosques";

function ApproveRequestPopup({ setFetchMosques, setPopupId, popupId, id }) {
  const [loading, setLoading] = useState(false);
  const handleApprove = () => {
    setLoading(true);
    MosquesAPI.approveMosques(id).then((response) => {
      console.log(response.data);
      setPopupId("");
      setFetchMosques((state) => !state);
      setLoading(false);
    });
  };
  return (
    <ShowComponent condition={popupId === "approveRequest"}>
      <Popup setPopup={() => setPopupId("")} className="w-[507px] ">
        <div className="flex flex-col justify-center items-center w-full text-center mb-10 ">
          <h2 className="text-[#17908B] font-inter font-medium text-[26px]">
            Approve Request
          </h2>
          <p className="text-[#000000] mt-[48px] font-inter font-medium text-[18px]">
            You’re approving this mosque to be registered.
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
            onClick={handleApprove}
          >
            Confirm
          </button>
        </div>
      </Popup>
    </ShowComponent>
  );
}

export default ApproveRequestPopup;
