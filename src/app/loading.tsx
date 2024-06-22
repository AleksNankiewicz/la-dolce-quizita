"use client";
import React from "react";

import { Grid } from "react-loader-spinner";

export const Loading = () => {
  return (
    <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
      <div className="">
        <Grid
          visible={true}
          height="120"
          width="120"
          color="#9333ea"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    </div>
  );
};

export default Loading;
