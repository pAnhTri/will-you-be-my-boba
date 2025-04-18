"use client";
import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    document.body.style.padding = "0";
    // on unmount
    return () => {
      document.body.style.padding = "";
    };
  }, []);

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="flex justify-center items-center rounded-full border border-black h-24 w-24 animate-bounce">
        LOADING
      </div>
    </div>
  );
};

export default Loading;
