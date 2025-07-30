import React, { useState } from "react";
import MainLayout from "../Common/MainLayout";
import add from "../../assets/svg/add.svg";
import searchIcon from "../../assets/svg/searchIcon.svg";
import FaqList from "./FaqList";
import FaqPopup from "../Common/FaqPopup";
import DeleteFaqPopup from "../Common/DeleteFaqPopup";
import EditFaqPopup from "../Common/EditFaqPopup";
function Faqs() {
  const [popupId, setPopupId] = useState("");
  const [triggerFetchFaqs, setTriggerFetchFaqs] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [deleteFaq, setDeleteFaq] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [name, setName] = useState("");
  return (
    <MainLayout>
      <FaqPopup
        setPopupId={setPopupId}
        popupId={popupId}
        title="Add New FAQ"
        setTrigger={setTriggerFetchFaqs}
      />

      <DeleteFaqPopup
        setPopupId={setPopupId}
        popupId={popupId}
        deleteFaq={deleteFaq}
        setTrigger={setTriggerFetchFaqs}
      />
      {selectedFaq && (
        <EditFaqPopup
          faq={selectedFaq}
          setSelectedFaq={setSelectedFaq}
          setTriggerFetchFaqs={setTriggerFetchFaqs}
        />
      )}

      <button
        onClick={() => setPopupId("faq")}
        className="flex items-center gap-[13px] cursor-pointer 
      font-inter font-medium text-[20px] text-white bg-[#21ABA5] rounded-[6.75px] py-[16px] px-[22px]"
      >
        <img src={add} alt="add" /> Add New FAQ
      </button>
      {/* Search Box */}
      <div className="flex mt-[25px] items-center border border-[#BDBDBD] rounded-[16px] pl-[21px] py-[20px] w-full h-[52px] bg-white">
        <img src={searchIcon} alt="search" className="mr-3 w-3 h-3 mt-1" />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="outline-none border-none placeholder:text-[14px]  bg-transparent text-[#757575] text-[18px] w-full placeholder:text-[#000000]"
        />
      </div>
      <FaqList
        setPopupId={setPopupId}
        popupId={popupId}
        setSelectedFaq={setSelectedFaq}
        triggerFetchFaqs={triggerFetchFaqs}
        setDeleteFaq={setDeleteFaq}
        name={name}
      />
    </MainLayout>
  );
}

export default Faqs;
