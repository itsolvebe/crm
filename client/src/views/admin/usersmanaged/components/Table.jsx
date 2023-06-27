import React,{useState} from 'react'
import Card from "components/card";
import Modal from './Modal';

const Table = ({tableHeaders, tableData }) => {
    const [show,setShow] = useState(false)

    const handleCheck = (e,index) => {
        e.preventDefault();
        console.log(index ,e.target.value);
    }

    const showModal = (index)=>{
       setShow(true)
       console.log(index);
    }

    const hideModal = () =>{
        setShow(false)
    }

    const handleDelete = () =>{
        setShow(false)
    }

  return (
    <div>
        {show && <Modal hideModal={hideModal} handleDelete={handleDelete}/>}
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
                            {tableHeaders.map((header,index)=>(
                                <th key={index} className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                                <p className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">{header}</p>
                            </th>
                            ))}
                            
                        </tr>
                    </thead>
                    <tbody>
                       {tableData.map((user,index) => (
                            <tr key={index}>
                                <td>
                                    <p className="text-sm font-bold text-navy-700 dark:text-white pt-[14px] pb-[20px] sm:text-[14px]">{user.firstName}</p>
                                </td>
                                <td>
                                <select className="text-xs font-bold text-navy-700 dark:text-white sm:text-[14px]" onChange={(e)=>handleCheck(e,index)}>
                                    <option>Admin</option>
                                    <option>User</option>
                                    <option>Ticket manager</option>
                                    <option>Employee</option>
                                </select>
                                </td>
                                <td>
                                    <button className='text-xs text-white bg-red-400 hover:bg-red-500 rounded-md px-2 py-1' onClick={()=>showModal(index)}>
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))
                       }
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
  )
}

export default Table