const sessionsStandard = () => {
	let arr = []
	for (let i = 0; i < 13; i += 2) {
		let s = 10 + i
		arr.push(s)
	}
	return arr
}

const cinemaFilms = (data) => {
	let arr = []
	data.map((item) => {
		const obj = {
			film: item.name,
			sessions: item.sessions == 'standard' ? sessionsStandard() : item.sessions,
			reserved: []
		}
		arr.push(obj)
	})
	return arr
}

const cinemaHalls = (data) => {
	let arr = []
	data.halls.map((item) => {
		const obj = {
			hall: item.hall,
			units: item.units,
			films: cinemaFilms(data.film_data)
		}
		arr.push(obj)
	})
	return arr
}

export const movieTheaters = (data) => {
	let arr = []
	data.map((item) => {
		const obj = {
			movieTheaters: item.name,
			films: item.films,
			halls_films: item.halls_films,
			halls: cinemaHalls(item)
		}
		arr.push(obj)
	})
	return arr
}