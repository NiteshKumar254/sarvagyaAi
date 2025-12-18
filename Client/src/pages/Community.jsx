import { useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";


const Community = () => {
  const [creations, setCreations] = useState([]);
  const {user} = useUser();
  const [loading, setLoading] = useState(true)
  const {getToken} = useAuth();

  const fetchCreations = async () => {
    try {
      console.log(await getToken())
      const {data} = await axios.get('/api/user/get-published-creations', {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })
      if(data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  };

  const imageLikeToggle = async (id)=>{
    try {
      const {data} = await axios.post('/api/user/toggle-like-creation', {id}, {
      headers: {Authorization: `Bearer ${await getToken()}`}
      })
      if(data.success) {
        toast.success(data.message)
        await fetchCreations()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);
  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      Creations
      <div className='bg-white h-full w-full rounded-xl overflow-y-scroll'>
        {creations.map((creation, index) => (
          <div key={index} className='relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3'>
            <img src={creation.content || ''} alt={`Creation ${index + 1}`} className='w-full h-auto rounded-lg shadow-md' />  

            <div className='absolute bottom-0 top-0 left-3 right-0 gap-2 p-3 rounded-lg flex justify-end items-end opacity-100 group-hover:bg-gradient-to-b from-transparent to to-black/80 text-white'>
              <p className='text-sm mr-30 hidden group-hover:block'>{creation.prompt}</p>
              <div className='flex items-center gap-2'>
                <p>{creation.likes.length}</p>
                <Heart onClick={()=> imageLikeToggle(creation.id)} className={`w-5 h-5 ${(creation.likes || []).includes(user?.id) ? 'text-red-500' : 'text-gray-400'} cursor-pointer hover:scale-110`} />

              </div>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Community