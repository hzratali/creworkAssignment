"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./_components/Sidebar.jsx";
import MainBoard from "./_components/MainBoard";
import { instance } from "./axiosConfig.ts";
import { useRouter } from "next/navigation";
import Spinner from "./_components/Spinner.jsx";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await instance.get("/authenticated");
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <div className="relative h-screen w-screen">
        <div className="flex items-center absolute top-1/2 left-1/2 gap-4 -translate-x-1/2 -translate-y-1/2">
          <p className="text-2xl self-end mt-2">Loading...</p>
          <Spinner />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return router.push("/signin");
  }

  return (
    <div className="w-full max-h-screen flex relative">
      <Sidebar />
      <MainBoard />
    </div>
  );
};

export default Dashboard;
