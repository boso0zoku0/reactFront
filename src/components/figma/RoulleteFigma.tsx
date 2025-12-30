import {useState, useEffect, useRef} from 'react';
import {Timer, TrendingUp} from 'lucide-react';
import axios from "axios";
import {WinnerScreen} from "./WinnerScreen.tsx";

interface Round {
  created_at: string;
  round_start_time: string;
  phase: string;
  phase_duration: number;
}


async function playmatesGame() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/roulette/fetch/');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении фотографий:', error);
    return [];
  }
}

async function winnerChoice() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/roulette/winner")
    return response.data;
  } catch (error) {
    console.log('Ошибка:', error);
    return []
  }
}


// Определяем типы фаз игры
type GamePhase = 'betting' | 'spinning' | 'result';

export default function RouletteFigmaV2() {
  const [phase, setPhase] = useState<GamePhase>('betting');
  const [timer, setTimer] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [winner, setWinner] = useState(null);
  const [winnerData, setWinnerData] = useState(null); // Данные победителя с бэкенда
  const [playmates, setPlaymates] = useState([])
  const [totalPot, setTotalPot] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lifespanPhase, setLifespanPhase] = useState<Round | null>(null);

  const repeatedItems = Array(20).fill(playmates).flat();

  useEffect(() => {
    const intervalId = setInterval(() => {
      async function fetchData() {
        try {
          const response = await axios.get("http://127.0.0.1:8000/roulette/fetch/phase-control");
          setLifespanPhase(response.data);
          setTimer(prev => prev ? { ...prev, phase_duration: response.data.phase_duration } : null);


        } catch (err) {
          console.log("error:", err);
        }
      }
      fetchData();
    }, 5000)
    return () => clearInterval(intervalId)
  }, []);


  // Таймер
//   useEffect(() => {
//   const intervalId = setInterval(() => {
//     const now = new Date();
//     const roundStartTime = lifespanPhase && lifespanPhase.round_start_time
//   ? new Date(lifespanPhase.round_start_time)
//   : null;  // или любое значение по умолчанию;
//     const diffSeconds = (roundStartTime && roundStartTime.getTime())
//   ? (roundStartTime.getTime() - now.getTime()) / 1000
//   : null;
//
//     if (diffSeconds !== null && diffSeconds <= 1 && phase === 'betting') {
//       setOffset(0);
//       setTimeout(() => {
//         spinRoulette();
//       }, 100);
//     }
//   }, 1000);
//
//   return () => clearInterval(intervalId);
// }, [timer, lifespanPhase?.round_start_time]);


