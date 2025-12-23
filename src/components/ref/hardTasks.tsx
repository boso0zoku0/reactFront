import {useRef} from "react";

function DebouncedButton({ onClick, children }) {
  const timeRef = useRef(null)
  return (
    <>
      <button onClick={() => {
        clearTimeout(timeRef.current);
        timeRef.current = setTimeout(() => {
          onClick();
        }, 1000)
      }


      } className="w-64 p-2 bg-blue-500 hover:bg-indigo-600 text-white rounded-md focus:ring-3">{children}</button>
    </>


  )

}

export default function Dashboard() {

  return(
    <>
      <DebouncedButton onClick={() => alert('hi')}>
        Launch
      </DebouncedButton>


      <DebouncedButton onClick={() => alert('soup')}>
        Boil
      </DebouncedButton>

      <DebouncedButton onClick={() => alert('sing')}>
        sing
      </DebouncedButton>

    </>
  )
}