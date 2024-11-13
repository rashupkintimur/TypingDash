import { FC } from "react";

type RowLayoutOutProps = {
  rowLayoutOut: string[];
  pressedKey: string;
  classKey: string;
};

const classPressedKey = "bg-indigo-500 duration-75";

export const RowLayoutOut: FC<RowLayoutOutProps> = ({
  rowLayoutOut,
  pressedKey,
  classKey,
}) => {
  return (
    <>
      {rowLayoutOut.map((letter) => (
        <p
          key={letter}
          className={`${classKey} ${
            letter.toLowerCase() === pressedKey.toLowerCase()
              ? classPressedKey
              : ""
          }`}
        >
          {letter}
        </p>
      ))}
    </>
  );
};
