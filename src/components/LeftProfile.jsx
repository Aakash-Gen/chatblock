/* eslint-disable react/prop-types */
import { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FiLogOut } from "react-icons/fi";
import { useRef } from 'react';




function LeftProfile() {
    const navigate = useNavigate();
  const [ balance, setBalance ] = useState(null);

  const logOut = async () => {
    await localStorage.removeItem("jwt");
    navigate("/login");
  }
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
//   const [openSettings, setOpenSettings] = useState(false);



  const getBalance = async () => {
    const jwtKey = localStorage.getItem('jwt');

    try {
      const response = await axios.get('https://dev.neucron.io/v1/wallet/balance', {
        headers: {
          'accept': 'application/json',
          'Authorization': jwtKey
        }
      });

      // console.log(response['data']['data']['balance']['summary']);
      setBalance(response['data']['data']['balance']['summary'])

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col justify-between items-center h-screen bg-[#1e6fa4] text-white py-8 w-[22%]'>
      
      <div className='mt-6 flex flex-col gap-4 items-center'>
        <div className='flex flex-col items-center gap-1'>
          <img className='h-32 w-32 rounded-full' src={selectedImage} alt="" />
          
          <button className='hover:underline text-sm font-semibold' onClick={handleButtonClick} > change</button>
          {/* <FaPenAlt onClick={handleButtonClick} className='hover:cursor-pointer '/> */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
        </div>

        <div className='text-2xl font-bold'>
          Logged In User
        </div>

        <div className='flex flex-col gap-2 w-full pb-10'>

        <button onClick={getBalance} className="justify-center mb-10 py-1.5 px-6 w-full text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700">
          {balance === null ? 'Check Balance' : `${balance} Satoshi`} 
        </button>

        <NavBarButton name="Chatbot" onClick={() => navigate('/chatbot')}/>
        <NavBarButton name="Wallets" onClick={() => navigate('/wallets')}/>
        <NavBarButton name="Payments" onClick={() => navigate('/pay')}/>
        <NavBarButton name="Transactions" onClick={() => navigate('/transactions')}/>

        </div>

      </div>
      
      <div className='flex flex-col gap-2 w-full px-8'>
        <button onClick={logOut} className="w-full flex items-center gap-2 justify-center py-1.5 px-6 text-sm font-semibold text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
          Logout
          <FiLogOut/>
        </button>
      </div> 
    </div>
  )
}

export default LeftProfile

const NavBarButton = (props) => {
      return   (<button onClick={()=>props.onClick()} className='justify-center flex w-full items-center py-1.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700'>
            {props.name}
        </button>)
}


{/* {!openSettings &&(
            <button onClick={()=>setOpenSettings(true)} className='flex items-center justify-center gap-2 py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
            wallets
            <IoIosWallet/>
        </button>
        )}
        {openSettings &&(
            <div>
            <div className=' gap-4 fixed p-3 w-70vw max-h-[calc(100vh - 3.5rem)] bottom-28 transition-transform shadow-2xl bg-gray-200 rounded-md flex flex-col justify-start items-center font-semibold '>
                <div>profile change</div>
                <div>Wallets</div>
            </div>
            <button onClick={()=>setOpenSettings(false)} className='flex items-center justify-center gap-2 py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
            wallets
            <IoIosWallet/>
        </button>
            </div>
        )} */}