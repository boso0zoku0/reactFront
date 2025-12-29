import {useEffect, useRef, useState} from "react";
import axios from "axios";

async function getPhotos() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/roulette/get-avatars');
    console.log(response)
    return response.data; // возвращаете список фото
  } catch (error) {
    console.error('Ошибка при получении фотографий:', error);
    return [];
  }
}


export default function RouletteRoll() {
  const [players, setPlayers] = useState([])
  const [timer, setTimer] = useState(333)
  const timerRef = useRef(null)

  useEffect(() => {
    getPhotos().then(data => {
      setPlayers(data);
    });
  }, []);

  useEffect(() => {
    if (timer > 0) {
      setTimer.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(setTimer.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(setTimer.current);
  }, [timer]);

  if (timer > 0) {

    return (
      <div className="flex flex-col items-center space-y-14">
        <span className="text-white p-12 font-poppins">{timer}</span>

        {players.map((player) => (
          <div key={player.username} className="border border-gray-300 rounded-lg flex flex-col items-center p-4 md:w-[430px] md:h-[120px] lg:w-[700px] lg:h-[160px]">
            <div className="flex items-center justify-center flex-1 w-full">
              <img
                src={player.photo === null ? 'https://www.shutterstock.com/image-vector/croupier-icon-modern-flat-style-600nw-205909633.jpg' : player.photo}
                alt={player.username}
                className="w-20 h-20 object-cover rounded-full"
              />
            </div>
            <div className="lg:mt-2 md:mt-0 text-center">
              <h3 className="font-poppins">{player.username}</h3>
            </div>
          </div>
        ))}
      </div>
    );

  } else {

    return (
      <div className="flex flex-col items-center space-y-4">
        <time>{timer}</time>
        <div
          className="w-full h-32 overflow-hidden border border-gray-300 rounded-lg flex whitespace-nowrap scroll-smooth">
          {players.map((player) =>
            <div
              key={player.username}
              className="h-full px-4 flex items-center justify-center border-r border-pink-400"
              style={{width: '200px', height: '100'}}
            >
              <img
                src={player.photo === null ? 'https://www.shutterstock.com/image-vector/croupier-icon-modern-flat-style-600nw-205909633.jpg' : player.photo}
                alt={player.username}
                className="max-h-full max-w-full rounded-full"
                style={{
                  width: '200px',
                  height: '100px',
                  objectFit: 'cover',
                }}/>
            </div>
          )
          }


        </div>

      </div>
    )
  }
}