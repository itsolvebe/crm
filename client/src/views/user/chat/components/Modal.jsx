import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "features/modal/modalSlice";
import Datepicker from "tailwind-datepicker-react";
import { useForm } from "react-hook-form";
import { createTicket } from "features/tickets/ticketActions";

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

export default function Modal(params) {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);
  const [deadline, setDeadline] = useState();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleChange = (selectedDate) => {
    setDeadline(selectedDate);
  };
  const handleClose = (state) => {
    setShow(state);
  };

  const submitForm = (data) => {
    const ticketData = {
      ...data,
      clientId: userInfo._id,
      deadline,
    };
    dispatch(createTicket(ticketData));
  };
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      submitForm(e);
    }
  };
  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-[#000000b0] pt-3">
      <div className="!z-5 relative flex h-[550px] w-[950px] flex-col rounded-[10px] bg-white bg-clip-border px-[30px] pt-[35px] pb-[40px] shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <form
          className="overflow-y-scroll px-6 pb-6"
          onSubmit={handleSubmit(submitForm)}
          encType="multipart/form-data"
        >
          <div className=" space-y-12   ">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className=" mb-3 border-b-2 pb-3 text-2xl font-semibold text-gray-900 dark:text-white">
                Open Ticket
              </h2>

              <div className=" grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6 ">
                <div className="col-span-full">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Subject
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      {...register("subject")}
                      onKeyDown={handleOnKeyDown}
                      autoComplete="subject"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-navy-900 dark:text-white sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Type of service
                  </label>
                  <div className="mt-2">
                    <select
                      id="service"
                      name="service"
                      {...register("service")}
                      onKeyDown={handleOnKeyDown}
                      autoComplete="service"
                      className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-navy-900 dark:text-white sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>App Development</option>
                      <option>Graphic Designing</option>
                      <option>Seo</option>
                    </select>
                  </div>
                </div>

                <div className=" sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Budget
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 dark:text-white sm:text-sm">
                        $
                      </span>
                    </div>
                    <input
                      type="text"
                      name="budget"
                      id="budget"
                      {...register("budget")}
                      onKeyDown={handleOnKeyDown}
                      className="block w-full rounded-md border-0  pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-navy-900 dark:text-white sm:text-sm sm:leading-6"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="deadline"
                    className="mb-2 block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Deadline
                  </label>
                  <Datepicker
                    options={options}
                    onChange={handleChange}
                    id="deadline"
                    show={show}
                    setShow={handleClose}
                  />
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      {...register("description")}
                      onKeyDown={handleOnKeyDown}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-navy-900 dark:text-white sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Upload files
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="files"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="files"
                            name="files"
                            {...register("files")}
                            onKeyDown={handleOnKeyDown}
                            type="file"
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF
                      </p>
                    </div>
                  </div>
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
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
