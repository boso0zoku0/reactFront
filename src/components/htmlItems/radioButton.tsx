export default function RadioButton(){

  return(
    <>
      <h2 >Radio Buttons</h2>
      <br/>
      <form>
        <input
          type="radio"
          id="html"
          value="HTML"
        />
        <label className="w-64 p-2 border rounded-md border-pink-700">
          HTML
        </label><br/>
        <br/>


        <input
          type="radio"
          id="html"
          value="HTML"
          className={"mx-5"}
        />
        <label className="w-64 p-2 border rounded-md border-pink-700">
          CSS
        </label><br/>

      </form>
    </>
  )

}