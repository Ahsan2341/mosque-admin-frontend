import React, { useState } from "react";
import ShowComponent from "./ShowComponent";
import Popup from "./Popup";
import MosquesAPI from "../../api/mosques";

function DeclineRequestPopup({ setFetchMosques, setPopupId, popupId, id }) {
  const [loading, setLoading] = useState(false);

  const handleRejectMosque = () => {
    setLoading(true);
    MosquesAPI.rejectMosque(id).then((response) => {
      console.log(response.data);
      setFetchMosques((state) => !state);
      setLoading(false);
      setPopupId("");
    });
  };

  return (
    <ShowComponent condition={popupId === "declineRequest"}>
      <Popup setPopup={() => setPopupId("")} className="w-[300px] pl-[30px]">
        <div className="flex flex-col justify-center items-center w-full text-center mb-4">
          <h2 className="text-[#17908B] font-inter font-medium text-[18px]">
            Decline Request?
          </h2>
          <p className="text-[#000000] mt-[16px] font-inter font-medium text-[14px]">
            Are you sure you want to decline this mosque’s registration request?
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-[16px] pb-[16px]">
          <button
            onClick={() => setPopupId("")}
            className="w-[100px] h-[32px] text-[#8A8A8A] border border-[#8A8A8A] text-[12px] font-500 font-inter rounded-[6px] cursor-pointer"
          >
            Go Back
          </button>

          <button
            disabled={loading}
            onClick={handleRejectMosque}
            className="w-[100px] h-[32px] disabled:bg-[#a8ede9] disabled:cursor-not-allowed bg-[#21ABA5] text-white text-[12px] font-500 font-inter rounded-[6px] cursor-pointer"
          >
            Decline
          </button>
        </div>
      </Popup>
    </ShowComponent>
  );
}

export default DeclineRequestPopup;
