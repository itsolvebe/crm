import React,{useState,useEffect} from 'react'
import Table from "./components/Table";
import {tableHeaders} from "./variables/columnsData"
import {getAllUsers} from 'features/auth/authActions'
import { useDispatch,useSelector } from 'react-redux';

const UsersManaged = () => {
  const dispatch = useDispatch()
  const [users,setUsers] = useState([{firstName:'mustafa', active:true},{firstName:'shimul', active:false},{firstName:'rayaan', active:true},{firstName:'hamza', active:false}])
    useEffect(()=>{
         
    },[])

    

  return(
    <div >
      <div className="mt-5 grid h-full grid-cols-1 gap-5 ">
        <Table tableHeaders={tableHeaders} tableData={users}/>
      </div>
    </div>);
};

export default UsersManaged;
