import React from 'react'
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { useClerk, UserButton,useUser } from '@clerk/clerk-react';

const Navbar = () => {
    const navigate = useNavigate();
    const {user} = useUser();
    const {openSignIn} = useClerk();
  return (
    <div 
    className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32' >
        <img src="/Saarvagya_logo.png" alt="Saavagya logo" className='w-34 sm:w-45 cursor-pointer' onClick={()=>navigate("/")}/>
        { 
          user ? <UserButton /> 
          :
           (
        <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-blue-700 text-white px-10 py-2.5'>
          Get started <ArrowRight className='w-4 h-4'/></button>
          )
        }
    </div>
  )
}

export default Navbar