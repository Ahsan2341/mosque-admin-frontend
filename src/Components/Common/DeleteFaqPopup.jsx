import React, { useState } from "react";
import ShowComponent from "./ShowComponent";
import Popup from "./Popup";
import FaqAPI from "../../api/faq";
import { toast } from "react-toastify";

function DeleteFaqPopup({ setPopupId, popupId, deleteFaq, setTrigger }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    FaqAPI.deleteFaq(deleteFaq._id).then((response) => {
      setTrigger((state) => !state);
      setPopupId("");
      setLoading(false);
      toast.success("Faq Deleted");
    });
  };

  return (
    <ShowComponent condition={popupId === "deleteFaq"}>
      <Popup setPopup={() => setPopupId("")} className="w-[300px] pl-[30px]">
        {" "}
        {/* Reduced width and added padding */}
        <div className="flex flex-col justify-center items-center w-full text-center mb-4">
          {" "}
          {/* Reduced margin */}
          <h2 className="text-[#17908B] font-inter font-medium text-[18px]">
            {" "}
            {/* Reduced font size */}
            Delete FAQ?
          </h2>
          <p className="text-[#000000] mt-[16px] font-inter font-medium text-[14px]">
            {" "}
            {/* Reduced margin and font size */}
            Are you sure you want to delete this FAQ permanently?
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-[16px] pb-[16px]">
          {" "}
          {/* Reduced gap, margin, and padding */}
          <button
            onClick={() => {
              setPopupId("");
            }}
            className="w-[80px] h-[32px] text-[#8A8A8A] border border-[#8A8A8A] text-[12px] font-500 font-inter rounded-[6px] cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            className="w-[80px] h-[32px] disabled:bg-[#a4e4e1] disabled:cursor-not-allowed bg-[#21ABA5] text-white text-[12px] font-500 font-inter rounded-[6px] cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Popup>
    </ShowComponent>
  );
}

export default DeleteFaqPopup;
