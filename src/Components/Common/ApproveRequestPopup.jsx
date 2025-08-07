import React, { useState } from "react";
import ShowComponent from "./ShowComponent";
import Popup from "./Popup";
import MosquesAPI from "../../api/mosques";
import { toast } from "react-toastify";

function ApproveRequestPopup({ setFetchMosques, setPopupId, popupId, id }) {
  const [loading, setLoading] = useState(false);

  const handleApprove = () => {
    setLoading(true);
    MosquesAPI.approveMosques(id).then((response) => {
      console.log(response.data);
      setPopupId("");
      setFetchMosques((state) => !state);
      setLoading(false);
      toast.success("Mosque Approved Successfully");
    });
  };

  return (
    <ShowComponent condition={popupId === "approveRequest"}>
      <Popup setPopup={() => setPopupId("")} className="w-[300px] pl-[30px]">
        <div className="flex flex-col justify-center items-center w-full text-center mb-4">
          <h2 className="text-[#17908B] font-inter font-medium text-[18px]">
            Approve Request
          </h2>
          <p className="text-[#000000] mt-[16px] font-inter font-medium text-[14px]">
            You’re approving this mosque to be registered.
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-[16px] pb-[16px]">
          <button
            onClick={() => setPopupId("")}
            className="w-[100px] h-[32px] text-[#8A8A8A] border border-[#8A8A8A] text-[12px] font-500 font-inter rounded-[6px] cursor-pointer"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="w-[100px] h-[32px] disabled:bg-[#a8ede9] disabled:cursor-not-allowed bg-[#21ABA5] text-white text-[12px] font-500 font-inter rounded-[6px] cursor-pointer"
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
