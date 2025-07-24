import React, { useEffect, useState } from "react";
import MainLayout from "../Common/MainLayout";
// import mosqueApi from "../../api/mosque/mosque";
import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import Notifications from "../Common/Notifications";
import ShowComponent from "../Common/ShowComponent";
import Popup from "../Common/Popup";
import mosqueProfilePic from "../../assets/icons/mosque-profile-pic.jpg";
import penIcon from "../../assets/icons/pen.png";
import { useLocation, useParams } from "react-router-dom";
import checkedIcon from "../../assets/svg/checkbox-checked.svg";
import dummyProfile from "../../assets/svg/dummy-profile.svg";
import crossIcon from "../../assets/svg/cross-decline.svg";
import approveIcon from "../../assets/svg/approve-tick.svg";
import MosquesAPI from "../../api/mosques";
// import mosqueProfileApi from "../../api/mosque/mosqueProfile";

function ApprovedMosqueDetail() {
  const { id } = useParams();
  console.log(id);
  const [popupId, setPopupId] = useState("");
  const [name, setName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [logo, setLogo] = useState(true);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  //   const id = useSelector((state) => state.auth.currentUser.mosqueId);
  const [mosqueId, setMosqueId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [changeImage, setChangeImage] = useState(false);
  const [showImage, setShowImage] = useState(null);
  const [dataFetch, setDataFetch] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [newFacility, setNewFacility] = useState("");
  const location = useLocation();
  const initialFacilities = [
    "Parking",
    "Wuzu (Oblution)",
    "Women’s Prayer Space",
    "Restrooms",
    "Children Space",
    "Audio Equipment",
    "Space for Additional Islamic Activities",
    "Madrassa",
    "Nikkah",
    "Wheelchairs",
    "Wheelchair ramps",
  ];
  const [allFacilities, setAllFacilities] = useState(initialFacilities);
  const handleAddFacility = () => {
    if (newFacility && !allFacilities.includes(newFacility)) {
      setAllFacilities((prev) => [...prev, newFacility]);
      setNewFacility("");
      setPopupId("");
    } else {
      toast.error("Facility already exists or is empty");
    }
  };
  useEffect(() => {
    setDataFetch(false);
    if (id) {
      MosquesAPI.getMosque(id)
        .then((res) => {
          const data = res.data.data;
          console.log(data);
          setMosqueId(data._id);
          setSelectedFacilities(data.mosque.facilities);
          const uniqueFacilities = [
            ...new Set([...initialFacilities, ...data.mosque.facilities]),
          ];
          setAllFacilities(uniqueFacilities);
          setName(data.mosqueName);
          setAddress(data.address.streetAddress);
          setCity(data.address.city);
          setPostal(data.address.postalCode);
          setCountry(data.address.country);
          setState(data.address.state);
          setLandmark(data.address.nearestLandmark);
          setContact(data.mosque.phoneNumber);
          setShowImage(data.mosque.coverImage);
          setLogo(data.mosque.coverImage);
        })
        .catch((error) => {
          console.log("error");
        });
    }
  }, [dataFetch]);
  useEffect(() => {
    if (imageUrl) {
      uploadFile();
    }
  }, [imageUrl]);
  useEffect(() => {
    if (logo) {
      uploadImage();
    }
  }, [changeImage]);

  //   const uploadImage = async () => {
  //     const data = {
  //       name: logo.name,
  //       type: "mosque",
  //       fileType: "image",
  //     };
  //     try {
  //       const res = await mosqueApi.uploadMediaApi(data);
  //       const url = res.data.signedUrl;
  //       setImageUrl(url);
  //     } catch (error) {
  //       console.error("Image upload failed:", error);
  //     }
  //   };
  //   const uploadFile = async () => {
  //     const url = imageUrl;
  //     const file = logo;
  //     try {
  //       await mosqueApi.uploadFileApi(url, file);
  //     } catch (error) {
  //       console.error("File upload failed:", error);
  //     }
  //   };

  //   const handleSubmit = (e) => {
  //     setButtonDisable(true);
  //     e.preventDefault();
  //     const Data = {
  //       mosqueName: name,
  //       coverImage: imageUrl?.split("?")[0] || "",
  //       phoneNumber: contact,
  //       facilities: selectedFacilities,
  //       address: {
  //         country,
  //         state,
  //         postalCode: postal,
  //         city,
  //         streetAddress: address,
  //         nearestLandmark: landmark,
  //       },
  //     };
  //     mosqueProfileApi
  //       .updateMosqueProfileApi(mosqueId, Data)
  //       .then((response) => {
  //         setButtonDisable(false);
  //         setPopupId("Success");
  //         setTimeout(() => {
  //           setPopupId("");
  //           setDataFetch(true);
  //         }, 2000);
  //       })
  //       .catch((error) => {
  //         setButtonDisable(false);
  //         toast.error(error.response?.data?.error);
  //         console.error(error);
  //       });
  //   };
  //   const handleFileChange = (e) => {
  //     const file = e.target.files[0];
  //     setLogo(file);
  //     setChangeImage(true);
  //   };
  //   const handleLogoClick = () => {
  //     document.getElementById("fileInput").click();
  //   };

  const handleCheckboxChange = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((item) => item !== facility)
        : [...prev, facility]
    );
  };
  return (
    <>
      <ShowComponent condition={popupId === "Success"}>
        <Popup setPopup={() => setPopupId("")} className="w-[30%]">
          <div className="flex flex-col justify-center items-center w-full text-center mb-10">
            <div className="mb-4">
              <img src="./icons/done.png" alt="done" />
            </div>
            <div className="text-[20px] font-700 font-inter mb-2">Success!</div>
            <div className="text-[18px] font-500 font-inter px-5">
              Mosque info has been updated!
            </div>
          </div>
        </Popup>
      </ShowComponent>
      <ShowComponent condition={popupId === "facility"}>
        <Popup setPopup={() => setPopupId("")} className="w-[30%]">
          <div className="px-5 pb-5 text-center h-[300px]">
            <div className="font-inter font-700 text-[25px] text-black">
              Add a Facility
            </div>
            <div className="font-inter font-400 text-[18px] py-14">
              <input
                value={newFacility}
                onChange={(e) => setNewFacility(e.target.value)}
                className="border-b-2 p-2 border-gray-300 text-[#A7A7A7] focus:outline-none"
                placeholder="Facility Title"
              />
            </div>
            <div className="flex justify-center gap-10 ">
              <button
                onClick={() => {
                  setPopupId("");
                  setNewFacility("");
                }}
                className="w-[137px] h-[41px] text-[#8A8A8A] border border-[#8A8A8A] text-[13px] font-500 font-inter rounded-[7.31px] cursor-pointer"
              >
                Cancel
              </button>

              <button
                className="w-[137px] h-[41px] bg-[#21ABA5] text-white text-[13px] font-500 font-inter rounded-[7.31px] cursor-pointer"
                onClick={handleAddFacility}
              >
                Ok
              </button>
            </div>
          </div>
        </Popup>
      </ShowComponent>
      <div className="w-full flex">
        <div className="justify-center items-center h-full w-full p-5">
          <div className="text-center font-montserrat font-500 text-[26px] text-[#17908B]">
            Mosque Info
          </div>
          <div className="text-center flex flex-col items-center mt-10 relative">
            {logo ? (
              <div className="relative w-[156px] h-[156px]">
                <img
                  //   src={logo == showImage ? logo : URL.createObjectURL(logo)}
                  src={mosqueProfilePic}
                  alt="Mosque Logo Preview"
                  className="w-full h-full rounded-full object-cover"
                  style={{ border: "3px solid #21ABA5" }}
                />
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  //   onChange={handleFileChange}
                />
                <img
                  src={penIcon}
                  alt="pen icon"
                  className="absolute right-0 bottom-3  cursor-pointer"
                  //   onClick={handleLogoClick}
                />
              </div>
            ) : (
              <div
                className="relative w-[156px] h-[156px] border-[#21ABA5] border-2 flex flex-col items-center justify-center rounded-full cursor-pointer"
                // onClick={handleLogoClick}
              >
                <img
                  src="./icons/pen.png"
                  alt="pen icon"
                  className="absolute right-0 bottom-3  cursor-pointer"
                />
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  //   onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          <div className="flex justify-end">
            {location.pathname.startsWith("/registeration-requests/mosque") ? (
              <p className="font-inter font-normal text-[20px] text-black">
                Request Status:{" "}
                <span className="text-[#007D1C]">Approved!</span>
              </p>
            ) : (
              <div className="flex gap-[36px]">
                <button
                  className="text-[#000000] flex items-center gap-[15.05px]
                font-inter font-normal text-[19.63px] pt-[16.8px] pb-[17.2px] px-[31.2px] border-[1.09px] border-[#A4A4A4] rounded-[10.91px]"
                >
                  <img
                    // className="w-[9.4px] h-[25.04px]"
                    style={{ height: "14px" }}
                    src={crossIcon}
                    alt="cross icon"
                  />{" "}
                  Decline
                </button>
                <button
                  className="text-[#FFFFFF] bg-[#21ABA5] flex items-center gap-[15.05px]
                font-inter font-normal text-[19.63px] pt-[16.8px] pb-[17.2px] px-[31.2px] border-[1.09px] border-[#A4A4A4] rounded-[10.91px]"
                >
                  <img
                    className="w-[12.27px] "
                    style={{ height: "16px", width: "15px" }}
                    src={approveIcon}
                    alt="approve icon"
                  />{" "}
                  Approve
                </button>
              </div>
            )}
          </div>
          <div className="my-6 ">
            <form className=" space-y-6">
              <div className="flex justify-around">
                <h2 className="text-[#2F2F2F] w-[45%] font-inter font-medium text-[24px]">
                  Mosque Details
                </h2>
                <p className="w-[45%]"></p>
              </div>
              <div className="flex w-full justify-around">
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[18px] text-[#8A8A8A]"
                    htmlFor="name"
                  >
                    Mosque Name
                  </label>
                  <p className="text-[#2F2F2F] font-inter font-normal text-[20px] mt-[20px]">
                    Al Madinah{" "}
                  </p>
                </div>
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[18px] text-[#8A8A8A]"
                    htmlFor="landmark"
                  >
                    Nearest Landmark
                  </label>
                  <p className="text-[#2F2F2F] font-inter font-normal text-[20px] mt-[20px]">
                    Pakistan Monument
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-around">
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[18px] text-[#8A8A8A]"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <p className="text-[#2F2F2F] font-inter font-normal text-[20px] mt-[20px]">
                    Pakistan
                  </p>
                </div>
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[18px] text-[#8A8A8A]"
                    htmlFor="state"
                  >
                    State/Province
                  </label>
                  <p className="text-[#2F2F2F] font-inter font-normal text-[20px] mt-[20px]">
                    Punjab
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-around">
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[18px] text-[#8A8A8A]"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <p className="text-[#2F2F2F] font-inter font-normal text-[20px] mt-[20px]">
                    Islamabad
                  </p>
                </div>
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[18px] text-[#8A8A8A]"
                    htmlFor="postal"
                  >
                    Postal Code
                  </label>
                  <p className="text-[#2F2F2F] font-inter font-normal text-[20px] mt-[20px]">
                    12345
                  </p>
                </div>
              </div>
              <div className="w-full px-12">
                <label
                  className="font-400 font-inter text-[18px] text-[#8A8A8A]"
                  htmlFor="address"
                >
                  Street Address
                </label>
                <p className="text-[#2F2F2F] font-inter font-normal text-[20px] mt-[20px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do
                </p>
              </div>
              <div className="flex w-full pl-12">
                <div className="w-[46%]">
                  <label
                    className="font-400 font-inter text-[18px] text-[#8A8A8A]"
                    htmlFor="contact"
                  >
                    Contact No.
                  </label>
                  <p className="text-[#2F2F2F] font-inter font-normal text-[20px] mt-[20px]">
                    0000 0000000
                  </p>
                </div>
              </div>
              <div className="px-12 mb-14">
                <div className="text-[24px] font-inter font-500 mt-5">
                  Facilities
                </div>
                <div className=" mt-4"></div>
                {allFacilities.map((facility, index) => {
                  const isChecked = true; // Replace with dynamic logic if needed
                  return (
                    <div className="flex justify-between mt-2" key={index}>
                      <div className="flex font-400 font-inter text-[18px] text-[#6F6F6F]">
                        <div>{index + 1}.</div>
                        <div className="ml-4">{facility}</div>
                      </div>
                      <label className="relative w-[22px] h-[22px] flex items-center justify-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          readOnly
                          className="opacity-0 absolute w-full h-full cursor-pointer"
                        />
                        {isChecked ? (
                          <img
                            src={checkedIcon}
                            alt="checked"
                            className="w-full h-full"
                          />
                        ) : (
                          <span className="w-full h-full flex items-center justify-center border-2 border-[#232323] rounded-[4px] bg-white"></span>
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>
              {location.pathname.startsWith(
                "/registeration-requests/mosque"
              ) ? (
                <>
                  <div className="flex justify-around">
                    <h2 className="text-[#2F2F2F] w-[45%] font-inter font-medium text-[24px]">
                      Mosque Managers
                    </h2>
                    <p className="w-[45%]"></p>
                  </div>

                  <div className="flex items-center justify-around">
                    <div className="flex w-[45%] items-center gap-[12px]">
                      <img src={dummyProfile} alt="" />
                      <p className="text-[#000000] font-inter font-normal text-[17px]">
                        muhammadqasim@gmail.com
                      </p>
                    </div>
                    <div className="w-[45%]  flex justify-end">
                      <button className="text-[#21ABA5]  border-[1.15px] rounded-[7.8px] text-[17.32px] font-normal font-inter py-3 px-[49.25px]">
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-around">
                    <div className="flex w-[45%] items-center gap-[12px]">
                      <img src={dummyProfile} alt="" />
                      <p className="text-[#000000] font-inter font-normal text-[17px]">
                        cameronW@gmail.com
                      </p>
                    </div>
                    <div className="w-[45%]  flex justify-end">
                      <button className="text-[#21ABA5]  border-[1.15px] rounded-[7.8px] text-[17.32px] font-normal font-inter py-3 px-[49.25px]">
                        Remove
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
            </form>
          </div>
        </div>
        {/* <div className="flex justify-end items-start h-[90vh]">
          <Notifications />
        </div> */}
      </div>
    </>
  );
}

export default ApprovedMosqueDetail;
