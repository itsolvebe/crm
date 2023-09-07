import React, { useState } from "react";
import Card from "components/card";
import Modal from "./Modal";
import defaultAvatar from "assets/img/profile/default-profile.jpg";
import { updateUser } from "features/auth/authActions";
import { useDispatch } from "react-redux";
import { updateUserRole } from "features/auth/authActions";
import { userDelete } from "features/auth/authActions";

const Table = ({ tableHeaders, tableData }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState("");

  const handleCheck = (e, user) => {
    e.preventDefault();
    // setUpdatedInfo({ _id: user._id, role: e.target.value });
    // eslint-disable-next-line no-restricted-globals
    let confirmMsg = confirm("Are you sure?");
    const updatedInfo = { _id: user._id, role: e.target.value };
    if (confirmMsg) {
      dispatch(updateUserRole(updatedInfo));
      console.log("Üser Roles", user._id, e.target.value);
    }
  };

  const showModal = (id) => {
    setShow(true);
    setUserId(id);
  };

  const hideModal = () => {
    setShow(false);
  };

  const handleDelete = () => {
    setShow(false);
    dispatch(userDelete(userId));
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
                          src={
                            user.picture
                              ? `https://booming-spectrum-melon.glitch.me/api/${user.picture}`
                              : defaultAvatar
                          }
                          alt="avatar"
                          className="h-[50px] w-[50px] rounded-full"
                        />
                      </div>
                      <div>
                        <p className="pt-[14px] text-sm font-bold text-navy-700 dark:text-white sm:text-[14px]">
                          {user.firstName} {user.lastName}
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
                      onChange={(e) => handleCheck(e, user)}
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
                      onClick={() => showModal(user._id)}
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
