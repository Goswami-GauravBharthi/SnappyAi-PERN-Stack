import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./PAGES/Home";
import Layout from "./PAGES/Layout";
import Dashboard from "./PAGES/Dashboard";
import WriteArticle from "./PAGES/WriteArticle";
import BlogTitle from "./PAGES/BlogTitle";
import GenerateImages from "./PAGES/GenerateImages";
import RemoveBackground from "./PAGES/RemoveBackground";
import RemoveObject from "./PAGES/RemoveObject";
import ReviewResume from "./PAGES/ReviewResume";
import Community from "./PAGES/Community";

import toast, { Toaster } from "react-hot-toast";
import Login from "./PAGES/Login";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setUser } from "./store/authSlice";
import api, { getDataUser } from "./API/api";
import { useQuery } from "@tanstack/react-query";

function App() {
  const dispatch = useDispatch();
  
  const [isAuthChecked, setIsAuthChecked] = useState(false); // 🔒 Wait until auth is checked

  const { data: userData, refetch: refetchUser } = useQuery({
    queryKey: ["user"],
    queryFn: getDataUser,
    enabled: true, 
  });

  const checkAuth = async () => {
    try {
      const { data } = await api.get("/api/user/is-auth");

      if (data.success) {
        dispatch(setIsLogin(true));
        await refetchUser(); // ✅ Fetch user data
      }
    } catch (error) {
      toast.error("Auth check failed");
    } finally {
      setIsAuthChecked(true); // 🔓 Unlock UI
    }
  };

  // ✅ When app mounts
  useEffect(() => {
    checkAuth();
  }, []);

  // ✅ Update Redux store after data is fetched
  useEffect(() => {
    if (userData?.data) {
      dispatch(setUser({ user: userData.data }));
    }
  }, [userData]);

  if (!isAuthChecked) return <p>Loading...</p>;

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-title" element={<BlogTitle />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
