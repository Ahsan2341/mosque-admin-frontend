import React, { useState } from "react";
import edit from "../../assets/svg/pencil.svg";
import deleteIcon from "../../assets/svg/trash.svg";
import FaqPopup from "../Common/FaqPopup";
import EditFaqPopup from "../Common/EditFaqPopup";

function SingleFaq({ faq, setPopupId, popupId, setSelectedFaq, setDeleteFaq }) {
  return (
    <>
      <div className="border-[#949494] mt-[12px] border-[1px] flex justify-between items-start rounded-[6px] py-[12px] pl-[12px] pr-[12px]">
        <div className="flex gap-3 flex-col">
          <h2 className="text-[#000000] font-inter font-medium text-[12px]">
            {faq.question}
          </h2>
          <p className="text-[#000000] font-inter font-normal text-[10px]">
            {faq.answer}
          </p>
        </div>
        <div className="flex gap-[12px]">
          <img
            src={edit}
            alt="edit"
            onClick={() => setSelectedFaq(faq)}
            className="cursor-pointer w-[16px] h-[16px]"
          />
          <img
            src={deleteIcon}
            alt="delete"
            onClick={() => {
              setDeleteFaq(faq);
              setPopupId("deleteFaq");
            }}
            className="cursor-pointer w-[16px] h-[16px]"
          />
        </div>
      </div>
    </>
  );
}

export default SingleFaq;
