import React, { useState } from "react";
import defaultAvatar from "assets/img/profile/default-profile.jpg";
import banner from "assets/img/profile/banner2.jpg";
import Card from "components/card";
import { useDispatch, useSelector } from "react-redux";

import { MdAddPhotoAlternate, MdDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { updateUser } from "features/auth/authActions";
import { Toaster, toast } from "react-hot-toast";

const Banner = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(null);
  const [confirmation, setConfirmation] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop();

      // Check for invalid file name
      if (fileName.includes(" ")) {
        toast.error("Invalid file name. File name cannot contain spaces.");
        return;
      }

      // Check for invalid file type
      if (!isValidExtension(fileExtension)) {
        toast.error(
          "Invalid file type. Only JPG, JPEG, and PNG files are allowed."
        );
        return;
      }

      // File is valid, proceed with further processing
      setAvatar(file);
      setConfirmation(true);
    }
  };

  const updateInfo = () => {
    dispatch(updateUser({ avatar, _id: userInfo._id }));
    setConfirmation(false);
    window.location.reload(false);
  };

  console.log("testttt", avatar, confirmation);

  const isValidExtension = (extension) => {
    const allowedExtensions = ["jpg", "jpeg", "png"];
    return allowedExtensions.includes(extension.toLowerCase());
  };

  return (
    <>
      <Toaster />
      <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
        {/* Background and profile */}
        <div
          className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-primary dark:!border-navy-700">
            <div
              className={`relative h-full w-full rounded-full bg-cover bg-center`}
              style={{
                backgroundImage: `url(${
                  avatar
                    ? URL.createObjectURL(avatar)
                    : userInfo?.picture
                    ? `http://localhost:4000/${userInfo?.picture}`
                    : defaultAvatar
                })`,
              }}
            >
              {confirmation ? (
                <div className="absolute -bottom-4 flex w-full items-center justify-center">
                  <div className="rounded-md bg-white">
                    <button
                      onClick={() => {
                        setAvatar(null);
                        setConfirmation(false);
                      }}
                      className="rounded-md p-1 hover:bg-red-100"
                    >
                      <IoClose size={23} color="red" />
                    </button>
                    <button
                      onClick={() => updateInfo()}
                      className="rounded-md  p-1 hover:bg-green-100"
                    >
                      <MdDone size={23} color="green" />
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="file-upload"
                  style={uploadIconStyle}
                  className="absolute top-0 right-0"
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {/* Place your upload icon here */}
                  {/* <i className="material-icons">cloud_upload</i> */}
                  <MdAddPhotoAlternate className="text-primary" />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Name and position */}
        <div className="mt-16 flex flex-col items-center">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            {userInfo.firstName} {userInfo.lastName}
          </h4>
          <p className="text-base font-normal text-gray-600">{userInfo.role}</p>
        </div>

        {/* Post followers */}
        {/* <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
          <p className="text-sm font-normal text-gray-600">Posts</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            9.7K
          </p>
          <p className="text-sm font-normal text-gray-600">Followers</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            434
          </p>
          <p className="text-sm font-normal text-gray-600">Following</p>
        </div>
      </div> */}
      </Card>
    </>
  );
};

const uploadIconStyle = {
  background: "white",
  borderRadius: "50%",
  padding: "5px",
  cursor: "pointer",
};

export default Banner;
