function Ticket({ currentArrPlaces, reservation, handleBookSeats, onEdit }) {
  if (!reservation || !reservation.film) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a2e]/90 backdrop-blur-md border-t border-[#3d3d5d] p-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
          <span><span className="text-[#8b5cf6]">Фильм:</span> {reservation.film}</span>
          <span><span className="text-[#8b5cf6]">Дата:</span> {reservation.date} {reservation.time}</span>
          <span><span className="text-[#8b5cf6]">Зал:</span> {reservation.hall}</span>
          <span><span className="text-[#8b5cf6]">Места:</span> {currentArrPlaces?.join(', ') || '—'}</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="px-6 py-2 rounded-lg font-bold transition-all whitespace-nowrap bg-transparent border-2 border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white"
          >
            Изменить
          </button>
          <button
            onClick={handleBookSeats}
            className={`
              px-6 py-2 rounded-lg font-bold relative overflow-hidden
              bg-[#1a1a2e] text-white border-2 border-transparent
              before:absolute before:inset-0 before:border-2 before:border-[#8b5cf6] before:rounded-lg
              before:animate-border-run before:opacity-70
              hover:bg-[#8b5cf6] hover:text-white transition-colors duration-300
            `}
          >
            <span className="relative z-10">Подтвердить бронирование</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ticket