//
//   useEffect(() => {
//   const intervalId = setInterval(() => {
//     if (typeof lifespanPhase?.phase_duration === 'number' && lifespanPhase.phase_duration >= 1) {
//       setTimer(prev => prev - 1);
//     }
//   }, 1000);
//
//   return () => clearInterval(intervalId);
// }, [lifespanPhase]);


  useEffect(() => {
    playmatesGame()
      .then(data => {
        // array.reduce((accumulator, currentValue) => { ... }, initialValue)
        const total = data.reduce((sum, player) => sum + player.bet, 0);
        setTotalPot(total);

        const playmatesWithPercentage = data.map(player => ({
          ...player,
          percentage: total > 0 ? (player.bet / total) * 100 : 0
        }));

        setPlaymates(playmatesWithPercentage);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Периодический опрос сервера для обновления списка игроков
  useEffect(() => {
    if (phase === 'betting') {
      const pollingInterval = setInterval(() => {
        playmatesGame()
          .then(data => {
            const total = data.reduce((sum, player) => sum + player.bet, 0);
            setTotalPot(total);

            const playmatesWithPercentage = data.map(player => ({
              ...player,
              percentage: total > 0 ? (player.bet / total) * 100 : 0
            }));

            setPlaymates(playmatesWithPercentage);
          })
          .catch(error => {
            console.log(error);
          });
      }, 2000);

      return () => clearInterval(pollingInterval);
    }
  }, [phase]);


  // Функция прокрутки рулетки
  const spinRoulette = () => {
    // Небольшая задержка чтобы браузер применил изменение phase
    setTimeout(() => {
      // Получаем победителя с бэкенда
      winnerChoice()
        .then(data => {
          if (data && data.length > 0) {
            const winnerInfo = data[0];
            setWinnerData(winnerInfo);

            // Находим индекс победителя в массиве игроков
            const winnerUsername = winnerInfo.Winner;
            const winnerIndex = playmates.findIndex(p => p.username === winnerUsername);

            if (winnerIndex !== -1) {
              const itemWidth = 200;
              const fullRotations = 8;
              const finalPosition = (fullRotations * playmates.length * itemWidth) + (winnerIndex * itemWidth) + itemWidth / 2;

              setOffset(finalPosition);

              // Устанавливаем победителя для отображения
              setTimeout(() => {
                setWinner(playmates[winnerIndex]);
                // setPhase('result');


              }, 5000);
            }
          }
        })
        .catch(error => {
          console.error('Ошибка получения победителя:', error);
          // В случае ошибки выбираем случайного победителя
          const randomIndex = Math.floor(Math.random() * playmates.length);
          const itemWidth = 200;
          const fullRotations = 8;
          const finalPosition = (fullRotations * playmates.length * itemWidth) + (randomIndex * itemWidth) + itemWidth / 2;

          setOffset(finalPosition);

          setTimeout(() => {
            setWinner(playmates[randomIndex]);
            // setPhase('result');

          }, 5000);
        });
    }, 50);
  };

  // Функция для начала нового раунда
  const startNewRound = () => {
    // setPhase('betting');
    setOffset(0);
    setWinner(null);
    setWinnerData(null);
    setPlaymates([]); // Очищаем участников
    setTotalPot(0);
    // setTimer(30);

    // Можно сразу запросить новых участников (если они уже есть)
    setTimeout(() => {
      playmatesGame()
        .then(data => {
          const total = data.reduce((sum, player) => sum + player.bet, 0);
          setTotalPot(total);

          const playmatesWithPercentage = data.map(player => ({
            ...player,
            percentage: total > 0 ? (player.bet / total) * 100 : 0
          }));

          setPlaymates(playmatesWithPercentage);
        })
        .catch(error => {
          console.log(error);
        });
    }, 1000);
  };

  // useEffect для отслеживания фазы результата
  useEffect(() => {
    if (phase === 'result') {
      const timeout = setTimeout(() => {
        startNewRound();
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [phase]);

  // Показываем экран победителя когда игра закончилась
  if (phase === 'result' && winner) {
    return (
      <WinnerScreen
        winner={winner}
        totalPot={totalPot}
        onNewGame={startNewRound}
        winnerData={winnerData} // Передаем дополнительные данные с бэкенда
      />
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Верхняя информационная панель */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8 shadow-2xl">
          <div className="flex items-center justify-between">

            {/* Левая часть - та��мер */}
            <div className="text-white">
              {phase === 'betting' && (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <Timer className="w-8 h-8"/>
                    <span className="text-4xl tabular-nums">{timer}s</span>
                  </div>
                  <p className="opacity-80">Время для ставок</p>
                </>
              )}

              {phase === 'spinning' && (
                <p className="text-2xl">Рулетка крутится...</p>
              )}

              {phase === 'result' && (
                <p className="text-2xl">Победитель определён!</p>
              )}
            </div>

            {/* Правая часть - банк */}
            <div className="text-right text-white">
              <div className="flex items-center gap-2 justify-end mb-2">
                <TrendingUp className="w-6 h-6"/>
                <span className="text-sm opacity-80">Банк:</span>
              </div>
              <p className="text-4xl">{totalPot.toLocaleString('ru-RU')} ₽</p>
            </div>
          </div>
        </div>

        {/* Контейнер рулетки */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-2xl border border-white/10">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-b from-gray-800 to-gray-900 p-6">

            {/* Центральный указатель */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400 z-10 shadow-[0_0_20px_rgba(250,204,21,0.8)]">
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>
            </div>

            {/* Прокручиваемая лента с предметами */}
            <div
              ref={containerRef}
              className="flex gap-4"
              style={{
                transform: `translateX(-${offset}px)`,
                transition: phase === 'spinning' ? 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
              }}
            >
              {repeatedItems.map((item, index) => (
                <div
                  key={`${item.username}-${index}`}
                  className={`min-w-[200px] h-40 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex flex-col items-center justify-center text-white shadow-lg border-2 border-white/20`}
                >
                  {/* Аватар игрока */}
                  {item.photo ? (
                    <img
                      src={item.photo}
                      alt={item.username}
                      className="w-16 h-16 rounded-full mb-2 border-2 border-white/50 object-cover"
                    />
                  ) : (
                    <div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-2 border-2 border-white/50 flex items-center justify-center">
                      <span className="text-2xl">{item.username?.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  {/* Имя игрока */}
                  <p className="text-center px-3 mb-1">{item.username}</p>
                  {/* Ставка */}
                  <p className="text-xl">{item.bet} ₽</p>
                  {/* Процент */}
                  <div className="text-xs opacity-70 mt-1">{item.percentage?.toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Список ставок пользователей */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-white/10">
          <h2 className="text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">👥</span> Ставки игроков ({playmates.length})
          </h2>

          {playmates.length === 0 ? (
            <div className="text-center text-white/50 py-8">
              Ожидание игроков...
            </div>
          ) : (
            <div className="space-y-3">
              {playmates.map((user, index) => (
                <div
                  key={`${user.username}-${index}`}
                  className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-4 flex items-center justify-between hover:from-blue-800/60 hover:to-purple-800/60 transition-all border border-white/5"
                >
                  {/* Левая часть - аватар и информация */}
                  <div className="flex items-center gap-4">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.username}
                        className="w-12 h-12 rounded-full border-2 border-blue-400 object-cover"
                      />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-blue-400 flex items-center justify-center text-white">
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <p className="text-white">{user.username}</p>
                      <p className="text-yellow-400 text-sm">{user.percentage?.toFixed(1)}%</p>
                    </div>
                  </div>

                  {/* Правая часть - сумма */}
                  <div className="text-right">
                    <p className="text-green-400">{user.bet} ₽</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}