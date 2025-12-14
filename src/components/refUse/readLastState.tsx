import React, {useRef, useState} from "react";


export default function Chat() {
  const [text, setText] = useState('')
  const textRef = useRef(text)

  function handleSend() {
    setTimeout(() => {
      alert('sending' + text)
    }, 3000
    )}

  function handleChange(e) {
    setText(e.target.value)
    textRef.current = e.target.value
    }

return (
  <>
    <input
            value={text}
            onChange={handleChange}
            className="w-64 p-2 border rounded-md border-pink-600"
          />
    <button
      type="submit"
      onClick={handleSend}
      className="mx-5 my-5 w-64 p-2 bg-blue-500 hover:bg-indigo-600 text-white rounded-md focus:ring-3">
      Send
    </button>

  </>
)}