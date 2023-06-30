import Card from "components/card";
import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useSelector } from "react-redux";


const General = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [edit, setEdit] = useState(true)
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 flex justify-between mb-2 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          General Information
        </h4>
        <div className="mr-4 flex items-center justify-center cursor-pointer text-blue-600 dark:text-white">

          <MdModeEditOutline onClick={()=>{ setEdit(!edit)}} />
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
          <input   className={`block w-full rounded-md border-0 pl-1 py-1.5 text-gray-900 bg-white ring-inset ring-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-navy-900 dark:text-white ${!edit && "ring-blue-600 ring-2"}`} disabled={edit} value= {userInfo.email} />
          
  
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Phone</p>
          <input className={`block w-full rounded-md border-0 pl-1 py-1.5 text-gray-900 bg-white ring-inset ring-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-navy-900 dark:text-white ${!edit && "ring-blue-600 ring-2"}`} disabled={edit} value={userInfo.phoneNumber}  />
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Designation</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {userInfo.designation}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Company</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {userInfo.company}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Address</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {userInfo.addresse}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Nationality</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {userInfo.nationality}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;
