import React, { useState } from "react";
import edit from "../../assets/svg/pencil.svg";
import deleteIcon from "../../assets/svg/trash.svg";
import FaqPopup from "../Common/FaqPopup";
import EditFaqPopup from "../Common/EditFaqPopup";

function SingleFaq({ faq, setPopupId, popupId, setSelectedFaq, setDeleteFaq }) {
  return (
    <>
      <div className="border-[#949494] mt-[25px] border-[1px] flex justify-between items-start rounded-[10px] py-[25px] pl-[25px] pr-[22.53px]">
        <div className="flex gap-3 flex-col">
          <h2 className="text-[#000000] font-inter font-medium text-[18px]">
            {faq.question}
          </h2>
          <p className="text-[#000000] font-inter font-normal text-[16px]">
            {faq.answer}
          </p>
        </div>
        <div className="flex gap-[21px]">
          <img
            src={edit}
            alt="edit"
            onClick={() => setSelectedFaq(faq)}
            className="cursor-pointer"
          />
          <img
            src={deleteIcon}
            alt="delete"
            onClick={() => {
              setDeleteFaq(faq);
              setPopupId("deleteFaq");
            }}
            className="cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}

export default SingleFaq;
