import React,{useState,useEffect} from 'react'
import Table from "./components/Table";
import {tableHeaders} from "./variables/columnsData"
import {getAllUsers} from 'features/auth/authActions'
import { useDispatch,useSelector } from 'react-redux';

const UsersManaged = () => {
  const dispatch = useDispatch()
  const [users,setUsers] = useState([ {firstName:'mustafa', role:"Admin"},
                                      {firstName:'shimul', role:"User"},
                                      {firstName:'rayaan', role:"Ticket manager"},
                                      {firstName:'hamza', role:'Admin'}
                                    ])

    useEffect(()=>{
         setUsers(getAllUsers)
    },[])

    

  return(
    <div >
      <div className="mt-5 grid h-full grid-cols-1 gap-5 ">
        <Table tableHeaders={tableHeaders} tableData={users}/>
      </div>
    </div>);
};

export default UsersManaged;
