import React from "react";
import { Gem, Sparkles } from "lucide-react";
import CreationItem from "../components/CreationItem";
import { useQuery } from "@tanstack/react-query";
import { getUserCreations } from "../API/api";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

function Dashboard() {
   const { user } = useSelector((state) => state.auth);


  const {data,isLoading}=useQuery({
    queryKey:["creation"],
    queryFn:getUserCreations,
  })

  return (
    <div className="h-full overflow-y-scroll p-6 ">
      {/* CARD CONTAIN */}
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total creation card */}
        <div className="flex justify-between items-center w-72 p-4 px-6  rounded-xl    bg-slate-100/40">
          <div className="text-slate-800 ">
            <p className="text-sm">Total Creation</p>
            <h2 className="text-xl font-semibold">{data?.creations?.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center ">
            <Sparkles className="w-5 text-white " />
          </div>
        </div>
        {/* Active Plan card*/}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-slate-100/40 rounded-xl ">
          <div className="text-slate-800 ">
            <p className="text-sm">Active Plan </p>
            <h2 className="text-xl font-semibold">
             {user.plan}
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center ">
            <Gem className="w-5 text-white " />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="mt-6 text-[#f8fafc] mb-4">Recent Creation</p>
        {isLoading&&<Loader/>}
        {data?.creations?.map((item) => (
          <CreationItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
