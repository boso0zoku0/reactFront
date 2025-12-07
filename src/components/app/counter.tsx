import {useState} from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
  <div className="flex items-center justify-center h-screen">
    <button onClick={handleClick} className="w-64 p-2 border border-gray-300 rounded-md ">
      You clicked {count} times
    </button>
  </div>
);
}