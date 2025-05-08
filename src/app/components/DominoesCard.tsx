import { FC } from "react";

interface DisplayCardProps {
  data: number[];
}

const DisplayCard: FC<DisplayCardProps> = ({ data }) => {
  return (
    <div className="w-fit h-fit bg-white border p-2 border-black">
      <div>{data[0]}</div>-<div>{data[1]}</div>
    </div>
  );
};
export default DisplayCard;
