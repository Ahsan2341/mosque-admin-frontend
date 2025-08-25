import React, { useCallback, useEffect, useState } from "react";
import MainLayout from "../Common/MainLayout";
import { toast } from "react-toastify";
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
import doneIcon from "../../assets/icons/done.png";
import AuthAPI from "../../api/auth/auth";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import locationIcon from "../../assets/svg/location-icon.svg";
function CreateMosqueProfile() {
  const [selected, setSelected] = useState(null);
  const mapContainerStyle = {
    width: "100%",
    height: "500px",
  };
  const toggleMap = () => {
    setShowMap((prev) => !prev);
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB6GpskHKDeSaoRJ4wMPvcSlsmGEiLqUwg", // Ensure API key is in .env
    libraries: ["places"],
  });
  const [addressFromGoogle, setAddressFromGoogle] = useState("");
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
  const [showMap, setShowMap] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [center, setCenter] = useState({
    lat: 33.648156629240255,
    lng: 73.54173005465246,
  });
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

  const onMapClick = useCallback(async (event) => {
    setLatitude(event.latLng.lat());
    setLongitude(event.latLng.lng());
    setCenter({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setSelected({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${event.latLng.lat()},${event.latLng.lng()}&key=AIzaSyB6GpskHKDeSaoRJ4wMPvcSlsmGEiLqUwg`
    );
    const data = await response.json();

    if (data.status === "OK") {
      setAddressFromGoogle(data.results[0].formatted_address);
      setAddress(data.results[0].formatted_address);
    } else {
      console.error("Geocoding error:", data.status);
    }
  }, []);
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
          setLatitude(data.mosque.locationAddress.coordinates[0]);
          setLongitude(data.mosque.locationAddress.coordinates[1]);
          setCenter({
            lat: data.mosque.locationAddress.coordinates[0],
            lng: data.mosque.locationAddress.coordinates[1],
          });
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
      address: {
        country,
        state,
        postalCode: postal,
        city,
        streetAddress: address,
        nearestLandmark: landmark,
      },
      locationAddress: {
        locationType: "123",
        coordinates: [latitude, longitude],
      },
    };

    if (!latitude || !longitude) {
      toast.error("Select Location");
      return;
    }
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
    if (name == "") {
      toast.error("Name cannot be empty");
      return;
    }

    AuthAPI.inviteManager(email, inviteName, id)
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
        <Popup
          setPopup={() => setPopupId("")}
          className="w-[30%] 2xl:w-[40%] pl-[30px]"
        >
          <div className="flex flex-col justify-center items-center w-full text-center mb-4">
            <div className="mb-2">
              <img src={doneIcon} alt="done" className="w-[40px] h-[40px]" />
            </div>
            <div className="text-[18px] font-700 font-inter mb-2">Success!</div>
            <div className="text-[14px] font-500 font-inter px-3">
              Mosque info has been updated!
            </div>
          </div>
        </Popup>
      </ShowComponent>
      <ShowComponent condition={popupId === "Invite-Success"}>
        <Popup setPopup={() => setPopupId("")} className="w-[300px] pl-[30px]">
          <div className="flex flex-col justify-center items-center w-full text-center mb-4">
            <div className="mb-2">
              <img src={doneIcon} alt="done" className="w-[40px] h-[40px]" />
            </div>
            <div className="text-[18px] font-700 font-inter mb-2">Success!</div>
            <div className="text-[14px] font-500 font-inter px-3">
              Invite Sent!
            </div>
          </div>
        </Popup>
      </ShowComponent>
      <ShowComponent condition={popupId === "facility"}>
        <Popup setPopup={() => setPopupId("")} className="w-[300px] pl-[30px]">
          <div className="px-3 pb-3 text-center h-[200px]">
            <div className="font-inter font-700 text-[18px] text-black">
              Add a Facility
            </div>
            <div className="font-inter font-400 text-[14px] py-8">
              <input
                value={newFacility}
                onChange={(e) => setNewFacility(e.target.value)}
                className="border-b-2 p-1 border-gray-300 text-[#A7A7A7] focus:outline-none"
                placeholder="Facility Title"
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setPopupId("");
                  setNewFacility("");
                }}
                className="w-[100px] h-[32px] text-[#8A8A8A] border border-[#8A8A8A] text-[12px] font-500 font-inter rounded-[6px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                className="w-[100px] h-[32px] bg-[#21ABA5] text-white text-[12px] font-500 font-inter rounded-[6px] cursor-pointer"
                onClick={handleAddFacility}
              >
                Ok
              </button>
            </div>
          </div>
        </Popup>
      </ShowComponent>
      <ShowComponent condition={popupId === "inviteManager"}>
        <Popup
          setPopup={() => setPopupId("")}
          className="w-[30%] 2xl:w-[40%] pl-[30px]"
        >
          <div className="px-3 pb-3 text-center">
            <div className="font-inter font-700 text-[18px] text-[#17908B]">
              Invite Manager
            </div>
            <div className="font-inter font-400 text-[14px] py-8">
              <input
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                className="border placeholder:text-[#A7A7A7] pl-[10px] p-1 rounded-[6px] w-full h-[40px] border-[#C7C7C7] text-[#A7A7A7] focus:outline-none"
                placeholder="Enter Name"
              />
            </div>
            <div className="font-inter font-400 text-[14px] py-8">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border placeholder:text-[#A7A7A7] pl-[10px] p-1 rounded-[6px] w-full h-[40px] border-[#C7C7C7] text-[#A7A7A7] focus:outline-none"
                placeholder="Enter email to send invite"
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="w-[100px] h-[32px] bg-[#21ABA5] text-white text-[12px] font-500 font-inter rounded-[6px] cursor-pointer"
                onClick={handleSendInvite}
              >
                Send Invite
              </button>
            </div>
          </div>
        </Popup>
      </ShowComponent>
      <div className="w-full flex">
        <div className="justify-center items-center h-full w-full p-3">
          <div className="text-center font-montserrat font-500 text-[18px] text-[#17908B]">
            Mosque Info
          </div>
          <div className="text-center flex flex-col items-center mt-4 relative">
            {logo ? (
              <div className="relative w-[100px] h-[100px]">
                <img
                  src={logo == showImage ? logo : URL.createObjectURL(logo)}
                  alt="Mosque Logo Preview"
                  className="w-full h-full rounded-full object-cover"
                  style={{ border: "2px solid #21ABA5" }}
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
                  className="absolute right-0 bottom-1 w-[16px] h-[16px] cursor-pointer"
                  onClick={handleLogoClick}
                />
              </div>
            ) : (
              <div
                className="relative w-[100px] h-[100px] border-[#21ABA5] border-2 flex flex-col items-center justify-center rounded-full cursor-pointer"
                onClick={handleLogoClick}
              >
                <img
                  src={penIcon}
                  alt="pen icon"
                  className="absolute right-0 bottom-1 w-[16px] h-[16px] cursor-pointer"
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
          <div className="flex justify-between">
            <div className="w-[45%] mb-[12px]">
              <button
                className="flex items-center gap-[8px] cursor-pointer font-inter font-medium text-[14px] text-white bg-[#21ABA5] rounded-[6px] py-[8px] px-[12px]"
                onClick={() => setPopupId("inviteManager")}
              >
                <img src={add} alt="add" className="w-[16px] h-[16px]" />
                Assign Manager to a Mosque
              </button>
            </div>
          </div>
          {mosqueStatus !== "PENDING" && (
            <div className="flex justify-end w-[96%]">
              Request Status:&nbsp;
              <span
                className={`${
                  mosqueStatus === "APPROVED"
                    ? "text-[#007D1C]"
                    : "text-red-500"
                } text-[14px]`}
              >
                {mosqueStatus === "APPROVED" ? "Approved" : "Rejected"}
              </span>
            </div>
          )}
          {mosqueStatus === "PENDING" ? (
            <div className="flex justify-end w-[98%]">
              <div className="flex gap-[16px]">
                <button
                  disabled={loading}
                  onClick={handleReject}
                  className="text-[#000000] flex items-center gap-[8px] font-inter cursor-pointer font-normal text-[14px] pt-[8px] pb-[8px] px-[16px] border-[1px] border-[#A4A4A4] rounded-[6px]"
                >
                  <img
                    style={{ height: "10px" }}
                    src={crossIcon}
                    alt="cross icon"
                  />
                  Decline
                </button>
                <button
                  onClick={handleApprove}
                  disabled={loading}
                  className="text-[#FFFFFF] disabled:bg-[#a8ede9] disabled:cursor-not-allowed bg-[#21ABA5] flex items-center gap-[8px] font-inter font-normal cursor-pointer text-[14px] pt-[8px] pb-[8px] px-[16px] border-[1px] border-[#A4A4A4] rounded-[6px]"
                >
                  <img
                    style={{ height: "12px", width: "12px" }}
                    src={approveIcon}
                    alt="approve icon"
                  />
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
                    className="flex items-center justify-around mt-3"
                  >
                    <div className="flex w-[45%] items-center gap-[8px]">
                      <img
                        src={dummyProfile}
                        alt=""
                        className="w-[24px] h-[24px]"
                      />
                      <p className="text-[#000000] font-inter font-normal text-[14px]">
                        {manager.email}
                      </p>
                    </div>
                    <div className="w-[45%] flex justify-end">
                      <button
                        className="text-[#21ABA5] cursor-pointer border-[1px] rounded-[6px] text-[14px] font-normal font-inter py-2 px-[24px]"
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
          <div className="mb-4 mt-[24px]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex w-full justify-around">
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[14px] text-[#8A8A8A]"
                    htmlFor="name"
                  >
                    Mosque Name
                  </label>
                  <div className="h-[40px] mt-1">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-full focus:outline-[#21ABA5] border-[#C7C7C7] border-[1px] rounded-[6px] text-[#2F2F2F] text-[14px] font-inter font-400 pl-2 focus:border-green-custom-green"
                    />
                  </div>
                </div>
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[14px] text-[#8A8A8A]"
                    htmlFor="landmark"
                  >
                    Nearest Landmark
                  </label>
                  <div className="h-[40px] mt-1">
                    <input
                      type="text"
                      id="landmark"
                      name="landmark"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full h-full focus:outline-[#21ABA5] border-[#C7C7C7] border-[1px] rounded-[6px] text-[#2F2F2F] text-[14px] font-inter font-400 pl-2 focus:border-green-custom-green"
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-around">
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[14px] text-[#8A8A8A]"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <div className="h-[40px] mt-1">
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full h-full focus:outline-[#21ABA5] border-[#C7C7C7] border-[1px] rounded-[6px] text-[#2F2F2F] text-[14px] font-inter font-400 pl-2 focus:border-green-custom-green"
                    />
                  </div>
                </div>
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[14px] text-[#8A8A8A]"
                    htmlFor="state"
                  >
                    State/Province
                  </label>
                  <div className="h-[40px] mt-1">
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full h-full focus:outline-[#21ABA5] border-[#C7C7C7] border-[1px] rounded-[6px] text-[#2F2F2F] text-[14px] font-inter font-400 pl-2 focus:border-green-custom-green"
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-around">
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[14px] text-[#8A8A8A]"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <div className="h-[40px] mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-full focus:outline-[#21ABA5] border-[#C7C7C7] border-[1px] rounded-[6px] text-[#2F2F2F] text-[14px] font-inter font-400 pl-2 focus:border-green-custom-green"
                    />
                  </div>
                </div>
                <div className="w-[45%]">
                  <label
                    className="font-400 font-inter text-[14px] text-[#8A8A8A]"
                    htmlFor="postal"
                  >
                    Postal Code
                  </label>
                  <div className="h-[40px] mt-1">
                    <input
                      type="text"
                      id="postal"
                      name="postal"
                      value={postal}
                      onChange={(e) => setPostal(e.target.value)}
                      className="w-full h-full focus:outline-[#21ABA5] border-[#C7C7C7] border-[1px] rounded-[6px] text-[#2F2F2F] text-[14px] font-inter font-400 pl-2 focus:border-green-custom-green"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-around  ">
                <div className="w-[45%]   ">
                  <label
                    className="font-400 font-inter text-[14px] text-[#8A8A8A]"
                    htmlFor="address"
                  >
                    Street Address
                  </label>
                  <div className="h-[40px] mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={address}
                      // onChange={(e) => setAddress(e.target.value)}
                      className="w-full h-full border-[#C7C7C7] border-[1px] rounded-[8px] text-[#2F2F2F] text-[14px] font-inter font-400 pl-2 focus:border-green-custom-green focus:outline-none"
                    />
                  </div>
                </div>

                <div className=" w-[45%]  mt-1 ">
                  <label
                    htmlFor=""
                    className="font-400 font-inter text-[14px]  text-[#8A8A8A]"
                  >
                    Select Location
                  </label>
                  <div className="border-[#C7C7C7] relative mt-1 flex items-center justify-end h-[40px] border-[1px] rounded-[8px] text-[#2F2F2F] text-[14px] ">
                    <p className="font-400 font-inter text-[14px] text-[#8A8A8A] absolute left-4">
                      {/* {addressFromGoogle
                        ? addressFromGoogle
                        : "Select Location"} */}
                      {latitude}&nbsp;{longitude}
                    </p>
                    <button type="button" onClick={toggleMap}>
                      <img src={locationIcon} alt="" className="w-8 mr-3" />
                    </button>
                  </div>
                </div>
              </div>

              {showMap && latitude && longitude && (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={6}
                  center={center}
                  onClick={onMapClick}
                >
                  <Marker
                    position={{
                      lat: parseFloat(latitude),
                      lng: parseFloat(longitude),
                    }}
                  />
                </GoogleMap>
              )}
              <div className="flex w-[95%] mx-auto">
                <div className="w-[47%]">
                  <label
                    className="font-400 font-inter text-[14px] text-[#8A8A8A]"
                    htmlFor="contact"
                  >
                    Contact No.
                  </label>
                  <div className="h-[40px] mt-1">
                    <input
                      type="number"
                      id="contact"
                      name="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full h-full focus:outline-[#21ABA5] border-[#C7C7C7] border-[1px] rounded-[6px] text-[#2F2F2F] text-[14px] font-inter font-400 pl-2 focus:border-green-custom-green"
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 mb-8">
                <div className="text-[18px] font-inter font-500 mt-3">
                  Facilities
                </div>
                <div className="mt-2"></div>
                {allFacilities.map((facility, index) => (
                  <div className="flex justify-between mt-1" key={index}>
                    <div className="flex font-400 font-inter text-[14px] text-[#6F6F6F]">
                      <div>{index + 1}.</div>
                      <div className="ml-2">{facility}</div>
                    </div>
                    <CustomCheckbox
                      checked={selectedFacilities.includes(facility)}
                      onChange={() => handleCheckboxChange(facility)}
                    />
                  </div>
                ))}
                <div
                  className="flex text-[#21ABA5] text-[14px] font-inter font-400 ml-4"
                  onClick={() => setPopupId("facility")}
                >
                  <div className="mr-2">+</div>
                  <div className="underline underline-offset-1 cursor-pointer">
                    Add a Facility
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={buttonDisable}
                  className="w-[200px] h-[40px] bg-[#17908B] text-white rounded-[6px] font-500 font-inter text-[14px]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateMosqueProfile;
