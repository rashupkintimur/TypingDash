import { LoremIpsum } from "lorem-ipsum";
import { Keyboard } from "./ui/Keyboard";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

const lorem = new LoremIpsum();

const letters = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  " ",
];

const timeLimit = new Date(Date.now() + 60000); // 1 minute

export const App = () => {
  const [countInputedWords, setCountInputedWords] = useState(0);
  const [paragraph, setParagraph] = useState(lorem.generateSentences(1));
  const [inputedText, setInputedText] = useState("");
  const [pressedKey, setPressedKey] = useState("");
  const [countMistakes, setCountMistakes] = useState(0);
  const { isRunning, start, pause, seconds } = useTimer({
    expiryTimestamp: timeLimit,
    autoStart: false,
    onExpire: () => pause(),
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // starting timer when we keydown on letter
      if (letters.includes(event.key)) if (!isRunning) start();

      setPressedKey(event.key);

      if (event.key === paragraph[0]) {
        if (event.key === " ") setCountInputedWords((prevCount) => ++prevCount);

        setInputedText((prevInput) => {
          const newInput = prevInput + event.key;
          setParagraph((prevText) => prevText.slice(1));

          return newInput;
        });

        if (paragraph.length === 1) {
          setParagraph(lorem.generateSentences(1));
          setInputedText("");
        }

        return;
      }

      if (letters.includes(event.key.toUpperCase()))
        setCountMistakes((prevCount) => ++prevCount);
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

  // Calculating WPM based on time
  const minutesPassed = (60 - seconds) / 60;
  const wordsPerMinute =
    minutesPassed > 0 ? Math.round(countInputedWords / minutesPassed) : 0;

  return (
    <div className="container mx-auto grid grid-rows-2 pt-10 pb-10 h-screen">
      <div className="grid grid-cols-3 justify-between items-start">
        <p className="text-red-500 font-bold text-3xl">
          Mistakes: {countMistakes}
        </p>
        <p className="text-fuchsia-500 text-4xl font-bold self-center text-center">
          Words per minute: {wordsPerMinute}
        </p>
        <p className="text-green-500 text-3xl font-bold justify-self-end">
          Time: {seconds}
        </p>
      </div>
      <p className="text-2xl text-slate-600 font-sans text-center leading-10 font-medium tracking-wider">
        <span className="text-red-500">{inputedText}</span>
        {paragraph}
      </p>
      <div className="justify-self-center">
        <Keyboard pressedKey={pressedKey} />
      </div>
    </div>
  );
};
