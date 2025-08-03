import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { fetchCreations, likeToggle } from "../API/api";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";

function Community() {
  const [creations, setCreations] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);

  const { data } = useQuery({
    queryKey: ["creations"],
    queryFn: fetchCreations,
  });

  const fetchCreation = async () => {
    console.log("wireing");
    try {
      setIsLoading(true);
      const data = await fetchCreations();
      if (data.success) {
        setCreations(data.creations);
        console.log("creations : ", creations);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(data?.message);
    }
    setIsLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
      const data = await likeToggle(id);
      console.log(data)
      if (data.success) {
        toast.success(data.message);
        await fetchCreation();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreation();
      
    }
  }, [user]);
  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6 text-slate-400">
      Creations
      <div className=" h-full w-full rounded-xl overflow-y-scroll  bg-black/10  backdrop-blur-xs ">
        {isLoading&&<Loader/>}
        {creations?.map((creation, index) => (
          <div
            key={index}
            className="relative group  inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3 "
          >
            <img
              src={creation.content}
              alt=""
              className="w-full h-full object-cover rounded-lg "
            />
            <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
              <p className="text-sm hidden group-hover:block">
                {creation.prompt}
              </p>
              <div className="flex gap-1 items-center">
                <p>{creation.likes.length}</p>
                <Heart
                  onClick={() => imageLikeToggle(creation.id)}
                  className={`min-w-5 h-5 hover-scale-110 cursor-pointer ${
                    creation.likes.includes(user.user_id)
                      ? `fill-red-500 text-red-600`
                      : `text-white`
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
