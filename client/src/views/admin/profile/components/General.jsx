import Card from "components/card";
import React, { useState,useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { MdDone, MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "features/auth/authActions";

const General = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [edit, setEdit] = useState(true)
  const [updatedInfo, setUpdatedInfo] = useState({
    email: "",
    phoneNumber: "",
    designation: "",
    company: "",
    address: "",
    nationality: "",
  });

  useEffect(() => {
    setUpdatedInfo({
      _id: userInfo._id,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      designation: userInfo.designation,
      company: userInfo.company,
      address: userInfo.address,
      nationality: userInfo.nationality,
    });
  }, []);

  const updateInfo = () => {
    dispatch(updateUser(updatedInfo));
    setEdit(!edit);
  };

  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 flex justify-between mb-2 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          General Information
        </h4>
        <div className="mr-4 flex items-center justify-center cursor-pointer text-blue-600 dark:text-white">

        {edit ? (
            <button
              onClick={() => {
                setEdit(!edit);
              }}
              className="rounded-md p-1 hover:bg-blue-100"
            >
              <MdModeEditOutline size={20} />
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setEdit(!edit);
                }}
                className="rounded-md p-1 hover:bg-red-100"
              >
                <IoClose size={23} color="red" />
              </button>
              <button
                onClick={() => updateInfo()}
                className="rounded-md p-1 hover:bg-green-100"
              >
                <MdDone size={23} color="green" />
              </button>
            </>
          )}
        </div>
        {/* <p className="mt-2 px-2 text-base text-gray-600">
          As we live, our hearts turn colder. Cause pain is what we go through
          as we become older. We get insulted by others, lose trust for those
          others. We get back stabbed by friends. It becomes harder for us to
          give others a hand. We get our heart broken by people we love, even
          that we give them all...
        </p> */}
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email</p>
          <input   className={`block w-full rounded-md border-0 pl-1 py-1.5 text-gray-900 bg-white ring-inset ring-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-navy-900 dark:text-white ${!edit && "ring-blue-600 ring-2"}`} disabled={edit}
            value={updatedInfo.email}
            onChange={(e) =>
              setUpdatedInfo({ ...updatedInfo, email: e.target.value })
            } />
          
  
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Phone</p>
          <input className={`block w-full rounded-md border-0 pl-1 py-1.5 text-gray-900 bg-white ring-inset ring-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-navy-900 dark:text-white ${!edit && "ring-blue-600 ring-2"}`} disabled={edit}
            value={updatedInfo.phoneNumber}
            onChange={(e) =>
              setUpdatedInfo({ ...updatedInfo, phoneNumber: e.target.value })
            }  />
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Designation</p>
          <input
            className={`block w-full rounded-md border-0 bg-white py-1.5 pl-1 text-gray-900 outline-none ring-0 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-navy-900 dark:text-white ${
              !edit && "ring-2 ring-blue-600"
            }`}
            value={updatedInfo.designation}
            onChange={(e) =>
              setUpdatedInfo({ ...updatedInfo, designation: e.target.value })
            }
            disabled={edit}
          />
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Company</p>
          <input
            className={`block w-full rounded-md border-0 bg-white py-1.5 pl-1 text-gray-900 outline-none ring-0 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-navy-900 dark:text-white ${
              !edit && "ring-2 ring-blue-600"
            }`}
            value={updatedInfo.company}
            onChange={(e) =>
              setUpdatedInfo({ ...updatedInfo, company: e.target.value })
            }
            disabled={edit}
          />
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Address</p>
          <input
            className={`block w-full rounded-md border-0 bg-white py-1.5 pl-1 text-gray-900 outline-none ring-0 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-navy-900 dark:text-white ${
              !edit && "ring-2 ring-blue-600"
            }`}
            value={updatedInfo.address}
            onChange={(e) =>
              setUpdatedInfo({ ...updatedInfo, address: e.target.value })
            }
            disabled={edit}
          />
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Nationality</p>
          <input
            className={`block w-full rounded-md border-0 bg-white py-1.5 pl-1 text-gray-900 outline-none ring-0 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-navy-900 dark:text-white ${
              !edit && "ring-2 ring-blue-600"
            }`}
            value={updatedInfo.nationality}
            onChange={(e) =>
              setUpdatedInfo({ ...updatedInfo, nationality: e.target.value })
            }
            disabled={edit}
          />
        </div>
      </div>
    </Card>
  );
};

export default General;
