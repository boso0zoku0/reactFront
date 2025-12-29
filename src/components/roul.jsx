import {useEffect, useRef, useState} from 'react';

const horizontalItems = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

const HorizontalRoulette = () => {
  const containerRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [startSpin, setStartSpin] = useState(false); // триггер для эффекта

  const intervalRef = useRef(null);

  const handleRoll = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      setStartSpin(true); // запуск эффекта
    }
  };

  // эффект, запускаемый при startSpin
  useEffect(() => {
    if (startSpin) {
      intervalRef.current = setInterval(() => {
        const container = containerRef.current;
        if (container) {
          container.scrollLeft += 2;
          const maxScrollLeft = container.scrollWidth - container.clientWidth;
          if (container.scrollLeft >= maxScrollLeft) {
            clearInterval(intervalRef.current);
            setIsSpinning(false);
            setStartSpin(false);
            container.scrollLeft = 0
          }
        }
      }, 30);
    }
    // очистка интервала при размонтировании или завершении
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startSpin]); // срабатывает при изменении startSpin

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        ref={containerRef}
        className="w-full h-32 overflow-hidden border border-gray-300 rounded-lg flex whitespace-nowrap scroll-smooth"
      >
        {horizontalItems.map((item, index) => (
          <div
            key={index}
            className="h-full px-4 flex items-center justify-center border-r border-pink-400 font-semibold min-w-[100px]"
          >
            {item}
          </div>
        ))}
      </div>
      <button
        onClick={handleRoll}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={isSpinning}
      >
        Запустить автоматическую прокрутку
      </button>
    </div>
  );
};

export default HorizontalRoulette;