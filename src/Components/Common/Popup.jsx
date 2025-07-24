import React from "react";
function Popup({ children, className, setPopup }) {
  return (
    <>
      <div className="flex inset-0 justify-center absolute items-center w-full">
        <div
          className={`fixed ${className} max-h-[100vh]  overflow-auto z-[100]`}
        >
          <div className="bg-white shadow-lg rounded-lg   w-full">
            <div className="flex justify-end  pr-5 pt-3">
              <button
                type="button"
                className=" text-[#9099A1] w-[50px] h-[50px]"
                onClick={setPopup}
              >
                X
              </button>
            </div>
            <div className="px-4 pb-4">{children}</div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-50 visible z-[9]"></div>
    </>
  );
}
export default Popup;
