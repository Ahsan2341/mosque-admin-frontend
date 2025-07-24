import React from "react";
import SingleFaq from "./SingleFaq";
import leftChev from "../../assets/svg/left-chev.svg";
import rightChev from "../../assets/svg/right-chev.svg";
function FaqList({ setPopupId, popupId }) {
  const faqs = [
    {
      question: "Who can use the Mosque App?",
      answer:
        "The Mosque App is designed for both mosque managers and regular users who want to stay connected with their local mosques.",
    },
    {
      question: "Is the Mosque App free to use?",
      answer:
        "Yes, the Mosque App is completely free to download and use for both mosque managers and users.",
    },
    {
      question: "How secure is the Mosque App?",
      answer:
        "The Mosque App prioritizes user privacy and security. All personal data is encrypted, and we adhere to strict security protocols to safeguard user information.",
    },
    {
      question: "How can users provide feedback or report issues with the app?",
      answer:
        "Users can provide feedback or report issues through the app's built-in feedback system.",
    },
  ];
  return (
    <div>
      {faqs.map((faq, index) => {
        return (
          <SingleFaq
            key={index}
            faq={faq}
            setPopupId={setPopupId}
            popupId={popupId}
          />
        );
      })}
      <div className="flex gap-2 justify-center mt-[68px]">
        <div className="bg-[rgba(145,158,171,0.5)] flex h-[32px] w-[32px] justify-center items-center rounded-[4px]">
          <img
            src={leftChev}
            className=""
            alt="left-chev"
            style={{ width: "12px", height: "17.41px" }}
          />
        </div>
        <div className="border-black border flex h-[32px] w-[32px] justify-center items-center rounded-[4px]">
          1
        </div>
        <div className="border-[#DFE3E8] border flex h-[32px] w-[32px] justify-center items-center rounded-[4px]">
          2
        </div>
        <div className="border-[#DFE3E8] border flex h-[32px] w-[32px] justify-center items-center rounded-[4px]">
          ...
        </div>
        <div className="border-[#DFE3E8] border flex h-[32px] w-[32px] justify-center items-center rounded-[4px]">
          9
        </div>
        <div className="border-[#DFE3E8] border flex h-[32px] w-[32px] justify-center items-center rounded-[4px]">
          10
        </div>
        <div className="border-[#DFE3E8] border flex h-[32px] w-[32px] justify-center items-center rounded-[4px]">
          <img
            src={rightChev}
            className=""
            alt="right-chev"
            style={{ width: "12px", height: "17.41px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default FaqList;
