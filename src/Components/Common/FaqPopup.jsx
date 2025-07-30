import React, { useState } from "react";
import ShowComponent from "./ShowComponent";
import Popup from "./Popup";
import FaqAPI from "../../api/faq";

function FaqPopup({
  setPopupId,
  popupId,
  faq = { question: "", answer: "" },
  title = "",
  setTrigger,
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAddFaq = () => {
    setLoading(true);
    FaqAPI.addFaq({ question, answer }).then((response) => {
      console.log(response.data);
      setTrigger((state) => !state);
      setLoading(false);
      setPopupId("");
    });
  };
  return (
    <ShowComponent condition={popupId === "faq"}>
      <Popup
        setPopup={() => setPopupId("")}
        className="lg:w-[988px] w-[507px] pl-[70px]"
      >
        <div className="flex flex-col justify-center items-center w-full text-center mb-10 ">
          <h2 className="text-[#17908B] font-inter font-medium text-[26px]">
            {title}
          </h2>
        </div>
        <div className="font-inter font-400 text-[18px] mb-[20px]">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border placeholder:text-[#A7A7A7] pl-[20px] p-2 rounded-[10px] w-full h-[66px] border-[#C7C7C7] text-[#A7A7A7] focus:outline-none"
            placeholder="Question"
          />
        </div>

        <div className="font-inter font-400 text-[18px] ">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border placeholder:text-[#A7A7A7] pl-[20px] pt-[16px] rounded-[10px] w-full h-[207px] border-[#C7C7C7] text-[#2F2F2F] focus:outline-none resize-none"
            placeholder="Answer"
          />
        </div>

        <div className="flex justify-center gap-10 mt-[56px] pb-[64px]">
          <button
            disabled={loading ? true : false}
            className=" px-[140.6px] disabled:bg-[#a4d6d4] disabled:cursor-not-allowed py-[16.67px] bg-[#21ABA5] text-white text-[20px] font-500 font-inter rounded-[7.31px] cursor-pointer"
            onClick={handleAddFaq}
          >
            Save
          </button>
        </div>
      </Popup>
    </ShowComponent>
  );
}

export default FaqPopup;
