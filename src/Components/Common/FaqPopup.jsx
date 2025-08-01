import React, { useState } from "react";
import ShowComponent from "./ShowComponent";
import Popup from "./Popup";
import FaqAPI from "../../api/faq";
import { toast } from "react-toastify";

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
      toast.success("Faq Added");
    });
  };

  return (
    <ShowComponent condition={popupId === "faq"}>
      <Popup
        setPopup={() => setPopupId("")}
        className="lg:w-[600px] w-[300px] pl-[30px]" // Reduced width
      >
        <div className="flex flex-col justify-center items-center w-full text-center mb-4">
          {" "}
          {/* Reduced margin */}
          <h2 className="text-[#17908B] font-inter font-medium text-[18px]">
            {" "}
            {/* Reduced font size */}
            {title}
          </h2>
        </div>
        <div className="font-inter font-400 text-[14px] mb-[8px]">
          {" "}
          {/* Reduced font size and margin */}
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border placeholder:text-[#A7A7A7] pl-[10px] p-1 rounded-[6px] w-full h-[40px] border-[#C7C7C7] text-[#A7A7A7] focus:outline-none" // Reduced height, padding, and radius
            placeholder="Question"
          />
        </div>

        <div className="font-inter font-400 text-[14px]">
          {" "}
          {/* Reduced font size */}
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border placeholder:text-[#A7A7A7] pl-[10px] pt-[8px] rounded-[6px] w-full h-[120px] border-[#C7C7C7] text-[#2F2F2F] focus:outline-none resize-none" // Reduced height, padding, and radius
            placeholder="Answer"
          />
        </div>

        <div className="flex justify-center gap-4 mt-[16px] pb-[16px]">
          {" "}
          {/* Reduced gap, margin, and padding */}
          <button
            disabled={loading}
            className="px-[80px] py-[8px] disabled:bg-[#a4d6d4] disabled:cursor-not-allowed bg-[#21ABA5] text-white text-[16px] font-500 font-inter rounded-[6px] cursor-pointer" // Reduced padding, font size, and radius
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
