import { Protect, useAuth } from "@clerk/clerk-react";
import {
  Coins,
  CoinsIcon,
  Currency,
  DollarSignIcon,
  Gem,
  Sparkles,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import CreationItems from "../components/CreationItems";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";



const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true)
  const {getToken} = useAuth();

  const getDashboardData = async () => {
    try {
  console.log(await getToken())
  const {data} = await axios.get('/api/user/get-user-creations', {
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

  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-teal-200 rounded-xl border border-gray-200">
          <div className="text-gray-800">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9defe5] to-[#098b71] flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        <div className="flex justify-between items-center w-72 p-4 px-6 bg-purple-200 rounded-xl border border-gray-200">
          <div className="text-gray-800">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">
                premium
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c69def] to-[#55098b] flex justify-center items-center">
            <Coins className="w-5 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="mt-6 mb-4">Recent Creations</p>
        {
          creations.map((item)=> <CreationItems key={item.id} item={item} />)
        }
      </div>

    </div>
  );
};

export default Dashboard;
