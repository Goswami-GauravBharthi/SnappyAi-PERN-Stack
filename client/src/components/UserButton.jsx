import React from "react";
import { ArrowRight } from "lucide-react";
import { LogoutUser } from "../API/api";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/authSlice";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const UserButton = ({ avatar }) => {
  const queryClient = useQueryClient();
  const { mutate, refetch } = useMutation({
    mutationFn: LogoutUser,
    onSuccess: (data) => {
      dispatch(setLogout);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const dispatch = useDispatch();

  const handleLogout = async () => {
    mutate();
    window.location.reload();
  };

  return (
    <div className=" h-10 w-10   relative group">
      <img src={avatar} alt="avatar" className="w-full h-full rounded-full " />

      <div className="hidden group-hover:block">
        <button
          onClick={handleLogout}
          className="w-20 bg-white absolute -bottom-10 -left-3  items-center justify-center px-5 py-2 rounded-4xl cursor-pointer flex  "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export const NormalButton = ({ navigate }) => {
  return (
    <div className="bg-white  rounded-md  hover:bg-slate-200 transition-all">
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 text-md cursor-pointer  bg-white  px-5 py-2.5 bg-gradient-to-l from-indigo-500 via-red-500 to-blue-500 text-transparent bg-clip-text"
      >
        Get started <ArrowRight className="w-4 h-4  text-black " />
      </button>
    </div>
  );
};
