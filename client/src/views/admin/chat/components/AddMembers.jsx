import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { createTicket } from "features/tickets/ticketActions";
import { closeModal } from "features/tickets/ticketSlice";
import Select from "react-tailwindcss-select";
import { getAllUsers } from "features/auth/authActions";
import { addMembers } from "features/tickets/ticketActions";

const options = {
  title: "Set Project Deadline",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: " dark:bg-navy-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "",
    inputIcon: "",
    selected: "text-gray-50",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date("2022-01-01"),
  language: "en",
};

const userOptions = [
  { value: "fox", label: "🦊 Fox" },
  { value: "Butterfly", label: "🦋 Butterfly" },
  { value: "Honeybee", label: "🐝 Honeybee" },
];

export default function AddMembers({ selectedTicket }) {
  const [show, setShow] = useState(false);
  const [deadline, setDeadline] = useState();
  const [selectedUser, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const { userInfo, allUsers } = useSelector((state) => state.auth);

  const userHandleChange = (value) => {
    // console.log("value:", value);
    setUser(value);
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const submitForm = () => {
    const ticketData = {
      ticketId: selectedTicket._id,
      membId: selectedUser.map((users) => users.value),
    };
    console.log(selectedUser.map((users) => users.value));
    dispatch(addMembers(ticketData));
  };
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      submitForm(e);
    }
  };

  const convertedOptions = allUsers.map((obj) => ({
    value: obj._id,
    label: `${obj.firstName} ${obj.lastName}`,
  }));

  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-[#000000b0] pt-3">
      <div className="!z-5 relative flex  w-[500px] flex-col rounded-[10px] bg-white bg-clip-border px-[30px] pt-[35px] pb-[40px] shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className=" space-y-12   ">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className=" mb-3 border-b-2 pb-3 text-2xl font-semibold text-gray-900 dark:text-white">
              Add Member
            </h2>

            <div className=" grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6 ">
              <div className="col-span-full">
                <Select
                  value={selectedUser}
                  onChange={userHandleChange}
                  options={convertedOptions}
                  isSearchable={true}
                  isMultiple={true}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={handleCloseModal}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            // type="submit"
            onClick={() => submitForm()}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
