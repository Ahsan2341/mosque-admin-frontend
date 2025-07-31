import React, { useEffect, useState } from "react";
import MainLayout from "../Common/MainLayout";
// import mosqueApi from "../../api/mosque/mosque";
import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import Notifications from "../Common/Notifications";
import dummyProfile from "../../assets/svg/dummy-profile.svg";
import crossIcon from "../../assets/svg/cross-decline.svg";
import approveIcon from "../../assets/svg/approve-tick.svg";
import ShowComponent from "../Common/ShowComponent";
import Popup from "../Common/Popup";
import mosqueProfilePic from "../../assets/icons/mosque-profile-pic.jpg";
import add from "../../assets/svg/add.svg";
import penIcon from "../../assets/icons/pen.png";
import "./check.css";
import CustomCheckbox from "./CustomCheckbox";
import RemoveManagerPopup from "../Common/RemoveManagerPopup";
import { useParams } from "react-router-dom";
import MosquesAPI from "../../api/mosques";
// import mosqueProfileApi from "../../api/mosque/mosqueProfile";
import doneIcon from "../../assets/icons/done.png";
import AuthAPI from "../../api/auth/auth";
function CreateMosqueProfile() {
  const { id } = useParams();
  const [popupId, setPopupId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [logo, setLogo] = useState(null);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [removeData, setRemoveData] = useState({});
  //   const id = useSelector((state) => state.auth.currentUser.mosqueId);
  const [mosqueId, setMosqueId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [changeImage, setChangeImage] = useState(false);
  const [showImage, setShowImage] = useState(null);
  const [dataFetch, setDataFetch] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [newFacility, setNewFacility] = useState("");
  const [mosqueManagers, setMosqueManagers] = useState([]);
  const [fetchManager, setFetchManager] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const [mosqueStatus, setMosqueStatus] = useState("");
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
          setAddress(data?.address?.streetAddress);
          setCity(data?.address?.city);
          setPostal(data?.address?.postalCode);
          setCountry(data?.address?.country);
          setState(data?.address?.state);
          setLandmark(data?.address?.nearestLandmark);
          setContact(data?.mosque?.phoneNumber);
          setShowImage(data.coverImage);
          setLogo(data.coverImage);
          setMosqueStatus(data.mosque.mosqueStatus);
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  }, [dataFetch]);
  useEffect(() => {
    if (id) {
      MosquesAPI.fetchmanagersApi(id).then((response) => {
        console.log(response.data);
        setMosqueManagers(response.data.data);
      });
    }
  }, [fetchManager]);
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

  const uploadImage = async () => {
    const data = {
      name: logo.name,
      type: "mosque",
      fileType: "image",
    };
    try {
      const res = await MosquesAPI.uploadMediaApi(data);
      const url = res.data.signedUrl;
      setImageUrl(url);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };
  const uploadFile = async () => {
    const url = imageUrl;
    const file = logo;
    try {
      await MosquesAPI.uploadFileApi(url, file);
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  const handleSubmit = (e) => {
    setButtonDisable(true);
    e.preventDefault();
    const Data = {
      mosqueName: name,
      coverImage: imageUrl?.split("?")[0] || "",
      phoneNumber: contact,
      facilities: selectedFacilities,
      phoneNumber: contact,
      address: {
        country,
        state,
        postalCode: postal,
        city,
        streetAddress: address,
        nearestLandmark: landmark,
      },
    };
    console.log(Data);

    MosquesAPI.updateMosque(id, Data)
      .then((response) => {
        setButtonDisable(false);
        setPopupId("Success");
        setTimeout(() => {
          setPopupId("");
          setDataFetch(true);
        }, 2000);
      })
      .catch((error) => {
        setButtonDisable(false);
        toast.error(error.response?.data?.error);
        console.error(error);
      });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setChangeImage(true);
  };
  const handleLogoClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleCheckboxChange = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((item) => item !== facility)
        : [...prev, facility]
    );
  };
  const handleSendInvite = () => {
    if (email == "" || id == "" || !email.includes("@")) {
      toast.error("Invalid Email");
      return;
    }

    AuthAPI.inviteManager(email, id)
      .then((response) => {
        setPopupId("Invite-Success");
      })
      .catch((error) => {
        toast.error(error.response.data.message.message);
        console.log(error);
      });
  };
  const handleApprove = () => {
    setLoading(true);
    MosquesAPI.approveMosques(id).then((response) => {
      console.log(response.data);
      setPopupId("");
      setDataFetch((state) => !state);
      setLoading(false);
    });
  };
  const handleReject = () => {
    MosquesAPI.rejectMosque(id).then((response) => {
      console.log(response.data);
      setDataFetch((state) => !state);
      setLoading(false);
      setPopupId("");
    });
  };
  return (
    <>
      <RemoveManagerPopup
        setFetchManager={setFetchManager}
        removeData={removeData}
        setPopupId={setPopupId}
        popupId={popupId}
      />
      <ShowComponent condition={popupId === "Success"}>
        <Popup setPopup={() => setPopupId("")} className="w-[30%]">
          <div className="flex flex-col justify-center items-center w-full text-center mb-10">
            <div className="mb-4">
              <img src={doneIcon} alt="done" />
            </div>
            <div className="text-[20px] font-700 font-inter mb-2">Success!</div>
            <div className="text-[18px] font-500 font-inter px-5">
              Mosque info has been updated!
            </div>
          </div>
        </Popup>
      </ShowComponent>
      <ShowComponent condition={popupId === "Invite-Success"}>
        <Popup setPopup={() => setPopupId("")} className="w-[30%]">
          <div className="flex flex-col justify-center items-center w-full text-center mb-10">
            <div className="mb-4">
              <img src={doneIcon} alt="done" />
            </div>
            <div className="text-[20px] font-700 font-inter mb-2">Success!</div>
            <div className="text-[18px] font-500 font-inter px-5">
              Invite Sent!
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
      <ShowComponent condition={popupId === "inviteManager"}>
        <Popup setPopup={() => setPopupId("")} className="w-auto">
          <div className="px-5 pb-5 text-center ">
            <div className="font-inter font-700 text-[25px] text-[#17908B]">
              Invite Manager
            </div>
            <div className="font-inter font-400 text-[18px] py-14">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border placeholder:text-[#A7A7A7] pl-[20px] p-2 rounded-[10px] w-[829px] h-[66px] border-[#C7C7C7] text-[#A7A7A7] focus:outline-none"
                placeholder="Enter email to send invite"
              />
              <div className="flex w-[45%] items-center gap-[12px] mt-[10px]">
                <img src={dummyProfile} alt="" />
                <p className="text-[#8A8A8A] font-inter font-normal text-[17px]">
                  muhammadqasim@gmail.com
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-10 ">
              <button
                className="w-[137px] h-[41px] bg-[#21ABA5] text-white text-[13px] font-500 font-inter rounded-[7.31px] cursor-pointer"
                onClick={handleSendInvite}
              >
                Send Invite
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
                  src={logo == showImage ? logo : URL.createObjectURL(logo)}
                  // src={mosqueProfilePic}
                  alt="Mosque Logo Preview"
                  className="w-full h-full rounded-full object-cover"
                  style={{ border: "3px solid #21ABA5" }}
                />
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <img
                  src={penIcon}
                  alt="pen icon"
                  className="absolute right-0 bottom-3  cursor-pointer"
                  onClick={handleLogoClick}
                />
              </div>
            ) : (
              <div
                className="relative w-[156px] h-[156px] border-[#21ABA5] border-2 flex flex-col items-center justify-center rounded-full cursor-pointer"
                onClick={handleLogoClick}
              >
                <img
                  src={penIcon}
                  alt="pen icon"
                  className="absolute right-0 bottom-3  cursor-pointer"
                />
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          <div className="flex justify-around">
            <div className="w-[45%] mb-[30px]">
              <button
                className="flex items-center gap-[13px] cursor-pointer 
      font-inter font-medium text-[20px] text-white bg-[#21ABA5] rounded-[6.75px] py-[16px] px-[18px]"
                onClick={() => setPopupId("inviteManager")}
              >
                <img src={add} alt="add" /> Assign Manager to a Mosque
              </button>
            </div>
            <p className="w-[45%]"></p>
          </div>
          {mosqueStatus !== "PENDING" && (
            <div className="flex justify-end w-[96%]">
              Request Status:&nbsp;
              <span
                className={`${
                  mosqueStatus === "APPROVED"
                    ? "text-[#007D1C]"
                    : "text-red-500"
                }`}
              >
                {mosqueStatus === "APPROVED" ? "Approved" : "Rejected"}
              </span>
            </div>
          )}

          {mosqueStatus === "PENDING" ? (
            <div className="flex justify-end w-[98%]  ">
              <div className="flex gap-[36px] ">
                <button
                  disabled={loading ? true : false}
                  onClick={handleReject}
                  className="text-[#000000] flex items-center gap-[15.05px]
                font-inter cursor-pointer font-normal text-[19.63px] pt-[16.8px] pb-[17.2px] px-[31.2px] border-[1.09px] border-[#A4A4A4] rounded-[10.91px]"
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
                  onClick={handleApprove}
                  disabled={loading ? true : false}
                  className="text-[#FFFFFF] disabled:bg-[#a8ede9] disabled:cursor-not-allowed bg-[#21ABA5] flex items-center gap-[15.05px]
                font-inter font-normal cursor-pointer text-[19.63px] pt-[16.8px] pb-[17.2px] px-[31.2px] border-[1.09px] border-[#A4A4A4] rounded-[10.91px]"
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
            </div>
          ) : (
            <>
              {mosqueManagers?.map((manager) => {
                return (
                  <div
                    key={manager._id}
                    className="flex items-center justify-around mt-5"
                  >
                    <div className="flex w-[45%] items-center gap-[12px]">
                      <img src={dummyProfile} alt="" />
                      <p className="text-[#000000] font-inter font-normal text-[17px]">
                        {manager.email}
                      </p>
                    </div>
                    <div className="w-[45%]  flex justify-end">
                      <button
                        className="text-[#21ABA5] cursor-pointer border-[1.15px] rounded-[7.8px] text-[17.32px] font-normal font-inter py-3 px-[49.25px]"
                        onClick={() => {
                          setRemoveData({ mosque: id, manager: manager.email });
                          setPopupId("removeManager");
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          <div className="mb-6 mt-[70px]">
            <form onSubmit={handleSubmit} className=" space-y-6">
              <div className="flex w-full justify-around">
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[18px] text-[#8A8A8A]"
                    htmlFor="name"
                  >
                    Mosque Name
                  </label>
                  <div className="h-[66px]  mt-2">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-full focus:outline-[#21ABA5]  border-[#C7C7C7] border-[1px] rounded-[10px] text-[#2F2F2F] text-[18px] font-inter font-400 pl-3 focus:border-green-custom-green "
                    />
                  </div>
                </div>
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[18px] text-[#8A8A8A]"
                    htmlFor="landmark"
                  >
                    Nearest Landmark
                  </label>
                  <div className="h-[66px]  mt-2">
                    <input
                      type="text"
                      id="landmark"
                      name="landmark"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full h-full focus:outline-[#21ABA5] border-[#C7C7C7] border-[1px] rounded-[10px] text-[#2F2F2F] text-[18px] font-inter font-400 pl-3 focus:border-green-custom-green"
                    />
                  </div>
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
                  <div className="h-[66px]  mt-2">
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full h-full focus:outline-[#21ABA5] border-[#C7C7C7] border-[1px] rounded-[10px] text-[#2F2F2F] text-[18px] font-inter font-400 pl-3 focus:border-green-custom-green"
                    />
                  </div>
                </div>
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[18px] text-[#8A8A8A]"
                    htmlFor="state"
                  >
                    State/Province
                  </label>
                  <div className="h-[66px]  mt-2">
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full h-full focus:outline-[#21ABA5] border-[#C7C7C7] border-[1px] rounded-[10px] text-[#2F2F2F] text-[18px] font-inter font-400 pl-3 focus:border-green-custom-green"
                    />
                  </div>
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
                  <div className="h-[66px]  mt-2">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-full focus:outline-[#21ABA5] border-[#C7C7C7] border-[1px] rounded-[10px] text-[#2F2F2F] text-[18px] font-inter font-400 pl-3 focus:border-green-custom-green"
                    />
                  </div>
                </div>
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[18px] text-[#8A8A8A]"
                    htmlFor="postal"
                  >
                    Postal Code
                  </label>
                  <div className="h-[66px]  mt-2">
                    <input
                      type="text"
                      id="postal"
                      name="postal"
                      value={postal}
                      onChange={(e) => setPostal(e.target.value)}
                      className="w-full h-full focus:outline-[#21ABA5] border-[#C7C7C7] border-[1px] rounded-[10px] text-[#2F2F2F] text-[18px] font-inter font-400 pl-3 focus:border-green-custom-green"
                    />
                  </div>
                </div>
              </div>
              <div className="w-[95%] mx-auto ">
                <label
                  className="font-400 font-inter text-[18px] text-[#8A8A8A]"
                  htmlFor="address"
                >
                  Street Address
                </label>
                <div className="h-[66px]  mt-2">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-full focus:outline-[#21ABA5] border-[#C7C7C7] border-[1px] rounded-[10px] text-[#2F2F2F] text-[18px] font-inter font-400 pl-3 focus:border-green-custom-green"
                  />
                </div>
              </div>
              <div className="flex w-[95%] mx-auto">
                <div className="w-[47%]">
                  <label
                    className="font-400 font-inter text-[18px] text-[#8A8A8A]"
                    htmlFor="contact"
                  >
                    Contact No.
                  </label>
                  <div className="h-[66px]  mt-2">
                    <input
                      type="number"
                      id="contact"
                      name="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full h-full focus:outline-[#21ABA5] border-[#C7C7C7] border-[1px] rounded-[10px] text-[#2F2F2F] text-[18px] font-inter font-400 pl-3 focus:border-green-custom-green"
                    />
                  </div>
                </div>
              </div>
              <div className="px-12 mb-14">
                <div className="text-[24px] font-inter font-500 mt-5">
                  Facilities
                </div>
                <div className=" mt-4"></div>
                {allFacilities.map((facility, index) => (
                  <div className="flex justify-between mt-2" key={index}>
                    <div className="flex font-400 font-inter text-[18px] text-[#6F6F6F]">
                      <div>{index + 1}.</div>
                      <div className="ml-4">{facility}</div>
                    </div>
                    <CustomCheckbox
                      checked={selectedFacilities.includes(facility)}
                      onChange={() => handleCheckboxChange(facility)}
                    />
                  </div>
                ))}
                <div
                  className="flex text-[#21ABA5] text-[18px] font-inter font-400 ml-6 "
                  onClick={() => setPopupId("facility")}
                >
                  <div className="mr-3">+</div>
                  <div className="underline underline-offset-1  cursor-pointer">
                    Add a Facility
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-14">
                <button
                  type="submit"
                  disabled={buttonDisable}
                  className="w-[328px] h-[58px] bg-[#17908B] text-white rounded-md font-500 font-inter"
                >
                  Save Changes
                </button>
              </div>
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

export default CreateMosqueProfile;
