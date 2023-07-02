import React, { useState } from "react";
import Card from "components/card";
import Modal from "./Modal";
import avatar from "assets/img/avatars/avatarSimmmple.png";

const Table = ({ tableHeaders, tableData }) => {
  const [show, setShow] = useState(false);

  const handleCheck = (e, index) => {
    e.preventDefault();
    console.log(index, e.target.value);
  };

  const showModal = (index) => {
    setShow(true);
    console.log(index);
  };

  const hideModal = () => {
    setShow(false);
  };

  const handleDelete = () => {
    setShow(false);
  };

  return (
    <div>
      {show && <Modal hideModal={hideModal} handleDelete={handleDelete} />}
      <Card extra={"w-full pb-10 p-4 h-full"}>
        <header className="relative flex items-center justify-between ">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            All Users
          </div>
          <div>
            <button className="linear rounded-md bg-navy-700 px-3 py-2 text-base font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 dark:active:bg-blue-200">
              Add User
            </button>
          </div>
        </header>
        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <table className="w-full">
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                      {header}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((user, index) => (
                <tr key={index} className="border-b">
                  <td>
                    <div className="flex items-center gap-4 py-2">
                      <div>
                        <img
                          src={avatar}
                          alt="avatar"
                          className="h-[50px] w-[50px] rounded-full"
                        />
                      </div>
                      <div>
                        <p className="pt-[14px] text-sm font-bold text-navy-700 dark:text-white sm:text-[14px]">
                          {user.firstName}
                        </p>
                        <p className="pt-1 pb-[20px] text-sm font-medium text-gray-600 dark:text-white sm:text-[14px]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-slate-700 pt-[14px] pb-[20px] text-sm font-medium dark:text-white sm:text-[14px]">
                      {user.company}
                    </p>
                  </td>
                  <td>
                    <select
                      className="text-xs font-bold text-navy-700 dark:text-navy-700 sm:text-[14px]"
                      onChange={(e) => handleCheck(e, index)}
                      value={user.role}
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                      <option value="Ticket manager">Ticket manager</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="ml-3 rounded-md bg-red-400 px-2 py-1 text-xs text-white hover:bg-red-500"
                      onClick={() => showModal(index)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Table;
