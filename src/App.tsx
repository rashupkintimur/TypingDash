import { LoremIpsum } from "lorem-ipsum";
import { Keyboard } from "./ui/Keyboard";
import { useEffect, useState } from "react";

const lorem = new LoremIpsum();

export const App = () => {
  const [paragraph, setParagraph] = useState(lorem.generateParagraphs(1));
  const [inputedText, setInputedText] = useState("");
  const [pressedKey, setPressedKey] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPressedKey(event.key);

      if (event.key === paragraph[0]) {
        setInputedText((prevInput) => {
          const newInput = prevInput + event.key;
          console.log(newInput);
          setParagraph((prevText) => prevText.slice(1));

          return newInput;
        });
      }
    };

    const handleKeyUp = () => {
      setPressedKey("");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressedKey]);

  return (
    <div className="container mx-auto grid grid-rows-2 pt-10 h-screen">
      <p className="text-2xl font-sans text-center leading-10 font-medium tracking-wider">
        <span className="text-red-500">{inputedText}</span>
        {paragraph}
      </p>
      <div className="justify-self-center">
        <Keyboard pressedKey={pressedKey} />
      </div>
    </div>
  );
};
