function Ticket({ currentArrPlaces, reservation, handleBookSeats }) {
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
				<button
					onClick={handleBookSeats}
					className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:scale-105 transition-all"
				>
					Подтвердить бронирование
				</button>
			</div>
		</div>
	);
}

export default Ticket