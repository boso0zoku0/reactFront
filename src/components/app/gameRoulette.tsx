import React, {useState} from "react";
import axios from "axios";

const GameRoulette = () => {
  const [bet, setBet] = useState('');
  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/roulette/join?bet=${bet}`, {
          bet: parseInt(bet)
        }, {withCredentials: true})


      setMessage(`Your bet ${response.data.result} has been successfully`)


    } catch (error) {

      let errorDetail = '';
      if (error.response && error.response.data.detail) {
        errorDetail = typeof error.response.data.detail === 'string' ?
          error.response.data.detail :
          JSON.stringify(error.response.data.detail);
      }
      setMessage(`Error: ${errorDetail || error.message}`);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <label htmlFor="bet" className="text-white p-2 font-poppins">
            Bet: {message}
          </label>
          <input
            type="text"
            id="bet"
            required
            onChange={(e) => setBet(e.target.value)}
            className="w-64 p-2 border rounded-md border-pink-700"
          />

          <button type={'submit'} className="w-64 p-2 bg-blue-500 hover:bg-indigo-600 text-white rounded-md focus:ring-3">Bet place</button>
    </form>
  )}

export default GameRoulette