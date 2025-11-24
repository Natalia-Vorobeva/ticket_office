function Path({
	selectedFilm,
	selectedHall,
	reservation,
	selectedDate,
	selectedPlace,
	currentArrPlaces,
	handleBookSeats,
	ticket,
	activeDate
}) {

	const time = reservation.date + " , " + reservation.time


	return (
		<div className={`flex ${ticket ? 'justify-end' : 'justify-start'}  pb-4 ${reservation.film == '' ? ' opacity-0' : ''}`}>
			<button className={`relative z-2 w-[10rem] text-silver-200 bg-black  text-ellipsis line-clamp-2 ${selectedFilm ? 'rounded-md border-green-400 border-2' : 'rounded-md border-silver-700 border-2'}`}>{reservation.film == "" ? 'Фильм' : reservation.film}</button>
			<p className={`w-[3rem] bg-green-400  h-[.7rem] mx-[-.5rem] ${selectedDate ? 'bg-green-400' : 'opacity-0 '}`}></p>

			<button className={`relative z-2 w-[10rem] text-silver-200 bg-black  text-ellipsis line-clamp-2 ${selectedDate ? 'rounded-md border-green-400 border-2' : 'bg-black rounded-md border-silver-700 border-2'}`}>{reservation.date == "" || reservation.time == "" ? 'Дата и сеанс' : time}</button>
			<p className={`w-[3rem] bg-green-400 h-[.7rem] mx-[-.5rem] ${selectedHall ? 'opacity-100' : 'opacity-0 '}`}></p>

			<button className={`relative z-2 w-[10rem] text-silver-200 bg-black  text-ellipsis line-clamp-2 ${selectedHall ? 'rounded-md border-green-400 border-2' : 'bg-black rounded-md border-silver-700 border-2'}`}>Зал {reservation.hall}</button>
			<p className={`w-[3rem] bg-green-400 h-[.7rem] mx-[-.5rem] ${selectedPlace ? 'opacity-100' : 'opacity-0 '}`}></p>
	
			<button className={`relative z-2 w-[10rem] text-silver-200 bg-black  text-ellipsis line-clamp-2 ${selectedPlace ? 'rounded-md border-green-400 bg-black border-2' : 'rounded-md border-silver-700 border-2'}`}>{!selectedPlace ? 'Места в зале' : currentArrPlaces.toString()}</button>
			<p className={` relative z-1 w-[3rem] h-[.9rem] mx-[-.5rem] ${selectedPlace ? 'opacity-100' : 'opacity-0 '}`}></p>


			<button onClick={handleBookSeats} className={`${activeDate == false && "opacity-0"} relative z-2 w-[10rem] text-silver-200 bg-black  text-ellipsis line-clamp-2 
				${selectedFilm && selectedHall && selectedPlace && selectedDate
					? 'rounded-md border-blue border-2' : 'bg-black rounded-md border-silver-700 border-2'}`}>{ticket ? 'Понятно' : 'Забронировать'}</button>
		</div >
	)
}

export default Path