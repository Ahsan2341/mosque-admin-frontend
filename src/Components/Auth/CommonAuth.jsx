import React from "react";

function CommonAuth() {
  return (
    <div className="w-[30%] bg-[#21ABA5] flex flex-col justify-between p-8 text-white min-h-screen">
      <div className="flex flex-grow justify-center items-center">
        <div className="text-center">
          <img src="./icons/logo.png" alt="Logo" className="mb-4 mx-auto" />
          <div className="text-[26px] font-robotoSerif font-500">
            MasjidGuide
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-[12px] font-inter font-500 mb-[60px]">
          A Project by IR Solutions.
        </p>
        <p className="text-[12px] font-inter font-medium">
          © 2024 Masjid Guide, All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default CommonAuth;
