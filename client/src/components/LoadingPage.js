import React from "react";
import { useSelector } from "react-redux";

const LoadingPage = () => {
  const isLoadingPage = useSelector((state) => state.auth.loading);

  if (isLoadingPage) {
    return <div>Loading...</div>; // Replace with your loading page component
  }

  return null;
};

export default LoadingPage;
