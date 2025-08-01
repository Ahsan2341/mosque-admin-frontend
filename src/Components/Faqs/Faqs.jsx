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
        className="flex items-center gap-[8px] cursor-pointer font-inter font-medium text-[12px] text-white bg-[#21ABA5] rounded-[6px] py-[8px] px-[12px]"
      >
        <img src={add} alt="add" className="w-[12px] h-[12px]" />
        Add New FAQ
      </button>
      <div className="flex mt-[12px] items-center border border-[#BDBDBD] rounded-[6px] pl-[12px] py-[8px] w-full h-[32px] bg-white">
        <img src={searchIcon} alt="search" className="mr-2 w-[12px] h-[12px]" />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="outline-none border-none placeholder:text-[10px] bg-transparent text-[#757575] text-[12px] w-full placeholder:text-[#000000]"
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
