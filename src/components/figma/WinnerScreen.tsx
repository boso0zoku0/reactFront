import {Trophy, Sparkles, User} from 'lucide-react';

import {motion} from 'motion/react';

interface WinnerScreenProps {
  winner: {
    username: string;
    bet: number;
    photo: string | null;
    percentage: number;
  };
  totalPot: number;
  onNewGame: () => void;
  winnerData?: {
    Winner: string;
    Chance: string;
    'Ticket win': number;
    'All bets': number;
    'All Players': string;
    'All players debug': string;
  } | null;
}

export function WinnerScreen({winner, totalPot, onNewGame, winnerData}: WinnerScreenProps) {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 flex items-center justify-center p-8 overflow-hidden relative">
      {/* Анимированные конфетти */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              opacity: 1
            }}
            animate={{
              y: window.innerHeight + 20,
              x: Math.random() * window.innerWidth,
              rotate: 360,
              opacity: 0
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <motion.div
          initial={{scale: 0, rotate: -180}}
          animate={{scale: 1, rotate: 0}}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.8
          }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-4 border-yellow-400/50 shadow-2xl"
        >
          {/* Иконка трофея */}
          <motion.div
            initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.3}}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <Trophy className="w-24 h-24 text-yellow-400"/>
              <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-pulse"/>
            </div>
          </motion.div>

          {/* Заголовок */}
          <motion.h1
            initial={{y: -30, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.4}}
            className="text-center text-white mb-8"
          >
            🎉 Победитель! 🎉
          </motion.h1>

          {/* Фото победителя */}
          <motion.div
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="flex justify-center mb-6"
          >
            {winner.photo ? (
              <img
                src={winner.photo}
                alt={winner.username}
                className="w-40 h-40 rounded-full object-cover border-8 border-yellow-400 shadow-2xl"
              />
            ) : (
              <div
                className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center border-8 border-yellow-400 shadow-2xl">
                <User className="w-20 h-20 text-white"/>
              </div>
            )}
          </motion.div>

          {/* Имя победителя */}
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.7}}
            className="text-center mb-8"
          >
            <h2 className="text-white mb-2">{winner.username}</h2>
            <p className="text-yellow-300">Выиграл игру!</p>
          </motion.div>

          {/* Информация о выигрыше */}
          <motion.div
            initial={{y: 50, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.8}}
            className="bg-white/5 backdrop-blur rounded-2xl p-6 mb-6 border-2 border-yellow-400/30"
          >
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-white/70 mb-2">Ставка</div>
                <div className="text-white text-2xl">{winner.bet.toLocaleString('ru-RU')} ₽</div>
              </div>
              <div>
                <div className="text-white/70 mb-2">Выигрыш</div>
                <div className="text-yellow-400 text-2xl">{totalPot.toLocaleString('ru-RU')} ₽</div>
              </div>
            </div>

            {/* Дополнительная информация с бэкенда */}
            {winnerData && (
              <>
                <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-white/70 mb-1">Шанс победы</div>
                    <div className="text-green-400 text-lg">{winnerData.Chance}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/70 mb-1">Выигрышный билет</div>
                    <div className="text-purple-400 text-lg">#{winnerData['Ticket win']}</div>
                  </div>
                </div>
              </>
            )}

            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="text-white/70 text-center mb-1">Доля в банке</div>
              <div className="text-white text-center text-xl">{winner.percentage.toFixed(1)}%</div>
            </div>
          </motion.div>

          {/* Кнопка новой игры */}
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 1}}
            className="text-center"
          >
            <button onClick={onNewGame} className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-8 py-6 text-lg">\
              Начать новую игру
            </button>

          </motion.div>
        </motion.div>

        {/* Дополнительная информация */}
        <motion.p
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 1.2}}
          className="text-center text-white/60 mt-6"
        >
          Следующая игра начнется когда игроки сделают новые ставки
        </motion.p>
      </div>
    </div>
  );
}