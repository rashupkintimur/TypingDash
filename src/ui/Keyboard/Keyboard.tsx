import { FC } from "react";
import { RowLayoutOut } from "../RowLayoutOut";

type KeyboardProps = {
  pressedKey: string;
};

const topLayingOut = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const middleLayingOut = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const bottomLayingOut = ["Z", "X", "C", "V", "B", "N", "M"];
const spaceLayingOut = [" "];

export const Keyboard: FC<KeyboardProps> = ({ pressedKey }) => {
  return (
    <div className="h-64 bg-slate-700 rounded-xl p-5 grid gap-3 shadow-lg">
      <div className="flex gap-3">
        <RowLayoutOut
          rowLayoutOut={topLayingOut}
          pressedKey={pressedKey}
          classKey="border-2 border-white text-white rounded w-14 flex items-center justify-center"
        />
      </div>
      <div className="flex gap-3 justify-center">
        <RowLayoutOut
          rowLayoutOut={middleLayingOut}
          pressedKey={pressedKey}
          classKey="border-2 border-white text-white rounded w-14 flex items-center justify-center"
        />
      </div>
      <div className="flex gap-3 justify-center">
        <RowLayoutOut
          rowLayoutOut={bottomLayingOut}
          pressedKey={pressedKey}
          classKey="border-2 border-white text-white rounded w-14 flex items-center justify-center"
        />
      </div>
      <div className="flex justify-center">
        <div className="w-7/12">
          <RowLayoutOut
            rowLayoutOut={spaceLayingOut}
            pressedKey={pressedKey}
            classKey="h-10 border-2 rounded border-white"
          />
        </div>
      </div>
    </div>
  );
};
