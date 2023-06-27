import React from 'react'

const Modal = ({hideModal, handleDelete}) => {
  return (
    <div className='absolute top-0 left-0 z-20 w-[100%] h-[100%] flex justify-center items-center'>
        <div className='absolute z-30 bg-gray-400 w-[100%] h-[100%] opacity-20'>

        </div>
        <div className="relative z-50 flex flex-col gap-5 bg-white p-5 min-w-[350px] border border-slate-900 rounded-md">
            <header>
                <div className="text-xl font-bold text-navy-700 dark:text-white">Delete Confirmation</div>
            </header>
            <div className='p-2 py-2 bg-red-100'>
                <p >Are you sure You want to delete?</p>
            </div>
            <div className='flex justify-end gap-3'>
                <button className='text-xs text-slate-900 hover:bg-gray-200 rounded-md px-2 py-1' onClick={hideModal}>Cancel</button>
                <button className='text-xs text-white bg-red-400 hover:bg-red-500 rounded-md px-2 py-1' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default Modal