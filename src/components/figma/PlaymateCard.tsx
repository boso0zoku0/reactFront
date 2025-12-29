import { User } from 'lucide-react';

interface PlaymateCardProps {
  username: string;
  bet: number;
  photo: string | null;
  percentage: number;
  rank: number;
}

export function PlaymateCard({ username, bet, photo, percentage, rank }: PlaymateCardProps) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  const getRankBadge = (rank: number) => {
    const medals = ['🥇', '🥈', '🥉'];
    return rank <= 3 ? medals[rank - 1] : `#${rank}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
      {/* Ранг */}
      <div className="flex justify-between items-start mb-4">
        <div className={`bg-gradient-to-br ${getRankColor(rank)} px-3 py-1 rounded-full text-white text-sm`}>
          {getRankBadge(rank)}
        </div>
        <div className="text-white/50 text-sm">{percentage.toFixed(1)}%</div>
      </div>

      {/* Фото или аватар */}
      <div className="flex justify-center mb-4">
        {photo ? (
          <img
            src={photo}
            alt={username}
            className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-4 border-white/20">
            <User className="w-12 h-12 text-white" />
          </div>
        )}
      </div>

      {/* Имя пользователя */}
      <div className="text-center mb-3">
        <h3 className="text-white">{username}</h3>
      </div>

      {/* Ставка */}
      <div className="bg-white/5 rounded-xl p-3 text-center">
        <div className="text-white/60 text-sm mb-1">Ставка</div>
        <div className="text-white text-xl">{bet.toLocaleString('ru-RU')} ₽</div>
      </div>

      {/* Прогресс бар */}
      <div className="mt-4">
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
