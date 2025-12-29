import {useEffect, useRef, useState} from 'react';

const RouletteWithAvatars = () => {
  const [avatars, setAvatars] = useState([]); // массив аватарок участников
  const [betsLocked, setBetsLocked] = useState(false); // когда нельзя ставить
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null); // победитель
  const containerRef = useRef(null);
  const spinIntervalRef = useRef(null);
  const spinCountRef = useRef(0); // счетчик прокруток
  const [timer, setTimer] = useState(10)

  // Пример аватаров (можете заменить или получать динамически)
  const sampleAvatars = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYeXoPJvCJcPL4MhitJzrSvJUSVxz5femYtw&s',
    'https://static.tildacdn.com/tild3066-6336-4039-a562-316561313731/pleasant-looking-cau.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLOAqfhMA1_6TwZvPfMyK1mjCyhVvno6YN_g&s',
    'https://cdn.fishki.net/upload/post/201406/06/1275504/40-of-the-most-amazing-humans-met-on-the-streets-by-the-humans-of-movement-worldwide34__700.jpg',
    'https://cs7.pikabu.ru/post_img/big/2018/02/14/11/1518634772137146068.jpg'
  ];

  // Добавить аватарку в ставку
  const handleAddBet = () => {
    if (!betsLocked && sampleAvatars.length > 0) {
      const randomAvatar = sampleAvatars[Math.floor(Math.random() * sampleAvatars.length)];
      setAvatars(prev => [...prev, randomAvatar]);
    }
  };

  // Запуск таймера для ставок
  const startBetsTimer = () => {
  setBetsLocked(false);
  const intervalId = setInterval(() => {
    setTimer(prevTimer => {
      if (prevTimer <= 1) {
        clearInterval(intervalId);
        setBetsLocked(true);
        startRotation();
        return 0; // чтобы таймер показывал 0 на конечном этапе
      }
      return prevTimer - 1;
    });
  }, 1000);
};
  // Начало вращения
  const startRotation = () => {
    if (avatars.length === 0) return;
    setIsSpinning(true);
    spinCountRef.current = 0;
    // Запускаем прокрутку (например, с ускорением и замедлением)
    spinIntervalRef.current = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += 20; // скорость прокрутки
        spinCountRef.current += 10;

        // допустим, вращение останавливается через определенное количество прокрутов
        if (spinCountRef.current >= 100) {
          clearInterval(spinIntervalRef.current);
          setIsSpinning(false);
          determineWinner(); // выбрать победителя
        }
      }
    }, 50);
  };

  // Определяем победителя — случайный аватар из участников
  const determineWinner = () => {
    if (avatars.length > 0) {
      const randomIndex = Math.floor(Math.random() * avatars.length);
      setWinner(avatars[randomIndex]);
    }
  };

  // Стартовать весь процесс вручную
  const handleStart = () => {
    if (avatars.length === 0) {
      alert('Нет участников для рулетки');
      return;
    }
    startBetsTimer();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Рулетка с аватарками</h2>

      {/* Блок управления */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleAddBet}
      >
        Добавить ставку
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 ml-4"
        onClick={handleStart}
      >
        Стартовать
      </button>

      {/* Время для ставок */}
      {!betsLocked && (
        <p className="mb-2">Время для ставок: {timer} секунд</p>
      )}

      {/* Вывод участников */}
      <div className="overflow-hidden w-full h-32 border border-gray-300 rounded-lg mb-4">
        <div
          ref={containerRef}
          className="whitespace-nowrap flex"
        >
          {avatars.length > 0 ? (
            avatars.map((avatar, index) => (
              <div
                key={index}
                className="h-full px-4 flex items-center justify-center border-r border-pink-400"
                style={{width: '200px', height: '100'}}
              >
                <img
                  src={avatar}
                  alt={`avatar-${index}`}
                  className="max-h-full max-w-full rounded-full"
                  style={{
                    width: '200px',
                    height: '100px',
                    objectFit: 'cover',
                  }}/>
              </div>
            ))
          ) : (
            <p className="p-4">Нет участников</p>
          )}
        </div>
      </div>

      {/* Анимация вращения и результат */}
      {isSpinning ? (
        <p>Вращается...</p>
      ) : (
        winner && (
          <div className="mt-4 p-4 bg-yellow-200 rounded shadow">
            <h3 className="text-lg mb-2">Победитель:</h3>
            <img src={winner} alt="Победитель" className="w-16 h-16 rounded-full mb-2"/>
            <p>Поздравляем {winner}!</p>
          </div>
        )
      )}
    </div>
  );
};

export default RouletteWithAvatars;