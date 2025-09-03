import BlogAPI from "@/api/blog";
import React, { useState } from "react";
import { toast } from "react-toastify";

function AddCategory() {
  const [showCatModal, setShowCatModal] = useState(false);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const toggleCatModdle = (e) => {
    e.preventDefault();
    setShowCatModal((state) => !state);
  };
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!category) {
      toast.error("Category is required");
      return;
    }
    BlogAPI.createCategory({ name: category })
      .then((response) => {
        toast.success("Category Added Successfully");
      })
      .finally((res) => {
        setLoading(false);
        setShowCatModal(false);
      });
  };
  return (
    <div className="">
      <button
        className="bg-[#21ABA5] text-white px-5 py-2 rounded-md cursor-pointer"
        onClick={toggleCatModdle}
      >
        Add Category
      </button>
      {showCatModal && (
        <div
          className="absolute inset-0 w-full h-full z-20 flex justify-center items-center"
          style={{ backgroundColor: `rgba(0,0,0,0.6)` }}
        >
          <div className="bg-white p-4 rounded-md flex flex-col gap-3 ">
            <label htmlFor="">Category Name</label>
            <input
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-md h-[50px] border border-gray-500 px-2 focus:outline-none"
            />
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => {
                  setShowCatModal(false);
                }}
                className="bg-white text-black px-5 border border-gray-500 py-2 rounded-md cursor-pointer "
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleSave}
                className="bg-[#21ABA5] disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-md cursor-pointer "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCategory;
