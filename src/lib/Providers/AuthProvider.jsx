/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { setUserData } from "../../redux/features/authantication/authanticationSlice";
import { useGetProfileQuery } from "../../redux/features/authantication/AuthenticationApi";
import ThemeProvider from "./ThemeProvider";
import { useDispatch } from "react-redux";
import { Spin } from "antd";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProfileQuery();
  useEffect(() => {
    if (!isLoading) {
      dispatch(
        setUserData({
          user: data?.data ?? null,
        })
      );
    }
  }, [data, isLoading]);
  if (isLoading) {
    return (
      <div
        className={`h-screen w-full flex flex-col justify-center items-center`}
      >
        <Spin size="large" className="flex justify-center items-center" />
        <p className="mt-5 font-mono text-gray-500 text-center">
          Authenticating <br /> <span className="text-xs text-gray-400">Please wait</span>
        </p>
      </div>
    );
  }
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}
