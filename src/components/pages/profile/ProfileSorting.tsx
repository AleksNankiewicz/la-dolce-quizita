import React from "react";
import SortingPopover from "./SortingPopover";

type ProfileSortingProps = {
  title: string;
  length: number;
};

const ProfileSorting = ({ title, length }: ProfileSortingProps) => {
  return (
    <div className="flex justify-between pb-5">
      <h1 className="text-2xl font-semibold">
        {title} ({length})
      </h1>
      <SortingPopover />
    </div>
  );
};

export default ProfileSorting;
