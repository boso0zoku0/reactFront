import {useState} from "react";

export default function SyncedInputs() {
  const [text, setText] = useState('')
  const [btnText, setBtnText] = useState('')

  function handleChange(e) {
    setText(e.target.value)
  }

  function handleClickButton(e) {
    setBtnText(btnText + 1)
  }
  return (
    <>

      <input onClick={handleClickButton}></input>
      <Input label='qw' value={btnText} onChange={handleChange}/>
      <Input label='qw2' value={btnText} onChange={handleChange}/>
    </>


  )
}


function Input({label, value, onChange}) {

  return (

    <label>{label}{' '}
      <input value={value} onChange={onChange}/>
    </label>
  )
}