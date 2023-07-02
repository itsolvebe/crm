import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import { tableHeaders } from "./variables/columnsData";
import { getAllUsers } from "features/auth/authActions";
import { useDispatch, useSelector } from "react-redux";

const UsersManaged = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([
    {
      firstName: "mustafa",
      email: "mustafa@gmail.com",
      company: "itsolve",
      role: "Admin",
    },
    {
      firstName: "shimul",
      email: "shimul@gmail.com",
      company: "empg",
      role: "User",
    },
    {
      firstName: "rayaan",
      email: "rayaan@gmail.com",
      company: "7vals",
      role: "Ticket manager",
    },
    {
      firstName: "hamza",
      email: "hamza@gmail.com",
      company: "arbisoft",
      role: "Admin",
    },
  ]);

  useEffect(() => {}, []);

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 ">
        <Table tableHeaders={tableHeaders} tableData={users} />
      </div>
    </div>
  );
};

export default UsersManaged;
