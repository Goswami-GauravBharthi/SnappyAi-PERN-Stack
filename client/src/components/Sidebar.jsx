import React, { useEffect } from "react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users2,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../store/authSlice";
import { LogoutUser } from "../API/api";
import toast from "react-hot-toast";
const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write article", Icon: SquarePen },
  { to: "/ai/blog-title", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users2 },
];

function Sidebar({ sidebar, setSidebar }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await LogoutUser();

    if (res.success) {
      dispatch(setLogout);
      navigate("/");
      window.location.reload();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div
      className={`w-60  bg-gradient-to-t from-[#010106] via-[#080a26] to-[#101844] border-r z-50 border-gray-600 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 transition-all duration-400 ${
        sidebar ? `translate-x-0` : `max-sm:-translate-x-full`
      } ease-in-out`}
    >
      <div className="my-7 w-full">
        <img src={user.avatar} alt="" className="w-13 rounded-full mx-auto" />
        <h1 className="mt-1 text-center text-[#f8fafc]">{user.name}</h1>
        <div className="px-6 mt-5 text-sm  text-slate-300/80 font-medium ">
          {navItems.map(({ to, label, Icon }, index) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 flex items-center gap-3 rounded ${
                  isActive
                    ? `bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white`
                    : ``
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : ``}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="w-full  p-4 px-7 flex items-center justify-between">
        <div className="flex gap-2 items-center cursor-pointer ">
          <img src={user.avatar} className="w-8 rounded-full " alt="" />
          <div>
            <h1 className="text-sm text-[#f8fafc] font-medium">{user.name}</h1>
            <p className="text-sm text-gray-400">
              {user.plan}
              Plan
            </p>
          </div>
        </div>
        <LogOut
          onClick={handleLogout}
          className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Sidebar;
